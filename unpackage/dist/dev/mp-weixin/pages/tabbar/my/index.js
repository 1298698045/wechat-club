"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
const utils_auth = require("../../../utils/auth.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref([
      {
        icon: "",
        text: "我的订单",
        url: "/pages/my/order/index"
      },
      {
        icon: "",
        text: "我的钱包"
      },
      {
        icon: "",
        text: "我的卡券"
      },
      {
        icon: "",
        text: "工具箱"
      },
      {
        icon: "",
        //原代码：&#xe60a;
        text: "我的活动"
      }
    ]);
    const count = common_vendor.ref([
      {
        num: 5,
        text: "我的活动",
        url: "/pages/my/activity/index"
      },
      {
        num: 7,
        text: "会员等级"
      },
      {
        num: 100,
        text: "我的积分"
      }
    ]);
    const login = common_vendor.ref(false);
    const code = common_vendor.ref();
    const handleLogin = async () => {
      try {
        const profileRes = await common_vendor.index.getUserProfile({
          provider: "weixin",
          desc: "太友趣小程序隐私保护指引"
        });
        console.log("用户信息获取成功:", profileRes);
        let userInfo = JSON.parse(profileRes.rawData);
        console.log("user", userInfo);
        const loginRes = await common_vendor.index.login({ provider: "weixin" });
        console.log("登录成功，code:", loginRes.code);
        code.value = loginRes.code;
        console.log("code.value", code.value);
        utils_request.post(utils_Interface.Interface.login, {
          code: code.value,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }).then((res) => {
          console.log("res", res);
        });
      } catch (err) {
        console.log("err", err);
      }
    };
    const gotoUser = () => {
      utils_auth.checkAuth(() => {
        common_vendor.index.navigateTo({
          url: "/pages/my/personalEdit/index"
        });
      });
    };
    const handleItemGoto = (item, index) => {
      if (item.url) {
        common_vendor.index.navigateTo({
          url: item.url
        });
      }
    };
    const gotoOrder = () => {
      utils_auth.checkAuth(() => {
        common_vendor.index.navigateTo({
          url: "/pages/my/order/index"
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(handleLogin),
        c: common_vendor.f(count.value, (c, index, i0) => {
          return {
            a: common_vendor.t(c.num),
            b: common_vendor.t(c.text),
            c: index,
            d: common_vendor.o(($event) => handleItemGoto(c), index)
          };
        }),
        d: !login.value ? "logo-hover" : "",
        e: common_vendor.o(gotoOrder),
        f: common_vendor.o(gotoUser)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-25e2cca3"]]);
wx.createPage(MiniProgramPage);
