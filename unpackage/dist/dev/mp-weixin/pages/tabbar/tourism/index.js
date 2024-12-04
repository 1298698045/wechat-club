"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_easyinput2 + _easycom_uni_icons2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_icons + AvatarGroup)();
}
const AvatarGroup = () => "../../../components/AvatarGroup/AvatarGroup.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(null);
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [1, 2, 3, 4, 5, 6, 7, 8]
    });
    const { searchVal, listData } = common_vendor.toRefs(data);
    common_vendor.onLoad(() => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
    });
    const time = setTimeout(() => {
      common_vendor.index.hideLoading();
    }, 1e3);
    common_vendor.onUnload(() => {
      clearTimeout(time);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(_ctx.onClick),
        b: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        c: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入旅游名称",
          modelValue: common_vendor.unref(searchVal)
        }),
        d: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: "cc77bab7-1-" + i0,
            b: "cc77bab7-2-" + i0,
            c: "cc77bab7-3-" + i0,
            d: index
          };
        }),
        e: common_vendor.p({
          type: "location",
          color: "#666",
          size: "20"
        }),
        f: common_vendor.p({
          type: "location",
          color: "#666",
          size: "20"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc77bab7"]]);
wx.createPage(MiniProgramPage);
