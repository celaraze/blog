---
title: Python 代码片段
---

## 一行命令设置 pip 镜像

```shell
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## 过滤数组元素

```python
list = [1,2,'',3,'','',4]
list = [i for i in list if i != '']
```
