---
date: 2022-12-09
category:
  - 前端
  - Vue
tag:
  - Vue
  - 页面更新
  - 原理
---

# Vue2中关于数组与对象修改触发页面更新的机制与原理简析

## 相关问题

### 数组

使用索引直接赋值与直接修改数组length时，不会触发页面更新。

例如：

```javascript
<script>
export default {
    name: "HomeView",
    data: () => ({
        list1: ["A", "B"],
    }),
    methods: {
        btnClicked() {
            this.list1[0] = "C"
            this.list1[2] = "C"
        },
    },
}
</script>
```

或是

```javascript
<script>
export default {
    name: "HomeView",
    data: () => ({
        list1: [{ text: "123" }, { text: "456" }],
    }),
    methods: {
        btnClicked() {
            this.list1[0] = { text: "789" }
        },
    },
}
</script>
```

**页面并不会触发更新。**

<br/>

### 对象

页面初始化完成后，在方法中直接对data内声明对象当前不存在的属性进行赋值来为对象新增属性时，页面也不会响应渲染。

例如：

```javascript
<script>
export default {
    name: "HomeView",
    data: () => ({
        obj1: { a: "a", b: "b" },
    }),
    methods: {
        btnClicked() {
            this.obj1.c = "c"
        },
    },
}
</script>
```

**页面并不会触发更新。**

<br/>

## 原因

Vue在初始化时会将data内所有的属性嵌套遍历并重写其Getter和Setter方法，借此实现响应式属性。

然而对于在页面渲染完成后加入data的属性，Vue并不会将其变为响应式。

<br/>

## 一些深入的探究

### 数组

Vue对于数组是仅将其对应下标的对象的属性变为响应式，而这个**下标本身是无法成为响应式的**。

```javascript
data: () => ({
        list1: [{ text: "123" }, { text: "456" }],
})
```

使用如上的data声明。

方法A：

```javascript
this.list1[0] = { text: "789" }
```

方法B：

```javascript
this.list1[0].text = "789"
```

**方法B可以被正确响应而方法A不可以。**

方法A将数组下标为0的位置替换为了一个新的对象，而因为数组下标不是响应式的，因此没有触发页面刷新。

同时，由于数组下标为0的位置替换为了一个新的对象，而这个新的对象并没有被配置为响应式，那对于这个对象属性的修改也不会触发页面更新。如下：

```javascript
this.list1[0] = { text: "789" }
this.list1[0].text = "456"
```

由于新的对象的属性并没有被配置为响应式，那么即使对这个对象的属性进行修改，**页面也不会被更新。**

既然**下标本身无法成为响应式**，不妨尝试：

```javascript
<script>
export default {
    name: "HomeView",
    data: () => ({
        list1: ["A", "B"],
    }),
    methods: {
        btnClicked() {
            this.list1[0] = "C"
        },
    },
}
</script>
```

**通过下标修改数组的对应值也无法触发视图更新。**

<br/>

### 对象

```javascript
data: () => ({
        obj1: { a: { text: "a" }, b: { text: "b" } },
}),
```

使用如上的data声明。

```javascript
this.obj1.a = { text: "c" }
```

**成功触发视图更新。**

与数组下标不同，对象的属性在初始化是被定义为响应式的，因此直接对属性赋值对象是能够触发视图更新的。不像对数组的对应下标赋值而不会触发视图更新。

<br/>

## 解决方案

### 数组

#### 1.  内置API

如果需要向数组加入新的成员，则可以直接使用数组的push方法。

此外，下列数组方法也可以自动的触发视图刷新：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

#### 2.  将数组重新赋值，修改引用地址

##### 为数组新增一个字符串成员"C"

```javascript
this.list1 = this.list1.concat(["C"])
```

由于list1是data的属性，list1的引用发生改变，就会**触发视图更新**。

##### 修改数组的第一个值

```javascript
let tempList = this.list1.concat([]) // 深拷贝，等价于一个新数组，使用slice，JSON都可以。
tempList[0] = "666"
this.list1 = tempList
```

通过原数组新建一个新数组，修改新数组后再将新数组赋值给原数组，由于原数组作为data的属性，其**引用被修改**，**触发视图更新**。

#### 3.  Vue.$set() 方法

使用Vue.$set可以为data对象添加一个新的响应式属性，且**触发视图更新**。

定义：

```java
Vue.$set(对象或数组, 对象属性名或数组下标, 值)
```

向list1对象的0索引位置赋值一个新的响应式对象，同时触发视图更新：

```javascript
Vue.$set(this.list1, 0, { text: "789" })
```

如果在组件中应使用this.$set来代替：

```javascript
this.$set(this.list1, 0, { text: "789" })
```

<br/>

### 对象

#### 1.  将对象重新赋值，修改引用地址

思路与数组的类同。

使用JSON、手写递归、lodash深拷贝均可，但如果对象内含方法，则不能使用JSON来完成深拷贝。

深拷贝完成后修改对应属性后赋值给原对象即可。

#### 2.  Vue.$set() 方法

对象同样可以使用$set() 方法修改。

定义：

```java
Vue.$set(对象或数组, 对象属性名或数组下标, 值)
```

将obj1对象的a属性赋值为字符串"b"并触发视图更新：

```javascript
Vue.$set(this.obj1, a, "b")
```

如果在组件内，则应使用：

```javascript
this.$set(this.obj1, a, "b")
```
