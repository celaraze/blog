---
title: macOS (M1) 安装 Swoole 提示：pcre2.h file not found
tags:
  - swoole
categories:
  - 运维
abbrlink: 4292174570
date: 2021-08-18 17:00:12
---

```bash
ln -s /Library/Developer/CommandLineTools/SDKs/MacOSX11.1.sdk/usr/include/php/ext/pcre/pcre2lib/pcre2.h /opt/homebrew/Cellar/php/[php-version]/include/php/ext/pcre/pcre2.h
```

把 `[php-version]` 改成自己的 PHP 版本
