"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const listData = common_vendor.ref([]);
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.memberlevels, {}).then((res) => {
        listData.value = res.data.sort((a, b) => a.minSignUp - b.minSignUp);
      });
    };
    common_vendor.onLoad(() => {
      getQuery();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(listData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.minSignUp),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.description),
            d: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-40c726b6"]]);
wx.createPage(MiniProgramPage);
