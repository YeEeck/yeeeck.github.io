[...new Array(6)].map((e,t)=>`[vp-content] h${t+1}`).join(",");const{entries:$}=Object,{fromEntries:st}=Object,nt="ENTRIES",D="KEYS",W="VALUES",_="";class S{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=b(this._path);if(b(s)===_)return{done:!1,value:this.result()};const n=t.get(b(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=b(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>b(t)).filter(t=>t!==_).join("")}value(){return b(this._path).node.get(_)}result(){switch(this._type){case W:return this.value();case D:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const b=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(typeof t!="string")return n;const o=t.length+1,r=o+s,i=new Uint8Array(r*o).fill(s+1);for(let c=0;c<o;++c)i[c]=c;for(let c=1;c<r;++c)i[c*o]=c;return q(e,t,s,n,i,1,o,""),n},q=(e,t,s,n,o,r,i,c)=>{const l=r*i;t:for(const u of e.keys())if(u===_){const h=o[l-1];h<=s&&n.set(c,[e.get(u),h])}else{let h=r;for(let f=0;f<u.length;++f,++h){const m=u[f],g=i*h,y=g-i;let d=o[g];const a=Math.max(0,h-s-1),w=Math.min(i-1,h+s);for(let p=a;p<w;++p){const O=m!==t[p],C=o[y+p]+ +O,k=o[y+p+1]+1,x=o[g+p]+1,v=o[g+p+1]=Math.min(C,k,x);v<d&&(d=v)}if(d>s)continue t}q(e.get(u),t,s,n,o,h,i,c+u)}};class z{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=I(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,r]=L(n);for(const i of o.keys())if(i!==_&&i.startsWith(r)){const c=new Map;return c.set(i.slice(r.length),o.get(i)),new z(c,t)}}return new z(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,rt(this._tree,t)}entries(){return new S(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=F(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){return F(this._tree,t)?.has(_)??!1}keys(){return new S(this,D)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,E(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=E(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=E(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new S(this,W)}[Symbol.iterator](){return this.entries()}static from(t){const s=new z;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return z.from(Object.entries(t))}}const I=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),I(e.get(n),t.slice(n.length),s);return s.push([e,t]),I(void 0,"",s)},F=(e,t)=>{if(t.length===0||!e)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return F(e.get(s),t.slice(s.length))},E=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const r of e.keys())if(r!==_&&t[n]===r[0]){const i=Math.min(s-n,r.length);let c=1;for(;c<i&&t[n+c]===r[c];)++c;const l=e.get(r);if(c===r.length)e=l;else{const u=new Map;u.set(r.slice(c),l),e.set(t.slice(n,n+c),u),e.delete(r),e=u}n+=c;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},rt=(e,t)=>{const[s,n]=I(e,t);if(s!==void 0){if(s.delete(_),s.size===0)A(n);else if(s.size===1){const[o,r]=s.entries().next().value;R(n,o,r)}}},A=e=>{if(e.length===0)return;const[t,s]=L(e);if(t.delete(s),t.size===0)A(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&R(e.slice(0,-1),n,o)}},R=(e,t,s)=>{if(e.length===0)return;const[n,o]=L(e);n.set(o+t,s),n.delete(o)},L=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},ct=/[\n\r\p{Z}\p{P}]+/u,j="or",N="and",ut="and_not",ht=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},B=({score:e},{score:t})=>t-e,lt=()=>new Map,M=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,H={[j]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:r,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,r)}}return e},[N]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:r,terms:i,match:c}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+r,terms:o.terms,match:Object.assign(o.match,c)})}return s},[ut]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},dt=(e,t,s,n,o,r)=>{const{k:i,b:c,d:l}=r;return Math.log(1+(s-t+.5)/(t+.5))*(l+e*(i+1)/(e+i*(1-c+c*n/o)))},at=e=>(t,s,n)=>({term:t,fuzzy:typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy??!1,prefix:typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0,termBoost:typeof e.boostTerm=="function"?e.boostTerm(t,s,n):1}),J=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},ft=(e,t,s,n)=>{if(!e._index.has(n)){J(e,s,t,n);return}const o=e._index.fetch(n,lt),r=o.get(t),i=r?.get(s);!r||typeof i>"u"?J(e,s,t,n):i<=1?r.size<=1?o.delete(t):r.delete(s):r.set(s,i-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},gt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(ct),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{console?.[e]?.(t)},autoVacuum:!0},Y={combineWith:j,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},pt={combineWith:N,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},K={minDirtFactor:.1,minDirtCount:20},yt={..._t,...K},U=Symbol("*"),wt=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,r]of e._documentIds){const i=n.boostDocument?n.boostDocument(r,"",e._storedFields.get(o)):1;s.set(o,{score:i,terms:[],match:{}})}return s},Q=(e,t=j)=>{if(e.length===0)return new Map;const s=t.toLowerCase();if(!(s in H))throw new Error(`Invalid combination operator: ${t}`);return e.reduce(H[s])},T=(e,t,s,n,o,r,i,c,l,u=new Map)=>{if(r==null)return u;for(const h of Object.keys(i)){const f=i[h],m=e._fieldIds[h],g=r.get(m);if(g==null)continue;let y=g.size;const d=e._avgFieldLength[m];for(const a of g.keys()){if(!e._documentIds.has(a)){ft(e,m,a,s),y-=1;continue}const w=c?c(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!w)continue;const p=g.get(a),O=e._fieldLength.get(a)[m],C=dt(p,y,e._documentCount,O,d,l),k=n*o*f*w*C,x=u.get(a);if(x){x.score+=k,ht(x.terms,t);const v=G(x.match,s);v?v.push(h):x.match[s]=[h]}else u.set(a,{score:k,terms:[t],match:{[s]:[h]}})}}return u},xt=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields??e._options.fields).reduce((d,a)=>({...d,[a]:G(n.boost,a)||1}),{}),{boostDocument:r,weights:i,maxFuzzy:c,bm25:l}=n,{fuzzy:u,prefix:h}={...Y.weights,...i},f=e._index.get(t.term),m=T(e,t.term,t.term,1,t.termBoost,f,o,r,l);let g,y;if(t.prefix&&(g=e._index.atPrefix(t.term)),t.fuzzy){const d=t.fuzzy===!0?.2:t.fuzzy,a=d<1?Math.min(c,Math.round(t.term.length*d)):d;a&&(y=e._index.fuzzyGet(t.term,a))}if(g)for(const[d,a]of g){const w=d.length-t.term.length;if(!w)continue;y?.delete(d);const p=h*d.length/(d.length+.3*w);T(e,t.term,d,p,t.termBoost,a,o,r,l,m)}if(y)for(const d of y.keys()){const[a,w]=y.get(d);if(!w)continue;const p=u*d.length/(d.length+w);T(e,t.term,d,p,t.termBoost,a,o,r,l,m)}return m},X=(e,t,s={})=>{if(t===U)return wt(e,s);if(typeof t!="string"){const h={...s,...t,queries:void 0},f=t.queries.map(m=>X(e,m,h));return Q(f,h.combineWith)}const{tokenize:n,processTerm:o,searchOptions:r}=e._options,i={tokenize:n,processTerm:o,...r,...s},{tokenize:c,processTerm:l}=i,u=c(t).flatMap(h=>l(h)).filter(h=>!!h).map(at(i)).map(h=>xt(e,h,i));return Q(u,i.combineWith)},Z=(e,t,s={})=>{const{searchOptions:n}=e._options,o={...n,...s},r=X(e,t,s),i=[];for(const[c,{score:l,terms:u,match:h}]of r){const f=u.length||1,m={id:e._documentIds.get(c),score:l*f,terms:Object.keys(h),queryTerms:u,match:h};Object.assign(m,e._storedFields.get(c)),(o.filter==null||o.filter(m))&&i.push(m)}return t===U&&o.boostDocument==null||i.sort(B),i},zt=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:r,terms:i}of Z(e,t,s)){const c=i.join(" "),l=n.get(c);l!=null?(l.score+=r,l.count+=1):n.set(c,{score:r,terms:i,count:1})}const o=[];for(const[r,{score:i,terms:c,count:l}]of n)o.push({suggestion:r,terms:c,score:i/l});return o.sort(B),o};class bt{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(!t?.fields)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...gt,...t,autoVacuum:s,searchOptions:{...Y,...t.searchOptions},autoSuggestOptions:{...pt,...t.autoSuggestOptions}},this._index=new z,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=K,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[r,i]of n)o[r]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,version:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const vt=e=>new bt(e),kt=({documentCount:e,nextId:t,fieldIds:s,averageFieldLength:n,dirtCount:o,version:r},i)=>{if(r!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const c=vt(i);return c._documentCount=e,c._nextId=t,c._idToShortId=new Map,c._fieldIds=s,c._avgFieldLength=n,c._dirtCount=o??0,c._index=new z,c},It=(e,t)=>{const{index:s,documentIds:n,fieldLength:o,storedFields:r}=e,i=kt(e,t);i._documentIds=M(n),i._fieldLength=M(o),i._storedFields=M(r);for(const[c,l]of i._documentIds)i._idToShortId.set(l,c);for(const[c,l]of s){const u=new Map;for(const h of Object.keys(l))u.set(parseInt(h,10),M(l[h]));i._index.set(c,u)}return i},V=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let r=0,i=0;const c=(u,h=!1)=>{let f;i===0?f=u.length>20?`… ${u.slice(-20)}`:u:h?f=u.length+i>100?`${u.slice(0,100-i)}… `:u:f=u.length>20?`${u.slice(0,20)} … ${u.slice(-20)}`:u,f&&o.push(f),i+=f.length,h||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let l=s.indexOf(n,r);if(l===-1)return null;for(;l>=0;){const u=l+n.length;if(c(e.slice(r,l)),r=u,i>100)break;l=s.indexOf(n,r)}return i<100&&c(e.slice(r),!0),o},Mt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),Ot=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),tt=(e,t,s={})=>{const n={};return Z(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:r,terms:i,score:c}=o,l=r.includes("@"),u=r.includes("#"),[h,f]=r.split(/[#@]/),m=Number(h),g=i.sort((d,a)=>d.length-a.length).filter((d,a)=>i.slice(a+1).every(w=>!w.includes(d))),{contents:y}=n[m]??={title:"",contents:[]};if(l)y.push([{type:"customField",id:m,index:f,display:g.map(d=>o.c.map(a=>V(a,d))).flat().filter(d=>d!==null)},c]);else{const d=g.map(a=>V(o.h,a)).filter(a=>a!==null);if(d.length&&y.push([{type:u?"heading":"title",id:m,...u&&{anchor:f},display:d},c]),"t"in o&&o.t)for(const a of o.t){const w=g.map(p=>V(a,p)).filter(p=>p!==null);w.length&&y.push([{type:"text",id:m,...u&&{anchor:f},display:w},c])}}}),$(n).sort(([,o],[,r])=>"max"==="total"?Mt(o,r):Ot(o,r)).map(([o,{title:r,contents:i}])=>{if(!r){const c=it(t,o);c&&(r=c.h)}return{title:r,contents:i.map(([c])=>c)}})},et=(e,t,s={})=>{const n=zt(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:o})=>o);return e.includes(" ")?n:n.filter(o=>!o.includes(" "))},Ct=st($(JSON.parse("{\"/\":{\"documentCount\":46,\"nextId\":46,\"documentIds\":{\"0\":\"1\",\"1\":\"2\",\"2\":\"3\",\"3\":\"3#相关问题\",\"4\":\"3#数组\",\"5\":\"3#对象\",\"6\":\"3#原因\",\"7\":\"3#一些深入的探究\",\"8\":\"3#数组-1\",\"9\":\"3#对象-1\",\"10\":\"3#解决方案\",\"11\":\"3#数组-2\",\"12\":\"3#_1-内置api\",\"13\":\"3#_2-将数组重新赋值-修改引用地址\",\"14\":\"3#为数组新增一个字符串成员-c\",\"15\":\"3#修改数组的第一个值\",\"16\":\"3#_3-vue-set-方法\",\"17\":\"3#对象-2\",\"18\":\"3#_1-将对象重新赋值-修改引用地址\",\"19\":\"3#_2-vue-set-方法\",\"20\":\"4\",\"21\":\"4#文档概述\",\"22\":\"4#sent协议概述\",\"23\":\"4#概述\",\"24\":\"4#协议特点\",\"25\":\"4#sent协议物理层\",\"26\":\"4#原理图\",\"27\":\"4#信号电平\",\"28\":\"4#sent信号帧解析-数据链路层\",\"29\":\"4#概述-1\",\"30\":\"4#nibble解析\",\"31\":\"4#sent基本帧结构\",\"32\":\"4#一个例子\",\"33\":\"4#sent的tick时间定义与sync机制\",\"34\":\"4#status-com域\",\"35\":\"4#crc校验字段\",\"36\":\"4#pause暂停脉冲\",\"37\":\"4#sent多帧报文\",\"38\":\"4#概述-2\",\"39\":\"4#short-serial-message\",\"40\":\"4#enhanced-serial-message\",\"41\":\"4#status-com字段bit3组合的第8位为0\",\"42\":\"4#status-com字段bit3组合的第8位为1\",\"43\":\"5\",\"44\":\"6\",\"45\":\"7\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,2],\"1\":[1],\"2\":[1],\"3\":[1],\"4\":[1,29],\"5\":[1,23],\"6\":[1,5],\"7\":[1],\"8\":[1,43],\"9\":[1,16],\"10\":[1],\"11\":[1],\"12\":[2,12],\"13\":[3],\"14\":[3,9],\"15\":[1,18],\"16\":[4,19],\"17\":[1],\"18\":[3,8],\"19\":[4,17],\"20\":[1],\"21\":[1,3],\"22\":[1],\"23\":[1,13],\"24\":[1,19],\"25\":[1],\"26\":[1,2],\"27\":[1,9],\"28\":[1],\"29\":[1,16],\"30\":[1,21],\"31\":[1,31],\"32\":[1,52],\"33\":[1,19],\"34\":[1,8],\"35\":[1,23],\"36\":[1,9],\"37\":[1],\"38\":[1,16],\"39\":[1,19],\"40\":[1,13],\"41\":[1,9],\"42\":[1,37],\"43\":[1,3],\"44\":[1],\"45\":[1]},\"averageFieldLength\":[1.282608695652174,14.977381609552463],\"storedFields\":{\"0\":{\"h\":\"介绍页\",\"t\":[\"将你的个人介绍和档案放置在此处。\"]},\"1\":{\"h\":\"前端\"},\"2\":{\"h\":\"Vue2中关于数组与对象修改触发页面更新的机制与原理简析\"},\"3\":{\"h\":\"相关问题\"},\"4\":{\"h\":\"数组\",\"t\":[\"使用索引直接赋值与直接修改数组length时，不会触发页面更新。\",\"例如：\",\"<script> export default { name: \\\"HomeView\\\", data: () => ({ list1: [\\\"A\\\", \\\"B\\\"], }), methods: { btnClicked() { this.list1[0] = \\\"C\\\" this.list1[2] = \\\"C\\\" }, }, } </script>\",\"或是\",\"<script> export default { name: \\\"HomeView\\\", data: () => ({ list1: [{ text: \\\"123\\\" }, { text: \\\"456\\\" }], }), methods: { btnClicked() { this.list1[0] = { text: \\\"789\\\" } }, }, } </script>\",\"页面并不会触发更新。\"]},\"5\":{\"h\":\"对象\",\"t\":[\"页面初始化完成后，在方法中直接对data内声明对象当前不存在的属性进行赋值来为对象新增属性时，页面也不会响应渲染。\",\"例如：\",\"<script> export default { name: \\\"HomeView\\\", data: () => ({ obj1: { a: \\\"a\\\", b: \\\"b\\\" }, }), methods: { btnClicked() { this.obj1.c = \\\"c\\\" }, }, } </script>\",\"页面并不会触发更新。\"]},\"6\":{\"h\":\"原因\",\"t\":[\"Vue在初始化时会将data内所有的属性嵌套遍历并重写其Getter和Setter方法，借此实现响应式属性。\",\"然而对于在页面渲染完成后加入data的属性，Vue并不会将其变为响应式。\"]},\"7\":{\"h\":\"一些深入的探究\"},\"8\":{\"h\":\"数组\",\"t\":[\"Vue对于数组是仅将其对应下标的对象的属性变为响应式，而这个下标本身是无法成为响应式的。\",\"data: () => ({ list1: [{ text: \\\"123\\\" }, { text: \\\"456\\\" }], })\",\"使用如上的data声明。\",\"方法A：\",\"this.list1[0] = { text: \\\"789\\\" }\",\"方法B：\",\"this.list1[0].text = \\\"789\\\"\",\"方法B可以被正确响应而方法A不可以。\",\"方法A将数组下标为0的位置替换为了一个新的对象，而因为数组下标不是响应式的，因此没有触发页面刷新。\",\"同时，由于数组下标为0的位置替换为了一个新的对象，而这个新的对象并没有被配置为响应式，那对于这个对象属性的修改也不会触发页面更新。如下：\",\"this.list1[0] = { text: \\\"789\\\" } this.list1[0].text = \\\"456\\\"\",\"由于新的对象的属性并没有被配置为响应式，那么即使对这个对象的属性进行修改，页面也不会被更新。\",\"既然下标本身无法成为响应式，不妨尝试：\",\"<script> export default { name: \\\"HomeView\\\", data: () => ({ list1: [\\\"A\\\", \\\"B\\\"], }), methods: { btnClicked() { this.list1[0] = \\\"C\\\" }, }, } </script>\",\"通过下标修改数组的对应值也无法触发视图更新。\"]},\"9\":{\"h\":\"对象\",\"t\":[\"data: () => ({ obj1: { a: { text: \\\"a\\\" }, b: { text: \\\"b\\\" } }, }),\",\"使用如上的data声明。\",\"this.obj1.a = { text: \\\"c\\\" }\",\"成功触发视图更新。\",\"与数组下标不同，对象的属性在初始化是被定义为响应式的，因此直接对属性赋值对象是能够触发视图更新的。不像对数组的对应下标赋值而不会触发视图更新。\"]},\"10\":{\"h\":\"解决方案\"},\"11\":{\"h\":\"数组\"},\"12\":{\"h\":\"1. 内置API\",\"t\":[\"如果需要向数组加入新的成员，则可以直接使用数组的push方法。\",\"此外，下列数组方法也可以自动的触发视图刷新：\",\"push()\",\"pop()\",\"shift()\",\"unshift()\",\"splice()\",\"sort()\",\"reverse()\"]},\"13\":{\"h\":\"2. 将数组重新赋值，修改引用地址\"},\"14\":{\"h\":\"为数组新增一个字符串成员\\\"C\\\"\",\"t\":[\"this.list1 = this.list1.concat([\\\"C\\\"])\",\"由于list1是data的属性，list1的引用发生改变，就会触发视图更新。\"]},\"15\":{\"h\":\"修改数组的第一个值\",\"t\":[\"let tempList = this.list1.concat([]) // 深拷贝，等价于一个新数组，使用slice，JSON都可以。 tempList[0] = \\\"666\\\" this.list1 = tempList\",\"通过原数组新建一个新数组，修改新数组后再将新数组赋值给原数组，由于原数组作为data的属性，其引用被修改，触发视图更新。\"]},\"16\":{\"h\":\"3. Vue.$set() 方法\",\"t\":[\"使用Vue.$set可以为data对象添加一个新的响应式属性，且触发视图更新。\",\"定义：\",\"Vue.$set(对象或数组, 对象属性名或数组下标, 值)\",\"向list1对象的0索引位置赋值一个新的响应式对象，同时触发视图更新：\",\"Vue.$set(this.list1, 0, { text: \\\"789\\\" })\",\"如果在组件中应使用this.$set来代替：\",\"this.$set(this.list1, 0, { text: \\\"789\\\" })\"]},\"17\":{\"h\":\"对象\"},\"18\":{\"h\":\"1. 将对象重新赋值，修改引用地址\",\"t\":[\"思路与数组的类同。\",\"使用JSON、手写递归、lodash深拷贝均可，但如果对象内含方法，则不能使用JSON来完成深拷贝。\",\"深拷贝完成后修改对应属性后赋值给原对象即可。\"]},\"19\":{\"h\":\"2. Vue.$set() 方法\",\"t\":[\"对象同样可以使用$set() 方法修改。\",\"定义：\",\"Vue.$set(对象或数组, 对象属性名或数组下标, 值)\",\"将obj1对象的a属性赋值为字符串\\\"b\\\"并触发视图更新：\",\"Vue.$set(this.obj1, a, \\\"b\\\")\",\"如果在组件内，则应使用：\",\"this.$set(this.obj1, a, \\\"b\\\")\"]},\"20\":{\"h\":\"SENT协议指导手册\"},\"21\":{\"h\":\"文档概述\",\"t\":[\"本文为SENT协议的相关协议信息的收集整理汇总，意图让读者通过本文能够较为详尽的了解SENT协议并进行相关的开发与测试。\"]},\"22\":{\"h\":\"SENT协议概述\"},\"23\":{\"h\":\"概述\",\"t\":[\"SENT 全称Single Edge Nibble Transmission，中文名称为“单边半字传输协议”，是SAE推出的一种点对点的、单向传输的方案，被用于车载传感器和电子控制单元（ECU）之间的数据传输。\"]},\"24\":{\"h\":\"协议特点\",\"t\":[\"单线传输\",\"电平信号\",\"数据单向从传感器到ECU\",\"数据包为“帧”，每帧由多个半字节数据组成，称为“Nibble”。\",\"数据的传输可以分为快速通道和慢速通道，重要的信号用快速通道以实现高频率的更新，比如压力等，对于非关键的信号，如诊断等可以放在慢速通道传输；快速通道是每一帧传输一个完整的信号，慢速通道需要使用多帧传输一个完整的信号，即更新频率不同[1]；\",\"发送数据的时间由传感器的时钟决定；\"]},\"25\":{\"h\":\"\"},\"26\":{\"h\":\"原理图\",\"t\":[\"SENT传感器与ECU的基本线路连接如下图。\"]},\"27\":{\"h\":\"信号电平\",\"t\":[\"如图所示，0-0.5V为逻辑电平0，4.1-5V为逻辑电平1[2]。信号使用单总线传输。\"]},\"28\":{\"h\":\"\"},\"29\":{\"h\":\"概述\",\"t\":[\"SENT信号通过两个下降沿周期之间的一系列脉冲序列来传输，SENT报文以一个同步脉冲开始，该脉冲与后续的下降沿之间的时间间隔等效于56个时钟节拍；同步脉冲之后，状态/通信半字节按照SENT格式传送；随后紧接着就是6个含有传感器数据的Data Nibbles，数据通过4个数据位为一个单元来传输，或称“半字节”（一个半字节即一个Nibble）；在每条报文的尾部会提供一个检验脉冲并插入一个固定长度不超过1ms的暂停脉冲，因此SENT报文的长度会随着半字节的值而有不同[3]。\"]},\"30\":{\"h\":\"\",\"t\":[\"SENT协议的数据使用半个字节Nibble，即4bit来进行编码定义的，单个半字节Nibble是通过2个下降沿之间的时间差来定义的。如下是一个Nibble的电压逻辑信号。 时间精度以1个节拍Tick来定义（一般1个Tick的时间是3~10us），每一个Nibble从一个下降沿开始，并且之后在逻辑0状态至少维持4Ticks，之后下一个下降沿距离第一个下降沿的时间差作为Nibble值的编码依据。需要注意的是，后一个下降沿距离第一个下降沿至少相隔12Ticks，至多27Ticks，且相隔Tick数减去12即为最终的Nibble值，如此Nibble值最小为0，最大为15（27Tick-12Tick），二进制表示时即为4bit[2:1]。\"]},\"31\":{\"h\":\"\",\"t\":[\" 基本组成[2:2]：\",\"组成部分\",\"名称\",\"解释\",\"Sync\",\"标定/同步脉冲\",\"固定的56Ticks，不是按照标准的SENT数据格式发送，该脉冲与后续的下降沿之间的时间间隔等效于56个时钟节拍。\",\"Status/Com\",\"状态及通讯字段\",\"12-27Ticks，即1个Nibble（4bit）\",\"Data\",\"数据段\",\"12-162Ticks，即1-6个Nibble\",\"Pause\",\"暂停脉冲\",\"12-768Ticks，早期的SENT协议无此字段或者一个固定长度Ticks，SENT2010之后，部分通过此功能可以动态调节TICKS的个数，实现整个SENT协议是同一个固定长度TICKS\"]},\"32\":{\"h\":\"\",\"t\":[\"举个例子，将SENT协议通信抽象为用手电筒传递信息，则通信过程如下。 首先约定：A每次点亮手电筒时，B按下秒表计时，A将信息藏于时间。B根据“密码本”对照看每次点灯时间长度来查找对应字母。于是，A不停的亮灯，灭灯，亮灯灭灯。B根据A亮灭灯来掐表，对照密码本看是什么字母。由于AB手里的秒表时基不同，彼此时间并不同步。为了解决这个问题，AB又约定：A每次发送信息，都会持续点亮56秒，然后A再发送数据。这56秒是给B对表用的。 于是，B接收到A的56秒数据时，都会同步自己的秒表，这样就能确保A的时间刻度和B时间刻度保持一致，查密码本时就不会出错。 但手电筒传递过程中，偶尔出现恶劣情况或有飞沙掠影，B可能看到A的灯光“虚闪”，这样的话，B掐表就会出现紊乱。 为了解决这个问题，AB约定：A每次发送完信息后，再发送一个验证码，验证码是由前面的信息反算得来。即A每次发送的信息都会有一套加密算法得到一组验证码，A再将验证码发送出去。B接收到信息后，也会接收到验证码，同时B根据相同算法将接收的数据转换得到一组验证码，将计算得到的验证码和接收到的验证码比较，一致说明信息正确，不同则丢弃数据。 简单总结就是：对表、计时和验证，这也就是SENT协议传输的全过程[4]。\"]},\"33\":{\"h\":\"\",\"t\":[\"如上文所示，SENT的Tick长度可以在3~10us之间。那如何确定Tick长度呢？如果一个帧内的Tick长度不同，显然会导致解析错误。因此，SENT协议在帧头部设置了Sync同步域，Sync包含1个下降沿，该下降沿到下一个下降沿（Status/Com）的间隔时间为56个Ticks的时间，以此对Tick时长进行标定[5]。 假设一个Tick长度为5us，则Sync域的长度将为280us，也就是Sync的下降沿到Status/Com的下降沿之间的时间间隔为280us。\"]},\"34\":{\"h\":\"\",\"t\":[\"Status/Com域仅包含一个Nibble，长度为4bit。该域的数据主要用于单个报文中多帧的组合控制，具体的定义与使用使用详见章节“SENT多帧报文（类同网络层）”。\"]},\"35\":{\"h\":\"CRC校验字段\",\"t\":[\"该字段用于对数据进行CRC校验，长度为12~27Ticks，即一个Nibble。 CRC种子为5，生成多项式为[6]：\",\"CRC表为：{0, 13, 7, 10, 14, 3, 9, 4, 1, 12, 6, 11, 15, 2, 8, 5}\"]},\"36\":{\"h\":\"\",\"t\":[\"暂停脉冲为可选项，长度为12~768Ticks。早期的SENT协议无此字段或者一个固定长度Ticks，SENT2010之后，部分通过此功能可以动态调节TICKS的个数，实现整个SENT协议是同一个固定长度TICKS[2:3]。\"]},\"37\":{\"h\":\"\"},\"38\":{\"h\":\"概述\",\"t\":[\"SENT协议的高级功能是将多帧报文组合以实现更高复杂的通信功能，一般用于传输传感器的附加信号，比如温度，故障码和传感器类型信息等。SENT协议提供“Short Serial Message”（短消息）与“Enhanced Serial Message”（增强型消息）2种多帧组合报文功能[2:4]。\"]},\"39\":{\"h\":\"\",\"t\":[\" 当Status/Com字段的bit3值为1，其之后的15帧SENT报文的Status/Com字段的bit3值都为0时，即为此种情况，此情况下是16帧SENT报文组合来传输附加信息。 Status/Com字段的bit3值用来辨别以何种形式组合，而这16帧SENT报文的Status/Com字段的bit2值组合起来的16bit的值即为组合传输的信息，其由4-bit的Message ID，8-bit的Data和4-bit的CRC组成[2:5]。\"]},\"40\":{\"h\":\"\",\"t\":[\" 与上一种情况不同的是，此情况下使用18帧SENT报文组合来传输附加信息，起始标志是Status/Com字段bit3连续为1111110，并且要求Status/Com字段bit3组合的第13和第18位都为0。 而数据域依然由18帧SENT报文的Status/Com字段的bit2值组合而成，但其数据组成又根据Status/Com字段bit3组合的第8位的不同分为2种情况[2:6]。\"]},\"41\":{\"h\":\"\",\"t\":[\"Status/Com字段bit3组合的9~12bit和14~17bit分别作为8bit ID的高4位和低4位数据，而Status/Com字段bit2组合的1~6bit是6bit的CRC数据，之后的7~18bit则为要传输的12bit的数据[2:7]。\"]},\"42\":{\"h\":\"\",\"t\":[\"Status/Com字段bit3组合的9~12bit为4bit ID，而Status/Com字段bit2组合的1~6bit是6bit的CRC数据，之后的7~18bit和bit3组合的14~17bit则组合为要传输的16bit的数据[2:8]。\",\"AUTOSAR MCAL系列之SENT信号传输 - 知乎 (zhihu.com)↩︎\",\"SENT协议_canoe搭建sent传感器工程-CSDN博客↩︎↩︎↩︎↩︎↩︎↩︎↩︎↩︎↩︎\",\"SENT信号介绍 - 知乎 (zhihu.com)↩︎\",\"汽车通信总线（五）——SENT总线介绍 - 汽车电子技术 - AutoEE.cn↩︎\",\"有没有大神懂 SENT通信协议解析的，用来做调试和上位机测试？ - 测控道的回答 - 知乎↩︎\",\"communication - SENT CRC calculation - Electrical Engineering Stack Exchange↩︎\"]},\"43\":{\"h\":\"\",\"t\":[\"404 Not Found\"]},\"44\":{\"h\":\"Posts\"},\"45\":{\"h\":\"Hardware\"}},\"dirtCount\":0,\"index\":[[\"hardware\",{\"0\":{\"45\":1}}],[\"homeview\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"found\",{\"1\":{\"43\":1}}],[\"测控道的回答\",{\"1\":{\"42\":1}}],[\"用来做调试和上位机测试\",{\"1\":{\"42\":1}}],[\"有没有大神懂\",{\"1\":{\"42\":1}}],[\"汽车电子技术\",{\"1\":{\"42\":1}}],[\"汽车通信总线\",{\"1\":{\"42\":1}}],[\"五\",{\"1\":{\"42\":1}}],[\"↩︎\",{\"1\":{\"42\":2}}],[\"zhihu\",{\"1\":{\"42\":2}}],[\"知乎↩︎\",{\"1\":{\"42\":1}}],[\"知乎\",{\"1\":{\"42\":2}}],[\"mcal系列之sent信号传输\",{\"1\":{\"42\":1}}],[\"message\",{\"1\":{\"38\":2}}],[\"methods\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"起始标志是status\",{\"1\":{\"40\":1}}],[\"id的高4位和低4位数据\",{\"1\":{\"41\":1}}],[\"id\",{\"1\":{\"39\":1,\"42\":1}}],[\"此情况下使用18帧sent报文组合来传输附加信息\",{\"1\":{\"40\":1}}],[\"此情况下是16帧sent报文组合来传输附加信息\",{\"1\":{\"39\":1}}],[\"此外\",{\"1\":{\"12\":1}}],[\"其由4\",{\"1\":{\"39\":1}}],[\"其之后的15帧sent报文的status\",{\"1\":{\"39\":1}}],[\"其引用被修改\",{\"1\":{\"15\":1}}],[\"当status\",{\"1\":{\"39\":1}}],[\"增强型消息\",{\"1\":{\"38\":1}}],[\"与上一种情况不同的是\",{\"1\":{\"40\":1}}],[\"与\",{\"1\":{\"38\":1}}],[\"与数组下标不同\",{\"1\":{\"9\":1}}],[\"短消息\",{\"1\":{\"38\":1}}],[\"故障码和传感器类型信息等\",{\"1\":{\"38\":1}}],[\"比如温度\",{\"1\":{\"38\":1}}],[\"比如压力等\",{\"1\":{\"24\":1}}],[\"8\",{\"1\":{\"35\":1,\"39\":1,\"42\":1}}],[\"9\",{\"1\":{\"35\":1}}],[\"生成多项式为\",{\"1\":{\"35\":1}}],[\"长度为12~768ticks\",{\"1\":{\"36\":1}}],[\"长度为12~27ticks\",{\"1\":{\"35\":1}}],[\"长度为4bit\",{\"1\":{\"34\":1}}],[\"类同网络层\",{\"1\":{\"34\":1}}],[\"具体的定义与使用使用详见章节\",{\"1\":{\"34\":1}}],[\"也就是sync的下降沿到status\",{\"1\":{\"33\":1}}],[\"也会接收到验证码\",{\"1\":{\"32\":1}}],[\"假设一个tick长度为5us\",{\"1\":{\"33\":1}}],[\"5\",{\"1\":{\"33\":1,\"35\":1,\"39\":1}}],[\"5v为逻辑电平1\",{\"1\":{\"27\":1}}],[\"5v为逻辑电平0\",{\"1\":{\"27\":1}}],[\"以此对tick时长进行标定\",{\"1\":{\"33\":1}}],[\"的间隔时间为56个ticks的时间\",{\"1\":{\"33\":1}}],[\"该字段用于对数据进行crc校验\",{\"1\":{\"35\":1}}],[\"该域的数据主要用于单个报文中多帧的组合控制\",{\"1\":{\"34\":1}}],[\"该下降沿到下一个下降沿\",{\"1\":{\"33\":1}}],[\"该脉冲与后续的下降沿之间的时间间隔等效于56个时钟节拍\",{\"1\":{\"29\":1,\"31\":1}}],[\"显然会导致解析错误\",{\"1\":{\"33\":1}}],[\"计时和验证\",{\"1\":{\"32\":1}}],[\"简单总结就是\",{\"1\":{\"32\":1}}],[\"验证码是由前面的信息反算得来\",{\"1\":{\"32\":1}}],[\"再发送一个验证码\",{\"1\":{\"32\":1}}],[\"虚闪\",{\"1\":{\"32\":1}}],[\"偶尔出现恶劣情况或有飞沙掠影\",{\"1\":{\"32\":1}}],[\"但其数据组成又根据status\",{\"1\":{\"40\":1}}],[\"但手电筒传递过程中\",{\"1\":{\"32\":1}}],[\"但如果对象内含方法\",{\"1\":{\"18\":1}}],[\"查密码本时就不会出错\",{\"1\":{\"32\":1}}],[\"这也就是sent协议传输的全过程\",{\"1\":{\"32\":1}}],[\"这样的话\",{\"1\":{\"32\":1}}],[\"这样就能确保a的时间刻度和b时间刻度保持一致\",{\"1\":{\"32\":1}}],[\"这56秒是给b对表用的\",{\"1\":{\"32\":1}}],[\"都会同步自己的秒表\",{\"1\":{\"32\":1}}],[\"都会持续点亮56秒\",{\"1\":{\"32\":1}}],[\"然后a再发送数据\",{\"1\":{\"32\":1}}],[\"然而对于在页面渲染完成后加入data的属性\",{\"1\":{\"6\":1}}],[\"为了解决这个问题\",{\"1\":{\"32\":2}}],[\"为数组新增一个字符串成员\",{\"0\":{\"14\":1}}],[\"彼此时间并不同步\",{\"1\":{\"32\":1}}],[\"亮灯灭灯\",{\"1\":{\"32\":1}}],[\"灭灯\",{\"1\":{\"32\":1}}],[\"于是\",{\"1\":{\"32\":2}}],[\"密码本\",{\"1\":{\"32\":1}}],[\"首先约定\",{\"1\":{\"32\":1}}],[\"举个例子\",{\"1\":{\"32\":1}}],[\"实现整个sent协议是同一个固定长度ticks\",{\"1\":{\"31\":1,\"36\":1}}],[\"部分通过此功能可以动态调节ticks的个数\",{\"1\":{\"31\":1,\"36\":1}}],[\"早期的sent协议无此字段或者一个固定长度ticks\",{\"1\":{\"31\":1,\"36\":1}}],[\"7\",{\"1\":{\"35\":1,\"41\":1}}],[\"768ticks\",{\"1\":{\"31\":1}}],[\"789\",{\"1\":{\"4\":1,\"8\":3,\"16\":2}}],[\"暂停脉冲为可选项\",{\"1\":{\"36\":1}}],[\"暂停脉冲\",{\"1\":{\"31\":1}}],[\"6\",{\"1\":{\"35\":2,\"40\":1}}],[\"6个nibble\",{\"1\":{\"31\":1}}],[\"666\",{\"1\":{\"15\":1}}],[\"固定的56ticks\",{\"1\":{\"31\":1}}],[\"标定\",{\"1\":{\"31\":1}}],[\"解释\",{\"1\":{\"31\":1}}],[\"解决方案\",{\"0\":{\"10\":1}}],[\"名称\",{\"1\":{\"31\":1}}],[\"组成部分\",{\"1\":{\"31\":1}}],[\"基本组成\",{\"1\":{\"31\":1}}],[\"二进制表示时即为4bit\",{\"1\":{\"30\":1}}],[\"最大为15\",{\"1\":{\"30\":1}}],[\"且相隔tick数减去12即为最终的nibble值\",{\"1\":{\"30\":1}}],[\"且触发视图更新\",{\"1\":{\"16\":1}}],[\"至多27ticks\",{\"1\":{\"30\":1}}],[\"后一个下降沿距离第一个下降沿至少相隔12ticks\",{\"1\":{\"30\":1}}],[\"需要注意的是\",{\"1\":{\"30\":1}}],[\"之后的7~18bit和bit3组合的14~17bit则组合为要传输的16bit的数据\",{\"1\":{\"42\":1}}],[\"之后的7~18bit则为要传输的12bit的数据\",{\"1\":{\"41\":1}}],[\"之后下一个下降沿距离第一个下降沿的时间差作为nibble值的编码依据\",{\"1\":{\"30\":1}}],[\"之间的数据传输\",{\"1\":{\"23\":1}}],[\"并且要求status\",{\"1\":{\"40\":1}}],[\"并且之后在逻辑0状态至少维持4ticks\",{\"1\":{\"30\":1}}],[\"并触发视图更新\",{\"1\":{\"19\":1}}],[\"每一个nibble从一个下降沿开始\",{\"1\":{\"30\":1}}],[\"每帧由多个半字节数据组成\",{\"1\":{\"24\":1}}],[\"时间精度以1个节拍tick来定义\",{\"1\":{\"30\":1}}],[\"即为此种情况\",{\"1\":{\"39\":1}}],[\"即一个nibble\",{\"1\":{\"35\":1}}],[\"即a每次发送的信息都会有一套加密算法得到一组验证码\",{\"1\":{\"32\":1}}],[\"即1\",{\"1\":{\"31\":1}}],[\"即1个nibble\",{\"1\":{\"31\":1}}],[\"即4bit来进行编码定义的\",{\"1\":{\"30\":1}}],[\"即更新频率不同\",{\"1\":{\"24\":1}}],[\"在每条报文的尾部会提供一个检验脉冲并插入一个固定长度不超过1ms的暂停脉冲\",{\"1\":{\"29\":1}}],[\"在方法中直接对data内声明对象当前不存在的属性进行赋值来为对象新增属性时\",{\"1\":{\"5\":1}}],[\"一般用于传输传感器的附加信号\",{\"1\":{\"38\":1}}],[\"一般1个tick的时间是3~10us\",{\"1\":{\"30\":1}}],[\"一致说明信息正确\",{\"1\":{\"32\":1}}],[\"一个半字节即一个nibble\",{\"1\":{\"29\":1}}],[\"一些深入的探究\",{\"0\":{\"7\":1}}],[\"半字节\",{\"1\":{\"29\":1}}],[\"或称\",{\"1\":{\"29\":1}}],[\"或是\",{\"1\":{\"4\":1}}],[\"随后紧接着就是6个含有传感器数据的data\",{\"1\":{\"29\":1}}],[\"通信半字节按照sent格式传送\",{\"1\":{\"29\":1}}],[\"通过原数组新建一个新数组\",{\"1\":{\"15\":1}}],[\"通过下标修改数组的对应值也无法触发视图更新\",{\"1\":{\"8\":1}}],[\"状态及通讯字段\",{\"1\":{\"31\":1}}],[\"状态\",{\"1\":{\"29\":1}}],[\"同步脉冲\",{\"1\":{\"31\":1}}],[\"同步脉冲之后\",{\"1\":{\"29\":1}}],[\"同时b根据相同算法将接收的数据转换得到一组验证码\",{\"1\":{\"32\":1}}],[\"同时触发视图更新\",{\"1\":{\"16\":1}}],[\"同时\",{\"1\":{\"8\":1}}],[\"信号使用单总线传输\",{\"1\":{\"27\":1}}],[\"信号电平\",{\"0\":{\"27\":1}}],[\"404\",{\"1\":{\"43\":1}}],[\"4bit\",{\"1\":{\"31\":1}}],[\"4\",{\"1\":{\"27\":1,\"32\":1,\"35\":1,\"38\":1}}],[\"456\",{\"1\":{\"4\":1,\"8\":2}}],[\"原理图\",{\"0\":{\"26\":1}}],[\"原因\",{\"0\":{\"6\":1}}],[\"发送数据的时间由传感器的时钟决定\",{\"1\":{\"24\":1}}],[\"慢速通道需要使用多帧传输一个完整的信号\",{\"1\":{\"24\":1}}],[\"快速通道是每一帧传输一个完整的信号\",{\"1\":{\"24\":1}}],[\"对表\",{\"1\":{\"32\":1}}],[\"对照密码本看是什么字母\",{\"1\":{\"32\":1}}],[\"对照看每次点灯时间长度来查找对应字母\",{\"1\":{\"32\":1}}],[\"对于非关键的信号\",{\"1\":{\"24\":1}}],[\"对象同样可以使用$set\",{\"1\":{\"19\":1}}],[\"对象属性名或数组下标\",{\"1\":{\"16\":1,\"19\":1}}],[\"对象或数组\",{\"1\":{\"16\":1,\"19\":1}}],[\"对象的属性在初始化是被定义为响应式的\",{\"1\":{\"9\":1}}],[\"对象\",{\"0\":{\"5\":1,\"9\":1,\"17\":1}}],[\"重要的信号用快速通道以实现高频率的更新\",{\"1\":{\"24\":1}}],[\"称为\",{\"1\":{\"24\":1}}],[\"帧\",{\"1\":{\"24\":1}}],[\"数据段\",{\"1\":{\"31\":1}}],[\"数据通过4个数据位为一个单元来传输\",{\"1\":{\"29\":1}}],[\"数据的传输可以分为快速通道和慢速通道\",{\"1\":{\"24\":1}}],[\"数据包为\",{\"1\":{\"24\":1}}],[\"数据单向从传感器到ecu\",{\"1\":{\"24\":1}}],[\"数组\",{\"0\":{\"4\":1,\"8\":1,\"11\":1}}],[\"电平信号\",{\"1\":{\"24\":1}}],[\"协议特点\",{\"0\":{\"24\":1}}],[\"被用于车载传感器和电子控制单元\",{\"1\":{\"23\":1}}],[\"单个半字节nibble是通过2个下降沿之间的时间差来定义的\",{\"1\":{\"30\":1}}],[\"单线传输\",{\"1\":{\"24\":1}}],[\"单向传输的方案\",{\"1\":{\"23\":1}}],[\"单边半字传输协议\",{\"1\":{\"23\":1}}],[\"是sae推出的一种点对点的\",{\"1\":{\"23\":1}}],[\"中文名称为\",{\"1\":{\"23\":1}}],[\"not\",{\"1\":{\"43\":1}}],[\"nibbles\",{\"1\":{\"29\":1}}],[\"nibble\",{\"1\":{\"23\":1,\"24\":1}}],[\"name\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"exchange↩︎\",{\"1\":{\"42\":1}}],[\"export\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"engineering\",{\"1\":{\"42\":1}}],[\"enhanced\",{\"1\":{\"38\":1}}],[\"electrical\",{\"1\":{\"42\":1}}],[\"ecu\",{\"1\":{\"23\":1}}],[\"edge\",{\"1\":{\"23\":1}}],[\"全称single\",{\"1\":{\"23\":1}}],[\"概述\",{\"0\":{\"23\":1,\"29\":1,\"38\":1}}],[\"意图让读者通过本文能够较为详尽的了解sent协议并进行相关的开发与测试\",{\"1\":{\"21\":1}}],[\"本文为sent协议的相关协议信息的收集整理汇总\",{\"1\":{\"21\":1}}],[\"文档概述\",{\"0\":{\"21\":1}}],[\"则sync域的长度将为280us\",{\"1\":{\"33\":1}}],[\"则通信过程如下\",{\"1\":{\"32\":1}}],[\"则应使用\",{\"1\":{\"19\":1}}],[\"则不能使用json来完成深拷贝\",{\"1\":{\"18\":1}}],[\"则可以直接使用数组的push方法\",{\"1\":{\"12\":1}}],[\"手写递归\",{\"1\":{\"18\":1}}],[\"思路与数组的类同\",{\"1\":{\"18\":1}}],[\"向list1对象的0索引位置赋值一个新的响应式对象\",{\"1\":{\"16\":1}}],[\"值\",{\"1\":{\"16\":1,\"19\":1}}],[\"定义\",{\"1\":{\"16\":1,\"19\":1}}],[\"$set来代替\",{\"1\":{\"16\":1}}],[\"$set可以为data对象添加一个新的响应式属性\",{\"1\":{\"16\":1}}],[\"$set\",{\"0\":{\"16\":1,\"19\":1},\"1\":{\"16\":3,\"19\":3}}],[\"3\",{\"0\":{\"16\":1},\"1\":{\"29\":1,\"35\":1,\"36\":1}}],[\"触发视图更新\",{\"1\":{\"15\":1}}],[\"json都可以\",{\"1\":{\"15\":1}}],[\"等价于一个新数组\",{\"1\":{\"15\":1}}],[\"深拷贝完成后修改对应属性后赋值给原对象即可\",{\"1\":{\"18\":1}}],[\"深拷贝\",{\"1\":{\"15\":1}}],[\"lodash深拷贝均可\",{\"1\":{\"18\":1}}],[\"let\",{\"1\":{\"15\":1}}],[\"list1的引用发生改变\",{\"1\":{\"14\":1}}],[\"list1\",{\"1\":{\"4\":5,\"8\":7,\"14\":2,\"15\":2,\"16\":2}}],[\"修改新数组后再将新数组赋值给原数组\",{\"1\":{\"15\":1}}],[\"修改数组的第一个值\",{\"0\":{\"15\":1}}],[\"修改引用地址\",{\"0\":{\"13\":1,\"18\":1}}],[\"就会触发视图更新\",{\"1\":{\"14\":1}}],[\"将计算得到的验证码和接收到的验证码比较\",{\"1\":{\"32\":1}}],[\"将sent协议通信抽象为用手电筒传递信息\",{\"1\":{\"32\":1}}],[\"将obj1对象的a属性赋值为字符串\",{\"1\":{\"19\":1}}],[\"将对象重新赋值\",{\"0\":{\"18\":1}}],[\"将数组重新赋值\",{\"0\":{\"13\":1}}],[\"将你的个人介绍和档案放置在此处\",{\"1\":{\"0\":1}}],[\"reverse\",{\"1\":{\"12\":1}}],[\"unshift\",{\"1\":{\"12\":1}}],[\"stack\",{\"1\":{\"42\":1}}],[\"status\",{\"1\":{\"31\":1,\"33\":1,\"34\":1,\"39\":1,\"41\":1,\"42\":1}}],[\"serial\",{\"1\":{\"38\":2}}],[\"sent通信协议解析的\",{\"1\":{\"42\":1}}],[\"sent总线介绍\",{\"1\":{\"42\":1}}],[\"sent信号介绍\",{\"1\":{\"42\":1}}],[\"sent信号通过两个下降沿周期之间的一系列脉冲序列来传输\",{\"1\":{\"29\":1}}],[\"sent多帧报文\",{\"1\":{\"34\":1}}],[\"sent的tick长度可以在3~10us之间\",{\"1\":{\"33\":1}}],[\"sent2010之后\",{\"1\":{\"31\":1,\"36\":1}}],[\"sent报文以一个同步脉冲开始\",{\"1\":{\"29\":1}}],[\"sent传感器与ecu的基本线路连接如下图\",{\"1\":{\"26\":1}}],[\"sent\",{\"1\":{\"23\":1,\"42\":1}}],[\"sent协议\",{\"1\":{\"42\":1}}],[\"sent协议提供\",{\"1\":{\"38\":1}}],[\"sent协议的高级功能是将多帧报文组合以实现更高复杂的通信功能\",{\"1\":{\"38\":1}}],[\"sent协议的数据使用半个字节nibble\",{\"1\":{\"30\":1}}],[\"sent协议在帧头部设置了sync同步域\",{\"1\":{\"33\":1}}],[\"sent协议概述\",{\"0\":{\"22\":1}}],[\"sent协议指导手册\",{\"0\":{\"20\":1}}],[\"short\",{\"1\":{\"38\":1}}],[\"shift\",{\"1\":{\"12\":1}}],[\"sync包含1个下降沿\",{\"1\":{\"33\":1}}],[\"sync\",{\"1\":{\"31\":1}}],[\"sort\",{\"1\":{\"12\":1}}],[\"splice\",{\"1\":{\"12\":1}}],[\"script>\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"posts\",{\"0\":{\"44\":1}}],[\"pop\",{\"1\":{\"12\":1}}],[\"pause\",{\"1\":{\"31\":1}}],[\"push\",{\"1\":{\"12\":1}}],[\"下列数组方法也可以自动的触发视图刷新\",{\"1\":{\"12\":1}}],[\"如上文所示\",{\"1\":{\"33\":1}}],[\"如此nibble值最小为0\",{\"1\":{\"30\":1}}],[\"如图所示\",{\"1\":{\"27\":1}}],[\"如诊断等可以放在慢速通道传输\",{\"1\":{\"24\":1}}],[\"如果一个帧内的tick长度不同\",{\"1\":{\"33\":1}}],[\"如果在组件内\",{\"1\":{\"19\":1}}],[\"如果在组件中应使用this\",{\"1\":{\"16\":1}}],[\"如果需要向数组加入新的成员\",{\"1\":{\"12\":1}}],[\"如下是一个nibble的电压逻辑信号\",{\"1\":{\"30\":1}}],[\"如下\",{\"1\":{\"8\":1}}],[\"内置api\",{\"0\":{\"12\":1}}],[\"15\",{\"1\":{\"35\":1}}],[\"11\",{\"1\":{\"35\":1}}],[\"14\",{\"1\":{\"35\":1}}],[\"10\",{\"1\":{\"35\":1}}],[\"13\",{\"1\":{\"35\":1}}],[\"162ticks\",{\"1\":{\"31\":1}}],[\"12\",{\"1\":{\"31\":3,\"35\":1}}],[\"12tick\",{\"1\":{\"30\":1}}],[\"123\",{\"1\":{\"4\":1,\"8\":1}}],[\"1\",{\"0\":{\"12\":1,\"18\":1},\"1\":{\"24\":1,\"27\":1,\"30\":1,\"35\":1}}],[\"因此\",{\"1\":{\"33\":1}}],[\"因此sent报文的长度会随着半字节的值而有不同\",{\"1\":{\"29\":1}}],[\"因此直接对属性赋值对象是能够触发视图更新的\",{\"1\":{\"9\":1}}],[\"因此没有触发页面刷新\",{\"1\":{\"8\":1}}],[\"成功触发视图更新\",{\"1\":{\"9\":1}}],[\"不同则丢弃数据\",{\"1\":{\"32\":1}}],[\"不是按照标准的sent数据格式发送\",{\"1\":{\"31\":1}}],[\"不像对数组的对应下标赋值而不会触发视图更新\",{\"1\":{\"9\":1}}],[\"不妨尝试\",{\"1\":{\"8\":1}}],[\"不会触发页面更新\",{\"1\":{\"4\":1}}],[\"既然下标本身无法成为响应式\",{\"1\":{\"8\":1}}],[\"那如何确定tick长度呢\",{\"1\":{\"33\":1}}],[\"那么即使对这个对象的属性进行修改\",{\"1\":{\"8\":1}}],[\"那对于这个对象属性的修改也不会触发页面更新\",{\"1\":{\"8\":1}}],[\"由于ab手里的秒表时基不同\",{\"1\":{\"32\":1}}],[\"由于原数组作为data的属性\",{\"1\":{\"15\":1}}],[\"由于list1是data的属性\",{\"1\":{\"14\":1}}],[\"由于新的对象的属性并没有被配置为响应式\",{\"1\":{\"8\":1}}],[\"由于数组下标为0的位置替换为了一个新的对象\",{\"1\":{\"8\":1}}],[\"而status\",{\"1\":{\"41\":1,\"42\":1}}],[\"而数据域依然由18帧sent报文的status\",{\"1\":{\"40\":1}}],[\"而这16帧sent报文的status\",{\"1\":{\"39\":1}}],[\"而这个新的对象并没有被配置为响应式\",{\"1\":{\"8\":1}}],[\"而这个下标本身是无法成为响应式的\",{\"1\":{\"8\":1}}],[\"而因为数组下标不是响应式的\",{\"1\":{\"8\":1}}],[\"方法修改\",{\"1\":{\"19\":1}}],[\"方法\",{\"0\":{\"16\":1,\"19\":1}}],[\"方法b可以被正确响应而方法a不可以\",{\"1\":{\"8\":1}}],[\"方法b\",{\"1\":{\"8\":1}}],[\"方法a将数组下标为0的位置替换为了一个新的对象\",{\"1\":{\"8\":1}}],[\"方法a\",{\"1\":{\"8\":1}}],[\"使用json\",{\"1\":{\"18\":1}}],[\"使用vue\",{\"1\":{\"16\":1}}],[\"使用slice\",{\"1\":{\"15\":1}}],[\"使用如上的data声明\",{\"1\":{\"8\":1,\"9\":1}}],[\"使用索引直接赋值与直接修改数组length时\",{\"1\":{\"4\":1}}],[\"借此实现响应式属性\",{\"1\":{\"6\":1}}],[\"vue\",{\"0\":{\"16\":1,\"19\":1},\"1\":{\"16\":2,\"19\":2}}],[\"vue对于数组是仅将其对应下标的对象的属性变为响应式\",{\"1\":{\"8\":1}}],[\"vue并不会将其变为响应式\",{\"1\":{\"6\":1}}],[\"vue在初始化时会将data内所有的属性嵌套遍历并重写其getter和setter方法\",{\"1\":{\"6\":1}}],[\"vue2中关于数组与对象修改触发页面更新的机制与原理简析\",{\"0\":{\"2\":1}}],[\"obj1\",{\"1\":{\"5\":2,\"9\":2,\"19\":2}}],[\"页面也不会被更新\",{\"1\":{\"8\":1}}],[\"页面也不会响应渲染\",{\"1\":{\"5\":1}}],[\"页面初始化完成后\",{\"1\":{\"5\":1}}],[\"页面并不会触发更新\",{\"1\":{\"4\":1,\"5\":1}}],[\"transmission\",{\"1\":{\"23\":1}}],[\"templist\",{\"1\":{\"15\":3}}],[\"text\",{\"1\":{\"4\":3,\"8\":6,\"9\":3,\"16\":2}}],[\"this\",{\"1\":{\"4\":3,\"5\":1,\"8\":5,\"9\":1,\"14\":2,\"15\":2,\"16\":3,\"19\":3}}],[\"<\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"<script>\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"2种多帧组合报文功能\",{\"1\":{\"38\":1}}],[\"27ticks\",{\"1\":{\"31\":1}}],[\"27tick\",{\"1\":{\"30\":1}}],[\"2\",{\"0\":{\"13\":1,\"19\":1},\"1\":{\"4\":1,\"27\":1,\"30\":1,\"31\":2,\"35\":1,\"36\":1,\"38\":1,\"39\":1,\"40\":1,\"41\":1,\"42\":1}}],[\"calculation\",{\"1\":{\"42\":1}}],[\"canoe搭建sent传感器工程\",{\"1\":{\"42\":1}}],[\"cn↩︎\",{\"1\":{\"42\":1}}],[\"csdn博客↩︎↩︎↩︎↩︎↩︎↩︎↩︎↩︎↩︎\",{\"1\":{\"42\":1}}],[\"crc\",{\"1\":{\"42\":1}}],[\"crc表为\",{\"1\":{\"35\":1}}],[\"crc种子为5\",{\"1\":{\"35\":1}}],[\"crc校验字段\",{\"0\":{\"35\":1}}],[\"communication\",{\"1\":{\"42\":1}}],[\"com字段bit2组合的1~6bit是6bit的crc数据\",{\"1\":{\"41\":1,\"42\":1}}],[\"com字段bit3组合的9~12bit为4bit\",{\"1\":{\"42\":1}}],[\"com字段bit3组合的9~12bit和14~17bit分别作为8bit\",{\"1\":{\"41\":1}}],[\"com字段bit3组合的第8位的不同分为2种情况\",{\"1\":{\"40\":1}}],[\"com字段bit3组合的第13和第18位都为0\",{\"1\":{\"40\":1}}],[\"com字段bit3连续为1111110\",{\"1\":{\"40\":1}}],[\"com字段的bit2值组合而成\",{\"1\":{\"40\":1}}],[\"com字段的bit2值组合起来的16bit的值即为组合传输的信息\",{\"1\":{\"39\":1}}],[\"com字段的bit3值用来辨别以何种形式组合\",{\"1\":{\"39\":1}}],[\"com字段的bit3值都为0时\",{\"1\":{\"39\":1}}],[\"com字段的bit3值为1\",{\"1\":{\"39\":1}}],[\"com域仅包含一个nibble\",{\"1\":{\"34\":1}}],[\"com的下降沿之间的时间间隔为280us\",{\"1\":{\"33\":1}}],[\"com\",{\"1\":{\"31\":1,\"33\":1,\"42\":2}}],[\"concat\",{\"1\":{\"14\":1,\"15\":1}}],[\"c\",{\"0\":{\"14\":1},\"1\":{\"4\":2,\"5\":2,\"8\":1,\"9\":1,\"14\":1}}],[\"=\",{\"1\":{\"4\":3,\"5\":1,\"8\":5,\"9\":1,\"14\":1,\"15\":3}}],[\"=>\",{\"1\":{\"4\":2,\"5\":1,\"8\":2,\"9\":1}}],[\"0\",{\"1\":{\"4\":2,\"8\":5,\"15\":1,\"16\":2,\"27\":2,\"35\":1}}],[\"bit的crc组成\",{\"1\":{\"39\":1}}],[\"bit的data和4\",{\"1\":{\"39\":1}}],[\"bit的message\",{\"1\":{\"39\":1}}],[\"b接收到信息后\",{\"1\":{\"32\":1}}],[\"b接收到a的56秒数据时\",{\"1\":{\"32\":1}}],[\"b掐表就会出现紊乱\",{\"1\":{\"32\":1}}],[\"b可能看到a的灯光\",{\"1\":{\"32\":1}}],[\"b根据a亮灭灯来掐表\",{\"1\":{\"32\":1}}],[\"b根据\",{\"1\":{\"32\":1}}],[\"b按下秒表计时\",{\"1\":{\"32\":1}}],[\"btnclicked\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"b\",{\"1\":{\"4\":1,\"5\":2,\"8\":1,\"9\":2,\"19\":3}}],[\"autoee\",{\"1\":{\"42\":1}}],[\"autosar\",{\"1\":{\"42\":1}}],[\"a再将验证码发送出去\",{\"1\":{\"32\":1}}],[\"ab约定\",{\"1\":{\"32\":1}}],[\"ab又约定\",{\"1\":{\"32\":1}}],[\"a每次发送完信息后\",{\"1\":{\"32\":1}}],[\"a每次发送信息\",{\"1\":{\"32\":1}}],[\"a每次点亮手电筒时\",{\"1\":{\"32\":1}}],[\"a不停的亮灯\",{\"1\":{\"32\":1}}],[\"a将信息藏于时间\",{\"1\":{\"32\":1}}],[\"a\",{\"1\":{\"4\":1,\"5\":2,\"8\":1,\"9\":3,\"19\":2}}],[\"data\",{\"1\":{\"4\":2,\"5\":1,\"8\":2,\"9\":1,\"31\":1}}],[\"default\",{\"1\":{\"4\":2,\"5\":1,\"8\":1}}],[\"例如\",{\"1\":{\"4\":1,\"5\":1}}],[\"相关问题\",{\"0\":{\"3\":1}}],[\"前端\",{\"0\":{\"1\":1}}],[\"介绍页\",{\"0\":{\"0\":1}}]],\"version\":2}}")).map(([e,t])=>[e,It(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n,id:o}})=>{const r=Ct[s];e==="suggest"?self.postMessage([e,o,et(t,r,n)]):e==="search"?self.postMessage([e,o,tt(t,r,n)]):self.postMessage({suggestions:[e,o,et(t,r,n)],results:[e,o,tt(t,r,n)]})};
//# sourceMappingURL=index.js.map
