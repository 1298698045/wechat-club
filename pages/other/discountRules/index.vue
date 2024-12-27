<template>
	<view class="discount-wrap">
		<!-- <view class="panel-box">
			<view class="rule-content">
				*会员有效期为：达到条件的那一刻起，一直到下个周期的最后一天。<br/>
				*例如：更新周期设置为“月”，某成员在3月16日通过充值达到了V1优惠等级，则在4月30号24点之前，
				他都是至少保持V1等级的。
			</view>
		</view> -->
		<view class="panel-box" v-for="(item, index) in listData" :key="index">
			<view class="level">
				V{{item.minSignUp}} {{item.name}}
				<!-- 等级 -->
			</view>
			<view class="level-desc disabled">
				<text class="red">*</text>
				{{item.description}}
			</view>
		</view>
		<!-- <view class="panel-box">
			<view class="level">
				V0等级
			</view>
			<view class="level-desc disabled">
				<text class="red">*</text>
				俱乐部成员的初始等级，无任何优惠权益
			</view>
		</view> -->
		<!-- <view class="panel-box">
			<view class="level">
				V1等级
			</view>
			<view class="level-desc">
				<text class="red">*</text>
				一个自然月内，参加<text class="number">10</text>次活动或单词充值1000元
			</view>
			<view class="level-desc">
				<text class="red">*</text>
				享受报名折扣<text class="number">9</text>折
			</view>
		</view> -->
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import Interface from "@/utils/Interface";
	import { get, post } from "@/utils/request.js";
	
	const listData = ref([]);
	
	const getQuery = () => {
		get(Interface.memberlevels, {}).then(res=>{
			listData.value = res.data.sort((a,b)=>a.minSignUp - b.minSignUp);
		})
	};
	
	const sortFn = () => {
		
	}
	
	onLoad(()=>{
		getQuery();
	})
	
	
</script>

<style lang="scss" scoped>
	.discount-wrap{
		.panel-box{
			padding: 24rpx;
			background: #fff;
			margin-bottom: 20rpx;
			.rule-content{
				padding: 20rpx;
				font-size: 28rpx;
				color: #666;
				background: #f3f3f3;
			}
		}
		.level{
			color: #666;
		}
		.red{
			color: red;
		}
		.level-desc{
			font-size: 28rpx;
			line-height: 2;
			&.disabled{
				color: #666;
			}
		}
		.number{
			color: #6be8f5;
		}
	}
</style>