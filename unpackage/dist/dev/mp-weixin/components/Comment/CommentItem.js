"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Interface = require("../../utils/Interface.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "CommentItem",
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const listData = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const getQuery = () => {
      utils_request.get(utils_Interface.Interface.comment.list, {}).then((res) => {
        total.value = res.total;
        emit("change", total.value);
        listData.value = res.data.map((item) => {
          item.pictures = item.pictures.map((row) => {
            row.photoUrl = utils_Interface.Interface.uploadUrl + decodeURIComponent(row.fileLocation);
            return row;
          });
          return item;
        });
        console.log("listData.value", listData.value);
      });
    };
    getQuery();
    const previewImg = (item, row) => {
      let url = row.photoUrl;
      let urls = item.pictures.map((v) => v.photoUrl);
      common_vendor.index.previewImage({
        // urls: ["http://47.96.15.8:9006/images/1.jpg","http://47.96.15.8:9006/images/2.jpg","http://47.96.15.8:9006/images/3.jpg"],
        // current: "http://47.96.15.8:9006/images/1.jpg",
        urls,
        current: url,
        success: (res) => {
        }
      });
    };
    __expose({ getQuery });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(listData.value, (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: common_vendor.t(item.nickName),
            c: common_vendor.o(_ctx.onChange, index),
            d: "20dbeb0a-0-" + i0,
            e: common_vendor.o(($event) => item.rating = $event, index),
            f: common_vendor.p({
              size: "24",
              activeColor: "#eb605b",
              readonly: true,
              modelValue: item.rating
            }),
            g: common_vendor.t(item.rating),
            h: common_vendor.t(item.body),
            i: common_vendor.f(item.pictures, (row, idx, i1) => {
              return {
                a: row.photoUrl,
                b: idx,
                c: common_vendor.o(($event) => previewImg(item, row), idx)
              };
            }),
            j: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-20dbeb0a"]]);
wx.createComponent(Component);
