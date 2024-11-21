"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Tabs",
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const data = common_vendor.reactive({
      currentTab: 0
    });
    const { currentTab } = common_vendor.toRefs(data);
    const handleTab = (index, item) => {
      data.currentTab = index;
      emit("change", index);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.tabs, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(currentTab) == index ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => handleTab(index), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28d956e0"]]);
wx.createComponent(Component);
