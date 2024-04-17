<template>
	<view class="wrap column">
		<view class="tabsBox">
			<u-tabs :list="orderStatus" :current="tabIndex" @change="changeTab" :is-scroll="false" itemStyle="flex:1; padding:10rpx;height: 50rpx" lineWidth="40"></u-tabs>
		</view>
		<view class="orderStatus">
			<view v-if="selectedOrders.length > 0">
				<scroll-view scroll-y>
					<view class="order" v-for="(item, index) in selectedOrders" :key="item.orderNumber">
						<view class="top row flex-sb-center">
							<view class="left row">
								<text>下单时间</text>
								<text class="store">{{ item.orderTime }}</text>
							</view>
							<view class="right">
								{{ orderStatusChange(item.status) }}
							</view>
						</view>
						<view class="item">
							<view class="left">
								<image :src="item.goodsUrl" mode="aspectFill"></image>
							</view>
							<view class="content">
								<view class="title">{{ item.title }}</view>
								<view class="type">{{ item.type }}</view>
							</view>
							<view class="right">
								<view class="price">￥{{ item.price }}</view>
								<view class="quantity">x{{ item.quantity }}</view>
								<view class="price row" style="font-size: 18rpx">新联币{{ item.price }}</view>
							</view>
						</view>
						<view class="total">
							共{{ item.quantity }}件商品 合计:￥
							<text class="total-price">
								{{ item.price }}
							</text>
						</view>
						<view class="bottom row flex-fe-center">
							<view class="evaluate btn" @click="checkApprove">核销</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-else>
				<view class="centre">
					<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
					<view class="explain">
						您还没有相关的订单
						<view class="tips">可以去看看有那些想买的</view>
					</view>
					<view class="btn">随便逛逛</view>
				</view>
			</view>
		</view>
		<u-popup
			:show="popupObj.show"
			@close="this.popupObj.show = false"
			round="20"
			mode="center"
			closeable
			:customStyle="{
				width: '400rpx',
				height: '400rpx',
				boxSize: 'border-box'
			}"
		>
			<view v-if="popupObj.show" style="width: 100%; height: 300rpx; margin-top: 50rpx; text-align: center" class="aa cloumn flex-sb-center">
				<view class="">
					<my-qrcode url="159202403180010233886490556" :size="150"></my-qrcode>
				</view>
				<text>请扫描核销码</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			popupObj: {
				show: false
			},
			paramObj: {
				pageNum: 1,
				pageSize: 999
			},
			tabIndex: 0,
			orderStatus: [
				{
					name: '全部',
					id: 0
				},
				{
					name: '待付款',
					id: 1
				},
				{
					name: '待核销',
					id: 2
				},
				{
					name: '已完成',
					id: 3
				},
				{
					name: '已取消',
					id: 4
				}
			],
			orders: [
				{
					orderNumber: '20240001',
					productName: 'iPhone 13',
					price: 999,
					quantity: 1,
					totalPrice: 999,
					status: '2',
					orderTime: '2024-03-25 09:30',
					goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
					title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
					type: '灰色;M'
				},
				{
					orderNumber: '20240002',
					productName: 'AirPods Pro',
					price: 199,
					quantity: 2,
					totalPrice: 398,
					status: '2',
					orderTime: '2024-03-25 10:15',
					goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
					title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
					type: '45cm;S'
				},
				{
					orderNumber: '20240003',
					productName: 'MacBook Pro',
					price: 1999,
					quantity: 1,
					totalPrice: 1999,
					status: '3',
					orderTime: '2024-03-24 14:20',
					goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
					title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
					type: '粉色;M'
				},
				{
					orderNumber: '20240004',
					productName: 'Apple Watch Series 7',
					price: 399,
					quantity: 1,
					totalPrice: 399,
					status: '4',
					orderTime: '2024-03-24 16:45',
					goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
					title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
					type: '45cm;S'
				}
			]
		};
	},
	onLoad(options) {
		//我的页面跳转到订单页面切换
		if (!options.filt) {
			this.tabIndex = 0;
		} else {
			this.tabIndex = options.filt;
		}
		this.getData();
	},
	methods: {
		// 顶部tabs点击时切换
		changeTab(index) {
			this.tabIndex = index.id;
		},
		// 核销
		checkApprove() {
			this.popupObj.show = true;
		},
		//获取订单信息
		getData() {
			this.$api
				.getShopOrderList({
					...this.paramObj
				})
				.then((res) => {
					console.log(8888, res);
					// this.dataList = res
				});
		},
		//订单状态转换
		orderStatusChange(status) {
			switch (status) {
				case '1':
					return '待付款';
				case '2':
					return '待核销';
				case '3':
					return '已完成';
				case '4':
					return '已取消';
				default:
					return '全部';
			}
		}
	},
	computed: {
		selectedOrders() {
			if (this.tabIndex === 0) {
				return this.orders;
			} else {
				return this.orders.filter((item) => {
					return item.status == this.tabIndex;
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.tabsBox {
	width: 100%;
	height: 60rpx;
	position: fixed;
	top: 0;
	z-index: 99;
	background-color: #fff;
	line-height: 60rpx;
	align-items: center;
}
.orderStatus {
	margin-top: 60rpx;
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		.top {
			.left {
				color: #aaa;
				align-items: center;
				.store {
					margin: 0 10rpx;
					font-size: 28rpx;
				}
			}
			.right {
				color: $u-warning-dark;
			}
		}
		.item {
			display: flex;
			margin: 20rpx 0 0;
			.left {
				margin-right: 20rpx;
				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box !important;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical !important;
				}
				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}
			}
			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;
				.price {
				}
				.quantity {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}
		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;
			.total-price {
				font-size: 32rpx;
			}
		}
		.bottom {
			margin-top: 40rpx;
			padding: 0 10rpx;
			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-info-dark;
			}
			.evaluate {
				color: $u-warning-dark;
				border-color: $u-warning-dark;
			}
		}
	}
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
}
</style>
