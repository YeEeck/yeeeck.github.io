import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "硬件",
    icon: "famicons:hardware-chip-sharp",
    prefix: "/posts/hardware/",
    children: [
      "SentIntroduce"
    ],
  },
  {
    text: "MCU开发",
    icon: "famicons:hardware-chip-sharp",
    prefix: "posts/mcu",
    children: [
      "Stm32AdcDmaManual",
      "Stm32MpuUseManual",
      "Stm32H743MemStructure"
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
