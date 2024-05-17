---
title: 使用 btrfs 恢复快照后无法启动
---

## 问题

`Archlinux` 下安装了 `timeshift` 创建了一个 `btrfs` 快照，然后玩玩恢复，结果重启后无法开机。

提示：

```shell
// ....
BTRFS error (device nvme0n1p2): subvol /@home does not match subvolid 257
// ....
```

我在勾选快照功能的时候把 `/home` 也就是用户主目录页加入了备份计划，但是 `btrfs` 的特性导致快照的挂载点的磁盘信息与原来不符（废话，创建了一个新的分区出来肯定不一样）

## 解决办法

1：先去 `https://www.system-rescue.org` 下载 Linux 系统紧急救援镜像，烧录到 U 盘并启动。

2：执行 `fdisk -l` 查看分区信息，比如我的数据区是 `/dev/nvme0n1p2` 。

3：执行 `mkdir /mnt/temp` 新建个文件夹用于挂载我们坏掉的系统。

4：执行 `mount -t btrfs /dev/nvme0n1p2 /mnt/temp` 挂载！

5：这时候 `cd /mnt/temp && ls` 你会看到有 `@` `@home` 目录，其中 `@` 代表你原始系统的 `/`，而 `@home` 则代表原始系统的 `/home`。

6：执行 `btrfs subvolume @home` 就能看到你原始系统中 `/home` 目录挂载时的 `subvolid`，比如显示的是 265。这里一定要这样才能获取原始信息，别忘记这时候你的原系统也作为一个分区挂载在救援镜像中！所以单纯的 `/proc/mount` 是看不到正确的 `subvolid` 的。

7：执行 `nano /mnt/temp/@/ect/fstab` 编辑，找到你原始系统中挂载 `@home` 那一条目，修改 `subvolid` 的值为 265（不一定你也是 265，不要照抄，我只是举个例子）。

8：打完收工，拔 U 盘 reboot！Linux 真香。
