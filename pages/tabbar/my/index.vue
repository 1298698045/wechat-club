<template>
	<button open-type="chooseAvatar" size="mini">获取头像</button>
	<button @click="handleLogin">授权登录2</button>
</template>

<script setup>
	const handleLogin = () => {
		uni.login({
			provider: 'weixin',
			success: res => {
				console.log("res", res);
				uni.showToast({
					title: '请完善用户信息！',
					duration: 2000,
					success() {
						setTimeout(()=>{
							uni.switchTab({
								url:"/pages/tabbar/index/index"
							});	
						},2000)
					}
				});
				uni.getUserProfile({
				  provider: 'weixin',
				  desc: '用于完善会员资料',
				  success: function (infoRes) {
					console.log('用户昵称为：' + infoRes);
					
				  }
				});
			}
		});
	}
</script>

<style>
</style>