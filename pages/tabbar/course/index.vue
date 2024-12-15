<template>
	<view class="wrap">
		<view class="header">			
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入课程名称" @change="handleSearch" @confirm="handleSearch" @clear="handleSearch"></uni-easyinput>
			</view>
			<div class="category">
				<scroll-view  scroll-x>
					<tabs :tabs="categoryList" @change="changeTab" />
				</scroll-view>
			</div>
		</view>
		<view class="center">
			<view class="course-list">
				<view class="course-item" v-for="(item, index) in listData" :key="index">
					<view class="course-item-head">
						<view class="name">
							{{item.name}}
						</view>
						<view class="price">
							<view class="icon">
								¥
							</view>
							{{item.price}}
						</view>
					</view>
					<view class="course-item-center">
						<view class="row location">
							<view class="licon">
								<uni-icons type="location" color="#666" size="20"></uni-icons>
							</view>
							<view class="text">{{item.address}}</view>
						</view>
						<view class="row">
							<view class="licon">
								<uni-icons type="location" color="#666" size="20"></uni-icons>
							</view>
							<view class="text">
								{{moment(item.startTime).format('MM')}}月{{moment(item.startTime).format('DD')}}日
								 {{ weekName(item.startTime) }} 
								 {{moment(item.startTime).format('hh:mm')}}-{{moment(item.endTime).format('hh:mm')}}
							</view>
						</view>
						<view class="people-row">
							<AvatarGroup :list="item.pictures" />
							<view style="flex: 1;">
								<text v-if="item.pictures && item.pictures.length">{{item.pictures.length}}人去过</text>
							</view>
							<view class="tag">萌新-专业</view>
						</view>
					</view>
					<view class="course-item-footer">
						<button class="btn" @click="handleDetail(item)">去报名</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, toRefs, reactive } from "vue";
	import AvatarGroup from "@/components/AvatarGroup/AvatarGroup.vue";
	import tabs from "@/components/Tabs/Tabs.vue";
	import Interface from "@/utils/Interface";
	import { get } from "@/utils/request.js";
	import moment from "moment";
	import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	const popupRef = ref(null);
	const weeks = ['周日','周一','周二','周三','周四','周五','周六'];
	const data = reactive({
		searchVal: "",
		listData: [1,2,3,4,5,6,7,8],
		pageNumber: 1,
		pageSize: 5,
		isPage: false,
		categoryList: [],
		categoryId: ""
	});
	const { searchVal, listData, pageNumber, pageSize, isPage, categoryList, categoryId } = toRefs(data);
	
	
	const weekName = (date) => {
		const day = moment(date).day();
		return weeks[day];
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
	
	const handleSearch = () => {
		data.pageNumber = 1;
		getQuery();
	}
	
	const changeTab = (e) => {
		data.categoryId = e.id;
		getQuery();
	}
	
	const getQuery = () => {
		get(Interface.course.list, {
			name: data.searchVal,
			page: data.pageNumber,
			rows: data.pageSize,
			folderId: data.categoryId
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
		uni.navigateTo({
			url:"/pages/other/courseDetail/index?id="+item.id
		})
	}
	
	onPullDownRefresh(()=>{
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
		}
	}
	.course-list{
		.course-item{
			margin-top: 24rpx;
			// height: 400rpx;
			background: #fff;
			border-radius: 20rpx;
			padding: 32rpx 20rpx 20rpx 20rpx;
			.course-item-head{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name{
					font-weight: 500;
					font-size: 32rpx;
					color: #333;
				}
				.price{
					color: #ea3852;
					display: flex;
					align-items: flex-end;
					font-size: 40rpx;
					.icon{
						font-size: 26rpx;
						font-weight: bold;
						padding-right: 10rpx;
					}
				}
			}
			.course-item-center{
				margin-top: 20rpx;
				.row{
					display: flex;
					align-items: center;
					.licon{
						padding-right: 20rpx;
					}
					.text{
						color: #666;
						font-size: 28rpx;
					}
				}
			}
			.course-item-footer{
				display: flex;
				justify-content: flex-end;
				.btn{
					width: 200rpx;
					height: 80rpx;
					background: pink;
					line-height: 80rpx;
					text-align: center;
					display: inline-block;
					border-radius: 40rpx;
					font-size: 32rpx;
					margin: 0;
					padding: 0;
					background: #6be8f5;
					font-weight: 700;
					outline: none;
					border: none;
					&::after,&::before{
						content: '';
						display: none;
					}
				}
			}
		}
	}
	.tag{
		border-radius: 10rpx;
		padding: 5rpx 10rpx;
		background: #f3fcfd;
		color: #6be8f5;
		font-size: 24rpx;
	}
	.people-row{
		display: flex;
		align-items: center;
		padding: 20rpx 0 20rpx 20rpx;
		text{
			flex: 1;
			margin-left: 10rpx;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>