"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const data = common_vendor.reactive({
      listData: [],
      pageNumber: 1,
      pageSize: 5,
      isPage: false
    });
    const { listData, pageNumber, pageSize, isPage } = common_vendor.toRefs(data);
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.activity.album, {
        page: data.pageNumber,
        rows: data.pageSize
      }).then((res) => {
        let list = res.data.map((item) => {
          let backImg = "";
          if (item.showPictures.length) {
            backImg = utils_Interface.Interface.uploadUrl + item.showPictures[0].fileLocation;
          }
          item.backImg = backImg;
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
    const previewImg = (item, row) => {
      let current = utils_Interface.Interface.uploadUrl + row.fileLocation;
      let urls = [];
      item.showPictures.forEach((v) => {
        let url = utils_Interface.Interface.uploadUrl + v.fileLocation;
        urls.push(url);
      });
      common_vendor.index.previewImage({
        urls,
        current,
        success: (res) => {
        }
      });
    };
    common_vendor.onLoad(() => {
      getQuery();
    });
    common_vendor.onPullDownRefresh(() => {
      data.pageNumber = 1;
      getQuery();
    });
    common_vendor.onReachBottom(() => {
      if (data.isPage) {
        data.pageNumber++;
        getQuery();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: item.backImg,
            b: common_vendor.t(item.name),
            c: "aa9cd241-0-" + i0,
            d: common_vendor.t(item.address),
            e: "aa9cd241-1-" + i0,
            f: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("MM")),
            g: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("DD")),
            h: common_vendor.t(weekName(item.startTime)),
            i: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.startTime).format("hh:mm")),
            j: common_vendor.t(common_vendor.unref(common_vendor.hooks)(item.endTime).format("hh:mm")),
            k: common_vendor.f(item.showPictures, (row, idx, i1) => {
              return {
                a: common_vendor.unref(utils_Interface.Interface).uploadUrl + row.fileLocation,
                b: idx,
                c: common_vendor.o(($event) => previewImg(item, row))
              };
            }),
            l: index
          };
        }),
        b: common_vendor.p({
          type: "location",
          color: "#fff"
        }),
        c: common_vendor.p({
          type: "location",
          color: "#fff"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa9cd241"]]);
wx.createPage(MiniProgramPage);
