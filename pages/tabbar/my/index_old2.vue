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
	  
	  <view class="center-nav margin-top">
	  	<view class="center-nav-title">
	  		<text>我的订单</text>
	  	</view>
	  	<view class="center-nav-content">
	  		<view class="center-nav-item" v-for="(nav,index) in navs">
	  			<text class="center-nav-item-icon"> {{ nav.icon  }}  </text>
	  			<text class="center-nav-item-text">{{nav.text}}</text>
	  		</view>
	  	</view>
	  </view>
	  <view class="center-list">
	  	<view class="center-list-item border-bottom">
	  		<text class="list-icon color-1">&#xe60e;</text>
	  		<text class="list-text">帐号管理</text>
	  		<text class="navigat-arrow">&#xe65e;</text>
	  	</view>
	  	<view class="center-list-item">
	  		<text class="list-icon color-2">&#xe60b;</text>
	  		<text class="list-text">新消息通知</text>
	  		<text class="navigat-arrow">&#xe65e;</text>
	  	</view>
	  </view>
	  <view class="center-list">
	  	<view class="center-list-item border-bottom">
	  		<text class="list-icon color-3">&#xe60c;</text>
	  		<text class="list-text">帮助与反馈</text>
	  		<text class="navigat-arrow">&#xe65e;</text>
	  	</view>
	  	<view class="center-list-item">
	  		<text class="list-icon color-4">&#xe60c;</text>
	  		<text class="list-text">服务条款及隐私</text>
	  		<text class="navigat-arrow">&#xe65e;</text>
	  	</view>
	  </view>
	  <view class="center-list">
	  	<view class="center-list-item">
	  		<text class="list-icon color-1">&#xe60d;</text>
	  		<text class="list-text">关于应用</text>
	  		<text class="navigat-arrow">&#xe65e;</text>
	  	</view>
	  </view>
	  
    </view>
  </view>
</template>
<script setup>
	import { ref } from "vue";
	const navs = ref([
		{
			icon:"\u{e602}",
			text:'待付款'
		},
		{
			icon:"\u{e601}",
			text:'待发货'
		},
		{
			icon:"\u{e603}",
			text:'待收货'
		},
		{
			icon:"\u{e604}",
			text:'待评价'
		},
		{
			icon:'\u{e60a}',  //原代码：&#xe60a;
			text:'退款'
		}
	])
</script>
<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/c/font_4218190_6debofuo8gh.ttf?t=1701960489041') format('truetype');
	}
</style>
 <style lang="scss" scoped>
	 $head-color:#fff;
	 $white-color:#fff;
	 $main-color:#333;
	 $radius:0rpx;
	 $border-color:#efefef;
	 $color-1: #007aff;
	 $color-2: #4cd964;
	 $color-3: #f0ad4e;
	 $color-4: #dd524d;
	 $list-item-height:100rpx;
	 $list-margin:20rpx;
	 $width:100%;
	 $head-height:550rpx;
	 $head-width:120vw;
	 $margin-left:-60vw;
.top {
  height: 250rpx;
  position: relative;
  .background {
    background: linear-gradient(180deg, #3c8af8, #38cddd);
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
.center-list {
		background-color: #FFFFFF;
		margin:0 auto $list-margin;
		width: $width;
		flex-direction: column;
		border-radius: $radius;
	
		.center-list-item {
			height: $list-item-height;
			width: 100%;
			box-sizing: border-box;
			flex-direction: row;
			padding: 0rpx 20rpx;
			
			.list-icon {
				width: 40rpx;
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 45rpx;
				color: #4cd964;
				text-align: center;
				font-family: texticons;
				margin-right: 20rpx;
			}
			.color-1{
				color:$color-1;
			}
			.color-2{
				color:$color-2;
			}
			.color-3{
				color:$color-3;
			}
			.color-4{
				color:$color-4;
			}
			
			.list-text {
				height: $list-item-height;
				line-height: $list-item-height;
				font-size: 32rpx;
				color: #555;
				flex: 1;
				text-align: left;
			}
			
			.navigat-arrow {
				height: $list-item-height;
				line-height: $list-item-height;
				width: 40rpx;
				font-size: 30rpx;
				color: #999;
				text-align: right;
				font-family: texticons;
			}
		}
		.border-bottom {
			border-bottom-width: 1rpx;
			border-color: $border-color;
			border-bottom-style: solid;
		}
	}
.center-nav{
		background-color: #FFFFFF;
		padding-top:1rpx ;
		margin:20rpx auto $list-margin;
		width: 100%;
		flex-direction: column;
		border-radius: $radius;
		
		.center-nav-title{
			padding:25rpx 30rpx;
			font-size:34rpx;
			color:#333;
			font-weight: 400;
			border-bottom: solid 1rpx $border-color;
		}
		.center-nav-content{
			height: 180rpx;
			display: flex;
			align-items: center;
			.center-nav-item{
				display: flex;
				flex-direction: column;
				flex:1;
				text-align: center;
				
				.center-nav-item-icon{
					color:#333;
					font-size:48rpx;
					font-weight: 500;
					font-family: texticons;
				}
				.center-nav-item-text{
					color:#666;
					font-size:30rpx;
					font-weight: 400;
					margin-top: 15rpx;
				}
			}
		}
	}
	.margin-top{
		margin-top: 20rpx;
		min-height: 230rpx;
	}
</style>
