frida_with_wechat_applet
=====
[![License](https://img.shields.io/github/license/kksanyu/frida_with_wechat_applet)](https://github.com/kksanyu/frida_with_wechat_applet)

### 概述

PC微信小程序未加密包提取方案 wxapkg frida版本

***该解决方案只支持 `Windows` 系统哦***

### 准备工作

你得知道frida是啥？ [不知道的同学可以戳这里进官网](https://frida.re/)

第1步: 删除 `C:\Users\{用户名}\Documents\WeChat Files\Applet` 下的所有历史小程序缓存, 避免受到干扰。 

***注意: 如果你变更过 `我的文档` 路径的话, 这个地址会有变动, 以自己电脑上的地址为准。***

第2步: 手动点击一下微信小程序PC版本左下角的 `小程序面板`, 让程序先初始化小程序模块。

### 使用

完成了准备工作之后, 就可以愉快的使用脚本了

```shell
# 加载脚本
$ frida WeChat.exe -l hook.js
```

在小程序面板点击想要提取 `wxapkg` 包的小程序, 在 `WeChat Files\Applet` 目录下会自动存储未加密的源代码包。

### 原理

通过HOOK `WeChatAppHost.dll` 中的 `EncryptBufToFile` 函数, 在加密函数调用之前，拿到未加密的源代码包数据, 加密生成文件后，覆盖生成后的文件实现解密。

~~这个方法比较取巧，当然有能力的大神可以去硬杠解密算法。~~
找到 `BlackTrace` 大神的方案, 继续往下看。

#### wxapkg包 解密工具

这里借鉴了 `BlackTrace` 的 `GO` 版本解密代码, 翻译为 `python` 版本。

传送门: 

- [python版本 戳这里](https://github.com/kksanyu/pc_wxapkg_decrypt_python)

- [GO版本 戳这里](https://github.com/BlackTrace/pc_wxapkg_decrypt)

### License

The MIT License(http://opensource.org/licenses/MIT)

请自由地享受和参与开源

