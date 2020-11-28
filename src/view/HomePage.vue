<template>
	<div class="homePage">
		<home-header></home-header>
		<home-content></home-content>
	</div>
</template>

<script>
	const HomeHeader = () => import(/* webpackChunkName: "Content_Header_Home" */ '@/components/HomeHeader.vue')
	const HomeContent = () => import(/* webpackChunkName: "Content_Header_Home" */ '@/components/HomeContent.vue')
	// import HomeHeader from '../components/HomeHeader'
	// import HomeContent from '../components/HomeContent'
	export default {
		name: 'HomePage',
		components: {
			HomeHeader,
			HomeContent
		}
		// mounted() {
		// 	// 网页打开，自动创建用户，并与服务器建立连接
		// 	let ws = new WebSocket('ws://localhost:3000/');
		// 	this.$store.commit('wsStore/connect', ws);
		// 	console.log(this)
		// 	console.log(ws)
		// 	// self指向vue对象
		// 	let self = this;
		// 	// 接收wss广播的消息
		// 	ws.onmessage = (message) => {
		// 		let msg = message.data.split(',')
		// 		// 广播所有座位信息
		// 		if (msg[0] == "seats") {
		// 			self.$store.commit('wsStore/changeSeats', msg.slice(1, 7));
		// 		} 
		// 		// 广播所有聊天信息
		// 		else if (msg[0] == 'chat' && msg.length == 3) {
		// 			self.$store.commit('wsStore/acceptChat', msg);
		// 		} 
		// 		// 绘画与停止
		// 		else if (msg[0] == 'draw' || msg[0] == 'stop' || msg[0] == 'clear') {
		// 			self.$store.commit('wsStore/acceptDraw', msg);
		// 		} 
		// 		// 一局游戏的开始与结束
		// 		else if (msg[0] == 'begin' || msg[0] == 'end') {
		// 			self.$store.commit('beginGame/countDown', msg)
		// 			let username = self.$store.state.username.username;
		// 			if(msg[0] == 'begin' && msg[1] == username){
		// 				self.$store.commit('wsStore/rerender');
		// 			}
		// 		}
		// 	}
		// },
		// destroyed() {
		// 	this.$store.state.wsStore.ws.onclose();
		// }
	}
</script>

<style scoped>
	.homePage {
		height: 100%;
		/* background-image: url('/static/background.jpg') */
		background-color: #fff;
		position: relative;
	}
</style>
