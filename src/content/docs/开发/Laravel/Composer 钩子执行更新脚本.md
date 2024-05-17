---
title: Composer 钩子执行更新脚本
---

每次执行完 `composer update` 后，如果相关依赖包有升级后的手动维护动作，比如 DcatAdmin
的升级操作 `php artisan admin:update`，一旦遗忘就会比较麻烦。直接进 composer 钩子，再执行完 `composer update`
后会自动运行钩子中的脚本命令。

```
// 在 composer.json 文件中，scripts节点

"post-update-cmd": [
            "@php artisan admin:update --ansi",
            "@php artisan horizon:publish --ansi"
        ]
```
