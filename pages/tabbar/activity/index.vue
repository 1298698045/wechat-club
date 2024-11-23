<template>
	<view class="wrapper">
		<ActivityItem />
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import ActivityItem from "@/components/Activity/ActivityItem.vue";
</script>

<style lang="scss" scoped>
	.wrapper{
		padding: 20rpx;
	}
</style>