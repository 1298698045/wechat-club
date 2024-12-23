<template>
	<view class="album-wrap">
		<view class="albumList">
			<view class="album-item" v-for="item in [1,2,3,4,5]" :index="item">
				<view class="backImg">
					<image class="img" src="http://47.96.15.8:9006/images/2.jpg" mode="aspectFill"></image>
				</view>
				<view class="album-item-content">
					<view class="title">
						高尔夫教学体验
					</view>
					<view class="album-info">
						<view class="left">
							<view class="into">
								<view class="row">
									<uni-icons type="location" color="#fff"></uni-icons>
									青年湖高尔夫俱乐部 ｜''
								</view>
								<view class="row">
									<uni-icons type="location" color="#fff"></uni-icons>
									10月19日 周四 14:00-16:00
								</view>
							</view>
						</view>
						<view class="right">
							<button class="btn">点击查看</button>
						</view>
					</view>
					<view class="album-images">
						<view class="album-img" v-for="item in [1,2,3,4,5]" :index="item" @click="previewImg(item)">
							<image class="img" src="http://47.96.15.8:9006/images/2.jpg"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	
	const previewImg = () => {
		uni.previewImage({
			urls: ["http://47.96.15.8:9006/images/2.jpg","http://47.96.15.8:9006/images/2.jpg","http://47.96.15.8:9006/images/3.jpg"],
			current: "http://47.96.15.8:9006/images/2.jpg",
			success: (res) => {
				
			}
		})
	}
	
</script>

<style lang="scss" scoped>
	.album-wrap{
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