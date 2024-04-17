<template>
	<u-upload
		:fileList="fileList"
		:capture="['album', 'camera']"
		:multiple="multiple"
		@afterRead="afterRead"
		@delete="deletePic"
		class="myupload"
		:maxCount="maxCount"
		:deletable="deletable"
		uploadText="点击上传"></u-upload>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
	import { fileUploadUrl } from '@/request/api/index'
	import { getFileList, getFileNameAndExtension } from '@/utils/index'
	let emit = defineEmits(['update:modelValue'])
	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		}, // 默认
		multiple: {
			type: Boolean,
			default: false
		},
		deletable: { // 删除按钮
			type: Boolean,
			default: false
		},
		maxCount: {
			type: Number,
			default: 2
		}
	})
	const fileList = computed(() => {
		const imgList = getFileList(props.modelValue)		
		return imgList.map((v, i) => {
			const { fileName, fileExtension } = getFileNameAndExtension(v)
			return {
				url: v,
				fileName: fileName,
				suffix: fileExtension,
				index: i
			}
		})
	})
	const afterRead = (data:any) => {
		uni.uploadFile({
			url: import.meta.env?.VITE_APP_BASE_API + fileUploadUrl,
			filePath: data.file.url,
			name: 'saveFile',
			success: (res) => {
				console.log(res.data);
				const url = 'https://qianhe-app.oss-cn-hangzhou.aliyuncs.com/static/img/culture2.png'
				let list = fileList.value
				const { fileName, fileExtension } = getFileNameAndExtension(url)
				list.push({
					url,
					fileName: fileName,
					suffix: fileExtension,
					index: fileList.value.length
				})
				emit('update:modelValue', list.map(v => v.url)?.toString())
			}
		})
	}
	// 删除
	const deletePic = (data: any) => {
		let list = fileList.value
		list.splice(data.index, 1)
		emit('update:modelValue', list.map(v => v.url)?.toString())
	}
</script>
<style lang="scss">
	.myupload {
		.u-upload__wrap__preview__image,.u-upload__button {
			width: 170rpx!important;
			height: 170rpx!important;
		}
	}
</style>

<!-- 用法
	<template>
		<my-upload v-model="file"></my-upload>
	</template>
	
	<script setup lang="ts">	
		import { ref } from 'vue'
		const file = ref('https://qianhe-app.oss-cn-hangzhou.aliyuncs.com/static/img/culture3.png')
	</script>
	
	<style lang="scss">
	</style>
	
 -->