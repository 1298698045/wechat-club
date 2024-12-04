<template>
	<view class="avatarList">
		<view class="avatarItem" v-for="item in [1,2,3,4]" :key="item">
			
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.avatarList{
	  display: flex;
	  align-items: center;
	  gap: -16rpx;
	  .avatarItem{
		  width: 56rpx;
		  height: 56rpx;
		  border-radius: 50%;
		  background: #e2e3e5;
		  box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.2);
		  margin-left: -10rpx;
	  }
	}

</style>