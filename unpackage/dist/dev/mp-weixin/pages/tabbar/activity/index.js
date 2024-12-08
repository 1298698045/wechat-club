"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
if (!Math) {
  ActivityItem();
}
const ActivityItem = () => "../../../components/Activity/ActivityItem.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.reactive({
      listData: [],
      pageNumber: 1,
      pageSize: 3,
      isPage: false
    });
    const { listData, pageNumber, pageSize, isPage } = common_vendor.toRefs(data);
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
        a: common_vendor.p({
          list: common_vendor.unref(listData)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc634a44"]]);
wx.createPage(MiniProgramPage);
