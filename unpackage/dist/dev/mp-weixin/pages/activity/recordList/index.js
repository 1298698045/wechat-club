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
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [1, 2, 3, 4, 5, 6, 7, 8],
      tabs: [
        {
          code: -1,
          name: "全部"
        },
        {
          code: 0,
          name: "未开始"
        },
        {
          code: 1,
          name: "活动中"
        },
        {
          code: 2,
          name: "已结束"
        }
      ],
      current: 0,
      isFilter: false,
      pageNumber: 1,
      pageSize: 10,
      stateCode: -1
    });
    const { searchVal, listData, tabs, current, isFilter, pageNumber, pageSize, stateCode } = common_vendor.toRefs(data);
    const statusName = (code) => {
      const arr = ["未开始", "活动中", "已结束"];
      return arr[code];
    };
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const handleTab = (item, index) => {
      data.current = index;
      data.stateCode = item.code;
      getQuery();
    };
    const handleSearch = () => {
      data.pageNumber = 1;
      getQuery();
    };
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.activity.recordList, {
        name: data.searchVal,
        page: data.pageNumber,
        rows: data.pageSize,
        stateCode: data.stateCode
        // folderId: data.categoryId
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
    const handleOpenFilter = () => {
      data.isFilter = !data.isFilter;
    };
    const closeFilter = () => {
      data.isFilter = false;
    };
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
      return common_vendor.e({
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        e: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入活动名称",
          modelValue: common_vendor.unref(searchVal)
        }),
        f: common_vendor.f(common_vendor.unref(tabs), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(current) == index ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => handleTab(item, index), index)
          };
        }),
        g: common_vendor.p({
          type: "down",
          color: "#848484"
        }),
        h: common_vendor.o(handleOpenFilter),
        i: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(statusName(item.stateCode)),
            c: common_vendor.t(item.address),
            d: common_vendor.t(item.currentStudents),
            e: common_vendor.t(item.maxStudents),
            f: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("MM")),
            g: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("DD")),
            h: common_vendor.t(weekName(item.startTime)),
            i: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("hh:mm")),
            j: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.endTime).format("hh:mm")),
            k: common_vendor.t(item.price),
            l: index
          };
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
