---
title: 群晖安装 RTL8156 USB 2.5G 网卡驱动
---

先确认群晖设备型号对应的 CPU 架构：

https://kb.synology.com/en-global/DSM/tutorial/What_kind_of_CPU_does_my_NAS_have

下载对应架构和 DSM 版本的驱动套件包（.spk 文件）：

https://github.com/bb-qq/r8152/releases

群晖套件中手动上传安装这个 .spk 包，大概率会提示失败，是正常的。

打开群晖的 SSH 功能，SSH 连接群晖设备，并输入以下命令：

`sudo install -m 4755 -o root -D /var/packages/r8152/target/r8152/spk_su /opt/sbin/spk_su`

安装完毕，享受 2.5G。
