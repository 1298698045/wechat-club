<template>
	<view class="detailWrap">
		活动ID：{{id}}
		<view class="banner">
			
		</view>
		<view class="detail-content">
			<view class="activity-info">
				<view class="top-radius"></view>
				<view class="activity-info-bd">					
					<view class="price">
						<view class="symbol">¥</view>
						<view class="priceNum">79</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-content">
				<view class="footer-tips">
					Tips: 2024-11-26 22:00 前可取消报名
				</view>
				<button class="btn" hover-class="btnHover">活动报名</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	const id = ref('');
	onLoad((options)=>{
		console.log("options", options);
		id.value = options.id;
	})
</script>

<style lang="scss" scoped>
	.detailWrap{
		.banner{
			height: 300rpx;
			background: #3399ff;
		}
		.detail-content{
			width: 100%;
			position: relative;
			.activity-info{
				width: 100%;
				position: absolute;
				top: -30rpx;
				height: 500rpx;
				background: #38404b;
				border-radius: 0 30rpx 0 0;
				z-index: 1;
				.top-radius{
					width: 200rpx;
					height: 60rpx;
					position: absolute;
					top: -40rpx;
					background: #38404b;
					border-radius: 0 200rpx 0 0;
				}
				.activity-info-bd{
					position: relative;
					z-index: 9;
					padding: 0 30rpx 30rpx;
					.price{
						display: flex;
						font-size: 30rpx;
						color: #fae79b;
						font-weight: 400;
						align-items: flex-end;
						.symbol{
							padding-bottom: 10rpx;
						}
						.priceNum{
							font-size: 62rpx;
							padding-left: 20rpx;
							margin-top: -20rpx;
						}
					}
				}
			}
		}
		.footer{
			width: 100%;
			height: 190rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			.footer-content{
				display: flex;
				flex-direction: column;
				text-align: center;
				.footer-tips{
					color: #868789;
					font-size: 24rpx;
					background: #f9ffff;
					line-height: 60rpx;
				}
				.btn{
					width: calc(100% - 80rpx);
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 50rpx;
					background: #98f2fb;
					margin: 0;
					padding: 0;
					color: #333333;
					font-weight: 500;
					margin: 0 auto;
					&::after,&::before{
						content: '';
						display: none;
					}
				}
				.btnHover{
					background: #98f2f1;
				}
			}
		}
	}
</style>
