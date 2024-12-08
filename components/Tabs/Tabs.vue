<template>
	<view class="tabContainer">
		<view class="tabs">
			<view class="tab" :class="{'active':currentTab==index}" v-for="(item,index) in tabs" :key="index" @click="handleTab(index, item)">
				<view class="text">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, toRefs, toRef } from "vue";
	const props = defineProps({
		tabs: {
			type: Array,
			default:()=>[]
		}
	});
	const emit = defineEmits(['change']);
	const data = reactive({
		currentTab: 0
	});
	const { currentTab } = toRefs(data);
	
	const handleTab = (index, item) => {
		data.currentTab = index;
		emit("change", item);
	}
	
</script>

<style lang="scss" scoped>
.tabContainer{
		display: flex;
		// justify-content: center;
		align-items: center;
		height: 100rpx;
		// background: #f4f4f4;
		.tabs{
			display: flex;
			.tab{
				margin-right: 100rpx;
				color: #878787;
				font-size: 16px;
				position: relative;
				z-index: 2;
				white-space: nowrap;
				&.active{
					color: #333;
					font-weight: 700;
					&::after{
						position: absolute;
						content: "";
						display: inline-block;
						width: 100%;
						height: 20rpx;
						background: #6be8f5;
						bottom: -2rpx;
						z-index: -1;
					}
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
</style>