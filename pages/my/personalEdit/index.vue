<template>
	<view class="wrap">
		<view class="personinfo">			
			<!-- <uni-forms :modelValue="formData">
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入昵称" />
				</uni-forms-item>
				<uni-forms-item label="性别" name="sex">
					<uni-data-select
						  placeholder="请选择性别"
						  v-model="formData.sex"
						  :localdata="range"
						  @change="change"
						></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="年龄" name="name">
					<uni-easyinput type="text" v-model="formData.age" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item label="个人签名" name="name">
					<uni-easyinput type="textarea" v-model="formData.signature" placeholder="请输入个性签名" />
				</uni-forms-item>
			</uni-forms> -->
			<view class="cell-row">
				<view class="label">姓名</view>
				<view class="inp">
					<input type="text" placeholder="请输入姓名">
				</view>
				<view class="icon">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="cell-row">
				<view class="label">性别</view>
				<view class="inp">
					<picker @change="change" range-key="text" :value="index" :range="range">
						<input disabled v-model="sexs[index]" type="text" placeholder="请选择性别">
					</picker>
				</view>
				<view class="icon">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="cell-row">
				<view class="label">年龄</view>
				<view class="inp">
					<input type="number" placeholder="请输入年龄">
				</view>
				<view class="icon">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="cell-row">
				<view class="label">个性签名</view>
				<view class="inp">
					<input type="text" placeholder="请输入个性签名">
				</view>
				<view class="icon">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-content">
				<button class="btn" hover-class="btnHover" @tap="handleSave">保存</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import Interface from "@/utils/Interface";
	import { get, post } from "@/utils/request.js";
	const formData = reactive({
		name: "",
		sex: 1,
		age: "",
		signature: ""
	});
	const index = ref(1);
	const range = ref([
		{ value: 0, text: "男" },
		{ value: 1, text: "女" },
	]);
	const sexs = ref(['男','女']);
	
	const change = (e) => {
		index.value = e.detail.value;
	};
	const code = ref();
	const handleSave = async () => {
		try{
			const profileRes = await uni.getUserProfile({
			  provider: "weixin",
			  desc: "太友趣小程序隐私保护指引",
			});
			console.log("用户信息获取成功:", profileRes);
			let userInfo = JSON.parse(profileRes.rawData);
			console.log("user", userInfo);
			const loginRes = await uni.login({ provider: "weixin" });
			console.log("登录成功，code:", loginRes.code);
			code.value = loginRes.code;
			console.log("code.value", code.value);
			post(Interface.login,{
				code: code.value,
				nickName: userInfo.nickName,
				avatarUrl: userInfo.avatarUrl
			}).then(res=>{
				console.log('res', res);
				if(res.code === 20000){
					let { wechatOpenid } = res.data;
					console.log("wechatOpenid", wechatOpenid);
					try{
						uni.setStorageSync('token', wechatOpenid);
						uni.navigateBack({
							delta: 1
						})
					}catch{
						
					}
				}
			})
		}catch(err){
			console.log("err", err);
		}
		console.log("formData:", formData);
	}
	
</script>

<style lang="scss" scoped>
	.wrap{
		height: 100vh;
		background: #fff;
		.personinfo{
			padding: 20rpx;
		}
	}
	.cell-row{
		padding: 40rpx 0;
		border-bottom: 1rpx solid #e2e3e5;
		display: flex;
		align-items: center;
		.label{
			flex: 1;
		}
		.inp{
			text-align: right;
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
</style>