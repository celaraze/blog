---
title: WSL Ubuntu 下正确安装 NodeJS 的方式
date: 2024-05-19
---

## 前提一定要看

在 WSL Ubuntu 环境下安装 NodeJS 和 NPM 千万不要直接 `sudo apt install nodejs npm`，APT 源自带的 NodeJS 版本非常老，还是 V12。也不要用官方推荐的添加 NodeJS 官方源去安装 LTS 版本，那样会在 WSL 中产生很多权限问题，首先就是 NPM 命令无法正常执行，会报很多 permission denied 错误，使用 sudo 权限执行也会导致目录权限问题。

## 正确的安装方式

> 我们使用 nvm 版本管理器管理 NodeJS。

1：`sudo apt install curl`

2：`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash`

3：`source ~/.zshrc` 这里我用的是 zsh，如果终端是别的版本，直接关闭终端重新打开就行。

4：`command -v nvm` 确认 nvm 正确安装且命令有效。

5：`nvm ls` 查看 NodeJS 环境状态，正常情况下全是 N/A。

6：`nvm install --lts` 安装最新的 NodeJS LTS 版本，或者 `nvm install node` 安装最新的 NodeJS 发行版本。

7：`nvm ls` 再次查看 NodeJS 环境状态。

8：`node -v` 和 `npm -v` 来确认版本正确。

以上安装完成后，在 WSL Ubuntu 环境下就能正常使用了，也不会遇到权限问题和版本过老的问题。
