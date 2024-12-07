<template>
	<view class="detailWrap">
		<view class="banner">
			<image class="img" src="@/static/img/2.jpg" mode="aspectFill"></image>
		</view>
		<view class="detail-content">
			<view style="height: 470rpx;">
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
						<view class="location-desc">北京朝阳区</view>
						<view class="location" @click="handleLocation">
							<uni-icons type="location" color="#fff"></uni-icons>
							<view class="location-text">北京朝阳区</view>
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
			<view class="detail-container">
				<view class="signup-wrap">
					<view class="signHead">
						<view>已报名（9/20）</view>
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
							<view class="avatarItem" v-for="item in [1,2,3,4,5,6,7,8]" :key="item">
								
							</view>
						</view>
						<view class="user-list" v-else>
							<view class="user-item" v-for="item in [1,2,3,4,5,6,7,8]" :key="item">
								<view class="user-item-left">
									<view class="avatar"></view>
									<view class="name">真真</view>
									<view class="sex">
										<uni-icons type="person" color="#db7e9e"></uni-icons>
									</view>
								</view>
								<view class="user-item-right">
									萌新
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="desc-wrap">
					<view class="label">活动描述</view>
					<view class="desc-body">
						<rich-text>
							12312
						</rich-text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-content">
				<view class="footer-tips">
					Tips: 2024-11-26 22:00 前可取消报名
				</view>
				<button class="btn" hover-class="btnHover" @click="handleSignup">活动报名</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, reactive, ref, toRef, toRefs } from "vue";
	import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
	const id = ref('');
	
	const data = reactive({
		isExpand: false
	});
	
	const { isExpand } = toRefs(data);
	
	const handleExpand = () => {
		data.isExpand = !data.isExpand;
	}
	
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
	
	const handleLocation = () => {
	  console.log("获取位置信息");
	  uni.getLocation({
	    type: 'gcj02', // 使用GCJ-02坐标系，适配腾讯地图和微信内置地图
	    success: function (res) {
	      console.log("定位成功", res);
	      const { latitude, longitude } = res;
	
	      // 打开地图并显示当前位置
	      uni.openLocation({
	        latitude,
	        longitude,
	        scale: 18, // 缩放级别，范围为5-18，默认值为18
	        name: "当前位置", // 地点名称，可选
	        address: "你所在的位置", // 地址描述，可选
	        success: function () {
	          console.log('打开地图成功');
	        },
	        fail: function (err) {
	          console.error('打开地图失败', err);
	        }
	      });
	    },
	    fail: function (err) {
	      console.error("定位失败", err);
	    }
	  });
	};
	
	
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
	});
	
	const isToken = () => {
		let token = uni.getStorageSync("token");
		return token ? true : false;
	};
	
	const handleSignup = () => {
		if(!isToken()){			
			uni.showModal({
				title: "提示",
				content:"请先完善用户信息",
				showCancel:false,
				success(res) {
					if(res.confirm == true){
						uni.navigateTo({
							url:"/pages/my/personInfo/index"
						})
					}
				}
			})
		}
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
			background: #3399ff;
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
					min-height: 1000rpx;
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
