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
      icon: "mingcute:web-fill",
      prefix: "posts/frontend",
      children: "structure",
    },
    {
      text: "硬件",
      icon: "famicons:hardware-chip-sharp",
      prefix: "posts/hardware",
      children: "structure",
    },
    {
      text: "MCU开发",
      icon: "famicons:hardware-chip-sharp",
      prefix: "posts/mcu",
      children: "structure",
    },
    {
      text: "实用工具&部署教程",
      icon: "material-symbols:tools-power-drill",
      prefix: "posts/tools/",
      children: "structure",
    },
    "intro",
  ],
});
