---
title: Ubuntu 22.04 安装原生微信 Universal 后托盘卡死
date: 2024-05-19
---

微信 Linux 原生版本在 Ubuntu 22.04 上安装后，托盘图标会卡死，无法正常使用，原因是 Ubuntu 自带的 Ubuntu AppIndicators 托盘管理插件不支持双击事件，而微信原生版本需要双击托盘图标才能打开微信主界面。

## 安装 Gnome Extensions

```shell
apt install gnome-extensions
apt install chrome-gnome-shell
```

然后在程序列表中能看到 `扩展`，可以管理 Ubuntu 下的扩展。

## 安装 AppIndicator and KstatusNotifierItem Support

https://extensions.gnome.org/extension/615/appindicator-support/

安装完成后在 `扩展` 中关闭 Ubuntu AppIndicators 扩展，启用 `AppIndicator and KstatusNotifierItem Support` 扩展。
