---
title: Jetbrains IDE 全线在 macOS Monterey 上崩溃的解决办法
tags:
  - apple
  - jetbrains
categories:
  - 运维
abbrlink: 1218852091
date: 2021-09-17 09:27:48
---

 最近的 Monterey Beta 6 更新过后，Jetbrains 的全部 IDE 都无法打开，发生报错的问题，仔细一查是 Java 版本的 BUG。

解决办法就是给 JVM 虚拟机传参来跳过错误，但是这对于每个 IDE 都要做配置，很繁琐，我们换个方式。

新建一个 `.plist` 文件：

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"\>
  <plist version="1.0">
  <dict>
  <key>Label</key>
  <string>setenv.macOS12BetaJVMFix</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/launchctl</string>
    <string>setenv</string>
    <string>_JAVA_OPTIONS</string>
    <string>-XX:+TieredCompilation -XX:TieredStopAtLevel=1</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>ServiceIPC</key>
  <false/>
</dict>
</plist>
```

保存文件名为 `setenv.macOS12BetaJVMFix.plist` ，丢到 `/Library/LaunchAgents` 目录中，重启系统即可。
