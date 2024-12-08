"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
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
      listData: [],
      pageNumber: 1,
      pageSize: 10,
      isPage: false
    });
    const { searchVal, listData, pageNumber, pageSize, isPage } = common_vendor.toRefs(data);
    const handleSearch = () => {
      data.pageNumber = 1;
      getQuery();
    };
    const getQuery = (e) => {
      utils_request.get(utils_Interface.Interface.member.list, {
        search: data.searchVal,
        page: data.pageNumber,
        rows: data.pageSize
      }).then((res) => {
        let total = res.total;
        if (data.pageNumber * data.pageSize < total) {
          data.isPage = true;
        } else {
          data.isPage = false;
        }
        let temp = [];
        if (data.pageNumber == 1) {
          temp = res.data;
        } else {
          temp = data.listData.concat(res.data);
        }
        data.listData = temp;
      });
    };
    getQuery();
    common_vendor.onPullDownRefresh(() => {
      data.pageNumber = 1;
      getQuery();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onReachBottom(() => {
      if (data.isPage) {
        data.pageNumber++;
        getQuery();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        e: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入成员昵称/手机号",
          modelValue: common_vendor.unref(searchVal)
        }),
        f: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: common_vendor.t(item.userName),
            c: "6e999de1-1-" + i0,
            d: common_vendor.p({
              type: "person",
              color: item.gender == 0 ? "#db7e9e" : "blue"
            }),
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e999de1"]]);
wx.createPage(MiniProgramPage);
