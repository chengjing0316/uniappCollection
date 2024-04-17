<template>
    <view class="qrcode">
      <view v-for="(row, rowI) in modules" :key="rowI" style="display: flex;flex-direction: row;">
        <view v-for="(col, colI) in row" :key="colI">
          <view
			:style="{
				width: size + 'rpx',
				height: size + 'rpx',
				backgroundColor: col.isBlack ? 'black' : 'white'
			}"></view>
        </view>
      </view>
    </view>
</template>

<script lang="ts" setup>
	import UQRCode from 'uqrcodejs';
	import { ref, onMounted } from 'vue'
	const modules = ref([])
	
	const props = defineProps({
		size: {
			type: Number,
			default: 10
		},
		url: {
			type: String,
			default: ''
		},
		canvasId: {
			type: String,
			default: 'canvasId'
		},
	})
	const getCode = () => {
		const qr = new UQRCode();
	    qr.data = props.url;
		qr.size = 1000;
	    qr.make();
	    modules.value = qr.modules;
	}
	onMounted(() => {
		getCode()
	})
</script>


<!-- 
	操作dome的写法，兼容小程序及h5(不支持定义logo)
	用法(不支持定义logo)
	<my-qrcode
		:size="10"
		url='https://www.baidu.com'></my-qrcode>
 -->