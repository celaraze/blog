---
title: 自己动手编译 OpenWRT 固件
date: 2023-03-07 13:33:35
tags:
  - openwrt
  - linux
categories:
  - 运维
---

1：用于编译的系统一定要是 Debian 11 或者 Ubuntu LTS，推荐使用 Ubuntu 22.04 LTS。

2：确保系统软件包都是最新的，然后安装下面的编译依赖：

```
sudo apt update -y
sudo apt full-upgrade -y
sudo apt install -y ack antlr3 aria2 asciidoc autoconf automake autopoint binutils bison build-essential \
bzip2 ccache cmake cpio curl device-tree-compiler fastjar flex gawk gettext gcc-multilib g++-multilib \
git gperf haveged help2man intltool libc6-dev-i386 libelf-dev libglib2.0-dev libgmp3-dev libltdl-dev \
libmpc-dev libmpfr-dev libncurses5-dev libncursesw5-dev libreadline-dev libssl-dev libtool lrzsz \
mkisofs msmtp nano ninja-build p7zip p7zip-full patch pkgconf python2.7 python3 python3-pip libpython3-dev qemu-utils \
rsync scons squashfs-tools subversion swig texinfo uglifyjs upx-ucl unzip vim wget xmlto xxd zlib1g-dev
```

3：配置并更新 feed：

```
git clone https://github.com/coolsnowwolf/lede
cd lede
./scripts/feeds update -a
./scripts/feeds install -a
make menuconfig
```

4：下载 DL 库：

```
make download -j8
make V=s -j1 // 这里的1代表编译时使用的线程数，为防止错误，建议单线程
```

编译过程：

![](/images/posts/1.png)

5：编译完成后生成的镜像文件在 `bin/targets` 中，这个编译过程支持各种平台，比如我是用来生成 VMWare 的 VMDK。
