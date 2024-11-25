"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const navs = common_vendor.ref([
      {
        icon: "",
        text: "待付款"
      },
      {
        icon: "",
        text: "待发货"
      },
      {
        icon: "",
        text: "待收货"
      },
      {
        icon: "",
        text: "待评价"
      },
      {
        icon: "",
        //原代码：&#xe60a;
        text: "退款"
      }
    ]);
    const count = common_vendor.ref([
      {
        num: 5,
        text: "我的收藏"
      },
      {
        num: 7,
        text: "我的足迹"
      },
      {
        num: 1,
        text: "优惠券"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.f(count.value, (c, index, i0) => {
          return {
            a: common_vendor.t(c.num),
            b: common_vendor.t(c.text),
            c: index
          };
        }),
        c: common_vendor.o((...args) => _ctx.goLogin && _ctx.goLogin(...args)),
        d: !_ctx.login ? "logo-hover" : "",
        e: common_vendor.f(navs.value, (nav, index, i0) => {
          return {
            a: common_vendor.t(nav.icon),
            b: common_vendor.t(nav.text),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-25e2cca3"]]);
wx.createPage(MiniProgramPage);
