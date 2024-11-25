<template>
	<view class="detailWrap">
		活动ID：{{id}}
		<div class="banner">
			
		</div>
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	const id = ref('');
	onLoad((options)=>{
		console.log("options", options);
		id.value = options.id;
	})
</script>

<style lang="scss" scoped>
	.detailWrap{
		.banner{
			height: 300rpx;
			background: #3399ff;
		}
	}
</style>
