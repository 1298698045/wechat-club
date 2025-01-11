<template>
  <view class="notice-page">
    <view class="notice-card">
      <view class="notice-title">📢 {{ notice.title }}</view>
      <view class="notice-content" v-html="notice.content"></view>
      <view class="notice-footer">
        <text class="notice-time">{{ formatDate(notice.time) }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.notice-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 10rpx;
}

.notice-card {
  width: 90%; /* 宽度占屏幕的 90% */
  max-width: 900rpx; /* 最大宽度 */
  background-color: #ffffff;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
  border-radius: 24rpx; /* 圆角更大 */
  padding: 40rpx; /* 增加内边距，突出内容 */
  box-sizing: border-box;
  animation: fadeIn 0.4s ease-in-out;
  margin-top: 20rpx;
}

.notice-title {
  font-size: 36rpx; /* 标题字体加大 */
  font-weight: bold;
  color: #333333;
  margin-bottom: 30rpx;
  text-align: center;
}

.notice-content {
  font-size: 24rpx; /* 内容字体更大 */
  color: #444444;
  line-height: 1.8;
  text-align: justify;
  word-break: break-word;
  margin-bottom: 40rpx;
}

.notice-footer {
  display: flex;
  justify-content: flex-end;
}

.notice-time {
  font-size: 20rpx; /* 时间字体更清晰 */
  color: #999999;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script setup>
import { ref } from 'vue';
import Interface from "@/utils/Interface";
import { get } from "@/utils/request.js";
import moment from "moment";
import { onLoad } from "@dcloudio/uni-app";
const notice = ref({
  title: '重要通知',
  content: `
    <p>欢迎查看最新公告！</p>
    <p>这是公告内容的详细说明：</p>
    <ul>
      <li>公告事项1：内容描述。</li>
      <li>公告事项2：更多详细内容。</li>
    </ul>
    <p>请及时处理相关事宜。</p>
  `,
  time: '2025-01-11',
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

const getQuery = () => {
	get(Interface.latestNotice, {}).then(res=>{
		console.log('res', res);
		let { titleContent, createdOn } = res.data;
		notice.value.content = titleContent;
		notice.value.time = createdOn;
	})
}
onLoad(()=>{
	getQuery();
})
</script>
