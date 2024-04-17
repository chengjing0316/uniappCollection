<template>
	<u-tabbar
		:value="value"
		:fixed="true"
		:placeholder="true"
		:safeAreaInsetBottom="true"
	>
		<u-tabbar-item
			v-for="(item, index) in routerList"
			:key="index"
			:text="item.text"
			@click="changeTab(item, index)"
			:icon="item.icon"></u-tabbar-item>
	</u-tabbar>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	uni.hideTabBar();
	const props = defineProps({
		value: {
			type: Number,
			default: 0
		}
	})
	const routerList = ref([{
			path: "/pages/index/index",
			icon: "home",
			text: "首页"
		},
		{
			path: "/pages/home/index",
			icon: "account",
			text: "我的"
		}
	])
	const changeTab = (item:any, index: number) => {
		uni.switchTab({
			url: item.path
		})
	}
</script>

<style>
</style>