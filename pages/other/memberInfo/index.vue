<template>
	<view class="wrap">
		<view class="header">			
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入成员昵称/手机号" @change="handleSearch" @confirm="handleSearch" @clear="handleSearch"></uni-easyinput>
			</view>
		</view>
		<view class="center">
			<view class="members">
				<view class="member-item" v-for="(item, index) in listData" :key="index">
					<view class="avatar">
						<image class="img" :src="item.avatarUrl" mode="aspectFill"></image>
					</view>
					<view class="member-item-info">
						<view class="name">
							{{item.userName}}
							<uni-icons type="person" :color="item.gender == 0 ? '#db7e9e' : 'blue'"></uni-icons>
						</view>
						<view class="info">
							<view class="text admin">组织者</view>
							<view class="text field">
								等级：
								<view class="text val">萌新</view>
							</view>
							<view class="text field">
								等级：
								<view class="text val">1</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, toRefs, reactive } from "vue";
	import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
	import Interface from "@/utils/Interface";
	import { get } from "@/utils/request.js";
	const popupRef = ref(null);
	const data = reactive({
		searchVal: "",
		listData: [],
		pageNumber: 1,
		pageSize: 10,
		isPage: false
	});
	const { searchVal, listData, pageNumber, pageSize, isPage } = toRefs(data);
	
	const handleSearch = () => {
		data.pageNumber = 1;
		getQuery();
	}
	
	const getQuery = (e) => {
		get(Interface.member.list, {
			search: data.searchVal,
			page: data.pageNumber,
			rows: data.pageSize
		}).then(res=>{
			let total = res.total;
			if(data.pageNumber * data.pageSize < total) {
				data.isPage = true;
			}else {
				data.isPage = false;
			};
			let temp = [];
			if(data.pageNumber == 1){
				temp = res.data;
			}else {
				temp = data.listData.concat(res.data);
			}
			data.listData = temp;
		})
	};
	getQuery();
	
	onPullDownRefresh(()=>{
		data.pageNumber = 1;
		getQuery();
		uni.stopPullDownRefresh();
	});
	
	onReachBottom(()=>{
		if(data.isPage){
			data.pageNumber++;
			getQuery();
		}
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
			.members{
				.member-item{
					background: #fff;
					padding: 20rpx 30rpx;
					border-radius: 15rpx;
					display: flex;
					margin-bottom: 20rpx;
					align-items: center;
					.avatar{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-right: 20rpx;
						background: #e2e3e5;
						.img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.info{
						.text{
							display: inline-block;
							font-size: 24rpx;
							color: #888888;
							&.admin{
								color: #98f2f1;
								font-weight: 500;
							}
							&.field{
								margin-left: 20rpx;
								.val{
									color: #333;
								}
							}
						}
					}
				}
			}
		}
	}
</style>