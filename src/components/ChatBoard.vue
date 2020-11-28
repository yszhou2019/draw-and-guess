<template>
	<div>
		<div class="totalBoard" ref="totalBoard" id="totalBoard">
			<!-- 聊天记录 -->
			<div v-for="(record, index) in chatRecords" :key="index" class="record">
				<span class="blue">{{ record.username }}</span>:{{ record.content }}
			</div>
			<!-- 最后有一定的空白 -->
			<div class="blank"></div>
		</div>
		<!-- 清屏按钮 -->
		<button class="clearScreen" @click="clearScreen">清屏</button>
	</div>
</template>

<script>
	// 右侧聊天框
	export default {
		name: 'ChatBoard',
		data() {
			return {
				// 聊天记录
				chatRecords: [
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},
					// {username:123,content:312},

				]
			};
		},
		watch: {
			msg(newval, oldval) {
				// 每次只会传送一个msg
				let record = {
					username: this.msg[1],
					content: this.msg[2]
				};
				this.chatRecords.push(record);
				// let div = document.getElementById('totalBoard')
				// div.scrollTop = div.scrollHeight;
				// DOM操作改进为vue的$refs操作
				// 聊天自动向下滚动
				let totalBoard = this.$refs.totalBoard;
				this.$nextTick(()=>{
					totalBoard.scrollTop = totalBoard.scrollHeight;
				})
			}
		},
		computed: {
			msg() {
				return this.$store.state.wsStore.chat;
			}
		},
		methods: {
			clearScreen() {
				this.chatRecords = [];
			}
		}
	};
</script>

<style lang="less" scoped>
	.totalBoard {
		width: 100%;
		height: 95%;
		text-align: left;
		overflow: auto;
		position: relative;
		.record {
			padding-top: 10px;
			padding-left: 20px;
		}
		.clearScreen {
			position: -webkit-sticky;
			position: sticky;
			bottom: 0;
		}
	}
	.blue {
		color: #409eff;
	}
	.blank {
		height: 30px;
	}
</style>
