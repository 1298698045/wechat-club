"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "CommentItem",
  setup(__props) {
    const previewImg = () => {
      common_vendor.index.previewImage({
        urls: [],
        current: "",
        success: (res) => {
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f([1, 2, 3, 4, 5], (item, index, i0) => {
          return {
            a: common_vendor.o(previewImg, index),
            b: index
          };
        }),
        b: common_assets._imports_0,
        c: common_assets._imports_1$2
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-20dbeb0a"]]);
wx.createComponent(Component);
