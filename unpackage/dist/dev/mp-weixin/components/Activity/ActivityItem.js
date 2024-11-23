"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "ActivityItem",
  setup(__props) {
    const handleDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/detail/index?id=" + item
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f([1, 2, 3, 4, 5, 6, 7, 8], (item, k0, i0) => {
          return {
            a: "f854d1e8-0-" + i0,
            b: "f854d1e8-1-" + i0,
            c: "f854d1e8-2-" + i0,
            d: item,
            e: common_vendor.o(($event) => handleDetail(item), item)
          };
        }),
        b: common_assets._imports_0$1,
        c: common_vendor.p({
          type: "medal-filled",
          size: "30",
          color: "#f5d16b"
        }),
        d: common_vendor.p({
          type: "location",
          color: "#666",
          size: "20"
        }),
        e: common_vendor.p({
          type: "location",
          color: "#666",
          size: "20"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f854d1e8"]]);
wx.createComponent(Component);
