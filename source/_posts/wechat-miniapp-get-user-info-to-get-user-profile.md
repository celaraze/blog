---
title: 微信小程序 getUserInfo 改造为 getUserProfile
date: 2021-08-18 16:47:35
tags:
  - 微信
  - 小程序
categories:
  - 编程
---

> 支持版本： https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801

区别在于，getUserInfo 需要 open-type 修饰，并且只能按钮触发，getUserProfile 简化了这部分的设定，直接通过绑定方法触发，不再需要额外的修饰，同时方法内必须有 desc 属性。

`getUserInfo`：

```HTML
<button open-type="getUserInfo" @getuserinfo="login()">登录</button>
```

```Javascript
login() {
  uni.getUserInfo({
    withCredentials: true,
    success: function() {}
    });
}
```

`getUserProfile`：

```HTML
<button @click="login()">登录</button>
```

```Javascript
login() {
  uni.getUserProfile({
    desc:'登录',
    success: function() {}
    });
}
```
