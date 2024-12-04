<template>
	<view class="wrap">
		<view class="personinfo">			
			<uni-forms :modelValue="formData">
				<uni-forms-item label="昵称" name="name">
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
			</uni-forms>
		</view>
		<view class="footer">
			<view class="footer-content">
				<button class="btn" hover-class="btnHover" @click="handleSave">保存</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
	const formData = reactive({
		name: "",
		sex: ""
	});
	const range = ref([
		{ value: 0, text: "男" },
		{ value: 1, text: "女" },
	]);
	
	const change = () => {
		
	};
	
	const handleSave = () => {
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