---
title: Ubuntu 22.04 个人安装配置
date: 2024-05-19
---

## 配置 oh-my-zsh

安装 ZSH：`sudo apt install zsh`

安装 oh-my-zsh：

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

安装 zsh-autosuggestions 自动补全：

`git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions`

安装 zsh-syntax-highlighting 语法高亮：
`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting`

在 `~/.zshrc` 文件中找到以下内容并修改：

```shell
# 下面添加 zsh-autosuggestions 和 zsh-syntax-highlighting
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

安装 powerlevel10k 主题：

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
echo 'source ~/.oh-my-zsh/custom/themes/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

配置 powerlevel10k 主题：`p10k configure`，按照提示选择个性化。

## Home 目录名中文改英文

```shell
export LANG=en_US
xdg-user-dirs-gtk-update
```

## 配置 PV

这个能让命令带上进度条

`sudo apt install pv`

```shell
# 举个例子
# 压缩文件夹

tar -cPf - "要压缩的文件目录"| pv -s $(($(du -sk "要压缩的文件目录" | awk '{print $1}') * 1024)) | gzip > 文件名.tar.gz
```

## 配置 CIFS

方便的挂载群晖共享盘的工具

`sudo apt install cifs-utils`

```shell
# 举个例子

sudo mkdir /mnt/nas
sudo mount -t cifs -o uid=root,username=群晖用户名,password=群晖密码 //群晖地址/共享目录 /mnt/nas

# 取消挂载
sudo umount nas
```

开机自动挂载需要修改 fstab 配置，`sudo nano /etc/fstab`

```shell
//群晖地址/共享目录 /mnt/nas cifs defaults,username=群晖用户名,password=群晖密码 0 0
```

## 配置 CRONTAB

这个能做计划任务，但是千万不要手动去修改 crontab 文件，而是用 `sudo crontab -e`

```shell
# 举个例子
# 定期备份数据库文件到群晖

0 3 * * * rsync -av --progress /var/lib/mysql /mnt/backup/BRAVOBackupData/MySQL

# 如果备份目的地要删除来源地已经删除的文件那就加上 --delete 参数，比如：

0 3 * * * rsync -av --progress --delete /var/lib/mysql /mnt/backup/BRAVOBackupData/MySQL
```

## 解决 PCIE Bus Error

这个问题大概率是由于 nvme 硬盘引起的，是 Ubuntu 内核问题。

修改 GRUB ，`sudo nano /etc/default/grub`

```shell
# 在文件最后加入

GRUB_CMDLINE_LINUX_DEFAULT="quiet splash pci=nommconf"
```

修改完成后更新 GRUB，`sudo update-grub`

然后重启服务器。

## MySQL 8

```shell
mysql -u root -p

ALTER USER 'root'@'localhost' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'password';

CREATE USER 'root'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

flush privileges;
```

```shell
# nano /etc/mysql/mysql.conf.d/mysqld.cnf

# 注释掉下面这行，然后 service mysql restart 重启服务。

# bind-address = 127.0.0.1
```
