"use strict";
const common_vendor = require("../common/vendor.js");
const stores_authStore = require("../stores/authStore.js");
const checkAuth = (callback) => {
  const authStore = stores_authStore.useAuthStore();
  console.log("authStore.isLoggedIn", authStore.isLoggedIn);
  if (authStore.isLoggedIn) {
    callback && callback();
  } else {
    common_vendor.index.showModal({
      title: "提示",
      content: "请先完善用户信息",
      showCancel: false,
      success(res) {
        if (res.confirm == true) {
          common_vendor.index.navigateTo({
            url: "/pages/my/personInfo/index"
          });
        }
      }
    });
  }
};
exports.checkAuth = checkAuth;
