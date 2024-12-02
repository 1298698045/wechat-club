<template>
	<view class="record-wrap" :class="{hidden:isFilter}">
		<view class="header">			
			<view class="search-container">
				<uni-easyinput prefixIcon="search" v-model="searchVal" placeholder="请输入活动名称" @iconClick="onClick"></uni-easyinput>
			</view>
			<view class="category">
				<view class="tabContainer">
					<view class="tabs">
						<view :class="{'tab':true,'active':current==index}" v-for="(item, index) in tabs" :key="index" @click="handleTab(item, index)">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="filter" @click="handleOpenFilter">
					筛选
					<uni-icons type="down" color="#848484"></uni-icons>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="record-list">
				<view class="record-item" v-for="(item, index) in listData" :key="index">
					<view class="row top">
						<view class="title">房车文化体验 + 魔力</view>
						<view class="status">未开始</view>
					</view>
					<view class="row">
						<view class="name location">
							<uni-icons type="location"></uni-icons>
							WWT(世界财富大厦) ｜ 0
						</view>
						<view class="name proportion">1/15</view>
					</view>
					<view class="row">
						<view class="name time">
							<uni-icons type="location"></uni-icons>
							12-05 周四 14:00-16:00
						</view>
						<view class="price">¥399</view>
					</view>
				</view>
			</view>
			<view class="popup" v-if="isFilter" @click="closeFilter">
				<view class="mask">
					<view class="filter-wrap" @click.stop>
						<view class="filter-content">
							<view class="filter-category">
								<view class="filter-item">
									<view class="filter-label">
										时间
									</view>
									<view class="filter-options">
										<view class="tag-option active">本周</view>
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
									</view>
								</view>
								<view class="filter-item">
									<view class="filter-label">
										时间
									</view>
									<view class="filter-options">
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
									</view>
								</view>
								<view class="filter-item">
									<view class="filter-label">
										时间
									</view>
									<view class="filter-options">
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
										<view class="tag-option">本周</view>
									</view>
								</view>
							</view>
						</view>
						<view class="filter-footer">
							<view class="btn-group">
								<button class="btn">重置</button>
								<button class="btn primary">确定</button>
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
	const popupRef = ref(null);
	const data = reactive({
		searchVal: "",
		listData: [1,2,3,4,5,6,7,8],
		tabs: [
			{
				name: "全部",
			},
			{
				name: "未开始",
			},
			{
				name: "活动中",
			},
			{
				name: "已结束",
			}
		],
		current: 0,
		isFilter: false
	});
	const { searchVal, listData, tabs, current, isFilter } = toRefs(data);
	const handleTab = (item, index) => {
		data.current = index;
	};
	
	const handleOpenFilter = () => {
		data.isFilter = !data.isFilter;
	}
	const closeFilter = () => {
		data.isFilter = false;
	}
</script>
<style lang="scss">
	.is-input-border{
		border-radius: 30rpx !important;
	}
</style>
<style lang="scss" scoped>
	.record-wrap{
		&.hidden{
			height: 100vh;
			overflow: hidden;
		}
		.header{
			background: #fff;
			padding: 20rpx 32rpx;
			position: sticky;
			top: 0;
			z-index: 1;
		}
		.search-container{
			
		}
		.category{
			display: flex;
			margin-top: 40rpx;
			margin-bottom: 10rpx;
			font-size: 36rpx;
			.tabContainer{
				flex: 1;
				.tabs{
					display: flex;
					font-size: 36rpx;
					.tab{
						margin-right: 40rpx;
						color: #848484;
						padding-bottom: 16rpx;
						border-bottom: 5rpx solid transparent;
						&.active{
							color: #6be8f5;
							border-color: #6be8f5;
							font-weight: 500;
						}
					}
				}
			}
			.filter{
				color: #848484;
			}
		}
		.center{
			position: relative;
			.record-list{
				padding-top: 1rpx;
				.record-item{
					margin-top: 16rpx;
					background: #fff;
					padding: 32rpx;
					.row{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20rpx;
						&:last-child{
							margin-bottom: 0;
						}
						.title{
							font-size: 34rpx;
						}
						.name{
							font-size: 28rpx;
							color: #848484;
						}
						.price{
							font-size: 28rpx;
						}
						.status{
							color: #f3ad3d;
						}
					}
				}
			}
			.popup{
				.mask{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: rgba(0, 0, 0, .4);
				}
				.filter-wrap{
					background: #fff;
					.filter-content{
						height: 500rpx;
						border-top: 1rpx solid #e2e3e5;
						border-bottom: 1rpx solid #e2e3e5;
						.filter-category{
							padding: 0 30rpx;
							.filter-item{
								display: flex;
								flex-direction: column;
								.filter-label{
									margin: 20rpx 0;
								}
								.filter-options{
									display: flex;
									flex-wrap: wrap;
									.tag-option{										
										width: calc(25% - 20rpx);
										height: 60rpx;
										line-height: 60rpx;
										border-radius: 30rpx;
										text-align: center;
										background: #e7e7e7;
										color: #848484;
										margin-right: 26rpx;
										margin-bottom: 20rpx;
										&:last-child{
											margin-right: 0;
										}
										&.active{
											color: #fff;
											background: #6be8f5;
										}
									}
								}
							}
						}
					}
					.filter-footer{
						padding: 16rpx 32rpx;
						background: #fff;
						.btn-group{
							display: flex;
							.btn{
								margin: 0;
								padding: 0;
								border: none;
								outline: 0;
								background: transparent;
								flex: 1;
								background: #e7e7e7;
								margin-right: 30rpx;
								border-radius: 50rpx;
								&:last-child{
									margin-right: 0;
								}
								&::after,&::before{
									content: '';
									display: none;
								}
								&.primary{
									color: #fff;
									background: #6be8f5;
								}
							}
						}
					}
				}
			}
		}
	}
</style>