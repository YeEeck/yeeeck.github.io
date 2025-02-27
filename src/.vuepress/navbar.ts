import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "硬件与上位机",
    icon: "famicons:hardware-chip-sharp",
    prefix: "/posts/hardware/",
    children: [
      "SentIntroduce"
    ],
  },
  {
    text: "前端",
    icon: "mingcute:web-fill",
    prefix: "/posts/frontend/",
    children: [
      "vueDataPageUpdateAnalyze"
    ],
  },
  {
    text: "实用工具&部署教程",
    icon: "material-symbols:tools-power-drill",
    prefix: "/posts/tools/",
    children: [
      "ffmpegCommonCommand"
    ],
  },
]);
