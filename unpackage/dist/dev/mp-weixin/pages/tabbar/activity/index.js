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
  (_easycom_uni_easyinput + tabs + ActivityItem)();
}
const ActivityItem = () => "../../../components/Activity/ActivityItem.js";
const tabs = () => "../../../components/Tabs/Tabs.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.reactive({
      searchVal: "",
      listData: [],
      pageNumber: 1,
      pageSize: 3,
      isPage: false,
      categoryList: [
        {
          id: 1,
          name: "分类1"
        },
        {
          id: 2,
          name: "分类2"
        },
        {
          id: 3,
          name: "分类3"
        },
        {
          id: 4,
          name: "分类4"
        },
        {
          id: 5,
          name: "分类5"
        }
      ],
      categoryId: ""
    });
    const { searchVal, listData, pageNumber, pageSize, isPage, categoryList, categoryId } = common_vendor.toRefs(data);
    const handleSearch = () => {
      data.pageNumber = 1;
      getActivityList();
    };
    const getActivityList = () => {
      utils_request.get(utils_Interface.Interface.activity.list, {
        name: data.searchVal,
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
    getActivityList();
    const changeTab = (e) => {
      data.categoryId = e.id;
      getActivityList();
    };
    const getCategory = () => {
      utils_request.get(utils_Interface.Interface.category, {
        category: 1
      }).then((res) => {
        console.log("res", res);
        data.categoryList = res.data;
        data.categoryList.unshift({
          id: "",
          name: "全部"
        });
      });
    };
    getCategory();
    common_vendor.onPullDownRefresh(() => {
      console.log("onPullDownRefresh");
      data.pageNumber = 1;
      getActivityList();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onReachBottom(() => {
      if (data.isPage) {
        data.pageNumber++;
        getActivityList();
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
        h: common_vendor.p({
          list: common_vendor.unref(listData)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc634a44"]]);
wx.createPage(MiniProgramPage);
