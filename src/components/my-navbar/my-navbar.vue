<template>
	<u-navbar
		:height="40"
		v-if="mode === 'home'"
		@leftClick="leftClick"
		:placeholder="true"
		:fixed="true"
		:border="true"
		:autoBack="false"
		:bgColor="bgColor">
		<template #left>
			<text class="size-38" :style="{color: textColor}">{{ title }}</text>
		</template>
	</u-navbar>
	<u-navbar
		v-else-if="mode === 'back'"
		:title="title"
		:height="40"
		@leftClick="leftClick"
		:placeholder="true"
		:fixed="true"
		:autoBack="false"
		:bgColor="bgColor">
		<template #left>
			<u-icon v-if="!isFirstPage" name="arrow-left" :color="textColor || '#333333'" size="22"></u-icon>
		</template>
		<template #center>
			<text class="size-32" :style="{color: textColor}">{{ title }}</text>
		</template>
	</u-navbar>
	<u-navbar
		v-else-if="mode === 'info'"
		:height="40"
		@leftClick="leftClick"
		:placeholder="true"
		:autoBack="false"
		:fixed="true"
		bgColor="transparent">
		<template #left>
			<view class="row flex-center backbox_css" :style="{backgroundColor: `rgba(255, 255, 255, 0.5)`}">
				<u-icon
					color="#000000"
					size="20"
					@click="goHomePage"
					v-if="isFirstPage"
					name="home"></u-icon>
				<u-icon
					bold
					color="#000000"
					size="16"
					v-else
					name="arrow-left"></u-icon>
			</view>
		</template>
	</u-navbar>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	const isFirstPage = ref(true)
	const props = defineProps({
		mode: {
			type: String,
			default: 'back'
		},
		title: {
			type: String,
			default: ''
		},
		bgColor: {
			type: String,
			default: '#FFFFFF'
		},
		textColor: {
			type: String,
			default: '#333333'
		},
	})
	const leftClick = (e) => {
		console.log(e);
		uni.navigateBack({
			delta: -1
		})
	}	
	const goHomePage = () => {
		// uni.switchTab({
		// 	url: '/pages/index/index'
		// })
	}
	onMounted(() => {
		let routes = getCurrentPages()
		if (routes.length <= 1) {
			isFirstPage.value = true
		} else {
			isFirstPage.value = false
		}
	})
</script>

<style lang="scss" scoped>
	.backbox_css {
		width: 55rpx;
		height: 55rpx;
		border-radius: 50%;
		overflow: hidden;
	}
</style>
<!-- 用法 
	mode: home 首页字在左边
	mode: back 首页字在中间
	mode: info 左边圆形返回图标
	<my-navbar title="标题" mode="home"></my-navbar>
 -->