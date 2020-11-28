<template>
	<div>
		<div class="totalBoard">
			<!-- 输入框 -->
			<input class="inputContent" type="text" v-model="guassWord" placeholder="这里输入内容" @keydown.enter="submitWord"
				ref="input" :disabled="allowSend" />
			<!-- 发送按钮 -->
			<el-button type="primary" class="submitButton" @click="submitWord" ref="btn" 	:disabled="allowSend">发送
			</el-button>
		</div>
	</div>
</template>

<script>
	// 右侧输入框
	export default {
		name: 'ChatBoard',
		data() {
			return {
				guassWord: '',
				allowSend: false,
				// inputEle:null,
				// buttonEle:null
			}
		},
		// mounted:function() {
		// 	this.inputEle = this.$refs.input;
		// 	this.buttonEle = this.$refs.btn;
		// },
		computed: {
			// 当前用户名
			username() {
				return this.$store.state.username.username;
			},
			// 作图用户名
			drawuser() {
				return this.$store.state.beginGame.drawUser;
			},
		},
		watch: {
			// 绘图用户不能聊天 猜图用户允许聊天
			drawuser(newval, oldval) {
				// 出现问题，refs不能用DOM的function
				if (this.drawuser == this.username) {
					this.allowSend = true;
				}
				else {
					this.allowSend = false;
				}
				// let inputEle = document.querySelector('input[component="inputBoard"]');
				// let buttonEle = document.querySelector('button[component="inputBoard"]');
				// if (this.drawuser == this.username) {
				// 	inputEle.setAttribute('disabled', 'disabled')
				// 	buttonEle.setAttribute('disabled', 'disabled');
				// } else {
				// 	inputEle.removeAttribute('disabled');
				// 	buttonEle.removeAttribute('disabled');
				// }
			}
		},
		methods: {
			// 提交input内容
			submitWord() {
				if (this.$store.state.wsStore.ws.readyState == 3) {
					this.$message('服务器未连接');
					return;
				}
				if (this.username == null || this.username == '') {
					this.$message('请登陆');
					return;
				}
				// 点击发送消息 
				if (this.guassWord != '') {
					this.$store.state.wsStore.ws.send(`chat,${this.username},${this.guassWord}`);
					this.guassWord = '';
				}
			}
		}
	}
</script>

<style lang='less' scoped>
	.totalBoard {
		margin: 10px auto;
		width: 90%;
		height: 70%;
		border: 1px solid #000;
		border-radius: 6px;
		overflow: hidden;
		.inputContent {
			height: 90%;
			width: 65%;
			border: 0px;
			outline: none;
			background-color: transparent;
		}
		.submitButton {
			height: 100%;
			width: 26%;
			float: right;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
</style>
