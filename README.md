> 项目地址：https://github.com/mute2000/game
## 下载&运行

```
npm install express ws 

node server.js // 开启websocket服务器

node client.js  // 运行客户端程序

然后浏览器打开localhost:8080即可
```

## 技术栈

- 前端框架使用`vue`
- 后端框架使用`Express`,实时通信使用`ws`
- 数据库使用`Mysql`

## 目标

- 用WebSocket提供数据同步，内容分发功能。
- 用绘图位点坐标，每隔一段时间向服务器发送坐标，再通过`.send()`方法把坐标分发出去，在猜图中获取坐标，实现绘图数据的同步。
- 同步绘画数据后，输入框能够提交关键词，检测答案是否正确。
