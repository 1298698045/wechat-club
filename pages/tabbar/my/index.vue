<template>
  <view class="page">
    <view class="top">
      <view class="background"></view>
    </view>
    <view class="user-card">
      <view class="card">
        <view class="top">
          <view class="userImage">
			  <image src="@/static/img/logo2.jpg" mode="aspectFill"></image>
          </view>
        </view>
        <view class="bottom">
          <view class="left">
            <view class="user-text">
              <open-data type="userNickName"></open-data>
            </view>
            <view class="user-phone"> 18888888888 </view>
          </view>
          <view class="right flex-center">
            <u-icon class="icon" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="list-card">
      <view class="card">
        <view class="item item-bottom-solid">
          <view class="left flex-center">
            <image src="/static/img/myIcon/qiu.png" mode="aspectFit"></image>
          </view>
          <view class="center">
            <text>参加的活动</text>
          </view>
          <view class="right flex-center">
            <u-icon class="icon" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="item item-bottom-solid">
          <view class="left flex-center">
            <image src="/static/img/myIcon/1.png" mode="aspectFit"></image>
          </view>
          <view class="center">
            <text>参加的活动</text>
          </view>
          <view class="right flex-center">
            <u-icon class="icon" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="item">
          <view class="left flex-center">
            <image src="/static/img/myIcon/2.png" mode="aspectFit"></image>
          </view>
          <view class="center">
            <text>参加的活动</text>
          </view>
          <view class="right flex-center">
            <u-icon class="icon" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
 <style lang="scss" scoped>
.top {
  height: 250rpx;
  position: relative;
  .background {
    background-color: #5199ff;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
    position: absolute;
    height: 330rpx;
    width: 100%;
  }
}
.icon {
  color: #96a1ae;
  font-size: 40rpx;
}
.user-card {
  height: 170rpx;
  padding: 0 15px;
  margin-top: 100rpx;
  .card {
    position: relative;
    bottom: 62px;
    height: 250rpx;
    background-color: white;
    border-radius: 5px;
    .top {
      height: 30%;
      position: relative;
      .userImage {
        position: absolute;
        bottom: 24%;
        left: 10%;
        width: 150rpx;
        height: 150rpx;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid white;
		image{
			width: 100%;
			height: 100%;
		}
      }
    }
    .bottom {
      display: flex;
      height: 70%;
      .left {
        width: 80%;
        height: 100%;
        position: relative;
        .user-text {
          width: 100%;
          font-size: 1.6em;
          padding-left: 80rpx;
          height: 50%;
        }
        .user-phone {
          color: #96a1ae;
          padding-left: 80rpx;
          height: 50%;
          width: 100%;
          font-size: 0.9em;
        }
      }
      .right {
        width: 20%;
        height: 50%;
      }
    }
  }
}
.list-card {
  padding: 0 15px;
  .card {
    border-radius: 5px;
    position: relative;
    background-color: white;
    border-radius: 5px;
    padding: 5px 30px;
    .item {
      display: flex;
      height: 120rpx;
      .left {
        width: 15%;
        image {
          width: 70rpx;
          height: 70rpx;
        }
      }
      .center {
        width: 65%;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 1.1em;
      }
      .right {
        width: 20%;
        justify-content: flex-end;
      }
    }
  }
}
.item-bottom-solid {
  border-bottom: 1px solid #d4d6da;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
 
<script setup>
	
</script>
