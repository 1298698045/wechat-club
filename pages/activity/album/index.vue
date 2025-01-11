<template>
	<view class="album-wrap">
		<view class="albumList">
			<view class="album-item" v-for="(item, index) in listData" :index="index">
				<view class="backImg">
					<image class="img" :src="item.backImg" mode="aspectFill"></image>
				</view>
				<view class="album-item-content">
					<view class="title">
						{{item.name}}
					</view>
					<view class="album-info">
						<view class="left">
							<view class="into">
								<view class="row">
									<uni-icons type="location" color="#fff"></uni-icons>
									{{item.address}}
								</view>
								<view class="row">
									<uni-icons type="location" color="#fff"></uni-icons>
									{{moment(item.startTime).format('MM')}}月{{moment(item.startTime).format('DD')}}日
									 {{ weekName(item.startTime) }} 
									 {{moment(item.startTime).format('hh:mm')}}-{{moment(item.endTime).format('hh:mm')}}
								</view>
							</view>
						</view>
						<view class="right">
							<!-- <button class="btn">点击查看</button> -->
						</view>
					</view>
					<view class="album-images">
						<view class="album-img" v-for="(row, idx) in item.showPictures" :index="idx" @click="previewImg(item, row)">
							<image class="img" :src="Interface.uploadUrl + row.fileLocation"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs } from "vue";
	import Interface from "@/utils/Interface";
	import { get } from "@/utils/request.js";
	import moment from "moment";
	import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	const weeks = ['周日','周一','周二','周三','周四','周五','周六'];
	
	const data = reactive({
		listData: [],
		pageNumber: 1,
		pageSize: 5,
		isPage: false
	});
	const { listData, pageNumber, pageSize, isPage } = toRefs(data);
	
	const weekName = (date) => {
		const day = moment(date).day();
		return weeks[day];
	}
	const getQuery = () => {
		get(Interface.activity.album, {
			page: data.pageNumber,
			rows: data.pageSize
		}).then(res=>{
			let list = res.data.map(item=>{
				let backImg = "";
				if(item.showPictures.length){
					backImg = Interface.uploadUrl + item.showPictures[0].fileLocation;
				}
				item.backImg = backImg;
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
	}
	
	const previewImg = (item, row) => {
		let current = Interface.uploadUrl + row.fileLocation;
		let urls = [];
		item.showPictures.forEach(v=>{
			let url = Interface.uploadUrl + v.fileLocation;
			urls.push(url);
		})
		uni.previewImage({
			urls: urls,
			current: current,
			success: (res) => {
				
			}
		})
	}
	onLoad(()=>{
		getQuery();
	});
	
	onPullDownRefresh(()=>{
		data.pageNumber = 1;
		getQuery();
	});
	
	onReachBottom(()=>{
		if(data.isPage){
			data.pageNumber++;
			getQuery();
		}
	})
	
	
</script>

<style lang="scss" scoped>
	.album-wrap{
		margin-bottom: 20rpx;
		.albumList{
			padding: 0 32rpx;
			.album-item{
				width: 100%;
				height: 335rpx;
				border-radius: 10rpx;
				position: relative;
				margin-top: 28rpx;
				.backImg{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					.img{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.album-item-content{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, .5);
					border-radius: 10rpx;
					padding: 20rpx;
					.title{
						color: #6be8f5;
						font-weight: 500;
					}
					.album-info{
						display: flex;
						justify-content: space-between;
						// align-items: center;
						.left{
							color: #fff;
							font-size: 28rpx;
							padding-top: 20rpx;
						}
						.right{
							.btn{
								width: 160rpx;
								height: 60rpx;
								line-height: 60rpx;
								text-align: center;
								margin: 0;
								padding: 0;
								border: none;
								outline: 0;
								background: linear-gradient(to right, #aaf6fc, #68e3f5);
								margin-right: 30rpx;
								border-radius: 50rpx;
								font-size: 28rpx;
								font-weight: 500;
								&:last-child{
									margin-right: 0;
								}
								&::after,&::before{
									content: '';
									display: none;
								}
							}
						}
					}
					.album-images{
						display: flex;
						margin-top: 20rpx;
						.album-img{
							width: 120rpx;
							height: 120rpx;
							border-radius: 10rpx;
							margin-right: 20rpx;
							background: #fff;
							.img{
								width: 100%;
								height: 100%;
								border-radius: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>