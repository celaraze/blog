---
title: PHP 注解路由实现原理
tags:
  - php
categories:
  - 编程
abbrlink: 1603188488
date: 2021-08-18 17:02:29
---

PHP8 新特性支持注解（Attribute），其实和 Java 的注解很类似，因为是新特性刚出不久，生态还需要完善。这里我简单说一下实现原理，代码仅作为参考并非完整的实现过程，但是核心逻辑已经阐明清楚。

大致实现过程为：了解 Laravel 的路由注册过程，通过反射获取定义过注解路由的方法，接着将注解路由的参数和这个方法统一注册到 Laravel 的路由中，这样在整个应用声明周期内即可完成注解路由自动注册。

这里以注解路由为例，解释一下为何以下代码段会自动注册路由到 `/api/test` 路由。

控制器类：

```PHP
namespace App\Http\Controllers;

use App\Aspect\Get;

class TestController extends Controller
{
    #[Get('api/test')]
    public function test()
    {

    }
}
```

注解类：

```PHP
namespace App\Aspect\Get;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
class Get
{
    private string $uri;
    private ?string $name;

    public function __construct(string $uri, ?string $name = null) {
        $this->uri = $uri;
        $this->name = $name;
    }

    public function getUri(){
        return $this->uri;
    }

    public function getName(){
        return $this->name;
    }
}
```

在这之前我们需要了解 Laravel 的路由是在 routes 目录下统一管理，例如 `api.php` 和 `web.php`，实际上 Laravel 在其声明周期执行过程中会通过服务提供者自动注册在 `routes` 文件夹下的路由文件内的具体路由到应用中。因此我们也需要做这一步，但是我们的路由不再写在 `routes` 目录下，而是写到 `app/Http/Controllers` 文件夹下的每个控制器对应的方法注解中。

首先，我们需要扫描整个 `app/Http/Controllers` 目录下的全部 `.php` 文件，由于 PSR 规范的存在，控制器的类名和其文件名是相同的，比如 `app/Http/Controllers/TestController.php` 的类名就是 `TestController`，所以我们可以通过字符串替换的方式得到 `TestController::class`，也就是类本身。

接着，我们通过反射方法 `(new TestController())->getMethods();` 获取 `TestController::class` 下的全部方法，再通过 `$attributes = $method->getAttributes('Get'); ` 以及判断是否存在 `Get[]` 注解来知道这个方法是否有做注解路由，找到我们需要的那些已经被定义过注解路由的方法。

然后，我们通过反射方法获取注解中传入的参数 `$uri` 和 `$name`：

```PHP
$methods = (new TestController())->getMethods();
foreach($methods as $method){
    $attributes = $method->getAttributes('Get');
    foreach($attributes as $attribute){
        $attributeInstance = $attribute->newInstance();
        $uri = $attributeInstance->getUri();
        $name = $attributeInstance->getName();
        // 获取到的$uri和$name就是需要注册的路由请求地址和路由别名
        // 接着注册这些路由即可，核心就是反射获取类、方法、注解、参数
    }
}
```

最后，我们把以上这些逻辑引入到 `app/Providers/AppServiceProvider.php` 的 `boot()` 方法中即可，完成注解路由注册。
