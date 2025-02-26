import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "前端",
    icon: "pen-to-square",
    prefix: "/posts/frontend/",
    children: [
      "vueDataPageUpdateAnalyze"
    ],
  },
]);
