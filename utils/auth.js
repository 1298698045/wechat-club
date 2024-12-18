import { useAuthStore } from '@/stores/authStore.js';
export const checkAuth = (callback) => {
	const authStore = useAuthStore();
	console.log("authStore.isLoggedIn", authStore.isLoggedIn);
	if (authStore.isLoggedIn) {
		// 如果已登录，执行回调操作
		callback && callback();
	}else {
		uni.showModal({
		  title: "提示",
		  content:"请先完善用户信息",
		  showCancel:false,
		  success(res) {
		  	if(res.confirm == true){
		  		uni.navigateTo({
		  			url:"/pages/my/personInfo/index"
		  		})
		  	}
		  }
		});
	}
}