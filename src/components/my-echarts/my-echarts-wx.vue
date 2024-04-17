<template>
	<view :style="{width, height}" class="echarts_css">
		<image class="echarts_img" v-if="echartImg" :src="echartImg" :style="{width, height}"></image>
		<canvas type="2d" :canvas-id="canvasId" class="ec-canvas" :style="{
				width,
				height,				
				left: echartsLeft + 'px'
			}">
		</canvas>
	</view>
</template>

<script>
	import WxCanvas from "./wx-canvas";
	import * as echarts from "echarts"; // 需要使用5.2.2的压缩版本
	let $curChart = null
	export default {
		data() {
			return {
				echartImg: '',
				errNum: 0,
				$curChart: null,
				toHandleList: [],
				echartsLeft: 0
			}
		},
		props: {
			canvasId: {
				type: String,
				default: "ec-canvas"
			},
			data: {
				type: Object
			},
			width: {
				type: String,
				default: '750rpx'
			},
			height: {
				type: String,
				default: '350rpx'
			},
			delay: {
				type: Number,
				default: 1200
			}
		},
		watch: {
			data: {
				deep: true,
				immediate: true,
				handler(val, oldVal) {
					this.init(val);
				}
			}
		},
		methods: {
			init() {
				if (!this.data) {
					console.warn(
						'组件需绑定 data 变量，例：<ec-canvas id="mychart-dom-bar" ' +
						'canvas-id="mychart-bar" data="{{ data }}"></ec-canvas>'
					);
					return;
				}
				const that = this
				this.echartImg = ''
				this.echartsLeft = 0
				const query = wx.createSelectorQuery().in(this);
				query.select(".ec-canvas").fields({
					node: true,
					size: true
				}).exec(res => {
					const canvasNode = res[0].node;
					const canvasDpr = wx.getSystemInfoSync().pixelRatio;
					const canvasWidth = res[0].width;
					const canvasHeight = res[0].height;
					const ctx = canvasNode.getContext("2d");
					const canvas = new WxCanvas(ctx, this.canvasId, true, canvasNode);
					echarts.setCanvasCreator(() => {
						return canvas;
					});
					that.initChart(canvas, canvasWidth, canvasHeight, canvasDpr, canvasNode)
				});
			},
			initChart(canvas, width, height, canvasDpr, canvasNode) {
				const obj = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: canvasDpr
				})
				$curChart = obj
				canvas.setChart($curChart);
				$curChart.setOption(this.data);
				this.getEchartsImg(canvasNode)
			},
			getEchartsImg(canvasNode) {
				const that = this
				setTimeout(() => { // 需要等echarts绘画完成，所以需要延迟1500ms
					uni.canvasToTempFilePath({
						canvas: canvasNode,
						quality: 1,
						success: res => {
							this.echartsLeft = -10000
							this.echartImg = res.tempFilePath
							this.errNum = 0
						},
						fail: err => {
							if (this.errNum < 20) {
								setTimeout(() => {
									this.errNum++
									this.getEchartsImg(canvasNode)
								}, 300)
							}
						},
					}, this);
				}, this.delay)
			}
		}
	};
</script>

<style lang="scss">
	.echarts_css {
		position: relative;

		.ec-canvas {
			position: absolute;
			top: 0;
		}

		.echarts_img {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>