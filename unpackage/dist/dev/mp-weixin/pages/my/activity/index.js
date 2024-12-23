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
    const data = common_vendor.reactive({
      listData: [],
      pageNumber: 1,
      pageSize: 3,
      isPage: false,
      tabList: [
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
      ]
    });
    const { listData, pageNumber, pageSize, isPage, tabList } = common_vendor.toRefs(data);
    const getActivityList = () => {
      utils_request.get(utils_Interface.Interface.activity.list, {
        page: data.pageNumber,
        rows: data.pageSize
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
        a: common_vendor.o(_ctx.onClick),
        b: common_vendor.o(($event) => _ctx.searchVal = $event),
        c: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入活动名称",
          modelValue: _ctx.searchVal
        }),
        d: common_vendor.p({
          tabs: common_vendor.unref(tabList)
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f2d37dd"]]);
wx.createPage(MiniProgramPage);
