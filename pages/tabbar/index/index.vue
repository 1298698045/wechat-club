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
				  :class="['dot', current == index ? 'active' : '']"
				></view>
			</view>
		</view>
		<div class="container">
			<view class="clubInfo">
				<view class="header">
					
				</view>
				<view class="clubInfo-detail">
					<view class="displayFlex" style="padding: 10px;">
						<span>太友趣Club</span>
						<view class="btn">加入</view>
					</view>
					<view class="club-desc">
						北京中年社交平台。我们定期组织各种丰富多彩的活动，在这里，可以结识志同道合的朋友，一起快乐享老，友趣的人生正精彩。<br/>
						旅游、运动、沙龙、手工、棋牌等。加入我们吧!微信 funclub619
					</view>
				</view>
			</view>
			<view class="menu-wrap">
				<view class="menu-item">
					<view class="menu-item-icon">
						<uni-icons type="calendar" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">出勤榜</view>
				</view>
				<view class="menu-item">
					<view class="menu-item-icon">
						<uni-icons type="image" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">活动影集</view>
				</view>
				<view class="menu-item" @click="goto">
					<view class="menu-item-icon">
						<uni-icons type="list" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">活动记录</view>
				</view>
				<view class="menu-item">
					<view class="menu-item-icon">
						<uni-icons type="wallet" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">优惠规则</view>
				</view>
			</view>
			
			
			<view class="tabContainer">
				<view class="tabs">
					<view class="tab" :class="{'active':currentTab==index}" v-for="(item,index) in tabs" :key="index" @click="handleTab(index, item)">
						<view class="text">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</div>
		
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs, toRef } from "vue";
	import { onReady } from '@dcloudio/uni-app';
	import { useCounterStore } from "@/stores/counter";
	const store = useCounterStore();
	console.log("count:", store.count)
	const data = reactive({
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
		current: 0,
		tabs: [
			{
				name: "活动"
			},
			{
				name: "评价"
			},
			{
				name: "周期表"
			}
		],
		currentTab: 0
	});
	const { title, indicatorDots, autoplay, interval, 
	duration, images, current, tabs, currentTab } = toRefs(data);
	
	const onSwiperChange = (e) => {
		console.log("e", e, data.current);
		data.current = e.detail.current;
	};
	
	const handleTab = (index, item) => {
		data.currentTab = index;
	}
	
	const goto = () => {
		uni.navigateTo({
			url:"/pages/activity/list/index"
		})
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
	  .container{
		  position: absolute;
		  width: 95%;
		  left: 50%;
		  transform: translateX(-50%);
		  top: 300rpx;
	  }
	  .clubInfo{
		  // height: 400rpx;
		  background: #FFFFFF;
		  border-radius: 20rpx;
		  .club-desc{
			  padding: 10px;
			  font-size: 14px;
			  color: #484848;
		  }
	  }
	  .menu-wrap{
		height: 100px;
		background: #fff;
		border-radius: 10px;
		margin: 10px 0;
		display: flex;
		flex-wrap: wrap;
		// flex-direction: column;
		.menu-item{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.menu-item-icon{
				width: 45px;
				height: 45px;
				line-height: 45px;
				background: #f1f1f1;
				border-radius: 40%;
				text-align: center;
			}
			.menu-item-name{
				margin-top: 10px;
				font-size: 14px;
				color: #3d3d3d;
			}
		}
	  }
	}
	.btn{
		width: 130rpx;
		height: 60rpx;
		background: pink;
		line-height: 60rpx;
		text-align: center;
		display: inline-block;
		border-radius: 30rpx;
		font-size: 16px;
		margin: 0;
		padding: 0;
		background: #6be8f5;
		font-weight: 700;
		outline: none;
		border: none;
	}
	.tabContainer{
		display: flex;
		justify-content: center;
		margin-top: 20px;
		.tabs{
			display: flex;
			.tab{
				margin-right: 50px;
				color: #878787;
				font-size: 16px;
				position: relative;
				&.active{
					color: #333;
					font-weight: 700;
					&::after{
						position: absolute;
						content: "";
						display: inline-block;
						width: 100%;
						height: 10px;
						background: #6be8f5;
						bottom: -1px;
						z-index: -1;
					}
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
</style>
