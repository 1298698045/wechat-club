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
wx.createPage(_sfc_main);
