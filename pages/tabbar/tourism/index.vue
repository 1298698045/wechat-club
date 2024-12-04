<template>
	<view class="wrap">
		<view class="header">			
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入旅游名称" @iconClick="onClick"></uni-easyinput>
			</view>
		</view>
		<view class="center">
			<view class="course-list">
				<view class="course-item" v-for="(item, index) in listData" :key="index">
					<view class="course-item-head">
						<view class="name">
							周六爵士舞零基础课程
						</view>
						<view class="price">
							<view class="icon">
								¥
							</view>
							60
						</view>
					</view>
					<view class="course-item-center">
						<view class="row location">
							<view class="licon">
								<uni-icons type="location" color="#666" size="20"></uni-icons>
							</view>
							<view class="text">清格书房</view>
						</view>
						<view class="row">
							<view class="licon">
								<uni-icons type="location" color="#666" size="20"></uni-icons>
							</view>
							<view class="text">11月22日 周五 10:00-12:00</view>
						</view>
						<view class="people-row">
							<AvatarGroup />
							<text>4887人去过</text>
							<view class="tag">萌新-专业</view>
						</view>
					</view>
					<view class="course-item-footer">
						<button class="btn">去报名</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, toRefs, reactive } from "vue";
	import { onLoad, onUnload } from "@dcloudio/uni-app";
	import AvatarGroup from "@/components/AvatarGroup/AvatarGroup.vue";
	const popupRef = ref(null);
	const data = reactive({
		searchVal: "",
		listData: [1,2,3,4,5,6,7,8],
	});
	const { searchVal, listData } = toRefs(data);
	
	onLoad(()=>{		
		uni.showLoading({
			title: '加载中',
			mask: true
		});
	})
	
	const time = setTimeout(()=>{
		uni.hideLoading();
	}, 1000);
	
	
	onUnload(()=>{
		clearTimeout(time);
	})
	
	
	
	
</script>
<style lang="scss">
	.is-input-border{
		border-radius: 30rpx !important;
	}
</style>
<style lang="scss" scoped>
	.wrap{
		.header{
			background: #fff;
			padding: 20rpx 32rpx;
			position: sticky;
			top: 0;
			z-index: 1;
		}
		.search-container{
			
		}
		.center{
			position: relative;
			padding: 0 32rpx;
		}
	}
	.course-list{
		.course-item{
			margin-top: 24rpx;
			// height: 400rpx;
			background: #fff;
			border-radius: 20rpx;
			padding: 32rpx 20rpx 20rpx 20rpx;
			.course-item-head{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name{
					font-weight: 500;
					font-size: 32rpx;
					color: #333;
				}
				.price{
					color: #ea3852;
					display: flex;
					align-items: flex-end;
					font-size: 40rpx;
					.icon{
						font-size: 26rpx;
						font-weight: bold;
						padding-right: 10rpx;
					}
				}
			}
			.course-item-center{
				margin-top: 20rpx;
				.row{
					display: flex;
					align-items: center;
					.licon{
						padding-right: 20rpx;
					}
					.text{
						color: #666;
						font-size: 28rpx;
					}
				}
			}
			.course-item-footer{
				display: flex;
				justify-content: flex-end;
				.btn{
					width: 200rpx;
					height: 80rpx;
					background: pink;
					line-height: 80rpx;
					text-align: center;
					display: inline-block;
					border-radius: 40rpx;
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
			}
		}
	}
	.tag{
		border-radius: 10rpx;
		padding: 5rpx 10rpx;
		background: #f3fcfd;
		color: #6be8f5;
		font-size: 24rpx;
	}
	.people-row{
		display: flex;
		align-items: center;
		padding: 20rpx 0 20rpx 20rpx;
		text{
			flex: 1;
			margin-left: 10rpx;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>