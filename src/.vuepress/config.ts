import { defineUserConfig } from "vuepress";
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
//import { cut } from 'nodejs-jieba'

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  

  lang: "zh-CN",
  title: "YeEeck's Blog",
  description: "Every day do a little",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,

  plugins: [
    slimsearchPlugin({
      // 配置项
      indexContent: true,
      // indexOptions: {
      //   // 使用 nodejs-jieba 进行分词
      //   tokenize: (text, fieldName) =>
      //     fieldName === 'id' ? [text] : cut(text, true),
      // },
    }),
  ],

  head: [
    ['meta', {name: 'msvalidate.01', content:'7A04E690C9B59FBFCD7F261E8E343633'}]
  ]
});
