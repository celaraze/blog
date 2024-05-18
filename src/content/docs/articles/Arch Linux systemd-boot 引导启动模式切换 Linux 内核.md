---
title: Arch Linux systemd-boot 引导启动模式切换 Linux 内核
---

## 安装内核

比如从 `linux` 内核版本切换到 `linux-lts` 版本，则执行 `sudo pacman -S linux-lts linux-lts-headers` 安装内核文件。

其中 `linux-lts` 代表长期维护的内核版本包，而 `linux-lts-headers` 用于后期系统中编译和内核相关的驱动等需要使用到的头文件，建议同时安装。

## 切换内核

`su` 进入 Root 模式，`cd /boot/loader/entries` 进入引导配置文件目录，这里面都是 `.conf` 文件，其实每个配置文件就是开机启动时候的一个选单，
像我的是 `2023-09-28_08-11-24_linux.conf` ，那么 `sudo nano 2023-09-28_08-11-24_linux.conf` 编辑它。

```diff
# 以下 - 代码删除这行， + 代码增加这行，- 和 + 本身不需要输入，无视就好。

title   Arch Linux (linux)
- linux   /vmlinuz-linux
+ linux   /vmlinuz-linux-lts
initrd  /intel-ucode.img
- initrd  /initramfs-linux.img
+ initrd  /initramfs-linux-lts.img
options root=PARTUUID=8e39cade-c3f4-45b7-a5a0-f5a2a8b9fad2 zswap.enabled=0 rootflags=subvol=@ rw rootfstype=btrfs
```

修改完毕后重启系统，使用 `uname -a` 查看到已经切换到了新内核版本。
