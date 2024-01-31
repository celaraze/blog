---
title: macOS 刷新应用菜单图标
date: 2021-08-18 17:11:53
tags: 
  - macos
categories: 
  - 运维
---

```
defaults write com.apple.dock ResetLaunchPad -bool true
killall Dock
```
