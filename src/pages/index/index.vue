<template>
	<view class="">
		<my-echarts :data="data" />
		<view>首页</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import data from './echartData';
</script>

<style scoped lang="scss"></style>
