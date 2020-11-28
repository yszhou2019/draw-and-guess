const state = {
    // 与画板绑定的ws 用于向服务器发送数据
    // 一个页面对应一个画板对应一个ws
    ws: null,
    // 座位信息
    seats: ['空位', '空位', '空位', '空位', '空位', '空位'],
    // 聊天信息
    chat: [],
    // 从服务器接收的绘画信息
    draw: [],
    // 用于:key 重新渲染
    drawKey: 0,
    // 本地随机生成userid
    // userid: null,
}

const mutations = {
    // 新打开一个网页
    connect: (state, ws) => {
        state.ws = ws
    },
    // 接收座位信息 size=6的数组
    changeSeats: (state, msg) => {
        state.seats = msg;
    },
    // 接收聊天信息 ['chat',username,guessword]
    acceptChat: (state, msg) => {
        state.chat = msg;
    },
    // 接收的绘画相关的信息
    acceptDraw: (state, msg) => {
        state.draw = msg;
    },
    // 更改key 以强制更新drawboard 重新渲染drawboard 从而绑定ws
    rerender: (state) => { 
        console.log('重新渲染')
        state.drawKey++;
    },
    userleave: (state, index) => {
        console.log('userleave')
        state.seats[index] = '空位';
    },
    // acceptUserID: (state, id) => {
    //     state.userid = id;
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
}
