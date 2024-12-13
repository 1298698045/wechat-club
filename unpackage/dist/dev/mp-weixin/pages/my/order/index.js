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
  (_easycom_uni_easyinput + tabs + _easycom_uni_icons)();
}
const tabs = () => "../../../components/Tabs/Tabs.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [],
      pageNumber: 1,
      pageSize: 5,
      isPage: false,
      tabList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "活动"
        },
        {
          id: 2,
          name: "课程"
        },
        {
          id: 3,
          name: "旅游"
        }
      ],
      orderType: 1
    });
    const { searchVal, listData, pageNumber, pageSize, isPage, tabList, orderType } = common_vendor.toRefs(data);
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const changeTab = (e) => {
      data.orderType = e.id;
      getQuery();
    };
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.order.list, {
        name: data.searchVal,
        orderType: data.orderType,
        page: data.pageNumber,
        rows: data.pageSize
      }).then((res) => {
        let list = res.data;
        let total = res.total;
        if (data.pageNumber * data.pageSize < total) {
          data.isPage = true;
        } else {
          data.isPage = false;
        }
        let temp = [];
        if (data.pageNumber == 1) {
          temp = list;
        } else {
          temp = data.listData.concat(list);
        }
        data.listData = temp;
      });
    };
    getQuery();
    common_vendor.onPullDownRefresh(() => {
      console.log("onPullDownRefresh");
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
        a: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        b: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入活动名称",
          modelValue: common_vendor.unref(searchVal)
        }),
        c: common_vendor.o(changeTab),
        d: common_vendor.p({
          tabs: common_vendor.unref(tabList)
        }),
        e: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.unref(utils_Interface.Interface).uploadUrl + item.businessPicture,
            b: "b9bb6734-2-" + i0,
            c: common_vendor.t(item.businessName),
            d: common_vendor.t(item.unitPrice),
            e: "b9bb6734-3-" + i0,
            f: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.orderDate).format("MM")),
            g: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.orderDate).format("DD")),
            h: common_vendor.t(weekName(item.orderDate)),
            i: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.orderDate).format("hh:mm")),
            j: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.orderDate).format("hh:mm")),
            k: index
          };
        }),
        f: common_vendor.p({
          type: "location",
          color: "#666",
          size: "20"
        }),
        g: common_vendor.p({
          type: "location",
          color: "#666",
          size: "20"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b9bb6734"]]);
wx.createPage(MiniProgramPage);
