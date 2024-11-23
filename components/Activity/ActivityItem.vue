<template>
	<view class="activityItem" v-for="item in [1,2,3,4,5,6,7,8]" :key="item" @click="handleDetail(item)">
		<view class="activityImg">
			<image class="img" src="../../static/img/2.jpg" mode="aspectFill"></image>
			<view class="priceBox">
				<view class="symbol">¥</view>
				<view class="price">59</view>
			</view>
		</view>
		<view class="activityBody">
			<view class="title">
				<uni-icons type="medal-filled" size="30" color="#f5d16b"></uni-icons>
				<view class="name">
					朝夕读书会《乌合之众》
				</view>
			</view>
			<view class="row location">
				<view class="licon">
					<uni-icons type="location" color="#666" size="20"></uni-icons>
				</view>
				<view class="text">清格书房</view>
			</view>
			<view class="row">
				<view class="licon">
					<uni-icons type="location" color="#666" size="20"></uni-icons>
				</view>
				<view class="text">11月22日 周五 10:00-12:00</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	
	
	const handleDetail = (item) => {
		uni.navigateTo({
			url:"/pages/activity/detail/index?id="+item,
		});
	}
	
</script>

<style lang="scss" scoped>
	.activityItem{
		// height: 300px;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		padding-bottom: 20rpx;
		margin-top: 30rpx;
		.activityImg{
			height: 380rpx;
			position: relative;
			.img{
				width: 100%;
				height: 100%;
			}
			.priceBox{
				position: absolute;
				bottom: -1rpx;
				width: 120rpx;
				height: 80rpx;
				background: #fff;
				border-top-right-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				color: #ea3852;
				font-weight: 500;
				.price{
					font-size: 40rpx;
				}
				.symbol{
					margin-top: 10rpx;
					margin-right: 10rpx;
				}
			}
		}
		.activityBody{
			padding: 20rpx;
			.title{
				display: flex;
				.name{
					font-size: 40rpx;
					color: #333;
					font-weight: 400;
					margin-left: 20rpx;
				}
			}
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
	}
</style>