"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Interface = require("../../utils/Interface.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "CommentItem",
  setup(__props) {
    const listData = common_vendor.ref([]);
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.comment.list, {}).then((res) => {
        listData.value = res.data;
      });
    };
    getQuery();
    const previewImg = () => {
      common_vendor.index.previewImage({
        urls: ["http://47.96.15.8:9006/images/1.jpg", "http://47.96.15.8:9006/images/2.jpg", "http://47.96.15.8:9006/images/3.jpg"],
        current: "http://47.96.15.8:9006/images/1.jpg",
        success: (res) => {
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(listData.value, (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: common_vendor.t(item.nickName),
            c: common_vendor.t(item.body),
            d: common_vendor.f(item.pictures, (row, idx, i1) => {
              return {
                a: row.fileLocation,
                b: idx,
                c: common_vendor.o(previewImg, idx)
              };
            }),
            e: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-20dbeb0a"]]);
wx.createComponent(Component);
