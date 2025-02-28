---
date: 2025-02-27
category:
  - 工具
  - 视频
tag:
  - FFmpeg
  - 视频
  - 教程
  - 工具
---

# FFmpeg常用指令

## HEVC 10Bit 高压 压制命令

``` bash
ffmpeg -i "输入视频路径" -c:a copy -c:v hevc -x265-params min-keyint=5:scenecut=50:open-gop=0:rc-lookahead=60:lookahead-slices=0:me=hex:subme=2:merange=57:ref=3:max-merge=3:no-strong-intra-smoothing=1:no-sao=1:selective-sao=0:deblock=-3,-3:ctu=32:rdoq-level=2:psy-rdoq=1.0:crf=23:rskip=2 -preset medium -pix_fmt yuv420p10le "输出视频路径"
```

## 视频长度裁剪

### 不精确时间 无黑屏

``` bash
ffmpeg -ss 10 -t 15 -i input.mp4 -codec copy output.mp4
```

### 精确时间 可能黑屏

``` bash
ffmpeg -ss 10 -t 15 -accurate_seek -i input.mp4 -codec copy -avoid_negative_ts 1 output.mp4
```

### 重编码 时间精确 无黑屏

可换用任意编码参数

``` bash
ffmpeg -ss 10 -t 15 -i input.mp4 -c:v libx264 -c:a aac -strict experimental -b:a 256k output.mp4
```

### 关键帧切割

-segment_times 后时间可任意调节，逗号分隔

``` bash
ffmpeg.exe -i "In.mp4" -f segment -segment_times 00:00:06.165,00:00:14.293 -c copy -map 0 "Out_%%02d.mp4"
```