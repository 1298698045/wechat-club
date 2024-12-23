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
      stateCode: -1,
      times: [
        {
          type: 0,
          name: "本周"
        },
        {
          type: 1,
          name: "上周"
        },
        {
          type: 2,
          name: "本月"
        },
        {
          type: 3,
          name: "上月"
        }
      ],
      timeCurrent: -1,
      startDate: "",
      endDate: "",
      categoryList: [],
      categoryId: ""
    });
    const {
      searchVal,
      listData,
      tabs,
      current,
      isFilter,
      pageNumber,
      pageSize,
      stateCode,
      times,
      timeCurrent,
      startDate,
      endDate,
      categoryList,
      categoryId
    } = common_vendor.toRefs(data);
    const changeTime = (item) => {
      data.timeCurrent = item.type;
      switch (item.type) {
        case 0:
          getWeekDate();
        case 1:
          getLastWeekDate();
          break;
        case 2:
          getMonthDate();
        case 3:
          getLastMonthDate();
      }
    };
    const changeCategory = (item) => {
      data.categoryId = item.id;
    };
    const handleRest = () => {
      data.startDate = "";
      data.endDate = "";
      data.categoryId = "";
      data.timeCurrent = -1;
      data.pageNumber = 1;
      data.isFilter = false;
      getQuery();
    };
    const handleConfirm = () => {
      data.pageNumber = 1;
      data.isFilter = false;
      getQuery();
    };
    const getCategory = () => {
      utils_request.get(utils_Interface.Interface.category, {
        category: 1
      }).then((res) => {
        data.categoryList = res.data;
      });
    };
    getCategory();
    const getWeekDate = () => {
      common_vendor.hooks.updateLocale("en", {
        week: {
          dow: 1
          // 将周一设为一周的开始
        }
      });
      let startDate2 = common_vendor.hooks().startOf("week").format("YYYY-MM-DD");
      let endDate2 = common_vendor.hooks().endOf("week").format("YYYY-MM-DD");
      data.startDate = startDate2;
      data.endDate = endDate2;
    };
    const getLastWeekDate = () => {
      common_vendor.hooks.updateLocale("en", {
        week: {
          dow: 1
          // 将周一设为一周的开始
        }
      });
      let startDate2 = common_vendor.hooks().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD");
      let endDate2 = common_vendor.hooks().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD");
      data.startDate = startDate2;
      data.endDate = endDate2;
    };
    const getMonthDate = () => {
      let startDate2 = common_vendor.hooks().startOf("month").format("YYYY-MM-DD");
      let endDate2 = common_vendor.hooks().endOf("month").format("YYYY-MM-DD");
      data.startDate = startDate2;
      data.endDate = endDate2;
    };
    const getLastMonthDate = () => {
      let startDate2 = common_vendor.hooks().subtract(1, "months").startOf("month").format("YYYY-MM-DD");
      let endDate2 = common_vendor.hooks().subtract(1, "months").endOf("month").format("YYYY-MM-DD");
      data.startDate = startDate2;
      data.endDate = endDate2;
    };
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
        stateCode: data.stateCode,
        folderId: data.categoryId,
        startDate: data.startDate,
        endDate: data.endDate
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
    const handleDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/detail/index?id=" + item.id
      });
    };
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
            l: index,
            m: common_vendor.o(($event) => handleDetail(item), index)
          };
        }),
        j: common_vendor.unref(isFilter)
      }, common_vendor.unref(isFilter) ? {
        k: common_vendor.f(common_vendor.unref(times), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(timeCurrent) == item.type ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => changeTime(item), index)
          };
        }),
        l: common_vendor.f(common_vendor.unref(categoryList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(categoryId) == item.id ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => changeCategory(item), index)
          };
        }),
        m: common_vendor.o(handleRest),
        n: common_vendor.o(handleConfirm),
        o: common_vendor.o(() => {
        }),
        p: common_vendor.o(closeFilter)
      } : {}, {
        q: common_vendor.unref(isFilter) ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c00f9596"]]);
wx.createPage(MiniProgramPage);
