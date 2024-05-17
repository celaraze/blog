---
title: Redmi Book 14 2023 款使用 Archlinux 指纹认证
---

## 前提

首先，这款笔记本搭载的指纹识别器无法被 `Archlinux` 官方支持，并且也不在 `fprint` 官方支持列表中。

请先核对以下信息。

1，使用 `lsusb` 列出你的指纹硬件信息，如果这里无法使用 `lsusb` 命令，先 `sudo pacman -S usbutils` 安装。

```shell
...
# 找到这个，确认硬件标识是否是 10a5:9201
Bus 003 Device 002: ID 10a5:9201 FPC FPC Sensor Controller L:0001 FW:021.26.2.041
...
```

## 安装

官方没有这个驱动，那我们用开源社区贡献的驱动。

### 安装指纹验证程序

`sudo pacman -S fprint`

### 安装必要依赖

```shell
# 一定要使用 1.1 版本，安装后与最新的 openssl3 不会冲突。
sudo pacman -S openssl-1.1

# 一定要安装 opencv-4.6.0-7 版本，这是驱动依赖死的，由于 Archlinux 是滚动发布，所以这里我们是降级安装了。
sudo pacman -U https://archive.archlinux.org/packages/o/opencv/opencv-4.6.0-7-x86_64.pkg.tar.zst

# 一定要安装 openexr-3.1.9-1 版本，理由同上。
sudo pacman -U https://archive.archlinux.org/packages/o/openexr/openexr-3.1.9-1-x86_64.pkg.tar.zst

```

避免 Archlinux 的滚动升级导致上述依赖自动更新，我们需要在 pacman 的配置文件中加入忽略升级。

```shell
# nano /etc/pacman.conf
IgnorePkg  = opencv openexr
```

### 安装驱动

```shell
git clone https://github.com/vrolife/modern_laptop.git
cd modern_laptop
sudo /bin/sh install.sh fingerprint
```

修改 `fprint` 服务使用我们自定义的驱动程序。

```shell
sudo systemctl edit fprintd.service
```

然后在弹出的编辑器中修改，注意如下配置和位置，一定要一样，不要写到其他地方去，直接照着复制就行，这是为了生成用于 `systemctl` 的 `override.conf`。

```text
### Editing /etc/systemd/system/fprintd.service.d/override.conf
### Anything between here and the comment below will become the contents of the drop-in file

[Service]
ExecStart=
ExecStart=/opt/fingerpp/bin/fingerpp --bus=system

### Edits below this comment will be discarded
```

安装完毕后执行 `sudo systemctl restart fprintd`，如果有错误则执行 `journalctl -xeu fprintd.service` 然后拉到最下面看报错内容是什么。

## 录入指纹和验证指纹

执行 `fprintd-enroll` 命令根据提示录入指纹信息。

执行 `fprintd-verify` 命令根据提示验证指纹信息。

除了上述办法，也可以在 KDE 环境中，`系统设置 - 用户 - 配置指纹身份验证` 来录入信息。我是使用这个方法，因为 GUI 会有动画提醒放置和抬起。

## 配置 SDDM KDE SU SUDO 验证为指纹识别

```text
# nano /etc/pam.d/sddm

#%PAM-1.0
auth        sufficient  pam_fprintd.so

# 在文件第二行，也就是配置信息最前面加上上面这一段。
```

```text
# nano /etc/pam.d/system-local-login

#%PAM-1.0
auth      sufficient    pam_fprintd.so

# 在文件第二行，也就是配置信息最前面加上上面这一段。
```

上述完成后，重启系统即可直接使用指纹登陆，如果没有反应，尝试密码框内不输入任何内容后进行指纹识别。

如果要修改类似 `su sudo` 这样的命令使用指纹验证，就去如下文件中的第二行加入上述的配置信息就行。

```text
# SDDM
/etc/pam.d/sddm
/etc/pam.d/system-local-login

# KDE 锁屏
/etc/pam.d/kde

# su
/etc/pam.d/su

# sudo
/etc/pam.d/sudo

# KDE 弹窗认证
/etc/pam.d/polkit-1
```

## 善后工作

上面我们把
