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
  (_easycom_uni_easyinput + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(null);
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [1, 2, 3, 4, 5, 6, 7, 8],
      tabs: [
        {
          name: "全部"
        },
        {
          name: "未开始"
        },
        {
          name: "活动中"
        },
        {
          name: "已结束"
        }
      ],
      current: 0,
      isFilter: false
    });
    const { searchVal, listData, tabs, current, isFilter } = common_vendor.toRefs(data);
    const handleTab = (item, index) => {
      data.current = index;
    };
    const handleOpenFilter = () => {
      data.isFilter = !data.isFilter;
    };
    const closeFilter = () => {
      data.isFilter = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(_ctx.onClick),
        b: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        c: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入活动名称",
          modelValue: common_vendor.unref(searchVal)
        }),
        d: common_vendor.f(common_vendor.unref(tabs), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(current) == index ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => handleTab(item, index), index)
          };
        }),
        e: common_vendor.p({
          type: "down",
          color: "#848484"
        }),
        f: common_vendor.o(handleOpenFilter),
        g: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: "c00f9596-2-" + i0,
            b: "c00f9596-3-" + i0,
            c: index
          };
        }),
        h: common_vendor.p({
          type: "location"
        }),
        i: common_vendor.p({
          type: "location"
        }),
        j: common_vendor.unref(isFilter)
      }, common_vendor.unref(isFilter) ? {
        k: common_vendor.o(() => {
        }),
        l: common_vendor.o(closeFilter)
      } : {}, {
        m: common_vendor.unref(isFilter) ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c00f9596"]]);
wx.createPage(MiniProgramPage);
