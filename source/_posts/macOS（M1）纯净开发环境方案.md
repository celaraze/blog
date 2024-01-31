---
title: macOS（M1）纯净开发环境方案
tags:
  - macos
  - parallels
categories:
  - 运维
abbrlink: 246063876
date: 2021-08-18 17:19:23
---

## 踩坑与结局

比如 MySQL，Redis，web 开发的多站点管理，在 macOS 下面没有好用的面板程序，本来想用 docker 跑 ubuntu 安装宝塔面板，但屡战屡败，各种错误，错误来源于 docker for mac 的网络架构，也来源于 M1 的 arm 平台。

## 方案

考虑到需要环境干净，那就需要一个类似虚拟机的沙盒环境，干脆就不需要考虑了，直接上虚拟机？不得不说 parallels 真的是 macOS 下最强的虚拟机软件，自带了端口转发，并且能够将转发规则绑定到虚拟机，而不是 IP 地址。

创建虚拟机，Ubuntu 20.04 LTS arm64，1 CPU 512 RAM 足矣。

parallels 虚拟机优化中，性能降到最低，开发环境不需要性能，最低完全可以满足。

安装完成后，进入 Ubuntu 桌面，首先我们要安装 ohmyzsh。

```bash
sudo apt-get install zsh
chsh -s /bin/zsh
git clone https://gitee.com/mirrors/oh-my-zsh.git
sudo ./oh-my-zsh/tools/install.sh
```

接着安装 ohmyzsh 的自动补全和高亮插件。

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting
vim ~/.zshrc

# 找到以下位置，并修改
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

# 刷新配置
source ~/.zshrc
```

接着，我们需要移除 Ubuntu 的桌面环境，尽可能的节约虚拟机的开销，开发环境就只需要开发相关的内容即可，桌面环境和自带的应用都可以移除掉。

```bash
sudo apt-get remove libreoffice-common
sudo apt-get remove thunderbird totem rhythmbox simple-scan gnome-mahjongg aisleriot gnome-mines cheese transmission-common gnome-sudoku
```

```bash
sudo vi /etc/default/grub

# 找到以下配置并修改为text
GRUB_CMDLINE_LINUX_DEFAULT="text"

# 如果这个命令提示找不到相关命令，需要先执行sudo apt install grub2-common
sudo update-grub

sudo systemctl set-default multi-user.target
sudo reboot
```

此时，重启后的 Ubuntu 只会进入 terminal 模式，已经没有桌面环境了，接着移除内存占用大户。

```bash
sudo apt remove snapd
```

然后，安装宝塔面板吧。安装完成后，在 parallels 的偏好设置中，进行端口转发，这里酌情需要以下几个端口规则。

```
8888：宝塔面板管理
888：phpmyadmin管理
3306：MySQL数据库
6379：Redis
22：SSH
80：web server
```

然后，调整宝塔面板设置中的网站主目录位置，填入`/media/psf/Home`即为 macOS 当前用户目录，这样就可以做到文件内容共享了。

最后，调整 parallels 虚拟机的启动方式为始终重新启动，即可在开机的时候启动开发环境，而访问`127.0.0.1:8888`就进入了开发环境的宝塔面板中。

这样，即便是需要 docker 环境，也可以直接在 Ubuntu 中起来，享受最纯粹的 docker。
