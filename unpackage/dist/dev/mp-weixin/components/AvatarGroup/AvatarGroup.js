"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "AvatarGroup",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: item.fileLocation,
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08115cbd"]]);
wx.createComponent(Component);
