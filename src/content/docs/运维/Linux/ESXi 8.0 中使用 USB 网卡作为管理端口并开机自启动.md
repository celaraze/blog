---
title: ESXi 8.0 中使用 USB 网卡作为管理端口并开机自启动
---

1：正常安装 ESXi 8.0，一般来说到 73% 的时候安装会卡住，不过没事按下回车拔掉 U 盘重启，这时候其实是安装好了，但是剩下网卡端口和 root 账户密码没有设置。

2：启动后按 F2 进入配置菜单，root 密码为空。

3：执行 `Network Restore Options`，回到主界面此时网卡能正确获取 DHCP 分配的 IP 地址。

4：打开 ESXi 的 web 管理页面，启用 SSH，使用 SSH 连接到 ESXi。

5：编辑 `/etc/rc.local.d/local.sh` 文件：

```shell
# Note:...

# 添加下面的代码
vusb0_status=$(esxcli network nic get -n vusb0 |grep 'Link Status' | awk '{print $NF}')
count=0
while [[ $count -lt 20 && "${vusb0_status}" != "Up" ]]
do
        sleep 10
        count=$(( $count + 1 ))
        vusb0_status=$(esxcli network nic get -n vusb0 |grep 'Link Status' | awk '{print $NF}')
done

esxcfg-vswitch -R
#添加的代码结束

exit 0
```

保存重启，即可开机自动使用 USB 网卡作为 ESXi 的管理端口。
