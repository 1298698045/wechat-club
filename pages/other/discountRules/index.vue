<template>
	<view class="discount-wrap">
		<view class="panel-box">
			<view class="rule-content">
				*会员有效期为：达到条件的那一刻起，一直到下个周期的最后一天。<br/>
				*例如：更新周期设置为“月”，某成员在3月16日通过充值达到了V1优惠等级，则在4月30号24点之前，
				他都是至少保持V1等级的。
			</view>
		</view>
	</view>
</template>

<script>
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
	}
</style>