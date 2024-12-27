<template>
	<view class="wrapper">
		<view :class="{'fixedBar':true, active:color=='black'}" :style="{paddingTop: statusBarHeight+'px'}">
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
							成员({{memberNumber}})
						</view>
						<view class="avatarList" @click="previewMember">
							<view class="avatarItem" v-for="(item,index) in members" :key="index">
								<image class="img" :src="item.avatarUrl" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="clubInfo-detail">
					<view class="displayFlex title">
						<view style="font-weight: 500;font-size: 36rpx;">太友趣Club</view>
						<!-- <button class="btn">加入</button> -->
					</view>
					<view class="club-desc">
						北京中年社交平台。我们定期组织各种丰富多彩的活动，在这里，可以结识志同道合的朋友，一起快乐享老，友趣的人生正精彩。<br/>
						旅游、运动、沙龙、手工、棋牌等。加入我们吧!微信 funclub619
					</view>
				</view>
			</view>
			<view class="menu-wrap">
				<!-- <view class="menu-item">
					<view class="menu-item-icon">
						<uni-icons type="calendar" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">出勤榜</view>
				</view> -->
				<view class="menu-item" @click="handleAlbum">
					<view class="menu-item-icon">
						<uni-icons type="image" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">活动影集</view>
				</view>
				<view class="menu-item" @click="goto">
					<view class="menu-item-icon">
						<!-- <image style="width: 48rpx;height: 48rpx;" src="../../../static/img/icon.png" mode="aspectFill"></image> -->
						<uni-icons type="list" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">活动记录</view>
				</view>
				<view class="menu-item" @click="gotoDiscout">
					<view class="menu-item-icon">
						<uni-icons type="wallet" size="30" color="#6be8f5"></uni-icons>
					</view>
					<view class="menu-item-name">优惠规则</view>
				</view>
			</view>
			<view :class="{'tabWrap': true, active:isTabsFixed}" :style="{top:top+'px'}">
				<Tabs :tabs="tabs" @change="handleTab"></Tabs>
			</view>
			
			<view style="margin-bottom: 20px;">
				<view class="headerLabel" v-if="currentTab==0">
					<view class="label">活动（{{activityTotal}}）</view>
					<view class="operator">
					</view>
				</view>
				<view class="headerLabel" v-if="currentTab==1">
					<view class="label">评价（{{commentTotal}}）</view>
					<view class="operator">
						<button class="write-btn" @click="handleEval">写评价</button>
					</view>
				</view>
				<ActivityItem :list="listData" v-if="currentTab==0" />
				<CommentItem ref="commonRef" @change="setCommentTotal" v-else-if="currentTab==1" />
			</view>
			<BottomText v-if="activityTotal > 0 || commentTotal > 0" />
		</view>
		
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs, toRef } from "vue";
	import { onLoad, onReady, onPageScroll, onPullDownRefresh, onShow } from '@dcloudio/uni-app';
	import { useCounterStore } from "@/stores/counter";
	import Tabs from "@/components/Tabs/Tabs.vue";
	import ActivityItem from "@/components/Activity/ActivityItem.vue";
	import CommentItem from "@/components/Comment/CommentItem.vue";
	import BottomText from "@/components/BottomText/BottomText.vue";
	import Interface from "../../../utils/Interface";
	import { get } from "@/utils/request.js";
	import { checkAuth } from "@/utils/auth.js";
	const store = useCounterStore();
	console.log("count:", store.count)
	
	const commonRef = ref(null);
	const data = reactive({
		title: 'Hello',
		indicatorDots: false,
		autoplay: true,
		interval: 5000,
		duration: 500,
		images: [
			'http://47.96.15.8:9006/images/2.jpg',
			'http://47.96.15.8:9006/images/2.jpg',
			'http://47.96.15.8:9006/images/3.jpg'
		],
		current: 0,
		tabs: [
			{
				id:0,
				name: "活动"
			},
			{
				id: 1,
				name: "评价"
			},
			// {
			// 	name: "周期表"
			// }
		],
		currentTab: 0,
		backColor: "transparent",
		color: "#fff",
		statusBarHeight: 0,
		isTabsFixed: false,
		top: 0,
		listData: [],
		members: [],
		memberNumber: 0,
		activityTotal: 0,
		commentTotal: 0
	});
	const { title, indicatorDots, autoplay, interval, 
	duration, images, current, tabs, currentTab, backColor, color, statusBarHeight, isTabsFixed, top,
	 listData, members, memberNumber, activityTotal, commentTotal } = toRefs(data);
	
	const onSwiperChange = (e) => {
		// console.log("e", e, data.current);
		data.current = e.detail.current;
	};
	
	const setCommentTotal = (e) => {
		data.commentTotal = e;
	}
	
	const getMemberList = (e) => {
		get(Interface.member.list, {
			page: 1,
			rows: 5
		}).then(res=>{
			data.members = res.data;
			data.memberNumber = res.total;
		})
	};
	// getMemberList();
	
	// 获取推荐活动
	const getRecommends = () => {
		get(Interface.activity.recommend, {}).then(res=>{
			// console.log("res", res);
			data.activityTotal = res.total;
			data.listData = res.data.map(item=>{
				let currentImgData = item.pictures.find(row=>row.isRecommend==true);
				let currentImg = '';
				if(currentImgData){
					currentImg = Interface.uploadUrl + currentImgData.fileLocation;
				}
				if(currentImgData==undefined){
					if(item.pictures && item.pictures.length){
						currentImg = Interface.uploadUrl + item.pictures[0]?.fileLocation;
					}
				}
				item.currentImg = currentImg;
				return item;
			});
		})
	}
	// getRecommends();
	
	const handleTab = (e) => {
		data.currentTab = e.id;
		uni.showLoading({
			title: '加载中',
			duration: 2000,
			success() {
				setTimeout(()=>{
					uni.hideLoading();
				},1000)
			}
		})
	}
	
	const goto = () => {
		uni.navigateTo({
			url:"/pages/activity/recordList/index"
		})
	}
	
	const handleAlbum = () => {
		uni.navigateTo({
			url: "/pages/activity/album/index"
		})
	}
	
	const gotoDiscout = () => {
		uni.navigateTo({
			url: "/pages/other/discountRules/index"
		})
	}
	
	onLoad(()=>{
		const windowInfo = uni.getWindowInfo();
		console.log("windowInfo", windowInfo);
		data.statusBarHeight = windowInfo.statusBarHeight;
		data.top = windowInfo.statusBarHeight + 44;
	});
	
	onShow(()=>{
		if(commonRef && commonRef.value){
			commonRef.value.getQuery();
		}
		getMemberList();
		getRecommends();
	})
	
	
	onPageScroll((e)=>{
		// console.log("onPageScroll", e);
		if(e.scrollTop>=100){
			data.backColor = "#fff";
			data.color = "black";
		}else {
			data.backColor = "transparent";
			data.color = "#fff";
		}
		if(e.scrollTop>=460){
			data.isTabsFixed = true;
		}else {
			data.isTabsFixed = false;
		}
	});
	
	const handleEval = () => {
		checkAuth(()=>{			
			uni.navigateTo({
				url:"/pages/other/evaluate/index"
			})
		})
	}
	
	const previewMember = () => {
		uni.navigateTo({
			url:"/pages/other/memberInfo/index"
		})
	}
	
	onPullDownRefresh(()=>{
		console.log("12123");
		uni.stopPullDownRefresh();
	})
	
</script>

<style lang="scss" scoped>
	.fixedBar{
		position: fixed;
		width: 100%;
		z-index: 999;
		background: transparent;
		&.active{
			background: #fff !important;
			box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
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
		  padding-top: 100rpx;
		  padding-bottom: 30rpx;
		  position: relative;
		  border-top-left-radius: 0;
		  .header{
			  width: 260rpx;
			  height: 170rpx;
			  position: absolute;
			  bottom: 80%;
			  left: 0;
			  background: #fff;
			  border-radius: 20rpx 20rpx 0 0;
			  z-index: 9;
			  .logo{
				  width: 180rpx;
				  height: 180rpx;
				  border-radius: 50%;
				  margin-left: 30rpx;
				  margin-top: -30rpx;
				  background: #fff;
				  padding: 10rpx;
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
			  left: 260rpx;
			  width: calc(100% - 260rpx);
			  height: 80rpx;
			  // background: #6be8f5;
			  background: linear-gradient(to right, #e1bbec, #bbc4ed 30%, #99cbee 50%, #68e3f5 70%, #68e3f5);
			  border-top-right-radius: 20rpx;
			  color: #333;
			  z-index: 1;
			  .peopleHead{
				line-height: 80rpx;
				padding-left: 20rpx;
				color: #333;
				font-weight: 500;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-right: 20rpx;
			  }
			  .avatarList{
				  display: flex;
				  align-items: center;
				  gap: -16rpx;
				  .avatarItem{
					  width: 56rpx;
					  height: 56rpx;
					  border-radius: 50%;
					  background: #e2e3e5;
					  box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.2);
					  margin-left: -10rpx;
					  .img{
						  width: 100%;
						  height: 100%;
						  border-radius: 50%;
					  }
				  }
			  }
		  }
		  .clubInfo-detail{
			  padding: 0 30rpx;
			  .title{
				  padding-bottom: 20rpx;
			  }
		  }
		  .club-desc{
			  font-size: 28rpx;
			  color: #484848;
		  }
	  }
	  .menu-wrap{
		height: 200rpx;
		background: #fff;
		border-radius: 20rpx;
		margin: 20rpx 0;
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
				width: 90rpx;
				height: 90rpx;
				// line-height: 90rpx;
				background: #f1f1f1;
				border-radius: 40%;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.menu-item-name{
				margin-top: 20rpx;
				font-size: 28rpx;
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
		font-size: 32rpx;
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
	.tabWrap{
		background: #f4f4f4;
		display: flex;
		justify-content: center;
		align-items: center;
		&.active{
			position: sticky;
			z-index: 9999;
		}
	}
	.headerLabel{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		.write-btn{
			width: 150rpx;
			height: 60rpx;
			background: pink;
			line-height: 60rpx;
			text-align: center;
			display: inline-block;
			border-radius: 30rpx;
			font-size: 26rpx;
			margin: 0;
			padding: 0;
			background: #fff;
			font-weight: normal;
			outline: none;
			border: 1rpx solid #ea3582;
			color: #ea3582;
			&::after,&::before{
				content: '';
				display: none;
			}
		}
	}
</style>
<style scoped>
	/deep/ .uni-navbar__header .uni-nav-bar-text{
		font-size: 36rpx !important;
		font-weight: 500;
	}
</style>
