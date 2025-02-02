"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + Empty)();
}
const Empty = () => "../Empty/EmptyView.js";
const _sfc_main = {
  __name: "ActivityItem",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const handleDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/detail/index?id=" + item.id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: item.currentImg,
            b: common_vendor.t(item.price),
            c: "f854d1e8-0-" + i0,
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.address),
            f: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("MM")),
            g: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("DD")),
            h: common_vendor.t(weekName(item.startTime)),
            i: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("hh:mm")),
            j: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.endTime).format("hh:mm")),
            k: index,
            l: common_vendor.o(($event) => handleDetail(item), index)
          };
        }),
        b: common_vendor.p({
          type: "medal-filled",
          size: "30",
          color: "#f5d16b"
        }),
        c: __props.list.length == 0
      }, __props.list.length == 0 ? {} : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f854d1e8"]]);
wx.createComponent(Component);
