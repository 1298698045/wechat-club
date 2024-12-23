<template>
	<view class="wrapper">
		<view class="header">
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入活动名称" @iconClick="onClick"></uni-easyinput>
			</view>
			<div class="category">
				<tabs :tabs="tabList" />
			</div>
		</view>
		<view class="center">
			<view class="activity-list">
				<view class="activity-item">
					<view class="image">
						<image class="img" src="http://47.96.15.8:9006/images/2.jpg" mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="row">
							<view class="text">
								<uni-icons type="location" color="#666" size="20"></uni-icons>
								123
							</view>
							<view class="text price">
								¥100
							</view>
						</view>
						<view class="row">
							<view class="text">
								<uni-icons type="location" color="#666" size="20"></uni-icons>
								123456
							</view>
							<view class="text payStatus">
								已付款
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
	import { get } from "@/utils/request.js";
	import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	const data = reactive({
		listData: [],
		pageNumber: 1,
		pageSize: 3,
		isPage: false,
		tabList: [
			{
				id: 1,
				name: "分类1"
			},
			{
				id: 2,
				name: "分类2"
			},
			{
				id: 3,
				name: "分类3"
			},
			{
				id: 4,
				name: "分类4"
			},
			{
				id: 5,
				name: "分类5"
			}
		]
	});
	
	const { listData, pageNumber, pageSize, isPage, tabList } = toRefs(data);
	
	const getActivityList = () => {
		get(Interface.activity.list, {
			page: data.pageNumber,
			rows: data.pageSize
		}).then(res=>{
			let list = res.data.map(item=>{
				let currentImgData = item.pictures.find(row=>row.isRecommend==true);
				let currentImg = '';
				if(currentImgData){
					currentImg = currentImgData.fileLocation;
				}
				item.currentImg = currentImg;
				return item;
			});
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
	getActivityList();
	
	onPullDownRefresh(()=>{
		console.log("onPullDownRefresh");
		data.pageNumber = 1;
		getActivityList();
		uni.stopPullDownRefresh();
	});
	
	onReachBottom(()=>{
		if(data.isPage){
			data.pageNumber++;
			getActivityList();
		}
	})
	
	
</script>

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