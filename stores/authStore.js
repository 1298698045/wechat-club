import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: uni.getStorageSync('token') || '', // 从存储中初始化 token
	invitationCode: uni.getStorageSync('invitationCode'),
	invitee: uni.getStorageSync('invitee'),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token, // 判断是否已登录
  },
  actions: {
    setToken(token) {
      this.token = token;
      uni.setStorageSync('token', token); // 同步存储
    },
    clearToken() {
      this.token = '';
      uni.removeStorageSync('token'); // 清除存储
    },
	setInvitationCode(val) {
		this.invitationCode = val;
		uni.setStorageSync('invitationCode', val);
	},
	setInvitee(val) {
		this.invitee = val;
		uni.setStorageSync('invitee', val);
	},
  },
});
