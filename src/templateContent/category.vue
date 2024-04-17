<template>
	<view class="category">
		<view>
			<u-search actionText=""></u-search>
		</view>
		<view class="category_container">
			<!-- 左侧菜单 -->
			<view class="left_menu">左</view>
			<!-- 右侧商品 -->
			<view class="right_content">右</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	const data = {
      "name": "女装",
      "foods": [
          {
            "name": "A字裙",
            "key": "A字裙",
            "icon": "https://cdn.uviewui.com/uview/common/classify/1/1.jpg",
            "cat": 10
          },
          {
            "name": "T恤",
            "key": "T恤",
            "icon": "https://cdn.uviewui.com/uview/common/classify/1/2.jpg",
            "cat": 10
          },
          {
            "name": "半身裙",
            "key": "半身裙",
            "icon": "https://cdn.uviewui.com/uview/common/classify/1/3.jpg",
            "cat": 10
          },
       ]
    }

</script>

<style scoped lang="scss">
.category{
	height: 100%;
}
.category_container{
	display: flex;
	.left_menu{
		flex: 3;
	}
	.right_content{
		flex: 5;
	}
}
</style>
<template>
	<view class="category">
		<view>
			<u-search actionText=""></u-search>
		</view>
		<view class="category_container">
			<!-- 左侧菜单 -->
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop" :scroll-into-view="itemId">
				<view v-for="(item, index) in tabbar" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{ item.name }}</text>
				</view>
			</scroll-view>
			<!-- 右侧商品 -->
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item, index) in tabbar" :key="index">
						<view class="item-title">
							<text>{{ item.name }}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
								<image class="item-menu-image" :src="item1.icon" mode=""></image>
								<view class="item-menu-name">{{ item1.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
//模拟数据
const data = {
	aaa: [
		{
			name: 'A字裙a',
			key: 'A字裙a',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/1.jpg',
			cat: 1
		},
		{
			name: 'T恤a',
			key: 'T恤a',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/2.jpg',
			cat: 1
		},
		{
			name: '半身裙a',
			key: '半身裙a',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/3.jpg',
			cat: 1
		}
	],
	foods: [
		{
			name: 'A字裙',
			key: 'A字裙',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/1.jpg',
			cat: 2
		},
		{
			name: 'T恤',
			key: 'T恤',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/2.jpg',
			cat: 2
		},
		{
			name: '半身裙',
			key: '半身裙',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/3.jpg',
			cat: 2
		}
	],
	ccc: [
		{
			name: 'A字裙c',
			key: 'A字裙c',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/1.jpg',
			cat: 3
		},
		{
			name: 'T恤c',
			key: 'T恤c',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/2.jpg',
			cat: 3
		},
		{
			name: '半身裙c',
			key: '半身裙c',
			icon: 'https://cdn.uviewui.com/uview/common/classify/1/3.jpg',
			cat: 3
		}
	]
};
const scrollTop = ref(0);
const oldScrollTop = ref(0);
const current = ref(0);
const menuHeight = ref(0);
const menuItemHeight = ref(0);
const itemId = ref('');
const tabbar = ref(classifyData);
const menuItemPos = ref([]);
const arr = ref([]);
const scrollRightTop = ref(0);
let timer = null;

onMounted(() => {
	getMenuItemTop();
});
const swichMenu = async (index) => {
	if (arr.value.length == 0) {
		await getMenuItemTop();
	}
	if (index == current.value) return;
	scrollRightTop.value = oldScrollTop.value;
	setTimeout(() => {
		scrollRightTop.value = arr.value[index];
		current.value = index;
		leftMenuStatus(index);
	});
};

const getElRect = (elClass, dataVal) => {
	return new Promise((resolve) => {
		const query = uni.createSelectorQuery().in(this);
		query
			.select('.' + elClass)
			.fields(
				{
					size: true
				},
				(res) => {
					if (!res) {
						setTimeout(() => {
							getElRect(elClass, dataVal);
						}, 10);
						return;
					}
					this[dataVal] = res.height;
					resolve();
				}
			)
			.exec();
	});
};

const observer = async () => {
	tabbar.value.map((val, index) => {
		let observer = uni.createIntersectionObserver(this);
		observer
			.relativeTo('.right-box', {
				top: 0
			})
			.observe('#item' + index, (res) => {
				if (res.intersectionRatio > 0) {
					let id = res.id.substring(4);
					leftMenuStatus(id);
				}
			});
	});
};

const leftMenuStatus = async (index) => {
	current.value = index;
	if (menuHeight.value == 0 || menuItemHeight.value == 0) {
		await getElRect('menu-scroll-view', 'menuHeight');
		await getElRect('u-tab-item', 'menuItemHeight');
	}
	scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
};

const getMenuItemTop = async () => {
	let selectorQuery = uni.createSelectorQuery();
	selectorQuery
		.selectAll('.class-item')
		.boundingClientRect((rects) => {
			if (!rects.length) {
				setTimeout(() => {
					getMenuItemTop();
				}, 10);
				return;
			}
			rects.forEach((rect) => {
				arr.value.push(rect.top - rects[0].top);
			});
		})
		.exec();
};

const rightScroll = async (e) => {
	oldScrollTop.value = e.detail.scrollTop;
	if (arr.value.length == 0) {
		await getMenuItemTop();
	}
	if (timer) return;
	if (!menuHeight.value) {
		await getElRect('menu-scroll-view', 'menuHeight');
	}
	setTimeout(() => {
		timer = null;
		let scrollHeight = e.detail.scrollTop + menuHeight.value / 2;
		for (let i = 0; i < arr.value.length; i++) {
			let height1 = arr.value[i];
			let height2 = arr.value[i + 1];
			if (!height2 || (scrollHeight >= height1 && scrollHeight < height2)) {
				leftMenuStatus(i);
				return;
			}
		}
	}, 10);
};
</script>

<style scoped lang="scss">
.u-wrap {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - var(--window-top));
	/* #endif */
	display: flex;
	flex-direction: column;
}

.u-search-box {
	padding: 18rpx 30rpx;
}

.u-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.u-search-inner {
	background-color: rgb(234, 234, 234);
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	padding: 10rpx 16rpx;
}

.u-search-text {
	font-size: 26rpx;
	color: $u-tips-color;
	margin-left: 10rpx;
}

.u-tab-view {
	width: 200rpx;
	height: 100%;
}

.u-tab-item {
	height: 110rpx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
	line-height: 1;
}

.u-tab-item-active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff;
}

.u-tab-item-active::before {
	content: '';
	position: absolute;
	border-left: 4px solid $u-type-primary;
	height: 32rpx;
	left: 0;
	top: 39rpx;
}

.u-tab-view {
	height: 100%;
}

.right-box {
	background-color: rgb(250, 250, 250);
}

.page-view {
	padding: 16rpx;
}

.class-item {
	margin-bottom: 30rpx;
	background-color: #fff;
	padding: 16rpx;
	border-radius: 8rpx;
}

.class-item:last-child {
	min-height: 100vh;
}

.item-title {
	font-size: 26rpx;
	color: $u-main-color;
	font-weight: bold;
}

.item-menu-name {
	font-weight: normal;
	font-size: 24rpx;
	color: $u-main-color;
}

.item-container {
	display: flex;
	flex-wrap: wrap;
}

.thumb-box {
	width: 33.333333%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 20rpx;
}

.item-menu-image {
	width: 120rpx;
	height: 120rpx;
}
</style>



