import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "硬件与上位机",
    icon: "book",
    prefix: "/posts/hardware/",
    children: [
      "SentIntroduce"
    ],
  },
  {
    text: "前端",
    icon: "pen-to-square",
    prefix: "/posts/frontend/",
    children: [
      "vueDataPageUpdateAnalyze"
    ],
  },
]);
