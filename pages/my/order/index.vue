<template>
	<view class="wrapper">
		<view class="header">
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入活动名称"></uni-easyinput>
			</view>
			<div class="category">
				<tabs :tabs="tabList" @change="changeTab" />
			</div>
		</view>
		<view class="center">
			<view class="activity-list">
				<view class="activity-item" v-for="(item, index) in listData" :key="index">
					<view class="image">
						<image class="img" :src="Interface.uploadUrl+item.businessPicture" mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="row">
							<view class="text">
								<text class="text-icon color-1">&#xe62f;</text>
								<!-- <uni-icons type="location" color="#666" size="20"></uni-icons> -->
								{{item.businessName}}
							</view>
							<view class="text price">
								¥{{item.unitPrice}}
							</view>
						</view>
						<view class="row">
							<view class="text">
								<text class="text-icon color-1">&#xe661;</text>
								<!-- <uni-icons type="location" color="#666" size="20"></uni-icons> -->
								{{moment(item.orderDate).format('MM')}}月{{moment(item.orderDate).format('DD')}}日
								 {{ weekName(item.orderDate) }} 
								 {{moment(item.orderDate).format('hh:mm')}}-{{moment(item.orderDate).format('hh:mm')}}
							</view>
							<view class="text payStatus">
								{{orderText(item.orderType)}}
							</view>
						</view>
					</view>
					<view class="status">
						活动进行中
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs } from "vue";
	import ActivityItem from "@/components/Activity/ActivityItem.vue";
	import tabs from "@/components/Tabs/Tabs.vue";
	import Interface from "@/utils/Interface";
	import moment from "moment";
	import { get } from "@/utils/request.js";
	import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	const weeks = ['周日','周一','周二','周三','周四','周五','周六'];
	const data = reactive({
		searchVal: "",
		listData: [],
		pageNumber: 1,
		pageSize: 5,
		isPage: false,
		tabList: [
			{
				id: '',
				name: "全部"
			},
			{
				id: 1,
				name: "活动"
			},
			{
				id: 2,
				name: "课程"
			},
			{
				id: 3,
				name: "旅游"
			}
		],
		orderType: 1
	});
	
	const { searchVal, listData, pageNumber, pageSize, isPage, tabList, orderType } = toRefs(data);
	
	
	const orderText = (type) => {
		return type == 0 ? '未支付' : type == 1 ? '已支付' : type == 2 ? '退款中' : type == 3 ? '已退款' : type == 4 ? '支付失败' : type == 5 ? '退款失败' : '';
	}
	
	const weekName = (date) => {
		const day = moment(date).day();
		return weeks[day];
	}
	
	const changeTab = (e) => {
		data.pageNumber = 1;
		data.orderType = e.id;
		getQuery();
	}
	
	const getQuery = () => {
		get(Interface.order.list, {
			name: data.searchVal,
			orderType: data.orderType,
			page: data.pageNumber,
			rows: data.pageSize
		}).then(res=>{
			let list = res.data;
			
			let total = res.total;
			if(data.pageNumber * data.pageSize < total) {
				data.isPage = true;
			}else {
				data.isPage = false;
			};
			let temp = [];
			if(data.pageNumber == 1){
				temp = list;
			}else {
				temp = data.listData.concat(list);
			}
			data.listData = temp;
			
		})
	};
	getQuery();
	
	const handleDetail = (item) => {
		const id = item.id;
		if(item.orderType == 1){
			uni.navigateTo({
				url:"/pages/activity/detail/index?id="+id
			})
		}else if(item.orderType == 2){
			uni.navigateTo({
				url:"/pages/other/courseDetail/index?id="+id
			})
		}else if(item.orderType == 3){
			uni.navigateTo({
				url:"/pages/other/tourismDetail/index?id="+id
			})
		}
	}
	
	onPullDownRefresh(()=>{
		console.log("onPullDownRefresh");
		data.pageNumber = 1;
		getQuery();
		uni.stopPullDownRefresh();
	});
	
	onReachBottom(()=>{
		if(data.isPage){
			data.pageNumber++;
			getQuery();
		}
	})
	
	
</script>
<style lang="scss">
	@import url("@/static/style/public.css");
</style>
<style lang="scss" scoped>
	.wrapper{
		.header{
			background: #fff;
			padding: 20rpx 32rpx 0 32rpx;
			position: sticky;
			top: 0;
			z-index: 1;
			.category{
				background: #fff;
				overflow-x: auto;
				margin-top: 10rpx;
			}
		}
		.center{
			padding:0 20rpx 20rpx 20rpx;
			.activity-list{
				.activity-item{
					padding: 30rpx 0;
					border-bottom: 2rpx dashed #e2e3e5;
					.image{
						height: 300rpx;
						border-radius: 20rpx;
						overflow: hidden;
						.img{
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
						}
					}
					.info{
						margin: 20rpx 0 10rpx 0;
					}
					.row{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.licon{
							padding-right: 20rpx;
						}
						.text{
							color: #666;
							font-size: 28rpx;
							&.price{
								color: #e1a965;
							}
							&.payStatus{
								color: #98f2f1;
							}
						}
					}
					.status{
						color: #4187ca;
					}
				}
			}
		}
	}
</style>
<style>
	page{
		background: #fff;
	}
	.tab{
		margin-right: 50rpx !important;
	}
</style>