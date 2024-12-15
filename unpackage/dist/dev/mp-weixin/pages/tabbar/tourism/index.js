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
  (_easycom_uni_easyinput + tabs)();
}
const tabs = () => "../../../components/Tabs/Tabs.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(null);
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [],
      pageNumber: 1,
      pageSize: 5,
      isPage: false,
      categoryList: [],
      categoryId: ""
    });
    const { searchVal, listData, pageNumber, pageSize, isPage, categoryList, categoryId } = common_vendor.toRefs(data);
    common_vendor.onLoad(() => {
      getQuery();
    });
    const handleSearch = () => {
      data.pageNumber = 1;
      getQuery();
    };
    const changeTab = (e) => {
      data.categoryId = e.id;
      getQuery();
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
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.tourism.list, {
        name: encodeURIComponent(data.searchVal),
        page: data.pageNumber,
        rows: data.pageSize,
        folderId: data.categoryId
      }).then((res) => {
        let list = res.data.map((item) => {
          let currentImgData = item.pictures.find((row) => row.isRecommend == true);
          let currentImg = "";
          if (currentImgData) {
            currentImg = currentImgData.fileLocation;
          }
          item.currentImg = currentImg;
          return item;
        });
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
    const handleDetail = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/other/tourismDetail/index?id=" + item.id
      });
    };
    const time = setTimeout(() => {
      common_vendor.index.hideLoading();
    }, 1e3);
    common_vendor.onUnload(() => {
      clearTimeout(time);
    });
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
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(($event) => common_vendor.isRef(searchVal) ? searchVal.value = $event : null),
        e: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入活动名称",
          modelValue: common_vendor.unref(searchVal)
        }),
        f: common_vendor.o(changeTab),
        g: common_vendor.p({
          tabs: common_vendor.unref(categoryList)
        }),
        h: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: item.currentImg,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: index,
            e: common_vendor.o(($event) => handleDetail(item), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cc77bab7"]]);
wx.createPage(MiniProgramPage);
