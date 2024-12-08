<template>
	<view class="wrapper">
		<ActivityItem :list="listData" />
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs } from "vue";
	import ActivityItem from "@/components/Activity/ActivityItem.vue";
	import Interface from "@/utils/Interface";
	import { get } from "@/utils/request.js";
	import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	const data = reactive({
		listData: [],
		pageNumber: 1,
		pageSize: 3,
		isPage: false
	});
	
	const { listData, pageNumber, pageSize, isPage } = toRefs(data);
	
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
		padding: 20rpx;
	}
</style>