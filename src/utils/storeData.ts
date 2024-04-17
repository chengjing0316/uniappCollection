// 储存、读取pinai的疏忽
import { useStore } from '@/store'
export const getStore = (key:string) => {
	const useCounter:any = useStore()
	return useCounter[key]
}
export const setStore = (key:string, data: any) => {
	const useCounter:any = useStore()
	return useCounter.setState({key, data})
}
export const storeAct = (key:string, data: any, callBack:Function) => {
	const useCounter:any = useStore()
	return useCounter[key](data, callBack)
}

/*
页面使用
<template>
	<u-button type="primary" @click="getCount">获取</u-button>
	<u-button type="primary" @click="setCount">获取</u-button>
	{{ getStore('count') }}
</template>

<script setup lang="ts">	
	import { getStore, setStore } from '@/utils/storeData'
	const getCount = () => {
		console.log(getStore('count'));
	}
	const setCount = () => {
		setStore('count', 546461)
	}
	const option = () => {
		storeAct('函数名', 函数参数, 回调函数)
	}
</script>
*/
