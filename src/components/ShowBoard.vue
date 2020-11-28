<template>
	<div>
		<div class="showBoard">
			<canvas id="showing" ref="showing" width="700" height="400"></canvas>
		</div>
	</div>
</template>

<script>
	// 展示画板
	export default {
		name: 'ShowBoard',
		data() {
			return {
				canvas: '',
				ctx: '',
				draw: '',
				isDraw: 1,
				stage_info: null
			}
		},
		// DOM操作的初始化
		mounted: function () {
			this.canvas = this.$refs.showing;
			// this.canvas = document.getElementById('showing');
			this.stage_info = this.canvas.getBoundingClientRect();
			this.ctx = this.canvas.getContext('2d')
			this.ctx.strokeStyle = "#000";
		},
		// 侦听wss广播的数据
		watch: {
			// 信息远程控制
			// 控制画笔信息可以分割成多个函数
			msg(newval, oldval) {
				// 绘画 or 绘画完毕
				if (this.msg[0] == "draw" || this.msg[0] == "stop") {
					// msg[0]="draw" 且每次移动鼠标需要重置鼠标位置，之后的鼠标移动不需要设置鼠标的start 只需要end即可
					if (this.isDraw == 1 && this.msg[0] == 'draw') {
						this.ctx.beginPath()
						this.ctx.moveTo(this.msg[1], this.msg[2])
						this.isDraw = 0
					}
					// msg[0]="stop"
					else if (this.isDraw == 0 && this.msg[0] == 'stop') {
						this.isDraw = 1
					}
					// move
					this.ctx.lineTo(this.msg[3], this.msg[4])
					this.ctx.stroke()
				}
				else if (this.msg[0] == "drawline") {
					this.ctx.beginPath()
					this.ctx.moveTo(this.msg[1], this.msg[2]);
					this.ctx.lineTo(this.msg[3], this.msg[4]);
					this.ctx.stroke();
				}
				else if (this.msg[0] == "drawrect") {
					this.ctx.beginPath();
					this.ctx.rect(
						this.msg[1],
						this.msg[2],
						this.msg[3] - this.msg[1],
						this.msg[4] - this.msg[2]
					);
					this.ctx.fill();
					this.ctx.stroke();
				}
				else if (this.msg[0] == "drawround") {
					this.ctx.beginPath();
					console.log(this.msg)
					let width = this.msg[3] - this.msg[1];
					let height = this.msg[4] - this.msg[2];
					this.ctx.arc(
						this.msg[1] + width / 2,
						this.msg[2] + height / 2,
						Math.sqrt(width * width + height * height) / 2,
						0,
						Math.PI * 2
					);
					this.ctx.fill();
					this.ctx.stroke();
				}
				else if (this.msg[0] == 'clear') {
					this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				}
				else if (this.msg[0] == 'color') {
					// console.log(this.msg[1])
					this.ctx.strokeStyle = this.msg[1];
				}
				else if (this.msg[0] == 'lineWidth') {
					// console.log(this.msg[1])
					this.ctx.lineWidth = this.msg[1];
				}
				else if (this.msg[0] == 'fillColor') {
					// console.log(this.msg[1])
					this.ctx.fillStyle = this.msg[1];
				}
				else if (this.msg[0] == 'lineEndType') {
					// console.log(this.msg[1])
					this.ctx.lineCap = this.msg[1];
				}
				else if (this.msg[0] == 'lineNode') {
					// console.log(this.msg[1])
					this.ctx.lineJoin = this.msg[1];
				}
			}
		},
		// 从服务器接收的绘画信息
		computed: {
			msg() {
				return this.$store.state.wsStore.draw;
			},
		},
		methods: {
			// 完全多余
			clearDraw: function () {
				this.draw.clearCanvas();
			},

		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.showBoard {
		text-align: center;
		margin-top: 10px;
		white-space: nowrap;
	}
	#showing {
		border: 1px solid black;
	}
</style>
