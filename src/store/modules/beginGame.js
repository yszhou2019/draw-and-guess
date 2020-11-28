const state = {
    // 房间管理，游戏是否开始
    beginGame: false,
    // 当前绘图用户
    drawUser: '',
    // 关键词
    drawWord: '',
    roomID: null,
}

const mutations = {
    countDown: (state, msg) => {
        if (msg[0] == 'begin') {
            state.beginGame = true;
            state.drawUser = msg[1];
            state.drawWord = msg[2];
        } else if (msg[0] == 'end') {
            state.beginGame = false;
        } else if (msg[0] == undefined) { // 对应于一开始
            state.beginGame = false;
        }
    },
    getRoomID: (state, id) => {
        state.roomID = id;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
