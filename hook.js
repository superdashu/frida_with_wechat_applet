/*
 * @name 微信小程序PC版 wxapkg提取
 * @author kksanyu
 * @url https://github.com/kksanyu/frida_with_wechat_applet
 */

var baseAddr = Module.findBaseAddress('WeChatAppHost.dll');
console.log('WeChatAppHost.dll baseAddr: ' + baseAddr);

if (baseAddr) {

    // EncryptBufToFile函数偏移地址, 从DLL中查看
    var EncryptBufToFile = baseAddr.add(0x1800F);
    console.log('EncryptBufToFile 函数地址: ' + EncryptBufToFile);

    // HOOK函数, 监听参数
    Interceptor.attach(EncryptBufToFile, {
        onEnter: function (args) {
            // 微信小程序AppId
            this.appId = ptr(args[0]).readPointer().readAnsiString();
            // 微信小程序本地缓存文件路径
            this.apkgFilePath = ptr(args[1]).readPointer().readAnsiString();
            // 小程序代码原始内容(未加密)
            this.originalData = Memory.readByteArray(args[2], args[3].toInt32());
        },
        onLeave: function (retval) {
            console.log('文件解密成功', this.apkgFilePath);

            // 将文件替换为未加密的wxapkg包
            var f = new File(this.apkgFilePath, 'wb');
            f.write(this.originalData);
            f.flush();
            f.close();

            // 释放内存
            delete this.appId;
            delete this.apkgFilePath;
            delete this.originalData;
        }
    });
    
} else {
    console.log('WeChatAppHost.dll 模块未加载, 请先打开界面中的小程序面板');
}
