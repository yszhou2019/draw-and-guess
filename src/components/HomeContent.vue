<template>
	<div class="homeContent">
		<!-- 左侧绘图画板以及座位组件 -->
		<div class="boardleft">
			<!-- 绘图画板 -->
			<div class="showBoard">
				<!-- 如果游戏中，那么显示绘图用户以及剩余时间，否则显示提示文本 -->
				<div v-if="beginGame">
					当前画家：{{ drawuser }} 剩余时间：{{ second }}
				</div>
				<div v-else>请等待一楼开始游戏</div>
				<!-- 如果游戏中，且当前用户不是绘图用户，那么仅仅显示绘制的图片 -->
				<show-board v-if="beginGame && drawuser != username" :key="drawKey"></show-board>
				<!-- 如果游戏中，且当前用户是绘图用户，那么显示绘画工具 -->
				<draw-board v-else :key="drawKey"></draw-board>
				<!-- 游戏中，且是绘图用户，需要额外显示需要绘制的词汇 -->
				<div v-show="beginGame && drawuser === username" class="guassWord">
					要画的词是：{{ guassWord }}
				</div>
				<!-- <div v-show="beginGame && drawuser != username" class="guassWord">{{guassWord.length}}个字</div> -->
			</div>
			<!-- 座位组件 -->
			<the-seats class="seat"></the-seats>
		</div>
		<!-- 右侧聊天框以及输入框组件 -->
		<div class="boardright">
			<!-- 聊天框 -->
			<chat-board class="chatBoard"></chat-board>
			<!-- 输入框 -->
			<input-board class="inputBoard"></input-board>
		</div>
		<!-- 清理聊天框 -->
		<div class="clear"></div>
	</div>
</template>

<script>
	const DrawBoard = () => import(/* webpackChunkName: "Draw_Show_Seats" */ '@/components/DrawBoard.vue')
	const ShowBoard = () => import(/* webpackChunkName: "Draw_Show_Seats" */ '@/components/ShowBoard.vue')
	const TheSeats = () => import(/* webpackChunkName: "Draw_Show_Seats" */ '@/components/TheSeats.vue')
	const ChatBoard = () => import(/* webpackChunkName: "Draw_Show_Seats" */ '@/components/ChatBoard.vue')
	const InputBoard = () => import(/* webpackChunkName: "Draw_Show_Seats" */ '@/components/InputBoard.vue')
	// import ChatBoard from './ChatBoard'
	// import InputBoard from './InputBoard'
	export default {
		name: 'HomeContent',
		components: {
			DrawBoard,
			ShowBoard,
			TheSeats,
			ChatBoard,
			InputBoard
		},
		data() {
			return {
				second: 20,
				timer: null
			}
		},
		// vuex中的属性都作为计算属性
		computed: {
			username: function () {
				return this.$store.state.username.username;
			},
			drawuser: function () {
				return this.$store.state.beginGame.drawUser;
			},
			beginGame: function () {
				return this.$store.state.beginGame.beginGame;
			},
			guassWord: function () {
				return this.$store.state.beginGame.drawWord;
			},
			drawKey: function () {
				return this.$store.state.wsStore.drawKey;
			}
		},
		// 侦听属性，需要数据变化时执行异步或开销较大的操作
		// watch侦听的属性，允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态
		watch: {
			// 用watch监听当前绘图用户，绘图用户发生变化，就重置倒计时
			drawuser: function (newval, oldval) {
				this.second = 20;
				this.countDown();
			}
		},
		methods: {
			// 递归函数
			countDown() {
				clearInterval(this.timer);
				this.timer = null;
				this.timer = setInterval(() => {
					this.second--; // this仍然指向HomeContent组件
					if (this.second === 0) {
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			}
		},
		mounted() {
			// 网页打开，自动创建用户，并与服务器建立连接
			let ws = new WebSocket('ws://localhost:3000/');
			this.$store.commit('wsStore/connect', ws);
			// this.$store.commit('wsStore/acceptUserID', userid);
			console.log(ws)
			// self指向vue对象 箭头函数内部没有this 如果不保留，则会指向window对象 因此需要提前保留
			let self = this;
			let drawKeyWord = ['drawline', 'drawrect', 'drawround', 'color', 'lineWidth', 'fillColor', 'lineEndType', 'lineNode'];
			// 接收wss广播的消息
			ws.onmessage = (message) => {
				let msg = message.data.split(',')
				// 广播所有座位信息
				if (msg[0] === "seats") {
					self.$store.commit('wsStore/changeSeats', msg.slice(1, 7));
				}
				// 广播所有聊天信息
				else if (msg[0] === 'chat' && msg.length === 3) {
					self.$store.commit('wsStore/acceptChat', msg);
				}
				// 绘画与停止
				else if (msg[0] === 'draw' || msg[0] === 'stop' || msg[0] === 'clear') {
					self.$store.commit('wsStore/acceptDraw', msg);
				}
				// 一局游戏的开始与结束
				else if (msg[0] === 'begin' || msg[0] === 'end') {
					self.$store.commit('beginGame/countDown', msg)
					// let username = self.$store.state.username.username;
					// if (msg[0] === 'begin' && msg[1] === username) {
					// console.log(msg[0]);
					self.$store.commit('wsStore/rerender');
					// }
				}
				else if (drawKeyWord.includes(msg[0])) {
					self.$store.commit('wsStore/acceptDraw', msg);
				}
				else if (msg[0] === 'disconnect') {
					// self.$store.commit('wsStore/userleave', msg[1]);
					self.$store.commit('wsStore/changeSeats', msg.slice(1, 7));
				}
				else if (msg[0] === 'userid') {
					// 暂时用userid充当username
					console.log(msg[1])
					self.$store.commit('username/setUsername', msg[1])
				}
				else if (msg[0] === 'roomID') {
					self.$store.commit('beginGame/getRoomID', msg[1])
				}
			}
			window.onbeforeunload = (e) => {
				self.$store.state.wsStore.ws.send(`disconnect,${self.$store.state.username.username}`)
				self.$store.state.wsStore.ws.close(1000, `${self.$store.state.username.username}`);
			}
			// setTimeout(()=>{
			// 	this.$destroy()
			// },5000);
		}
	}
</script>

<style lang='less' scoped>
	.homeContent {
		position: absolute;
		//overflow: hidden;
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		bottom: 30px;
		top: 70px;
		right: 30px;
		left: 0;
		.boardleft {
			flex: 3;
			//border: 1px solid #e5e4e4;
			margin-left: 30px;
			.showBoard {
				height: 88%;
			}
			.seat {
				border: 1px solid #e5e4e4;
				height: 12%;
			}
		}
		.boardright {
			margin-left: 30px;
			flex: 1;
			border: 1px solid #e5e4e4;
			border-radius: 5px;

			.chatBoard {
				height: 88%;
				background-color: #fff;
			}
			.inputBoard {
				border-top: 1px solid #e5e4e4;
				height: 12%;
			}
		}
	}
	.clear {
		clear: both;
	}
</style>
