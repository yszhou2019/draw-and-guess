<template>
	<div>
		<div v-if="showLogin == 1">
			<!-- <div class="loginHold" @click="hideLogin"></div>
			<div class="loginBlock">
				<p>请输入你的用户名</p>
				<input type="text" v-model="inputName" @keydown.enter="saveName" />
				<br />
				<button class="loginButton" @click="saveName">确认</button>
			</div> -->
			<el-dialog title="登录用户" :visible.sync="showLogin" width="50%" @close="dialogClosed">
				<!-- 内容主体区域 -->
				<el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="70px">
					<el-form-item label="用户名" prop="userid">
						<el-input v-model="loginForm.userid"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogClosed">取 消</el-button>
					<el-button type="primary" @click="saveID">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="header">
			<div class="header-content">
				<div class="header-left">你画我猜</div>
				<div class="header-right">
					<ul>
						<li>
							<a v-if="username == ''" @click="login">登录</a>
							<a v-else @click="login">欢迎 {{ username }}</a>
						</li>
						<li>
							<a href="https://github.com/buppt" target="_blank">Github</a>
						</li>
						<li>
							<a>{{roomID}}</a>
						</li>
						<li>
							<a @click="logout">退出</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// 点击登录，弹出登录框，点击登录框之外的部分，隐藏登录框
	// 输入的username提交之后，一方面保存到本组件中，另一方面保存到浏览器的session中
	// 刷新本页面之后，会直接从session中读取username到本组件

	// 模块负责 用户名登录 与 存储
	export default {
		name: 'PageHeader',
		data() {
			return {
				showLogin: false,
				inputName: '',
				// username: '',
				loginForm: {
					userid: ''
				},
				loginFormRules: {
					userid: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{
							min: 3,
							max: 10,
							message: '用户名的长度在3~10个字符之间',
							trigger: 'blur',
						},
					],
				}
			}
		},
		mounted() {
			// 从session中读取当前用户名
			if (!window.sessionStorage) {
				alert("浏览器不支持sessionStorage!");
			} else {
				let storage = window.sessionStorage;
				let username = storage.getItem("username");
				if (username != null && username != '') {
					// 从浏览器中读入session，然后显示已经登陆
					this.username = username;
					this.inputName = username;
					this.showLogin = false;
					this.$store.commit('username/setUsername', username)
				}
			}
		},
		computed: {
			username() {
				return this.$store.state.username.username;
			},
			roomID() {
				return this.$store.state.beginGame.roomID;
			}
		},
		methods: {
			login() {
				this.showLogin = true;
			},
			hideLogin() {
				this.showLogin = false;
			},
			// 点击保存用户名
			// 1 用户名保存到session中
			// 2 用户名保存到当前vue
			saveName() {
				if (!window.sessionStorage) {
					alert("浏览器不支持sessionStorage!");
				} else {
					let storage = window.sessionStorage;
					storage.setItem("username", this.inputName);
				}
				// 输入的用户名一方面存储到本组件的数据对象中，另一方面又存储到session
				this.username = this.inputName;
				this.showLogin = 0;
				this.$store.commit('username/setUsername', this.inputName)
			},
			logout() {
				this.$store.state.wsStore.ws.send(`disconnect,${this.$store.state.username.username}`)
				this.$store.state.wsStore.ws.close(1000, `${this.$store.state.username.username}`);
				this.$store.commit('wsStore/changeSeats', ['空位', '空位', '空位', '空位', '空位', '空位']);
				this.$store.commit('username/setUsername', '')
			},
			saveID() {
				this.$refs.loginFormRef.validate(async (valid) => {
					this.showLogin = false;
					this.$refs.loginFormRef.resetFields();
				})
			},
			dialogClosed() {
				this.showLogin = false;
				this.$refs.loginFormRef.resetFields();
			},
		},
		directives: {
			focus: {
				// 指令的定义
				inserted: function (el) {
					el.focus()
				}
			}
		}
	}
</script>
<style lang='less' scoped>
	.header {
		position: relative;
		height: 50px;
		line-height: 50px;
		color: #222;
		width: 100%;
		text-align: center;
		font-size: 17px;
		background-color: rgba(255, 255, 255, 1);
		-webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		.header-content {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 980px;
			text-align: center;
			.header-left {
				float: left;
				cursor: pointer;
				font-size: 20px;
			}
			.header-right {
				float: right;
				ul {
					list-style: none;
					position: relative;
					display: flex;
					margin: 0;
					padding: 0;
					li {
						position: relative;
						color: #000;
						transition: 0.2s all linear;
						cursor: pointer;
						margin-right: 15px;
						padding: 0 2px;
						a {
							text-decoration: none;
							color: #333;
						}
					}
					li::before {
						content: "";
						position: absolute;
						top: 0;
						left: 100%;
						width: 0;
						height: 90%;
						border-bottom: 2px solid #000;
						transition: 0.2s all linear;
					}
					li:hover::before {
						width: 100%;
						top: 0;
						left: 0;
						transition-delay: 0.1s;
						border-bottom-color: #000;
						z-index: -1;
					}
					li:hover ~ li::before {
						left: 0;
					}
					li:active {
						background: #eee;
						color: #fff;
					}
				}
			}
		}
	}
	// deprecated
	// .loginTotal {
	// 	position: fixed;
	// 	width: 100%;
	// 	height: 100%;
	// 	z-index: 100;
	// 	.loginHold {
	// 		background-color: rgba(0, 0, 0, 0.7);
	// 		position: absolute;
	// 		width: 100%;
	// 		height: 100%;
	// 		z-index: 100;
	// 	}
	// 	.loginBlock {
	// 		position: relative;
	// 		width: 300px;
	// 		height: 150px;
	// 		background-color: #fff;
	// 		top: 50%;
	// 		left: 50%;
	// 		margin: -75px 0 0 -150px;
	// 		padding-top: 30px;
	// 		z-index: 101;
	// 		.loginButton {
	// 			margin-top: 15px;
	// 		}
	// 	}
	// }
</style>
