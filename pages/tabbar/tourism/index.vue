<template>
	<view class="wrap">
		<view class="header">
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入活动名称" @change="handleSearch" @confirm="handleSearch" @clear="handleSearch"></uni-easyinput>
			</view>
			<div class="category">
				<scroll-view  scroll-x>
					<tabs :tabs="categoryList" @change="changeTab" />
				</scroll-view>
			</div>
		</view>
		<view class="center">
			<view class="tourism">
				<view class="tourism-item" v-for="(item, index) in listData" :key="index" @click="handleDetail(item)">
					<view class="masterImg">
						<image class="img" :src="item.currentImg" mode="aspectFill"></image>
					</view>
					<view class="tourism-content">
						<view class="title">
							{{item.name}}
						</view>
						<view class="tags">
							<view class="tag">自然风光</view>
							<view class="tag">休闲度假</view>
						</view>
						<view class="price">
							<view class="text icon">¥</view>
							<view class="text number">{{item.price}}</view>
							<view class="text">起</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, toRefs, reactive } from "vue";
	import tabs from "@/components/Tabs/Tabs.vue";
	import AvatarGroup from "@/components/AvatarGroup/AvatarGroup.vue";
	import Interface from "@/utils/Interface";
	import { get } from "@/utils/request.js";
	import moment from "moment";
	import { onLoad, onUnload, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	const popupRef = ref(null);
	const data = reactive({
		searchVal: "",
		listData: [],
		pageNumber: 1,
		pageSize: 5,
		isPage: false,
		categoryList: [],
		categoryId: ""
	});
	const { searchVal, listData, pageNumber, pageSize, isPage, categoryList, categoryId } = toRefs(data);
	
	onLoad(()=>{		
		// uni.showLoading({
		// 	title: '加载中',
		// 	mask: true
		// });
		getQuery();
	});
	
	const handleSearch = () => {
		data.pageNumber = 1;
		getQuery();
	}
	
	const changeTab = (e) => {
		// console.log("e", e);
		data.categoryId = e.id;
		getQuery();
	}
	
	const getCategory = () => {
		get(Interface.category, {
			category: 2
		}).then(res=>{
			data.categoryList = res.data;
			data.categoryList.unshift({
				id: "",
				name: "全部"
			})
		})
	}
	getCategory();
	
	const getQuery = () => {
		get(Interface.tourism.list, {
			name: encodeURIComponent(data.searchVal),
			page: data.pageNumber,
			rows: data.pageSize,
			folderId: data.categoryId
		}).then(res=>{
			let list = res.data.map(item=>{
				let currentImgData = item.pictures.find(row=>row.isRecommend==true);
				let currentImg = '';
				if(currentImgData){
					currentImg = Interface.uploadUrl + currentImgData.fileLocation;
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
	
	const handleDetail = (item) => {
		uni.navigateTo({
			url:"/pages/other/tourismDetail/index?id="+item.id
		})
	}
	
	const time = setTimeout(()=>{
		uni.hideLoading();
	}, 1000);
	
	
	onUnload(()=>{
		clearTimeout(time);
	})
	
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
	.is-input-border{
		border-radius: 30rpx !important;
	}
	.tab{
		margin-right: 50rpx !important;
	}
</style>
<style lang="scss" scoped>
	.wrap{
		.header{
			background: #fff;
			padding: 20rpx 32rpx;
			position: sticky;
			top: 0;
			z-index: 1;
			.category{
				background: #fff;
				overflow-x: auto;
				margin-top: 10rpx;
			}
		}
		.search-container{
			
		}
		.center{
			position: relative;
			padding: 0 32rpx;
			margin-top: 30rpx;
			.tourism{
				display: flex;
				flex-wrap: wrap;
				.tourism-item{
					width: calc(50% - 16rpx);
					margin-right: 32rpx;
					background: #fff;
					margin-bottom: 32rpx;
					border-radius: 16rpx;
					overflow: hidden;
					.masterImg{
						width: 100%;
						height: 300rpx;
						.img{
							width: 100%;
							height: 100%;
						}
					}
					.tourism-content{
						padding: 10rpx;
						.title{
							font-size: 32rpx;
							font-weight: 500;
							display: -webkit-box;
						    -webkit-box-orient: vertical;
						    -webkit-line-clamp: 2;
						    overflow: hidden;
						    text-overflow: ellipsis;
							line-height: 1.5;
						}
						.tags{
							margin: 20rpx 0;
							.tag{
								display: inline-block;
								padding: 0 6rpx;
								border-radius: 5rpx;
								border: 1rpx solid #d48f42;
								color: #d48f42;
								margin-right: 10rpx;
								font-size: 24rpx;
							}
						}
						.price{
							margin-bottom: 20rpx;
							font-size: 18rpx;
							color: #848484;
							.text{
								display: inline-block;
							}
							.icon{
								font-size: 24rpx;
								color: #d83f36;
							}
							.number{
								font-size: 32rpx;
								color: #d83f36;
								font-weight: bold;
							}
						}
					}
				}
				.tourism-item:nth-child(2n){
					margin-right: 0;
				}
			}
		}
	}
	
</style>