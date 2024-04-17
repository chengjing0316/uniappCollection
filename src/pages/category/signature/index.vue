<template>
	<view>
		<view class="wrapper row">
			<view class="handBtn">
				<button @click="handleReset" class="delBtn row flex-center"><text class="delText">重新签名</text></button>
				<button @click="handleSubmit" class="saveBtn row flex-center"><text class="saveText">保存签名</text></button>
			</view>
			<view class="handCenter">
				<canvas
					class="handWriting"
					:disable-scroll="true"
					@touchstart="touchstart"
					@touchmove="touchmove"
					@touchend="touchend"
					canvas-id="myCanvas"
					:style="{ width: width + 'px', height: height + 'px' }"
				></canvas>
				<!--用于旋转图片的canvas容器-->
				<canvas style="position: absolute" :style="{ width: height + 'px', height: width + 'px' }" canvas-id="myCanvas2"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ctx: '', //绘图图像
			points: [], //路径点集合,
			width: 0, //绘图宽度
			height: 0, //绘图高度
			hasSign: false, //是否已签名
			isInit: false, //是否已触摸
			scale: 1
		};
	},
	mounted() {
		const _self = this;
		this.ctx = uni.createCanvasContext('myCanvas', this); //创建绘图对象
		//设置画笔样式
		this.ctx.lineWidth = 4;
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		uni.getSystemInfo({
			success: function (res) {
				_self.width = res.windowWidth - 95;
				_self.height = res.windowHeight - 30;
			}
		});
	},
	methods: {
		/**
		 * 触摸开始，获取到起点
		 */
		touchstart: function (e) {
			if (!this.isInit) {
				this.isInit = true;
				this.handleReset();
			}
			let startX = e.changedTouches[0].x;
			let startY = e.changedTouches[0].y;
			let startPoint = {
				X: startX,
				Y: startY
			};
			this.points.push(startPoint);
			//每次触摸开始，开启新的路径
			this.ctx.beginPath();
		},
		/**
		 * 触摸移动，获取到路径点
		 */
		touchmove: function (e) {
			let moveX = e.changedTouches[0].x;
			let moveY = e.changedTouches[0].y;
			let movePoint = {
				X: moveX,
				Y: moveY
			};
			this.points.push(movePoint); //存点
			let len = this.points.length;
			if (len >= 2) {
				this.draw(); //绘制路径
			}
		},
		/**
		 *  触摸结束，将未绘制的点清空防止对后续路径产生干扰
		 */
		touchend: function () {
			this.points = [];
			this.ctx.draw(true);
		},
		/**
		 * 绘制笔迹
		 * 1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
		 * 2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
		 * 3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
		 */
		draw: function () {
			let point1 = this.points[0];
			let point2 = this.points[1];
			this.points.shift();
			this.ctx.moveTo(point1.X, point1.Y);
			this.ctx.lineTo(point2.X, point2.Y);
			this.ctx.stroke();
			this.ctx.draw(true);
			this.hasSign = true;
		},
		//清空画布
		handleReset: function () {
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.ctx.draw(true);
			this.hasSign = false;
		},
		/**
		 *保存签名
		 */
		handleSubmit() {
			const _self = this;
			if (!this.hasSign) {
				uni.showToast({
					title: '签名不能为空',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			uni.canvasToTempFilePath(
				{
					fileType: 'png',
					quality: 1, //图片质量
					canvasId: 'myCanvas',
					success(res) {
						uni.getImageInfo({
							// 获取图片的信息
							src: res.tempFilePath,
							success: (res1) => {
								// 将canvas1的内容复制到canvas2中
								let canvasContext = uni.createCanvasContext('myCanvas2', _self);
								canvasContext.translate(0, _self.width);
								canvasContext.rotate((-90 * Math.PI) / 180);
								canvasContext.drawImage(res.tempFilePath, 0, 0, _self.width, _self.height);
								canvasContext.draw(false, () => {
									// 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
									uni.canvasToTempFilePath(
										{
											// 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
											fileType: 'png',
											quality: 1, //图片质量
											canvasId: 'myCanvas2',
											complete(res2) {
												//此处是将图片文件传给父级组件上传至后台
												_self.$emit('submitSignature', res2.tempFilePath);
											}
										},
										_self
									);
								});
							}
						});
					}
				},
				this
			);
		},
		//返回上级
		handleBack() {
			this.handleReset();
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss">
page {
	background: #ddd;
	height: 100%;
	overflow: hidden;
}

.wrapper {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	/* height: 100; */
	margin: 20rpx;
	overflow: hidden;
	font-size: 28rpx;
	justify-content: space-between;
	align-items: stretch;
	background-color: #ddd;
}

.handCenter {
	border: #aaa dotted 1px;
	width: 565rpx;
	flex: 1;
	overflow: hidden;
	box-sizing: border-box;
}

.handWriting {
	background: #fff;
	width: 100%;
}

.handBtn button {
	font-size: 28rpx;
}

.handBtn {
	width: 118rpx;
	margin-right: 21rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.delBtn {
	flex: 1;
	width: 118rpx;
	color: #666;
	border: 3rpx solid transparent;
	border-radius: 59rpx;
	background-clip: padding-box, border-box;
	background-origin: padding-box, border-box;
	background-image: linear-gradient(to right, #fff, #fff), linear-gradient(180deg, #4da7a8, #84d5d6);
	.delText {
		font-family: PingFangSC, PingFang SC;
		font-size: 36rpx;
		font-weight: 500;
		color: #000000;
		transform: rotate(90deg);
		display: inline-block;
		white-space: nowrap;
		line-height: 50rpx;
	}
}

.saveBtn {
	margin-top: 24rpx;
	flex: 1;
	width: 118rpx;
	color: #666;
	background: linear-gradient(#4da7a8, #84d5d6);
	border-radius: 59rpx;
	.saveText {
		font-family: PingFangSC, PingFang SC;
		font-size: 36rpx;
		font-weight: 500;
		color: #ffffff;
		transform: rotate(90deg);
		display: inline-block;
		white-space: nowrap;
		line-height: 50rpx;
	}
}
</style>
