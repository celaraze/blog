---
title: uniapp 在手持 PDA 上的激光扫码解决方案
date: 2024-05-19
---

> 支持所有版本

手持 PDA 是 Android 平台，其扫码的解决方案也有摄像头和激光扫描等多种解决方案，这里结合 uni-app 的开发特性，以及自己踩过的坑，聊一聊具体的实现方案。

### 扫码方案

现阶段来说，读取一段 Barcode（也可能是 QRcode，以下我都用 Barcode 代替表述）的方式无非两种主要方式和一种附加方式，主要方式包含摄像头和激光，附加方式则需要将 Barcode 转为 RFID 方式，后者不再此赘述。

#### 摄像头

摄像头扫码兼容性最高，也是一种软解的解决方案，理论上只要带有光学摄像头的终端设备都可以实现解码过程，但是其解码过程很依赖终端性能，有些低端设备搭载的摄像头在对焦上需要花费更多的时候，这对一些高度依赖效率的工作内容产生一定的阻碍，比如大批量的工单扫码。

因此，使用摄像头扫码方案也是可以达到可以使用的层级，如果需要应付一些追求效率的内容就显得相对困难。

##### uni-app 内如何使用

```javascript
uni.scanCode({
  //成功回调
  success: function (res) {
    //条码类型
    console.log(res.scanType);
    //条码的值
    console.log(res.result);
  },
  //失败回调
  fail: function (res) {},
  //完成回调
  complete: function (res) {},
});
```

#### 激光

这是硬解的方案，扫码的速度远高于需要唤醒过程的摄像头扫码方式，激光扫码几乎可以实时返回结果。

不过其依赖 Android 8 以上的版本才可以通过广播的方式被应用监听，因此在开发的过程中会造成一些阻碍。

无论是原生的 Android 开发方式，还是像 uni-app 的跨平台解决方案，都需要在激光扫描模块获取到结果后向系统发出一条广播，接着可以通过应用监听广播的方式来获取扫码结果。

##### uni-app 内如何使用

在一些设备上，需要手动设置广播：

设置 -> 扫描 -> Default -> 关闭
在另一些设备上，系统是没有广播设置的，不过一般厂家都会带上自己的硬解扫码工具供用户配置，具体的细节可以咨询对应的厂家。

然后，我们需要确定 2 个变量的值：

广播动作和广播标签，你可以简单的将这两个变量理解为 key-value，这两者都可以在设备上进行自定义设置，如果没有设置项，需要向厂家了解。

创建一个激光扫码的组件，我们在这里是 project_root/components/scan/scan.vue，并写入以下代码：

```javascript
<template>
  <view class="content"></view>
</template>
​
<script>
  var main, receiver, filter;
  var _codeQueryTag = false;
  export default {
    data() {
      return {
        scanCode: ''
      }
    },
    created: function(option) {
      this.initScan()
      this.startScan();
    },
    onHide: function() {
      this.stopScan();
    },
    destroyed: function() {
      this.stopScan();
    },
    methods: {
      initScan() {
        let _this = this;
        main = plus.android.runtimeMainActivity();
        var IntentFilter = plus.android.importClass('android.content.IntentFilter');
        filter = new IntentFilter();
                //下面的addAction内改为自己的广播动作
        filter.addAction("com.android.serial.BARCODEPORT_RECEIVEDDATA_ACTION");
        receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
          onReceive: function(context, intent) {
            plus.android.importClass(intent);
                        //下面的getStringExtra内改为自己的广播标签
            let code = intent.getStringExtra("DATA");
            _this.queryCode(code);
          }
        });
      },
      startScan() {
        main.registerReceiver(receiver, filter);
      },
      stopScan() {
        main.unregisterReceiver(receiver);
      },
      queryCode: function(code) {
        if (_codeQueryTag) return false;
        _codeQueryTag = true;
        setTimeout(function() {
          _codeQueryTag = false;
        }, 150);
        var id = code
        console.log('id:', id)
        uni.$emit('scan', {
          code: id
        })
      }
    }
  }
</script>
```

处理完组件后，在需要使用激光扫码的页面中引入该组件进行使用，在这里我以 index.vue 页面为例：

```javascript
<template>
  <view>我是index页面</view>
    <!-- 还要记得这里加上组件 -->
    <scan></scan>
</template>
​
<script>
    //记得引入组件
  import scan from "@/components/scan/scan.vue";
​
  export default {
        //引入组件
    components: {
      scan
    },
    data() {
      return {
        code: ''
      }
    },
    onShow: function() {
      let that = this
      uni.$off('scan') // 每次进来先 移除全局自定义事件监听器
      uni.$on('scan', function(data) {
                //扫码成功后的回调，你可以写自己的逻辑代码在这里
        console.log('扫码结果：', data.code);
      })
    },
    methods: {
​
    }
  }
</script>

```

到这里，在应用里跳转到打开 index.vue 页面后，直接按激光扫码的按键就能够取得结果，再针对自己的操作逻辑，在回调中补充自己的逻辑代码即可。

重要！通过软件调用激光

在之前，我无法使用软件的方式调用激光扫描模块，只能使用物理键来打开扫描头，现在已经有了解决方案。

uni-app 主动唤醒激光

同样以 index.vue 页面为例（这里我出于方便用单页面举例，把所有的扫描相关方法写在一起）。

```javascript
<template>
  <view>
    <button class="bind">已绑定工号{{userCode}}</button>
  </view>
</template>
​
<script>
  export default {
    data() {
      return {
        userCode: '',
        main: '',
        receiver: '',
        filter: '',
      }
    },
    methods: {
            //打开扫描头的方法
      bindUserCode() {
        this.initScan();
        this.startScan();
      },
      initScan() {
        let that = this;
        //获取Android主Activity
        that.main = plus.android.runtimeMainActivity();
        //获取Android意图类
        let Intent = plus.android.importClass('android.content.Intent');
        //实例化意图
        let intent = new Intent();
        //定义意图，模拟按下L键，L键实际上是打开激光的物理键映射，由厂商提供
        intent.setAction("com.android.action.keyevent.KEYCODE_KEYCODE_SCAN_L_DOWN");
        //广播这个意图
        that.main.sendBroadcast(intent);
        //获取Android意图过滤类
        let IntentFilter = plus.android.importClass('android.content.IntentFilter');
        //实例化意图过滤
        that.filter = new IntentFilter();
        //获取扫码成功的意图广播
        that.filter.addAction("com.android.serial.BARCODEPORT_RECEIVEDDATA_ACTION");
        that.receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
          onReceive: function(context, intent) {
            plus.android.importClass(intent);
            let code = intent.getStringExtra("DATA");
                        //成功输出扫码内容
                        console.log(code);
          }
        });
      },
      startScan() {
        this.main.registerReceiver(this.receiver, this.filter);
      }
    }
  }
</script>
```

流程说明

​ 首先，我们模拟 Android 的按键事件，因为 L 键是物理扫描键的映射，所以当我们按下 L 键（虚拟的）时，就是按下了物理的扫描键。

接着，我们同样通过监听广播的方式，来获取扫描结果。
