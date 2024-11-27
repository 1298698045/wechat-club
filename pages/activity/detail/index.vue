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
					<view class="info-head">
						<view class="name">
							攀岩🧗‍♀️体验新项目
						</view>
						<button open-type="share" class="shareBtn" @click="handleShare">
							<uni-icons type="redo" color="#fff"></uni-icons>
							分享
						</button>
					</view>
					<view class="location-desc">北京朝阳区优士阁A座</view>
					<view class="location">
						<uni-icons type="location" color="#fff"></uni-icons>
						<view class="location-text">北京朝阳区优士阁</view>
					</view>
					<view class="split"></view>
					<view class="row">
						<view class="label">活动时间</view>
						<view class="value">2024-11-27</view>
					</view>
					<view class="row">
						<view class="label">级别</view>
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
	import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
	const id = ref('');
	onLoad((options)=>{
		console.log("options", options);
		id.value = options.id;
	})
	
	const handleShare = () => {
		console.log('123123');
		uni.showShareMenu({
		  withShareTicket: true,
		  menus: ['shareAppMessage', 'shareTimeline']
		})
	}
	onShareAppMessage(()=>{
		const promise = new Promise(resolve => {
		  setTimeout(() => {
		    resolve({
		      title: '自定义转发标题123'
		    })
		  }, 2000)
		})
		return {
		  title: '自定义转发标题123',
		  path: '/pages/activity/detail/index?id=123',
		  promise 
		}
	})
</script>

<style lang="scss" scoped>
	.shareBtn{
		border: none;
		margin: 0;
		padding: 0;
		outline: 0;
		background: transparent;
		color: #fff;
		font-size: 28rpx;
		&::after,&::before{
			content: '';
			display: none;
		}
	}
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
					.info-head{
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28rpx;
						color: #fff;
						.name{
							font-size: 34rpx;
						}
					}
					.location-desc{
						font-size: 32rpx;
						color: #999da6;
					}
					.location{
						font-size: 28rpx;
						color: #fff;
						display: flex;
						align-items: center;
						margin-top: 10rpx;
						.location-text{
							margin-left: 20rpx;
						}
					}
					.split{
						margin: 32rpx 0;
						border-bottom: 2rpx dashed #fff;
					}
					.row{
						color: #fff;
						font-size: 28rpx;
						margin-bottom: 20rpx;
						display: flex;
						.label{
							color: #999da6;
							margin-right: 20rpx;
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
