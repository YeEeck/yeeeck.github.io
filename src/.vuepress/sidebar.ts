import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "前端",
      icon: "book",
      prefix: "posts/frontend",
      children: "structure",
    },
    {
      text: "硬件",
      icon: "book",
      prefix: "posts/hardware",
      children: "structure",
    },
    "intro",
  ],
});
