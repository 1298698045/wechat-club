<template>
	<view class="center">
		<view class="bg center">
			<view class="bg-radius"></view>
			<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
				<button class="btn" @tap="handleLogin">
					<image class="logo-img" :src="personalInfo.avatarUrl"></image>
				</button>
				<view class="logo-title">
					<text class="uer-name" @tap="handleLogin">{{personalInfo.userName || '未设置昵称'}}</text>
				</view>
				<view class="count">
					<view class="count-item" v-for="(c,index) in count" :key="index" @click="handleItemGoto(c, index)">
						<text class="count-item-num">{{c.num}}</text>
						<text class="count-item-text">{{c.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-gray center">
		<!-- <view class="center-nav margin-top">
			<view class="center-nav-title">
				<text>我的订单</text>
			</view>
			<view class="center-nav-content">
				<view class="center-nav-item" v-for="(nav,index) in navs" :key="index" @click="handleItemGoto(nav, index)">
					<text class="center-nav-item-icon"> {{ nav.icon  }}  </text>
					<text class="center-nav-item-text">{{nav.text}}</text>
				</view>
			</view>
		</view> -->
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="handleScanCode">
				<view class="list-icon">
					<uni-icons type="scan" size="23" color="#007aff"></uni-icons>
				</view>
				<text class="list-text">扫码签到</text>
			</view>
			<view class="center-list-item border-bottom" @click="gotoOrder">
				<text class="list-icon color-1">&#xe737;</text>
				<text class="list-text">我的订单</text>
			</view>
			<view class="center-list-item border-bottom" @click="gotoUser">
				<text class="list-icon color-1">&#xe60e;</text>
				<text class="list-text">帐号管理</text>
			</view>
<!-- 			<view class="center-list-item">
				<text class="list-icon color-2">&#xe60b;</text>
				<text class="list-text">新消息通知</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> -->
		</view>
		<!-- <view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon color-3">&#xe60c;</text>
				<text class="list-text">帮助与反馈</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon color-4">&#xe60c;</text>
				<text class="list-text">服务条款及隐私</text>
			</view>
		</view> -->
		<view class="center-list">
			<view class="center-list-item" @click="gotoAbout">
				<text class="list-icon color-1">&#xe60d;</text>
				<text class="list-text">关于</text>
			</view>
		</view>
		</view>
	</view>
</template>
<script setup>
	import { reactive, ref } from "vue";
	import Interface from "@/utils/Interface";
	import { get, post } from "@/utils/request.js";
	import { checkAuth } from '@/utils/auth.js';
	import { useAuthStore } from '@/stores/authStore.js';
	const authStore = useAuthStore();
	import { onLoad, onShareAppMessage, onShow } from "@dcloudio/uni-app";
	const navs = ref([
		{
			icon:"\u{e602}",
			text:'我的订单',
			url:"/pages/my/order/index"
		},
		{
			icon:"\u{e602}",
			text:'我的钱包'
		},
		{
			icon:"\u{e602}",
			text:'我的卡券'
		},
		{
			icon:"\u{e602}",
			text:'工具箱'
		},
		{
			icon:'\u{e602}',  //原代码：&#xe60a;
			text:'我的活动'
		}
	]);
	const count = ref([
		// {
		// 	num:5,
		// 	text:'我的活动',
		// 	url: "/pages/my/activity/index"
		// },
		{
			num: "普通用户",
			text:'会员等级'
		},
		{
			num: 0,
			text:'我的积分'
		}
	]);
	const login = ref(!true);
	const code = ref();
	
	const personalInfo = reactive({
		userName: "",
		avatarUrl: "",
		totalPoints: 0
	})
	
	const handleLogin = async () => {
		// try {
		// 	const profileRes = await uni.getUserProfile({
		// 	  provider: "weixin",
		// 	  desc: "太友趣小程序隐私保护指引",
		// 	});
		// 	console.log("用户信息获取成功:", profileRes);
		// 	let userInfo = JSON.parse(profileRes.rawData);
		// 	console.log("user", userInfo)
			
		// 	const loginRes = await uni.login({ provider: "weixin" });
		// 	console.log("登录成功，code:", loginRes.code);
		// 	code.value = loginRes.code;
		// 	console.log("code.value", code.value);
			
		// 	post(Interface.login,{
		// 		code: code.value,
		// 		nickName: userInfo.nickName,
		// 		avatarUrl: userInfo.avatarUrl
		// 	}).then(res=>{
		// 		console.log('res', res);
		// 	})
		// }catch(err){
		// 	console.log("err", err);
		// }
		checkAuth(()=>{
			console.log("已登录")
		})
	}
	
	const gotoUser = () => {
		checkAuth(()=>{
			uni.navigateTo({
				url: "/pages/my/personalEdit/index"
			})
		})
	}
	
	const handleItemGoto = (item, index) => {
		if(item.url){			
			// uni.navigateTo({
			// 	url: item.url
			// })
		}
	};
	
	const gotoOrder = () => {
		checkAuth(()=>{
			uni.navigateTo({
				url: "/pages/my/order/index"
			})
		})
	};
	
	const gotoAbout = () => {
		uni.navigateTo({
			url:"/pages/other/about/index"
		})
	};
	
	const getPersonalInfo = () => {
		get(Interface.member.detail, {}).then(res=>{
			console.log("res", res);
			let { userName, avatarUrl, levelName, totalPoints } = res.data;
			personalInfo.userName = userName;
			personalInfo.avatarUrl = avatarUrl;
			personalInfo.totalPoints = totalPoints;
			count.value[0].num = levelName;
			count.value[1].num = totalPoints;
		})
	}
	
	onLoad(()=>{
		// checkAuth(()=>{
		// 	getPersonalInfo();
		// })
	});
	
	onShow(()=>{
		if(authStore.isLoggedIn){
			getPersonalInfo();
		}
	})
	
	const handleSign = (category, id) => {
		get(Interface.sign, {
			category: category,
			id: id
		}).then(res=>{
			uni.showToast({
				title: res.msg,
				icon: "success"
			})
		})
	}
	
	const handleScanCode = () => {
		checkAuth(()=>{
			uni.scanCode({
				// onlyFromCamera: true,
				success (res) {
					console.log(res);
					let result = JSON.parse(res.result);
					console.log("result", result);
					let { category, id } = result;
					handleSign(category, id);
				}
			})
		})
	};
	
	
	
</script>
<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('@/static/icon/font_4218190_6debofuo8gh.ttf') format('truetype');
	}
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('@/static/icon/font/iconfont.ttf') format('truetype');
	}
</style>
<style lang="scss" scoped>
	$head-color:#fff;
	$white-color:#fff;
	$main-color:#333;
	$radius:0rpx;
	$border-color:#efefef;
	$color-1: #007aff;
	$color-2: #4cd964;
	$color-3: #f0ad4e;
	$color-4: #dd524d;
	$list-item-height:100rpx;
	$list-margin:20rpx;
	$width:calc(100vw - 0rpx);
	$head-height:550rpx;
	$head-width:120vw;
	$margin-left:-60vw;
	.bg{
		width:100vw;
		height:450rpx;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;
		background: linear-gradient(180deg, #3c8af8, #38cddd);
		.bg-radius{
			background-color: $head-color;
			border-top-left-radius:50%;
			border-top-right-radius:50%;
			width: $head-width;
			height:$head-height;
			box-sizing: border-box;
			position: absolute;
			left:50%;
			margin-left:$margin-left;
			top:150rpx;
			z-index: 8;
		}
		.logo {
			background-color: transparent;
			border-top-left-radius:50%;
			border-top-right-radius:50%;
			width: 100vw;
			box-sizing: border-box;
			flex-direction:column;
			align-items: center;
			position: absolute;
			left:0;
			top:70rpx;
			z-index: 9;
			text-align: center;
			
			.logo-img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: solid 10rpx #efefef;
			}
			
			.logo-title {
				// height: 150rpx;
				flex: 1;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				
				.uer-name {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 34rpx;
					color: #333;
				}
			}
			
			.count{
				margin:30rpx auto 20rpx;
				width: $width;
				display: flex;
				.count-item{
					display: flex;
					flex-direction: column;
					flex:1;
					text-align: center;
					
					.count-item-num{
						color:$main-color;
						font-size:36rpx;
						font-weight: 500;
					}
					.count-item-text{
						color:$main-color;
						font-size:28rpx;
						font-weight: 400;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	.center-list {
		background-color: #FFFFFF;
		margin:$list-margin auto 0;
		width: $width;
		display: flex;
		flex-direction: column;
		border-radius: $radius;
	
		.center-list-item {
			height: $list-item-height;
			width: 100%;
			box-sizing: border-box;
			flex-direction: row;
			padding: 0rpx 20rpx;
			display: flex;
			.list-icon {
				width: 40rpx;
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 45rpx;
				color: #4cd964;
				text-align: center;
				font-family: texticons;
				margin-right: 20rpx;
			}
			.color-1{
				color:$color-1;
			}
			.color-2{
				color:$color-2;
			}
			.color-3{
				color:$color-3;
			}
			.color-4{
				color:$color-4;
			}
			
			.list-text {
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 32rpx;
				color: #555;
				flex: 1;
				text-align: left;
			}
			
			.navigat-arrow {
				height: $list-item-height;
				line-height: $list-item-height;
				width: 40rpx;
				font-size: 30rpx;
				color: #999;
				text-align: right;
				font-family: texticons;
			}
		}
		.border-bottom {
			border-bottom-width: 1rpx;
			border-color: $border-color;
			border-bottom-style: solid;
		}
	}
	.center-nav{
		background-color: #FFFFFF;
		padding-top:1rpx ;
		margin:20rpx auto $list-margin;
		width:$width;
		display: flex;
		flex-direction: column;
		border-radius: $radius;
		
		.center-nav-title{
			padding:25rpx 30rpx;
			font-size:34rpx;
			color:#333;
			font-weight: 400;
			border-bottom: solid 1rpx $border-color;
		}
		.center-nav-content{
			height: 180rpx;
			display: flex;
			align-items: center;
			.center-nav-item{
				display: flex;
				flex-direction: column;
				flex:1;
				text-align: center;
				
				.center-nav-item-icon{
					color:#333;
					font-size:48rpx;
					font-weight: 500;
					font-family: texticons;
				}
				.center-nav-item-text{
					color:#666;
					font-size:30rpx;
					font-weight: 400;
					margin-top: 15rpx;
				}
			}
		}
	}
	.margin-top{
		margin-top: 20rpx;
		min-height: 230rpx;
	}
	.bg-gray{
		background:#f4f4f4;
		height:calc(100vh - 435rpx);
	}
	.btn{
		border: none;
		padding: 0;
		margin: 0;
		outline: 0;
		background: transparent;
		display: inline-block;
		height: 160rpx;
		&::after,&::before{
			content: '';
			display: none;
		}
	}
</style>