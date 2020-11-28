const state = {
    // 当前客户端登录的用户名
    username: '',
    // 当前用户得分 暂时没用
    count: 0
}

const mutations = {
    getUsername: state => state.username,
    setUsername: (state, username) => {
        state.username = username;
    },
    increment(state, n) {
        state.count += n
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
