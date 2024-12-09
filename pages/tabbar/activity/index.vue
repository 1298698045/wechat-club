<template>
	<view class="wrapper">
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
			<ActivityItem :list="listData" />
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
		searchVal: "",
		listData: [],
		pageNumber: 1,
		pageSize: 3,
		isPage: false,
		categoryList: [
			// {
			// 	id: 1,
			// 	name: "分类1"
			// },
			// {
			// 	id: 2,
			// 	name: "分类2"
			// },
			// {
			// 	id: 3,
			// 	name: "分类3"
			// },
			// {
			// 	id: 4,
			// 	name: "分类4"
			// },
			// {
			// 	id: 5,
			// 	name: "分类5"
			// }
		],
		categoryId: ""
	});
	
	const { searchVal, listData, pageNumber, pageSize, isPage, categoryList, categoryId } = toRefs(data);
	
	const handleSearch = () => {
		data.pageNumber = 1;
		getActivityList();
	}
	
	const getActivityList = () => {
		get(Interface.activity.list, {
			name: data.searchVal,
			page: data.pageNumber,
			rows: data.pageSize,
			folderId: data.categoryId
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
	
	const changeTab = (e) => {
		// console.log("e", e);
		data.categoryId = e.id;
		getActivityList();
	}
	
	const getCategory = () => {
		get(Interface.category, {
			category: 1
		}).then(res=>{
			console.log("res", res);
			data.categoryList = res.data;
			data.categoryList.unshift({
				id: "",
				name: "全部"
			})
		})
	}
	getCategory();
	
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
<style lang="scss">
	.is-input-border{
		border-radius: 30rpx !important;
	}
	.tab{
		margin-right: 50rpx !important;
	}
</style>
<style lang="scss" scoped>
	.wrapper{
		.header{
			background: #fff;
			padding: 20rpx 32rpx 10rpx 32rpx;
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
			padding: 20rpx;
		}
	}
</style>