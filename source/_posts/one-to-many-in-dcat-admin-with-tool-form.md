---
title: DcatAdmin 工具表单实现一对多读写
date: 2021-08-18 17:07:27
tags:
  - laravel
  - dcatadmin
categories: 
  - 编程
---

在 DcatAdmin 的工具表单中，是没有一对多的字段的，要实现这一个也很简单。

### 处理模型关联

```PHP

// 我是模型文件：Dad.php

public function sons()
{
    return $this->hasMany(Dad::class, 'dad_id', 'id');
}
```

### 工具表单中使用表格

```PHP

// 我是工具表单：DadHasSonsForm.php

public function handle(array $input)
{
    $id = $this->payload['id'];
    $sons = $input['sons'] ?? null;

    // 处理登记爸爸的儿子们姓名的逻辑

    return $this
        ->response()
        ->success('登记成功！')
        ->refresh();
}

public function form()
{
    $this->table('sons', function (NestedForm $form) {
        $form->text('name', '名字');
    });
}

// 这个返回默认值的方法，就是为了将数据库中现有已经登记的儿子姓名读取出来
// 然后做好数组处理，返回给表单的 sons 字段，变相实现了一对多的读写
public function default(): array
{
    $dad = Dad::find($this->payload['id']);
    $sons = $dad->sons()->get();
    $array = [];
    foreach ($sons as $son) {
        array_push($array, ['name' => $son->name]);
    }
    return [
        'sons' => $array,
    ];
}
```
