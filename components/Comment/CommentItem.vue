<template>
	<view class="commentItem" v-for="(item, index) in listData" :key="index">
		<view class="leftAvatar">
			<image :src="item.avatarUrl" mode="aspectFill"></image>
		</view>
		<view class="rightContent">
			<view class="user-name">{{item.nickName}}</view>
			<view class="eval">
				<uni-rate v-model="item.rating" size="24" activeColor="#eb605b" :readonly="true" @change="onChange" />
				<text>{{item.rating}}.0</text>
			</view>
			<view class="comment-desc">
				{{item.body}}
			</view>
			<view class="comment-imgs">
				<view class="comment-img-item" v-for="(row, idx) in item.pictures" :key="idx" @click="previewImg(item, row)">
					<image :src="row.photoUrl" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, defineEmits, defineExpose } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	import Interface from "@/utils/Interface.js";
	import { get } from "@/utils/request.js";
	
	const emit = defineEmits(['change']);
	const listData = ref([]);
	
	const total = ref(0);
	
	const getQuery = () => {
		get(Interface.comment.list, {}).then(res=>{
			total.value = res.total;
			emit("change", total.value);
			listData.value = res.data.map(item=>{
				item.pictures = item.pictures.map(row=>{
					row.photoUrl = Interface.uploadUrl + decodeURIComponent(row.fileLocation);
					return row;
				})
				return item;
			});
			console.log("listData.value", listData.value);
		})
	};
	getQuery();
	
	const previewImg = (item, row) => {
		let url = row.photoUrl;
		let urls = item.pictures.map(v=>v.photoUrl);
		// item.pictures.forEach(row=>{
		// 	let path = Interface.uploadUrl+item.fileLocation;
		// 	urls.push(path);
		// })
		uni.previewImage({
			// urls: ["http://47.96.15.8:9006/images/2.jpg","http://47.96.15.8:9006/images/2.jpg","http://47.96.15.8:9006/images/3.jpg"],
			// current: "http://47.96.15.8:9006/images/2.jpg",
			urls: urls,
			current: url,
			success: (res) => {
				
			}
		})
	}
	defineExpose({ getQuery });
	
</script>

<style lang="scss" scoped>
	.commentItem{
		border-radius: 20rpx;
		background: #fff;
		padding: 30rpx 20rpx;
		display: flex;
		margin-bottom: 20rpx;
		.leftAvatar{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.rightContent{
			flex: 1;
			font-size: 28rpx;
			color: #333;
			margin-left: 10rpx;
			.user-name{
				font-weight: 400;
			}
			.eval{
				display: flex;
				align-items: center;
				text{
					padding-left: 10rpx;
					color: #ea3582;
					font-weight: 500;
				}
			}
			.comment-desc{
				line-height: 1.5;
				font-weight: 500;
			}
			.comment-imgs{
				display: flex;
				flex-wrap: wrap;
				margin-top: 10px;
				.comment-img-item{
					width: calc(33% - 10rpx);
					height: 180rpx;
					background: #f4f4f4;
					border-radius: 10rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
					overflow: hidden;
					&:nth-child(3n){
						margin-right: 0;
					}
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>