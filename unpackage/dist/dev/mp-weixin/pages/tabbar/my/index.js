"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const handleLogin = () => {
      common_vendor.index.login({
        provider: "weixin",
        success: (res) => {
          console.log("res", res);
          common_vendor.index.showToast({
            title: "请完善用户信息！",
            duration: 2e3,
            success() {
              setTimeout(() => {
                common_vendor.index.switchTab({
                  url: "/pages/tabbar/index/index"
                });
              }, 2e3);
            }
          });
          common_vendor.index.getUserProfile({
            provider: "weixin",
            desc: "用于完善会员资料",
            success: function(infoRes) {
              console.log("用户昵称为：" + infoRes);
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleLogin)
      };
    };
  }
};
wx.createPage(_sfc_main);
