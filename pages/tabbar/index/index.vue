<template>
	<view class="wrapper">
		<view :class="{'fixedBar':true, active:color=='black'}">
			<uni-nav-bar :color="color" :backgroundColor="backColor" :border="false" title="太友趣"></uni-nav-bar>
		</view>
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
				  :class="{ dot: true, active: current === index }"
				></view>
			</view>
		</view>
		<view class="container">
			<view class="clubInfo">
				<view class="header">
					<view class="logo">
						<image class="logoImg" src="/static/img/logo2.jpg"  mode="aspectFill"></image>
					</view>
				</view>
				<view class="peopleBox">
					<view class="peopleHead">						
						<view>
							成员(2464)
						</view>
						<view class="avatarList">
							<view class="avatarItem" v-for="item in [1,2,3,4]" :key="item">
								
							</view>
						</view>
					</view>
				</view>
				<view class="clubInfo-detail">
					<view class="displayFlex title">
						<span>太友趣Club</span>
						<button class="btn">加入</button>
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
			
			<Tabs :tabs="tabs" @change="handleTab"></Tabs>
			
			<view style="margin-top: 20px;margin-bottom: 20px;">
				<ActivityItem />
			</view>
			<BottomText />
		</view>
		
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs, toRef } from "vue";
	import { onLoad, onReady, onPageScroll } from '@dcloudio/uni-app';
	import { useCounterStore } from "@/stores/counter";
	import Tabs from "@/components/Tabs/Tabs.vue";
	import ActivityItem from "@/components/Activity/ActivityItem.vue";
	import BottomText from "@/components/BottomText/BottomText.vue";
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
		currentTab: 0,
		backColor: "transparent",
		color: "#fff"
	});
	const { title, indicatorDots, autoplay, interval, 
	duration, images, current, tabs, currentTab, backColor, color } = toRefs(data);
	
	const onSwiperChange = (e) => {
		// console.log("e", e, data.current);
		data.current = e.detail.current;
	};
	
	const handleTab = (e) => {
		console.log("handleTab", e);
	}
	
	const goto = () => {
		uni.navigateTo({
			url:"/pages/activity/list/index"
		})
	}
	
	onLoad(()=>{
		const sys = uni.getSystemSetting();
		console.log("sys", sys);
	})
	
	onPageScroll((e)=>{
		if(e.scrollTop>=100){
			data.backColor = "#fff";
			data.color = "black";
		}else {
			data.backColor = "transparent";
			data.color = "#fff";
		}
	})
	
</script>

<style lang="scss" scoped>
	.fixedBar{
		position: fixed;
		width: 100%;
		// top: 44px;
		z-index: 999;
		background: transparent;
		padding-top: 44px;
		&.active{
			background: #fff !important;
		}
	}
	.wrapper {
	  .banner {
	    width: 100%;
	    height: 260px;
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
		  bottom: 140rpx;
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
		  top: 230px;
	  }
	  .clubInfo{
		  // height: 400rpx;
		  background: #FFFFFF;
		  border-radius: 20rpx;
		  padding-top: 50px;
		  padding-bottom: 15px;
		  position: relative;
		  border-top-left-radius: 0;
		  .header{
			  width: 130px;
			  height: 80px;
			  position: absolute;
			  bottom: 80%;
			  left: 0;
			  background: #fff;
			  border-radius: 20rpx 20rpx 0 0;
			  z-index: 9;
			  .logo{
				  width: 90px;
				  height: 90px;
				  border-radius: 50%;
				  margin-left: 15px;
				  margin-top: -15px;
				  background: #fff;
				  padding: 5px;
				  .logoImg{
					  width: 100%;
					  height: 100%;
					  border-radius: 50%;
				  }
			  }
		  }
		  .peopleBox{
			  position: absolute;
			  bottom: 95%;
			  left: 130px;
			  width: calc(100% - 130px);
			  height: 40px;
			  background: #6be8f5;
			  border-top-right-radius: 20rpx;
			  color: #333;
			  z-index: 1;
			  .peopleHead{
				line-height: 40px;
				padding-left: 10px;
				color: #333;
				font-weight: 500;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-right: 10px;
			  }
			  .avatarList{
				  display: flex;
				  align-items: center;
				  gap: -8px;
				  .avatarItem{
					  width: 28px;
					  height: 28px;
					  border-radius: 50%;
					  background: #e2e3e5;
					  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
					  margin-left: -5px;
				  }
			  }
		  }
		  .clubInfo-detail{
			  padding: 0 15px;
			  .title{
				  padding-bottom: 10px;
			  }
		  }
		  .club-desc{
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
		&::after,&::before{
			content: '';
			display: none;
		}
	}
	
</style>
