<template>
	<view class="wrapper">
		<view class="banner">
			<swiper class="swiper" indicator-active-color="#fff" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" @change="onSwiperChange">
				<swiper-item class="swiper-item" v-for="(item,index) in images" :key="index">
					<view class="swiper-item">
						<image class="img" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="custom-dots">
				<view
				  v-for="(item, index) in images"
				  :key="index"
				  :class="['dot', current === index ? 'active' : '']"
				></view>
			</view>
		</view>
		<view class="clubInfo">
			<view class="header">
				
			</view>
			<view class="clubInfo-detail">
				<view class="displayFlex">
					<span>太友趣Club</span>
					<button class="btn">加入</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				indicatorDots: false,
				autoplay: true,
				interval: 5000,
				duration: 500,
				images: [
					'/static/img/1.jpg',
					'/static/img/2.jpg',
					'/static/img/3.jpg'
				],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			onSwiperChange(e) {
			  this.current = e.detail.current; // 更新当前激活的索引
			},
		}
	}
</script>

<style lang="scss">
	.wrapper {
	  .banner {
	    width: 100%;
	    height: 400rpx;
		position: relative;
	    .swiper {
	      width: 100%;
	      height: 100%;
	      .swiper-item {
	        width: 100%;
	        height: 100%;
	        .img {
	          width: 100%;
	          height: 100%;
	          object-fit: cover;
	        }
	      }
	    }
		.custom-dots {
		  position: absolute;
		  bottom: 120rpx;
		  right: 20rpx;
		  // transform: translateX(-50%);
		  display: flex;
		  justify-content: center;
		  align-items: center;
	
		  .dot {
			width: 50rpx;
			height: 10rpx;
			margin: 0 5rpx;
			border-radius: 10px;
			background-color: rgba(255, 255, 255, 0.5);
			transition: background-color 0.3s ease;
	
			&.active {
			  background-color: #fff;
			}
		  }
		}	 
	  }
	  .clubInfo{
		  position: absolute;
		  width: 90%;
		  height: 400rpx;
		  background: #FFFFFF;
		  border-radius: 20rpx;
		  left: 50%;
		  transform: translateX(-50%);
		  top: 300rpx;
	  }
	}
	.btn{
		width: 150rpx;
		height: 60rpx;
		background: pink;
		line-height: 60rpx;
		text-align: center;
		display: inline-block;
		border-radius: 30rpx;
		font-size: 16px;
		margin: 0;
		padding: 0;
	}
</style>
