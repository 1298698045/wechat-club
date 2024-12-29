<template>
	<view class="detailWrap">
		<view class="banner">
			<image class="img" :src="currentImg" mode="aspectFill"></image>
		</view>
		<view class="detail-content">
			<view style="height: 470rpx;">
				<view class="activity-info">
					<view class="top-radius"></view>
					<view class="activity-info-bd">					
						<view class="price">
							<view class="symbol">¥</view>
							<view class="priceNum">{{ detail.price }}</view>
						</view>
						<view class="info-head">
							<view class="name">
								{{ detail.name }}
							</view>
							<button open-type="share" class="shareBtn" @click="handleShare">
								<uni-icons type="redo" color="#fff"></uni-icons>
								分享
							</button>
						</view>
						<view class="location-desc">{{ detail.address }}</view>
						<view class="location" @click="handleLocation">
							<uni-icons type="location" color="#fff"></uni-icons>
							<view class="location-text">{{ detail.address }}</view>
						</view>
						<view class="split"></view>
						<view class="row">
							<view class="label">活动时间</view>
							<view class="value">
								{{moment(detail.startTime).format('MM')}}月{{moment(detail.startTime).format('DD')}}日
								 {{ weekName(detail.startTime) }} 
								 {{moment(detail.startTime).format('hh:mm')}}-{{moment(detail.endTime).format('hh:mm')}}
							</view>
						</view>
						<!-- <view class="row">
							<view class="label">级别</view>
						</view> -->
					</view>
				</view>
			</view>
			<view class="detail-container">
				<view class="signup-wrap">
					<view class="signHead">
						<view>已报名（{{detail.currentStudents}}/{{detail.maxStudents}}）</view>
						<view @click="handleExpand">
							<!-- 默认
							<uni-icons type="down"></uni-icons> -->
							展开
							<uni-icons type="down" v-if="!isExpand"></uni-icons>
							<uni-icons type="up" v-else></uni-icons>
						</view>
					</view>
					<view class="signBody">
						<view class="avatarList" v-if="!isExpand">
							<view class="avatarItem" v-for="(item, index) in peopleList" :key="index">
								<image class="img" :src="item.avatarUrl" mode="aspectFill"></image>
							</view>
						</view>
						<view class="user-list" v-else>
							<view class="user-item" v-for="(item, index) in peopleList" :key="index">
								<view class="user-item-left">
									<view class="avatar">
										<image class="img" :src="item.avatarUrl" mode="aspectFill"></image>
									</view>
									<view class="name">{{item.userName}}</view>
									<view class="sex">
										<uni-icons type="person" :color="item.gender == 0 ? '#db7e9e' : 'blue'"></uni-icons>
									</view>
								</view>
								<view class="user-item-right">
									{{item.levelName}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="desc-wrap">
					<view class="label">活动描述</view>
					<view class="desc-body">
						<rich-text v-html="detail.description">
						</rich-text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" v-if="(!isToken() || stateCode==0) || (isCancel && stateCode==1)">
			<view class="footer-content" v-if="!isToken() || stateCode==0">
				<view class="footer-tips">
					Tips: {{moment(detail.cancelTime).format("YYYY-MM-DD hh:mm")}} 前可取消报名
				</view>
				<button class="btn" hover-class="btnHover" @click="handleSignup">课程报名</button>
			</view>
			<view class="footer-content" style="padding-top: 20rpx;" v-else-if="isCancel && stateCode==1">
				<button class="btn" hover-class="btnHover" @click="cancelSignup">取消报名</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, reactive, ref, toRef, toRefs } from "vue";
	import { onLoad, onShareAppMessage, onShow } from "@dcloudio/uni-app";
	import Interface from "@/utils/Interface";
	import { get, post } from "@/utils/request.js";
	import { useAuthStore } from '@/stores/authStore.js';
	const authStore = useAuthStore();
	import moment from "moment";
	const id = ref('');
	
	
	const weeks = ['周日','周一','周二','周三','周四','周五','周六']
	
	const data = reactive({
		isExpand: false,
		detail: {},
		currentImg: "",
		peopleList: [],
		isCancel: false,
		stateCode: 0,
		isEnd: false,
		isBook: false,
		category: 3
	});
	
	const { isExpand, detail, currentImg, peopleList, isCancel, stateCode, isEnd, isBook, category } = toRefs(data);
	
	const weekName = (date) => {
		const day = moment(date).day();
		return weeks[day];
	}
	
	const handleExpand = () => {
		data.isExpand = !data.isExpand;
	}
	
	const getStatus = () => {
		get(Interface.tourism.getMyStateCode, {
			id: id.value
		}).then(res=>{
			data.stateCode = res.data.stateCode;
		})
	}
	
	
	
	onLoad((options)=>{
		console.log("options", options);
		id.value = options.id;
		if(options.invitee){
			let invitee = options.invitee;
			authStore.setInvitee(invitee);
		}
		getDetail();
		getSignUpPeoples();
		// if(isToken()){
		// 	getStatus();
		// }
	});
	
	
	onShow(()=>{
		if(isToken()){
			getStatus();
		}
	})
	
	const getDetail = () => {
		get(Interface.tourism.detail, {
			id: id.value
		}).then(res=>{
			data.detail = res.data;
			
			let currentImgData = data.detail.pictures.find(row=>row.isRecommend==true);
			let currentImg = '';
			if(currentImgData){
				currentImg = Interface.uploadUrl + currentImgData.fileLocation;
			}
			if(currentImgData==undefined){
				if(data.detail.pictures && data.detail.pictures.length){
					currentImg = Interface.uploadUrl + data.detail.pictures[0]?.fileLocation;
				}
			}
			data.currentImg = currentImg;
			
			const then = moment(data.detail.cancelTime);
			const isBefore = moment().isBefore(then);
			console.log("isBefore", isBefore);
			data.isCancel = isBefore;
			
			data.isEnd = moment().isAfter(data.detail.endTime);
			console.log("isEnd", data.isEnd);
		})
	}
	
	const getSignUpPeoples = () => {
		get(Interface.tourism.signPeoples, {
			id: id.value
		}).then(res=>{
			data.peopleList = res.data;
		})
	}
	
	const handleShare = () => {
		console.log('123123');
		uni.showShareMenu({
		  withShareTicket: true,
		  menus: ['shareAppMessage', 'shareTimeline']
		})
	}
	
	const handleLocation = () => {
	    // console.log("获取位置信息");
		let latitude = data.detail.latitude || 39.904599;
		let longitude = data.detail.longitude || 116.407001;
		uni.openLocation({
		  latitude,
		  longitude,
		  scale: 18, // 缩放级别，范围为5-18，默认值为18
		  name: "当前位置", // 地点名称，可选
		  address: data.detail.address, // 地址描述，可选
		  success: function () {
		    console.log('打开地图成功');
		  },
		  fail: function (err) {
		    console.error('打开地图失败', err);
		  }
		});
	};
	
	
	onShareAppMessage(()=>{
		const promise = new Promise(resolve => {
		  setTimeout(() => {
		    resolve({
		      title: '自定义转发标题'
		    })
		  }, 2000)
		})
		return {
		  title: '自定义转发标题',
		  path: '/pages/activity/detail/index?id='+data.id+'&invitee=' +authStore.invitationCode,
		  promise 
		}
	});
	
	const isToken = () => {
		let token = uni.getStorageSync("token");
		return token ? true : false;
	};
	
	
	
	
	const handleSignup = () => {
		if (data.isBook) return;
		data.isBook = true;
		if(!isToken()){
			uni.showModal({
				title:  "提示",
				content: "请先完善用户信息",
				showCancel: false,
				success(res) {
					if(res.confirm == true){
						uni.navigateTo({
							url:"/pages/my/personInfo/index"
						})
					}
				}
			})
		}else {
			uni.showLoading({
				mask: true,
				title: "报名中～"
			})
			let d = {
				id: id.value,
				category: data.category
			}
			get(Interface.create, d).then(res=>{
				console.log("res", res);
				let orderInfo = res.data;
				const { appId, nonceStr, paySign, signType, timeStamp } = res.data;
				// let timestamp = new Date().getTime();
				uni.hideLoading();
				uni.requestPayment({
					provider:'wxpay',
					appid: appId,
					timeStamp: String(timeStamp),
					nonceStr: nonceStr,
					package: orderInfo.package,
					signType: signType,
					paySign: paySign,
					success(res) {
						data.isBook = false;
						uni.showToast({
							title:'报名成功！',
							duration:3000,
							icon:'success'
						});
						getDetail();
						getStatus();
					},
					fail(err) {
						console.log("err", err);
						data.isBook = false;
						uni.showToast({
							title:'已取消支付',
							duration:3000,
							icon:'success'
						});
					}
				})
			})
		}
	}
	
	const cancelSignup = () => {
		get(Interface.revoke, {
			category: data.category,
			id: id.value
		}).then(res=>{
			uni.showToast({
				title: res.message,
				duration:3000,
				icon:'success'
			});
			if(res.status == 200){
				getDetail();
				getStatus();
			}
		})
	}
	
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
		padding-bottom: 200rpx;
		.banner{
			height: 500rpx;
			background: #f9ffff;
			.img{
				width: 100%;
				height: 100%;
			}
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
			.detail-container{
				position: relative;
				padding: 0 20rpx;
				.signup-wrap{
					background: #fff;
					position: relative;
					top: -40rpx;
					z-index: 9999;
					border-radius: 10rpx;
					padding: 20rpx 30rpx;
					.signHead{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20rpx;
					}
					.signBody{
						.avatarList{
						  display: flex;
						  align-items: center;
						  gap: -16rpx;
						  margin-left: 10rpx;
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
						.user-list{
							.user-item{
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-bottom: 30rpx;
								&:last-child{
									margin-bottom: 0;
								}
								.user-item-left{
									display: flex;
									align-items: center;
									.avatar{
										width: 56rpx;
										height: 56rpx;
										border-radius: 50%;
										background: #e2e3e5;
										margin-right: 20rpx;
										.img{
										  width: 100%;
										  height: 100%;
										  border-radius: 50%;
										}
									}
									.name{
										margin-right: 10rpx;
									}
								}
								.user-item-right{
									color: #333333;
								}
							}
						}
					}
				}
				.desc-wrap{
					margin-top: -10rpx;
					// min-height: 1000rpx;
					background: #fff;
					padding: 20rpx;
					border-radius: 10rpx;
					.desc-body{
						margin-top: 20rpx;
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
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					border-radius: 50rpx;
					background: #6be8f5;
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
