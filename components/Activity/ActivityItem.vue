<template>
	<view class="activityItem" v-for="(item, index) in list" :key="index" @click="handleDetail(item)">
		<view class="activityImg">
			<image class="img" :src="item.currentImg" mode="aspectFill"></image>
			<view class="priceBox">
				<view class="symbol">¥</view>
				<view class="price">{{item.price}}</view>
			</view>
		</view>
		<view class="activityBody">
			<view class="title">
				<uni-icons type="medal-filled" size="30" color="#f5d16b"></uni-icons>
				<view class="name">
					{{ item.name }}
				</view>
			</view>
			<view class="row location">
				<view class="licon">
					<text class="text-icon color-1">&#xe62f;</text>
					<!-- <uni-icons type="location" color="#666" size="20"></uni-icons> -->
				</view>
				<view class="text">{{item.address}}</view>
			</view>
			<view class="row">
				<view class="licon">
					<text class="text-icon color-1">&#xe661;</text>
					<!-- <uni-icons type="location" color="#666" size="20"></uni-icons> -->
				</view>
				<view class="text">
				{{moment(item.startTime).format('MM')}}月{{moment(item.startTime).format('DD')}}日
				 {{ weekName(item.startTime) }} 
				 {{moment(item.startTime).format('hh:mm')}}-{{moment(item.endTime).format('hh:mm')}}</view>
			</view>
		</view>
	</view>
	<Empty v-if="list.length==0" />
</template>

<script setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import moment from "moment";
	import Empty from "@/components/Empty/EmptyView.vue";
	const weeks = ['周日','周一','周二','周三','周四','周五','周六'];
	
	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		}
	})
	
	const weekName = (date) => {
		const day = moment(date).day();
		return weeks[day];
	}
	
	const handleDetail = (item) => {
		uni.navigateTo({
			url:"/pages/activity/detail/index?id="+item.id,
		})
	}
	
</script>
<style>
	@import url("@/static/style/public.css");
</style>
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