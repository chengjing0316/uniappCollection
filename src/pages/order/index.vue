<template>
	<view>
		<!-- 顶部订单状态tabs -->
		<view class="orderTab row flex-sa-center">
			<view class="orderTabItem" v-for="status in orderStatus" :key="status.id" :class="tabIndex == status.id ? 'active' : ''" @tap="changeTab(status.id)">
				{{ status.name }}
			</view>
		</view>
		<!-- 订单状态 -->
		<view class="ordersStatus">
			<view class="noOrder" v-if="orderListFilt == 0">无订单</view>
			<view class="ordersList column flex-center" v-else>
				<block v-for="item in orderListFilt" :key="item.id">
					<view class="orderItem">
						<view class="orderTime row flex-sb-center">
							<text>下单时间：{{ item.create_time }}</text>
							<text>{{ item.status }}</text>
						</view>
						<view class="orderInfo row flex-sb-fs">
							<image :src="item.imgurl" style="width: 200rpx; height: 200rpx; border-radius: 10%"></image>
							<view class="orderInfo-des" style="margin-left: 20rpx">
								<view class="des-top row flex-sb-fs">
									<text style="width: 300rpx">Loremibus adipisci similique.</text>
									<text>￥{{ item.price }}</text>
								</view>
								<view class="des-bottom row flex-sb-fs">
									<text>200ml</text>
									<text>{{ item.number }}</text>
								</view>
							</view>
						</view>
						<view class="orderPrice">
							<view class="row flex-fe-fs">
								<text>合计：￥{{ item.price }}</text>
								<text>实付款：￥{{ item.price }}</text>
							</view>
							<view class="row flex-fe-fe">
								<u-button type="default" size="small">查看物流</u-button>
								<u-button type="default" size="small">删除订单</u-button>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
			orderList: [
				{
					id: 151,
					no: 835428,
					price: 267,
					consignee: '阎娜',
					address: '安徽省 安庆市 宿松县',
					status: 1,
					create_time: '2019-12-02',
					number: 54,
					ordername: 'mde',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 152,
					no: 374794,
					price: 887,
					consignee: '孟丽',
					address: '湖北省 十堰市 竹山县',
					status: 2,
					create_time: '2010-05-17',
					number: 18,
					ordername: 'ovl',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 153,
					no: 195524,
					price: 937,
					consignee: '廖明',
					address: '山西省 临汾市 洪洞县',
					status: 1,
					create_time: '1995-02-16',
					number: 98,
					ordername: 'vgk',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 154,
					no: 113331,
					price: 861,
					consignee: '谢艳',
					address: '西藏自治区 昌都地区 芒康县',
					status: 4,
					create_time: '1993-11-28',
					number: 33,
					ordername: 'be',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 155,
					no: 611435,
					price: 528,
					consignee: '尹洋',
					address: '辽宁省 本溪市 桓仁满族自治县',
					status: 2,
					create_time: '1973-05-10',
					number: 75,
					ordername: 'mqsb',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 156,
					no: 917545,
					price: 437,
					consignee: '武强',
					address: '贵州省 黔西南布依族苗族自治州 册亨县',
					status: 1,
					create_time: '1976-10-13',
					number: 29,
					ordername: 'xibq',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 157,
					no: 887173,
					price: 778,
					consignee: '许静',
					address: '上海 上海市 嘉定区',
					status: 3,
					create_time: '2014-09-30',
					number: 95,
					ordername: 'uwkd',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 158,
					no: 104730,
					price: 878,
					consignee: '刘勇',
					address: '四川省 宜宾市 宜宾县',
					status: 3,
					create_time: '1988-01-05',
					number: 7,
					ordername: 'wmt',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 159,
					no: 471124,
					price: 354,
					consignee: '汪伟',
					address: '黑龙江省 双鸭山市 宝山区',
					status: 4,
					create_time: '1970-01-15',
					number: 56,
					ordername: 'weh',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				},
				{
					id: 160,
					no: 410431,
					price: 699,
					consignee: '曾强',
					address: '安徽省 铜陵市 狮子山区',
					status: 3,
					create_time: '2021-04-05',
					number: 4,
					ordername: 'avb',
					imgurl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.KErk3WQhaVMWcO4Orv9s5gAAAA?w=198&h=198&c=7&r=0&o=5&pid=1.7'
				}
			]
		};
	},
	methods: {
		// 顶部tabs点击时切换
		changeTab(index) {
			this.tabIndex = index;
		},
		//获取订单信息
		getOrderList() {}
	},
	computed: {
		orderListFilt: function () {
			if (this.tabIndex == 0) {
				return this.orderList;
			} else {
				return this.orderList.filter((item) => item.status == this.tabIndex);
			}
		}
	},
	onLoad(options) {
		//我的页面跳转到订单页面切换
		if (!options.filt) {
			this.tabIndex = 0;
		} else {
			this.tabIndex = options.filt;
		}
	}
};
</script>

<style lang="scss">
.orderTab {
	.orderTabItem {
		display: inline-block;
		height: 100rpx;
		line-height: 100rpx;
		box-sizing: border-box;
		text-align: center;
	}
}

.active {
	border-bottom: 5rpx solid #49bdfb;
	font-weight: bold;
}
.ordersStatus {
	background-color: #eee;
	.ordersList {
		width: 100%;
		.orderItem {
			box-sizing: border-box;
			padding: 0 20rpx;
			height: 500rpx;
			width: 100%;
			background-color: #fff;
			margin: 10rpx 0rpx;
			.orderTime {
				height: 90rpx;
			}
			.orderInfo {
				height: 260rpx;
				border-top: #eee solid 1px;
				border-bottom: #eee solid 1px;
				box-sizing: border-box;
				padding: 30rpx 0;
			}
			.orderPrice {
				height: 150rpx;
			}
		}
	}
}
</style>
