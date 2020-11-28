class Room {
    constructor() {
        this.map = new Map(); // username ws
        this.headCount = 0; // 房间内部人数 最多6人
        this.roomID = +new Date() % 1000; // 房间号随机生成
        this.gameBegin = false; // 房间游戏开始
        this.seats = ['空位', '空位', '空位', '空位', '空位', '空位'];
        this.guessWord = '';
    }
    addSub(username, ws) {
        this.headCount++;
        this.map.set(username, ws);
        // this.subs.push(new User(username, ws));
        // this.subs.push(ws);
    }
    // 房间广播
    notify(msg) {
        this.map.forEach(ws => ws.send(msg));
        // this.subs.forEach(user => user.ws.send(msg));
    }
    // 房间内部玩家退出
    delete(username) {
        this.map.delete(username);
        this.headCount--;
    }
}

const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});

let dict = [
    {
    // id: 0,
    class: "动物",
    items:    ['老鼠', '龙', '蛇', '鸡', '狗']
    },
    {
        // id: 1,
        class: "体育项目",
        items:["踢足球", "打篮球", "高尔夫", "击剑"]
    },
    {
        // id: 2,
        class: "生活用品",
        items:["枕头", "眼镜", "剪刀", "拖鞋"],
    },
    {
        // id: 3,
        class: "食物",
        items:["黄瓜", "香蕉", "冰糖葫芦"]
    }
];


// 总游戏人数
// let gamtCount = 0;
let room = new Room();
// let rooms = [];
// 有人加入房间
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    // gamtCount++;
    let userid = +new Date() % 1000 + Math.floor(Math.random() * 1000).toString();
    ws.send(`userid,${userid}`);
    room.addSub(userid, ws);
    ws.send(`roomID,${room.roomID}`);
    // 服务器接收客户端发送的消息
    // 客户端发送数据
    ws.on('message', function (message) {
        // 发送的数据是字符串，需要分割为数组
        let msg = message.split(',');

        // 用户选择座位
        if (msg[0] == "seats") {
            // 更换座位，原座位恢复
            let i = room.seats.indexOf(msg[2])
            if (i > -1) {
                room.seats[i] = '空位';
            }
            // 新的座位
            room.seats[msg[1]] = msg[2];
            // 广播所有座位
            room.notify(`seats,${room.seats}`)
        }
        // 用户点击了开始游戏，发送begin到服务器
        // 所有玩家依次绘画20s，然后游戏结束广播end
        else if (msg[0] == 'begin') {
            // 每人绘画20s
            function settime() {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, 20000)
                })
            }
            room.gameBegin = true;
            (async function () {
                // 玩家分别绘画
                for (let i in room.seats) {
                    if (room.seats[i] != '空位') {
                        let subDict = dict[Math.floor(Math.random() * dict.length)];
                        let index = Math.floor(Math.random() * subDict.items.length);
                        room.guessWord = subDict.items[index];
                        // 游戏中 当前绘画玩家 关键词
                        room.notify(`begin,${room.seats[i]},${room.guessWord}`)
                        room.notify(`chat,小管家,${room.guessWord.length}个字`)
                        setTimeout(() => {
                            room.notify(`chat,小管家,${subDict.class}`)
                        }, 5000);
                        await settime()
                    }
                }
                // 所有玩家绘画完毕，游戏结束
                room.notify(`end,`)
                room.gameBegin = false;
            })()
        }
        // 游戏中，用户发送了正确的keyword
        // 广播，向每个ws发送用户猜对了
        else if (room.gameBegin && msg[0] == 'chat' && msg[2] == room.guessWord) {
            room.notify(`chat,${msg[1]},猜对啦！`)
        }
        else if (msg[0] == 'disconnect') {
            // ws剔除掉之后再广播座位变更
            let index = room.seats.indexOf(msg[1]);
            room.seats[index] = '空位';
            room.delete(msg[1]);
            room.notify(`disconnect,${room.seats}`);
        }
        else {
            // 游戏中，用户发送了错误的keyword
            // 被视作聊天，广播给所有用户
            // 绘画过程也是直接转发
            room.notify(message)
        }

    })
    // ws.on('close', function (code, reason) {
    //     console.log(code);
    //     console.log(reason);
    //     dep.notify('testclose')
    //     dep.notify(code);
    //     dep.notify(reason);
    // })
    ws.onclose = e => {
        console.log(`${e.code},${e.reason}`);
    }
}); 