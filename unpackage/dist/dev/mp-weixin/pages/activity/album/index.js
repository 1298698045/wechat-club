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
    const previewImg = () => {
      common_vendor.index.previewImage({
        urls: ["http://47.96.15.8:9006/images/2.jpg", "http://47.96.15.8:9006/images/2.jpg", "http://47.96.15.8:9006/images/3.jpg"],
        current: "http://47.96.15.8:9006/images/2.jpg",
        success: (res) => {
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f([1, 2, 3, 4, 5], (item, k0, i0) => {
          return {
            a: "aa9cd241-0-" + i0,
            b: "aa9cd241-1-" + i0,
            c: common_vendor.f([1, 2, 3, 4, 5], (item2, k1, i1) => {
              return {
                a: item2,
                b: common_vendor.o(($event) => previewImg())
              };
            }),
            d: item
          };
        }),
        b: common_vendor.p({
          type: "location",
          color: "#fff"
        }),
        c: common_vendor.p({
          type: "location",
          color: "#fff"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa9cd241"]]);
wx.createPage(MiniProgramPage);
