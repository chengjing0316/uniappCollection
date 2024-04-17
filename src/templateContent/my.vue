<template>
	<view class="myContent">
		<view class="header">
			<van-image width="100%" height="100%" class="headbgImage" src="/static/images/img/di750x280.png"></van-image>
			<van-image width="100%" height="100%" round class="myPhoto" src="/static/images/image/QQ8.jpg">
			</van-image>
			<text class="myInformation">张三</text>
		</view>
		<view class="middle-num">
			<view class="oner">
				<view class="zi">
					<text class="zier">{{coupon}}<text class="zisan">张</text></text>
					<text class="quan">优惠券</text>
				</view>
			</view>
			<view class="twoer">|</view>
			<view class="three">
				<view class="zi">
					<text class="zier">{{integral}}\n</text>
					<text class="quan">积分</text>
				</view>
			</view>
		</view>
		<view class="mydingdan">
			<view class="row1">
				<van-cell is-link url="/pagesOrderList/orderlist/index?active=all" title="订单内容" value="全部订单" link-type="navigateTo"/>
			</view>
			<view class="zhifu">
				<van-grid :gutter="3" square column-num="5">
					<van-grid-item v-for="(item,key) in icon" :key="key" :url="item.toUrl" :text="item.text" :icon="item.photoSrc" />
				</van-grid>
			</view>
		</view>
		<view class="liebiao">
			<van-cell is-link v-for="(liebiao,key) in lbIcon" :key="key" :icon="liebiao.photoSrc" :title="liebiao.text" :url="liebiao.toUrl">
			  <van-icon slot="right-icon" class="custom-icon" />
			</van-cell>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				coupon: 6,
				integral: 300,
				icon: [],
				lbIcon:[]
			}
		},
		onLoad() {
			//支付导航
			this.tabBarIcon();
			//列表单元格
			this.liebiaoIcon();
 
		},
		methods: {
			/* 支付导航 */
			tabBarIcon() {
				var data = {
					"icons": [{
							"photoSrc": "/static/images/tabBarimg/dzfa56.png",
							"text": "待付款",
							"toUrl": "/pagesOrderList/orderlist/index?active=dfk"
						},
						{
							"photoSrc": "/static/images/tabBarimg/dfha56.png",
							"text": "待发货",
							"toUrl": "/pagesOrderList/orderlist/index?active=dfh"
						},
						{
							"photoSrc": "/static/images/tabBarimg/dsha56.png",
							"text": "待收货",
							"toUrl": "/pagesOrderList/orderlist/index?active=dsh"
						},
						{
							"photoSrc": "/static/images/tabBarimg/ywca56.png",
							"text": "已完成",
							"toUrl": "/pagesOrderList/orderlist/index?active=ywc"
						},
						{
							"photoSrc": "/static/images/tabBarimg/sha56.png",
							"text": "售后",
							"toUrl": "/pagesAfterSale/aftersale/index"
						}
					]
				};
				this.icon = data.icons
			},
			//列表单元格
			liebiaoIcon() {
				var data = {
					"icons": [{
							"photoSrc": "/static/images/tabBarimg/yj40.png",
							"text": "我的佣金",
							"toUrl": "/pagesGoods/goods/index"
						},
						{
							"photoSrc": "/static/images/tabBarimg/sc40.png",
							"text": "我的收藏",
							"toUrl": ""
						},
						{
							"photoSrc": "/static/images/tabBarimg/dzgl40.png",
							"text": "地址管理",
							"toUrl": ""
						},
						{
							"photoSrc": "/static/images/tabBarimg/sjrz40.png",
							"text": "商家入驻",
							"toUrl": ""
						},
						{
							"photoSrc": "/static/images/tabBarimg/gywm40.png",
							"text": "关于我们",
							"toUrl": ""
						},
						{
							"photoSrc": "/static/images/tabBarimg/kf40.png",
							"text": "客服电话",
							"toUrl": ""
						}
					]
				};
				this.lbIcon = data.icons
			},
		}
	}
</script>
 
<style>
	page {
		background: #eaeaea;
	}
 
	.myContent {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
 
	.header {
		flex-direction: row;
		display: flex;
		height: 200rpx;
	}
 
	.headbgImage {
		height: 25%;
		width: 100%;
		position: absolute;
		z-index: 1;
	}
 
	.myPhoto {
		height: 90rpx;
		width: 90rpx;
		position: absolute;
		z-index: 2;
		margin-left: 3%;
		margin-top: 3%;
	}
 
	.myInformation {
		position: absolute;
		z-index: 2;
		margin-left: 16%;
		margin-top: 9%;
	}
 
	.middle-num {
		position: absolute;
		z-index: 2;
		display: flex;
		flex-wrap: nowrap;
		background: white;
		width: 95%;
		margin-left: 20rpx;
		height: 160rpx;
		border-radius: 10px;
		margin-top: -50rpx;
	}
 
	.oner {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
 
	.twoer {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #eaeaea;
	}
 
	.three {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
 
	.zier {
		font-size: 48rpx;
		color: #333333;
	}
 
	.zisan {
		font-size: 24rpx;
		color: #333333;
	}
 
	.quan {
		font-size: 24rpx;
		color: #999999;
	}
 
	.zi {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
 
	.mydingdan {
		display: flex;
		flex-wrap: nowrap;
		background: #fff;
		width: 95%;
		height: 250rpx;
		margin-left: 20rpx;
		border-radius: 10px;
		margin-top: 130rpx;
		flex-direction: column;
	}
 
	.mydingdan .row1 .van-cell {
		position: inherit;
		border-radius: 10px 10px 0px 0px;
	}
 
	.zhifu {
		margin-top: 5rpx
	}
 
	.liebiao {
		height: 658rpx;
		align-items: center;
		flex-wrap: nowrap;
		background: #fff;
		width: 91%;
		border-radius: 10px;
		flex-direction: column;
		padding: 2%;
		margin: 20rpx 20rpx 10rpx 20rpx;
	}
	.liebiao .van-cell{
		height: 16%;
	}
</style>