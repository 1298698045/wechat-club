"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const id = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      console.log("options", options);
      id.value = options.id;
    });
    const handleShare = () => {
      console.log("123123");
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    common_vendor.onShareAppMessage(() => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: "自定义转发标题123"
          });
        }, 2e3);
      });
      return {
        title: "自定义转发标题123",
        path: "/pages/activity/detail/index?id=123",
        promise
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(id.value),
        b: common_vendor.p({
          type: "redo",
          color: "#fff"
        }),
        c: common_vendor.o(handleShare),
        d: common_vendor.p({
          type: "location",
          color: "#fff"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6d487c6"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
