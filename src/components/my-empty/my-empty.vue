<template>
	<view class="column flex-center empty_css">
		<image src="@/static/system/null.png" class="img_css" :style="{marginTop: top}"></image>
		<text class="my_font_css size-24 clo_6">{{ text }}</text>
	</view>
</template>

<script lang="ts" setup>
	const props = defineProps({
		text: {
			type: String,
			default: '暂无数据',
		},
		top: {
			type: String,
			default: '60rpx',
		}
	})
</script>

<style lang="scss">
	.empty_css {
		width: 100%;
		overflow: hidden;

		.img_css {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 10rpx;
		}

		.my_font_css {
			margin-bottom: 20rpx;
		}
	}
</style>
<!-- 
	<my-empty top="120rpx" text="您还没有数据"></my-empty>
 -->