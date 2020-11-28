<template>
	<div>
		<div class="drawBoard">
			<!-- 绘图工具选择 -->
			<div class="canvasSetting">
				<!-- 4选1 设置drawType -->
				<label><input name="drawType" type="radio" value="画笔" v-model="drawType" />画笔
				</label>
				<br />
				<label><input name="drawType" type="radio" value="直线" v-model="drawType" />直线
				</label>
				<br />
				<label><input name="drawType" type="radio" value="矩形" v-model="drawType" />矩形
				</label>
				<br />
				<label><input name="drawType" type="radio" value="圆" v-model="drawType" />圆
				</label>
				<br />
				填充颜色：
				<input type="color" v-model="fillColor" />
				<br />
				选择颜色：
				<input type="color" v-model="drawColor" />
				<br />
				笔粗细
				<input type="range" v-model="drawLineWidth" min="1" max="10" />{{ drawLineWidth }}
				<br />
				线端点类型
				<select v-model="lineEndType">
					<option>默认</option>
					<option>半圆</option>
					<option>矩形</option>
				</select>
				<br />
				矩形角类型
				<select v-model="lineNodeType">
					<option>默认</option>
					<option>半圆</option>
					<option>斜角</option>
				</select>
			</div>
			<!-- 画板 -->
			<canvas id="drawBoard" ref="drawBoard" width="700" height="400"></canvas>
			<!-- 清屏按钮 -->
			<button class="clearButton" @click="clearDraw()">clear</button>
		</div>
		<br />
	</div>
</template>

<script>
	// 绘画画板
	export default {
		name: "DrawBoard",
		data() {
			return {
				// draw 指的是新建一个canvas画板
				draw: null,
				// 画笔粗细
				drawColor: "#000000",
				// 填充颜色
				fillColor: "#000000",
				// 画笔粗细 1-10
				drawLineWidth: 1,
				// drawType 画笔 直线 矩形 圆
				drawType: "画笔",
				// 线的端点类型 默认 半圆 矩形
				lineEndType: "默认",
				// 矩形顶点类型 默认 半圆 斜角
				lineNodeType: "默认"
			};
		},
		// 在模板渲染成HTML之后调用，可以进行DOM操作
		// 创建一个绑定ws的画板，绘画的同时传送数据
		mounted: function () {
			// 构造函数 用canvas的id和ws新建一个canvas对象
			// console.log(this.$store.state.wsStore.ws)
			this.draw = new canvasDraw(this.$refs.drawBoard, this.$store.state.wsStore.ws, this.$store.state.beginGame.beginGame);
			// 绘制
			this.draw.draw();
		},
		created: function () {
			console.log("drawboard created")
		},
		// 侦听绘画工具的变化
		watch: {
			// 更改画笔颜色
			drawColor() {
				this.draw.changeColor(this.drawColor);
			},
			// 更改画笔宽度
			drawLineWidth() {
				this.draw.changeLineWidth(this.drawLineWidth);
			},
			// 更改填充颜色
			fillColor() {
				this.draw.changeFillColor(this.fillColor);
			},
			lineEndType() {
				let lineEndType = {
					默认: "butt",
					半圆: "round",
					矩形: "square"
				};
				this.draw.changeLineEnd(lineEndType[this.lineEndType]);
			},
			lineNodeType() {
				let lineNodeType = {
					默认: "miter",
					半圆: "round",
					斜角: "bevel"
				};
				this.draw.changeLineNode(lineNodeType[this.lineNodeType]);
			},
			// 更改绘图类型
			drawType() {
				if (this.drawType === "直线") {
					this.draw.drawLine();
				} else if (this.drawType === "矩形") {
					this.draw.drawRect();
				} else if (this.drawType === "圆") {
					this.draw.drawRound();
				} else {
					this.draw.draw();
				}
			}
		},
		methods: {
			clearDraw: function () {
				this.draw.clearCanvas();
			}
		}
	};
	class canvasDraw {
		// 构造函数 用canvas的id以及ws新建一个canvas对象
		// 调用函数的时候 绘图的同时自动传送数据
		constructor(canvas, ws, beginGame) {
			this.ws = ws;
			this.canvas = canvas;
			// this.canvas = document.getElementById(id);
			this.ctx = this.canvas.getContext("2d");
			// DOM返回可视区域的对象，包含属性left right top bottom width height
			this.stage_info = this.canvas.getBoundingClientRect();
			// 鼠标的移动信息
			this.path = {
				beginX: 0,
				beginY: 0,
				endX: 0,
				endY: 0
			};
			// 当前是否在绘画，用于画笔方式记录是否按下鼠标
			this.isDraw = false;
			// 新增
			// 画笔颜色
			this.color = 'black';
			// 填充颜色
			this.fillColor = 'white';
			// 游戏中，只有当true的时候才发送
			this.beginGame = beginGame;
			// 考虑添加个msg，所有的绘画操作会重置msg，方便抽象出来send
			this.msg = '';
		}
		// 画笔属性设置，依次是画笔颜色 画笔粗细 填充颜色 端点类型 矩形顶点类型
		changeColor(color) {
			this.ctx.strokeStyle = color;
			this.msg = `color,${color}`;
			this.sendMsg();
		}
		changeLineWidth(lineWidth) {
			this.ctx.lineWidth = lineWidth;
			this.msg = `lineWidth,${lineWidth}`;
			this.sendMsg();
		}
		changeFillColor(color) {
			this.ctx.fillStyle = color;
			this.msg = `fillColor,${color}`;
			this.sendMsg();
		}
		changeLineEnd(lineEndtype) {
			this.ctx.lineCap = lineEndtype;
			this.msg = `lineEndType,${lineEndtype}`;
			this.sendMsg();
		}
		changeLineNode(lineNode) {
			this.ctx.lineJoin = lineNode;
			this.msg = `lineNode,${lineNode}`;
			this.sendMsg();
		}
		// 不同的绘图工具，实际上是给鼠标移动事件绑定了不同的绘图函数以及ws传输
		drawLine() {
			this.canvas.onmousedown = () => {
				this.ctx.beginPath();
				this.path.beginX = event.pageX - this.stage_info.left;
				this.path.beginY = event.pageY - this.stage_info.top;
				this.ctx.moveTo(this.path.beginX, this.path.beginY);
			};
			this.canvas.onmouseup = () => {
				this.path.endX = event.pageX - this.stage_info.left;
				this.path.endY = event.pageY - this.stage_info.top;
				this.ctx.lineTo(this.path.endX, this.path.endY);
				this.ctx.stroke();
				this.msg = `drawline,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`;
				this.sendMsg();
				// if (this.beginGame)
				// 	this.ws.send(
				// 		`drawline,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`
				// 	);
			};
		}
		// 矩形的填充颜色以及边框颜色也应该发送，目前还没有发送
		drawRect() {
			this.canvas.onmousedown = () => {
				this.ctx.beginPath();
				this.path.beginX = event.pageX - this.stage_info.left;
				this.path.beginY = event.pageY - this.stage_info.top;
			};
			this.canvas.onmouseup = () => {
				this.path.endX = event.pageX - this.stage_info.left;
				this.path.endY = event.pageY - this.stage_info.top;
				this.ctx.rect(
					this.path.beginX,
					this.path.beginY,
					this.path.endX - this.path.beginX,
					this.path.endY - this.path.beginY
				);
				this.ctx.fill();
				this.ctx.stroke();
				this.msg = `drawrect,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`;
				this.sendMsg();
				// if (this.beginGame)
				// 	this.ws.send(
				// 		`drawrect,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`
				// 	);
			};
		}
		// 圆形的填充颜色以及边框颜色也应该发送，目前还没有发送
		drawRound() {
			this.canvas.onmousedown = () => {
				this.ctx.beginPath();
				this.path.beginX = event.pageX - this.stage_info.left;
				this.path.beginY = event.pageY - this.stage_info.top;
			}
			this.canvas.onmouseup = () => {
				this.path.endX = event.pageX - this.stage_info.left;
				this.path.endY = event.pageY - this.stage_info.top;
				let width = this.path.endX - this.path.beginX;
				let height = this.path.endY - this.path.beginY;
				this.ctx.arc(
					this.path.beginX + width / 2,
					this.path.beginY + height / 2,
					Math.sqrt(width * width + height * height) / 2,
					0,
					Math.PI * 2
				);
				this.ctx.fill();
				this.ctx.stroke();
				this.msg = `drawround,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`;
				this.sendMsg();
				// if (this.beginGame)
				// 	this.ws.send(
				// 		`drawround,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`
				// );
			};
			// mousedown的时候发送事件
			// mousemove的时候draw还是show都需要显示当前的绘图
			// mousemove的时候进行ctx.arc/ctx.rect和fill
			// mouseup的时候进行stroke
			// 不行，
		}
		// 绘制鼠标轨迹，唯一将数据发送到服务器的绘图
		draw() {
			let that = this;
			this.canvas.onmousedown = () => {
				that.ctx.beginPath();
				that.path.beginX = event.pageX - that.stage_info.left;
				that.path.beginY = event.pageY - that.stage_info.top;
				// 设定画笔的起点
				that.ctx.moveTo(that.path.beginX, that.path.beginY);
				that.isDraw = true;
			};
			this.canvas.onmousemove = () => {
				if (that.isDraw) {
					that.drawing(event);
				}
			};
			this.canvas.onmouseup = () => {
				that.isDraw = false;
				this.msg = "stop,";
				this.sendMsg();
				// if (this.beginGame)
				// 	that.ws.send("stop,");
			};
		}
		drawing(e) {
			this.path.endX = e.pageX - this.stage_info.left;
			this.path.endY = e.pageY - this.stage_info.top;
			this.ctx.lineTo(this.path.endX, this.path.endY);
			this.ctx.stroke();
			this.msg = `draw,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`;
			this.sendMsg();
			// if (this.beginGame)
			// 	this.ws.send(
			// 		`draw,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`
			// 	);
		}
		clearCanvas() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.msg = "clear,";
			this.sendMsg();
			// if (this.beginGame)
			// 	this.ws.send("clear,");
		}
		sendMsg() {
			// console.log('尝试发送')
			if (this.beginGame) {
				// console.log('圆形发送成功')
				this.ws.send(this.msg);
				// console.log(this.msg);
			}
		}
		// 整个橡皮擦
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.drawBoard {
		text-align: center;
		margin-top: 10px;
		white-space: nowrap;
	}
	.canvasSetting {
		vertical-align: top;
		text-align: left;
		width: 150px;
		display: inline-block;
	}
	input[type="range"] {
		width: 45%;
	}
	#drawBoard {
		border: 1px solid black;
	}
	.guassWord {
		float: left;
		margin-left: 20px;
	}
	.clearButton {
		vertical-align: bottom;
	}
	.clear {
		clear: both;
	}
</style>
