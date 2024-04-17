<template>
	<view
		class="myTreeData_item_css"
		:style="{height: (item.isOpen ? 'auto' : (itemHeight + 'rpx'))}"
		v-for="(item, index) in list"
		:key="item[rowId]">
		<view
			class="row flex-sb-center"
			:style="{height: itemHeight + 'rpx'}">
			<view
				@click="setVal(item)"
				class="row flex-fs-center"
				:class="{'primary_cor': selectColor(item)}">
				<u-icon size="28rpx" name="list-dot"></u-icon>
				<text
					class="size-24"
					:style="{marginLeft: '10rpx'}">{{ item[optionKey.nameKey] }}</text>
			</view>
			<u-icon
				@click="setSwitch(item)"
				size="28rpx"
				style="margin-right: 16rpx;"
				v-if="item[optionKey.childKey] && item[optionKey.childKey].length"
				:name="item.isOpen ? 'arrow-down':'arrow-right'"
				color="#666666"></u-icon>
		</view>
		<my-tree-data
			v-if="item.isOpen"
			:optionKey="optionKey"
			@setSwitch="setSwitch"
			@setVal="setVal"
			:selectList="selectList"
			:isSelect="isSelect"
			:itemHeight="itemHeight"
			:multiple="multiple"
			:isNoSelect="isNoSelect"
			:rowId="rowId"
			:list="item[optionKey.childKey]"/>
	</view>
</template>
<script lang="ts" setup>
	import { computed } from 'vue'
	import myTreeData from '@/components/my-tree/my-tree-data.vue'
	let emit = defineEmits(['setSwitch', 'setVal'])
	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		},
		rowId: {
			type: [Number, String],
			default: 'number',
		},
		optionKey: {
			type: Object,
			default: () => ({
				nameKey: 'name',
				valueKey: 'number',
				childKey: 'childList'
			})
		},
		itemHeight: {
			type: Number,
			default: 70
		},
		// activeVal: {
		// 	type: [String, Number],
		// 	default: ''
		// },
		isSelect: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		selectList:  {
			type: Array,
			default: () => []
		},
		isNoSelect: {
			type: Object,
			default: () => ({
				prop: 'no',
				arrays: []
			})
		}
	})
	const selectColor = computed((item) => {
		return (item) => {
			const obj = props.selectList.find(v => v[props.rowId] == item[props.rowId])
			// if(obj) {
			// 	return '#206EFF'
			// } else {
			// 	return '#666666'
			// }
			return !!obj
		}
	})
	const setSwitch = (item) => {
		emit('setSwitch', item)
	}
	const setVal = (item) => {
		if (!props.isSelect) return;
		const { prop, arrays} = props.isNoSelect //处理配置不可选中的逻辑
		if (prop !== 'no' && arrays.includes(item[prop])) {
			console.log('已配置改层级不可选中！');
			return;
		}
		emit('setVal', item)
	}
</script>
<style lang="scss" scoped>
	.myTreeData_item_css {
		border-left: 1rpx solid #E9E9E9;
		margin-left: 30rpx;
		overflow: hidden;
		transition: 1s;
		.active_css {
			background-color: rgba(32,110,255, 0.1);
		}
	}
</style>