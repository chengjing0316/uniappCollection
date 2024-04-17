<template>
	<u-modal
		:show="modelValue"
		:title="params.title || '温馨提示'"
		:confirmText="params.confirmText || '确认'"
		:cancelText="params.cancelText || '取消'"
		:content='params.content'
		:showCancelButton="true"
		@cancel="modalCancel"
		@confirm="modalConfirm"></u-modal>
</template>
<script lang="ts" setup>	
	let emit = defineEmits(['update:modelValue', 'modalCancel'])
	const props = defineProps({
	    modelValue: Boolean, // 默认
	    title: {
			type: String,
			default: ''
		},
		params: {
			type: Object,
			default: () => {
				return {
					content: '',
					index: 0,
					key: ''
				}
			}
		}
	})
	const modalCancel = () => {
		emit('update:modelValue', false)
	}
	const modalConfirm = () => {
		modalCancel()
		emit('modalConfirm', props.params)
	}
</script>
<!-- 用法
	<template>
		<my-modal
			v-model="show"
			:params="params"
			@modalConfirm="modalConfirm"></my-modal>
	</template>		
	<script setup lang="ts">	
		import { ref, reactive } from 'vue'
		const show = ref(true)
		const params = reactive({
			title: '提示',
			content: '确认111',
			confirmText: '好的',
			cancelText: '关闭'
		})
		const modalConfirm = (e:any) => {
			console.log(e);
		}
	</script> 
-->