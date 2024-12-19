<template>
	<view class="empty">
		<image class="emptyImg" src="@/static/img/empty.png" mode="aspectFit"></image>
		<view class="empty-desc">
			暂无数据
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.empty{
		width: 200rpx;
		height: 200rpx;
		margin: 100rpx auto 100rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		color: #848484;
		.emptyImg{
			width: 100%;
			height: 100%;
		}
	}
</style>