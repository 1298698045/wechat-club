<template>
	<view class="avatarList">
		<view class="avatarItem" v-for="(item, index) in list" :key="index">
			<image class="img" :src="item.fileLocation" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		}
	})
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
		  overflow: hidden;
		  .img{
			  width: 100%;
			  height: 100%;
		  }
	  }
	}

</style>