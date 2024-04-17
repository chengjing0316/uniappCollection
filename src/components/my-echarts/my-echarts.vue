<template>
	<!-- #ifdef MP-WEIXIN -->
		<myEchartsWx :canvasId="canvasId" :width="width" :height="height" :delay="delay" :data="data"/>
	<!-- #endif -->
	<!-- #ifdef APP-PLUS || H5 -->
		<myEchartsH5 :width="width" :height="height" :isDark="isDark" :data="data"/>
	<!-- #endif -->
</template>

<script setup>
	import myEchartsH5 from './my-echarts-h5.vue'
	import myEchartsWx from './my-echarts-wx.vue'
	defineProps({		
		isDark: {
			type: Boolean,
			default: false
		},
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
	})
</script>

<style>
</style>