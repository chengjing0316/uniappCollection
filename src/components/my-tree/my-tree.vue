<template>
	<view class="zd-myTree-css">
		<my-tree-data
			:list="treeList"
			@setSwitch="setSwitch"
			@setVal="setVal"
			:isSelect="isSelect"
			:itemHeight="itemHeight"
			:optionKey="optionKey"
			:multiple="multiple"
			:selectList="selectList"
			:rowId="rowId"
			:isNoSelect="isNoSelect"/>
	</view>
</template>
<script lang="ts" setup>
	import { ref, computed, onMounted } from 'vue'
	import myTreeData from '@/components/my-tree/my-tree-data.vue'
	let emit = defineEmits(['change'])
	const treeList = ref([])
	const selectList = ref([])
	onMounted(() => {
		treeList.value = JSON.parse(JSON.stringify(props.list))
		if (props.defaultExpandAll) {
			resList(treeList.value, 'isOpen')
		}
	})
	const setVal = (item:any) => {
		const key = props.optionKey.valueKey
		if (props.multiple) {//处理多选的数据
			const sIndex = selectList.value.findIndex(v => v[key] === item[key])
			if (sIndex === -1) {
				selectList.value.push(item)
			} else {
				selectList.value.splice(sIndex, 1)
			}
		} else {
			selectList.value = [item]
		}
		emit('change', selectList.value)
	}
	// 切换展开和收起
	const setSwitch = (item) => {
		const value = item[props.rowId]
		resList(treeList.value, 'setSwitch' , value)
	}
	const resList = (list, type='isOpen', value=null) => {
		const childKey = props.optionKey.childKey
		list.forEach(v => {
			if (type === 'isOpen' && v[childKey] && v[childKey].length) {
				v.isOpen = props.defaultExpandAll // 处理默认展开
			} else if (type === 'setSwitch') {
				if (v[props.rowId] === value) {
					v.isOpen = !v.isOpen // 处理展开和收起
				}
			}
			if (v[childKey] && v[childKey].length) {
				resList(v[childKey], type, value) // 继续递归查询
			}
		})
	}
	const props = defineProps({
		// 要渲染的树结构数据
		list: {
			type: Array,
			default: () => []
		},
		// 字段配置项
		optionKey: {
			type: Object,
			default: () => ({
				nameKey: 'name',
				valueKey: 'number',
				childKey: 'childList'
			})
		},
		// 树节点的高度
		itemHeight: {
			type: Number,
			default: 70
		},
		// 是否可以选择 
		isSelect: {
			type: Boolean,
			default: false
		},
		// 是否默认全部展开
		defaultExpandAll: {
			type: Boolean,
			default: false
		},
		// 是否多选（isSelect为true时生效）
		multiple: {
			type: Boolean,
			default: false
		},
		rowId: {
			type: [Number, String],
			default: 'number',
		},
		/*
			配置不可选的层级
			prop传字段名
			arrays传该字段字段的属性值存在其中则不可选；
		*/
		isNoSelect: {
			type: Object,
			default: () => ({
				prop: 'no',
				arrays: []
			})
		},
	})
</script>
<style lang="scss" scoped>
	.zd-myTree-css {
		padding-right: 15rpx;
	}
</style>