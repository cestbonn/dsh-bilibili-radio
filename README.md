# dsh-bilibili-radio

<p align="center">
  <img src="./logo.svg" width="220" alt="bilibili">
</p>

<p align="center"><strong>bilibili电台</strong></p>

<p align="center"><sub>让大肥鱼唱歌给你听</sub></p>

<p align="center">
  <a href="https://github.com/deepseek-ai/deepseek-harness"><img src="https://img.shields.io/badge/DSH-0.2.2--rc.1+-5786FE?style=flat-square" alt="DSH"></a>
  <a href="https://github.com/deepseek-ai/deepseek-harness"><img src="https://img.shields.io/badge/bundle-dsh%20plugin-181717?style=flat-square&logo=github" alt="dsh plugin"></a>
</p>

<p align="center">
  <code>dsh plugin --profile web add github:cestbonn/dsh-bilibili-radio</code>
</p>

<p align="center">
  <img src="./examples/main.png" alt="bilibili电台" width="900">
</p>

---

## 安装

需要 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) **0.2.2-rc.1+**（peer：`@deepseek-ai/dsh-tools`）。

```sh
dsh plugin --profile web add ./dsh-bilibili-radio
```

从 GitHub：

```sh
dsh plugin --profile web add github:cestbonn/dsh-bilibili-radio
```

装完重开 DSH。需要能访问 B 站。音源走本机 `127.0.0.1:13210` 代理。

## 功能

- **播放器**：一个简约的播放器。
- **滚动歌词**：自动搜索歌词轨。
- **歌单**：播放列表、我喜欢的、听歌排行、自定义歌单。
- **发现**：B站各音乐榜单、相关推荐、搜索歌曲/up主。
- **收藏 UP**：收藏常听的 UP。
- **大肥鱼**：想听什么，让大肥鱼操作；找歌、操作歌单、切歌等。

## 使用案例

滚动歌词：

<img src="./examples/lyrics.png" alt="滚动歌词" width="900">

对话里点歌：

<img src="./examples/suggestion1.png" alt="过年了，推荐点歌" width="900">

<img src="./examples/suggestions2.png" alt="我要听陶喆 李荣浩 汪峰" width="900">

## 反馈

欢迎开 issue、提新功能。

