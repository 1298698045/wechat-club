"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
const utils_auth = require("../../../utils/auth.js");
const stores_authStore = require("../../../stores/authStore.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const authStore = stores_authStore.useAuthStore();
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
      // {
      // 	num:5,
      // 	text:'我的活动',
      // 	url: "/pages/my/activity/index"
      // },
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
    common_vendor.ref();
    const personalInfo = common_vendor.reactive({
      userName: "",
      avatarUrl: ""
    });
    const handleLogin = async () => {
      utils_auth.checkAuth(() => {
        console.log("已登录");
      });
    };
    const gotoUser = () => {
      utils_auth.checkAuth(() => {
        common_vendor.index.navigateTo({
          url: "/pages/my/personalEdit/index"
        });
      });
    };
    const handleItemGoto = (item, index) => {
      if (item.url)
        ;
    };
    const gotoOrder = () => {
      utils_auth.checkAuth(() => {
        common_vendor.index.navigateTo({
          url: "/pages/my/order/index"
        });
      });
    };
    const gotoAbout = () => {
      common_vendor.index.navigateTo({
        url: "/pages/other/about/index"
      });
    };
    const getPersonalInfo = () => {
      utils_request.get(utils_Interface.Interface.member.detail, {}).then((res) => {
        console.log("res", res);
        let { userName, avatarUrl } = res.data;
        personalInfo.userName = userName;
        personalInfo.avatarUrl = avatarUrl;
      });
    };
    common_vendor.onLoad(() => {
    });
    common_vendor.onShow(() => {
      if (authStore.isLoggedIn) {
        getPersonalInfo();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: personalInfo.avatarUrl,
        b: common_vendor.o(handleLogin),
        c: common_vendor.t(personalInfo.userName || "未登录"),
        d: common_vendor.o(handleLogin),
        e: common_vendor.f(count.value, (c, index, i0) => {
          return {
            a: common_vendor.t(c.num),
            b: common_vendor.t(c.text),
            c: index,
            d: common_vendor.o(($event) => handleItemGoto(c), index)
          };
        }),
        f: !login.value ? "logo-hover" : "",
        g: common_vendor.o(gotoOrder),
        h: common_vendor.o(gotoUser),
        i: common_vendor.o(gotoAbout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-25e2cca3"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
