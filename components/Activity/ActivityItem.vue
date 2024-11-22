<template>
	<view class="activityItem" v-for="item in [1,2,3,4,5,6,7,8]" :key="item">
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
	
</script>

<style lang="scss" scoped>
	.activityItem{
		// height: 300px;
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		padding-bottom: 10px;
		margin-top: 15px;
		.activityImg{
			height: 190px;
			position: relative;
			.img{
				width: 100%;
				height: 100%;
			}
			.priceBox{
				position: absolute;
				bottom: 0;
				width: 60px;
				height: 40px;
				background: #fff;
				border-top-right-radius: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				color: #ea3852;
				font-weight: 500;
				.price{
					font-size: 20px;
				}
				.symbol{
					margin-top: 5px;
					margin-right: 5px;
				}
			}
		}
		.activityBody{
			padding: 10px;
			.title{
				display: flex;
				.name{
					font-size: 20px;
					color: #333;
					font-weight: 400;
					margin-left: 10px;
				}
			}
			.row{
				display: flex;
				align-items: center;
				.licon{
					padding-right: 10px;
				}
				.text{
					color: #666;
					font-size: 14px;
				}
			}
		}
	}
</style>