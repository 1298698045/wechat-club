"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + tabs + AvatarGroup)();
}
const AvatarGroup = () => "../../../components/AvatarGroup/AvatarGroup.js";
const tabs = () => "../../../components/Tabs/Tabs.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(null);
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [1, 2, 3, 4, 5, 6, 7, 8],
      pageNumber: 1,
      pageSize: 5,
      isPage: false,
      categoryList: [],
      categoryId: ""
    });
    const { searchVal, listData, pageNumber, pageSize, isPage, categoryList, categoryId } = common_vendor.toRefs(data);
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const getCategory = () => {
      utils_request.get(utils_Interface.Interface.category, {
        category: 2
      }).then((res) => {
        data.categoryList = res.data;
        data.categoryList.unshift({
          id: "",
          name: "全部"
        });
      });
    };
    getCategory();
    const handleSearch = () => {
      data.pageNumber = 1;
      getQuery();
    };
    const changeTab = (e) => {
      data.categoryId = e.id;
      getQuery();
    };
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.course.list, {
        name: data.searchVal,
        page: data.pageNumber,
        rows: data.pageSize,
        folderId: data.categoryId
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
        url: "/pages/other/courseDetail/index?id=" + item.id
      });
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
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        e: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入课程名称",
          modelValue: common_vendor.unref(searchVal)
        }),
        f: common_vendor.o(changeTab),
        g: common_vendor.p({
          tabs: common_vendor.unref(categoryList)
        }),
        h: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.price),
            c: common_vendor.t(item.address),
            d: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("MM")),
            e: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("DD")),
            f: common_vendor.t(weekName(item.startTime)),
            g: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("hh:mm")),
            h: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.endTime).format("hh:mm")),
            i: "cefcc65d-2-" + i0,
            j: common_vendor.p({
              list: item.pictures
            }),
            k: item.pictures && item.pictures.length
          }, item.pictures && item.pictures.length ? {
            l: common_vendor.t(item.pictures.length)
          } : {}, {
            m: common_vendor.o(($event) => handleDetail(item), index),
            n: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cefcc65d"]]);
wx.createPage(MiniProgramPage);
