"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const id = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      console.log("options", options);
      id.value = options.id;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(id.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6d487c6"]]);
wx.createPage(MiniProgramPage);
