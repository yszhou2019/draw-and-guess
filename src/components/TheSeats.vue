<template>
	<div class="seatContent">
		<div class="startButton">
			<!-- 房主决定游戏是否开始 -->
			<button v-if="seats[0] == username" @click="begin()" :disabled="btnNotAllow">
				开始游戏
			</button>
			<button v-else @click="seatDown(0)" :disabled="btnNotAllow">
				一楼房主
			</button>
			<div class="clear"></div>
		</div>
		<div v-for="(seat, index) in seats" :key="index" class="seats-block">
			<!-- 提示绘画者 -->
			<div class="drawuser" v-show="beginGame && drawuser == seat">
				画
			</div>
			<!-- 渲染所有的seat -->
			<!-- 渲染对应的username or 空位 -->
			<button type="primary" plain class="seat-num" :class="seat == '空位' ? 'blue' : 'green'"
				@click="seatDown(index)" :disabled="btnNotAllow">
				{{ seat }}
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TheSeats',
		data() {
			return {
				buttonShow: '空位',
				btnNotAllow: false,
			}
		},
		computed: {
			username() {
				return this.$store.state.username.username;
			},
			seats() {
				return this.$store.state.wsStore.seats;
			},
			beginGame() {
				return this.$store.state.beginGame.beginGame;
			},
			drawuser() {
				return this.$store.state.beginGame.drawUser;
			},
		},
		watch: {
			// js控制游戏开始之后禁止换座位
			beginGame(newval, oldval) {
				// 游戏结束后菜允许更换座位
				// 游戏期间禁用btn
				// let buttonEle = document.querySelectorAll('button[component="seat"]');
				// if (this.beginGame) {
				// 	for (let bt of buttonEle) {
				// 		bt.setAttribute('disabled', 'disabled');
				// 	}
				// } else {
				// 	for (let bt of buttonEle) {
				// 		bt.removeAttribute('disabled');
				// 	}
				// }

				if (this.beginGame) {
					this.btnNotAllow = true;
				}
				else {
					this.btnNotAllow = false;
				}
			}
		},
		methods: {
			// 点击位置进入座位
			seatDown(index) {
				if (this.$store.state.wsStore.ws.readyState == 3) {
					this.$message('服务器未连接');
					return;
				}
				if (this.username == null || this.username == '') {
					this.$message('请登陆');
				}
				// 占位
				else if (this.seats[index] == '空位') {
					this.$store.state.wsStore.ws.send(`seats,${index},${this.username}`);
				}
				// 占位失败
				else {
					this.$message('此位置有人');
				}
			},
			// 房主开始游戏
			begin() {
				this.$store.state.wsStore.ws.send(`begin,`);
			},
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
	.seatContent {
		width: 100%;
		height: 100%;
		text-align: center;
		display: inline-flex;
		justify-content: space-around;
		align-items: center;

		.seats-block {
			width: 15%;
			.drawuser {
				font-size: 10px;
			}
			.seat-num {
				color: #fff;
				border: 0;
				border-radius: 20px;
				padding: 12px 23px;
				line-height: 1;
				white-space: nowrap;
			}
		}
	}
	.blue {
		background-color: #409eff;
	}
	.green {
		background-color: #67c23a;
	}
</style>
