<template>
	<view class="">
		<u-button type="primary" text="签名" @click="toSignature"></u-button>
		<u-button type="primary" text="问卷" @click="toQuestionnaire"></u-button>
	</view>
</template>

<script>
export default {
	data() {},
	methods: {
		toSignature() {
			uni.navigateTo({
				url: '/pages/category/signature/index'
			});
		},
		toQuestionnaire() {
			uni.navigateTo({
				url: '/pages/category/questionnaire/index'
			});
		}
	}
};
</script>

<style scoped></style>
