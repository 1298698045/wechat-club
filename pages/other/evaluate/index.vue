<template>
	<view class="wrap">
		<view class="tips">
			· 请真实评价，与更多人一起动起来 ·
		</view>
		<view class="center">			
			<view class="title">太友趣Club</view>
			<view class="eval">
				<uni-rate v-model="rateValue" size="32" @change="onChange" />
			</view>
			<textarea class="textarea" :placeholder="placeholder" name="" id="" cols="30" rows="10"></textarea>
			<view class="imgList">
				<!-- <view class="img-item" v-for="item in [1,2,3,4]" :key="item">
					<image class="img" src="../../../static/img/2.jpg" mode="aspectFill"></image>
				</view> -->
			</view>
			<view class="upload-container">
				<view class="uploadPhoto" @click="uploadPhoto">
					<uni-icons type="image" color="#848484" size="40"></uni-icons>
					上传照片
				</view>
				<view class="upload-desc">上传图片让更多人一起玩</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-content">
				<button class="btn" hover-class="btnHover" @tap="handleSend">发布</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs } from "vue";
	import Interface from "@/utils/Interface.js";
	import { get, post } from "@/utils/request.js";
	const placeholder = ref("可以描述一下整个活动中感受如何，有那些印象深刻的事情和瞬间")
	
	const data = reactive({
		rateValue: 1,
		images: []
	});
	
	const { rateValue, images } = toRefs(data);
	
	const onChange = (e) => {
		console.log("e", e);
	};
	
	const uploadPhoto = () => {
		const url = Interface.comment.upload;
		uni.chooseImage({
			count: 1,
			sourceType:  ['album', 'camera'],
			success: (res) => {
				console.log("chooseImage", res);
			    const tempFilePaths = res.tempFilePaths[0];
				setTimeout(()=>{
					console.log("url", url);
					uni.uploadFile({
						url: url,
						filePath: tempFilePaths,
						name: 'file',
						formData: {
						   parentId: '',
						},
						success(res) {
							console.log("res", res);
						},fail: (error) => {
							// 处理上传失败的情况
							console.error('上传失败：', error);
							// 在这里显示错误消息
						}
					})
				},1000)
			}
		})
	};
	
	const handleSend = () => {
		
	}
	
</script>
<style>
	page{
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	page{
		background: #fff !important;
	}
	.wrap{
		font-size: 24rpx;
		.tips{
			text-align: center;
			padding: 20rpx 0;
			color: #d9793e;
			font-size: 24rpx;
		}
		.center{
			padding: 0 40rpx;
			.title{
				font-size: 32rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}
			.eval{
				margin: 30rpx 0;
			}
			.textarea{
				font-size: 24rpx;
			}
			.upload-container{
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #848484;
				.uploadPhoto{
					width: 160rpx;
					height: 160rpx;
					border: 1rpx solid #848484;
					border-radius: 5rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				.upload-desc{
					margin-left: 20rpx;
				}
			}
		}
	}
	.imgList{
		display: flex;
		flex-wrap: wrap;
		.img-item{
			width: 160rpx;
			height: 160rpx;
			border: 1rpx solid #848484;
			border-radius: 5rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			// &:first-child(4n){
			// 	margin-right: 0;
			// }
			.img{
				width: 100%;
				height: 100%;
				border-radius: 5rpx;
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