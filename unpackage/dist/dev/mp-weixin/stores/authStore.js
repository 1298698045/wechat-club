"use strict";
const common_vendor = require("../common/vendor.js");
const useAuthStore = common_vendor.defineStore("auth", {
  state: () => ({
    token: common_vendor.index.getStorageSync("token") || "",
    // 从存储中初始化 token
    invitationCode: common_vendor.index.getStorageSync("invitationCode"),
    invitee: common_vendor.index.getStorageSync("invitee")
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
    // 判断是否已登录
  },
  actions: {
    setToken(token) {
      this.token = token;
      common_vendor.index.setStorageSync("token", token);
    },
    clearToken() {
      this.token = "";
      common_vendor.index.removeStorageSync("token");
    },
    setInvitationCode(val) {
      this.invitationCode = val;
      common_vendor.index.setStorageSync("invitationCode", val);
    },
    setInvitee(val) {
      this.invitee = val;
      common_vendor.index.setStorageSync("invitee", val);
    }
  }
});
exports.useAuthStore = useAuthStore;
