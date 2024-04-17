<template>
	<rich-text :nodes="qrcode"></rich-text>
</template>

<script lang="ts" setup>
	import UQRCode from 'uqrcodejs';
	import { ref, onMounted } from 'vue'
	const qrcode = ref()
	
	const props = defineProps({
		size: {
			type: Number,
			default: 100
		},
		url: {
			type: String,
			default: ''
		},
		logoUrl: {
			type: String,
			default: ''
		},
	})
	const getCode = () => {
		const qr = new UQRCode();
	    qr.data = props.url;
		qr.size = props.size;
		if (props.logoUrl) {
			qr.foregroundImageSrc  = props.logoUrl
		}
	    qr.make();
		var drawModules = qr.getDrawModules();
		var qrHtml = '';
		for (var i = 0; i < drawModules.length; i++) {
			var drawModule = drawModules[i];
			switch (drawModule.type) {
			case 'tile':
				/* 绘制小块 */
				qrHtml += `<div style="position: absolute;left: ${drawModule.x}px;top: ${drawModule.y}px;width: ${drawModule.width}px;height: ${drawModule.height}px;background: ${drawModule.color};"></div>`;
				break;
			case 'image':
				/* 绘制图像 */
				qrHtml += `<img style="position: absolute;border-radius:10px;left: ${drawModule.x}px;top: ${drawModule.y}px;width: ${drawModule.width}px;height: ${drawModule.height}px;" src="${drawModule.imageSrc}" />`;
				break;
			}
		}
		qrcode.value = qrHtml;
	}
	onMounted(() => {
		getCode()
	})
</script>

<style lang="scss" scoped></style>

<!-- 
	操作dome的写法，兼容小程序及h5(支持定义logo)
	用法
	<my-qrcode
		:size="200"
		logoUrl="https://qianhe-app.oss-cn-hangzhou.aliyuncs.com/static/img/contact_head.png"
		url='https://www.baidu.com'></my-qrcode>
 -->