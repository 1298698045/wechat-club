"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_rate2 + _easycom_uni_icons2)();
}
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const placeholder = common_vendor.ref("可以描述一下整个活动中感受如何，有那些印象深刻的事情和瞬间");
    const data = common_vendor.reactive({
      rateValue: 1,
      images: []
    });
    const { rateValue, images } = common_vendor.toRefs(data);
    const onChange = (e) => {
      console.log("e", e);
    };
    const uploadPhoto = () => {
      const url = utils_Interface.Interface.uploadUrl + utils_Interface.Interface.comment.upload;
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        success: (res) => {
          console.log("chooseImage", res);
          const tempFilePaths = res.tempFilePaths[0];
          setTimeout(() => {
            console.log("url", url);
            common_vendor.index.uploadFile({
              url,
              filePath: tempFilePaths,
              name: "file",
              formData: {
                parentId: ""
              },
              success(res2) {
                console.log("res", res2);
              },
              fail: (error) => {
                console.error("上传失败：", error);
              }
            });
          }, 1e3);
        }
      });
    };
    const handleSend = () => {
      utils_request.post(utils_Interface.Interface.comment.add, {}).then((res) => {
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onChange),
        b: common_vendor.o(($event) => common_vendor.isRef(rateValue) ? rateValue.value = $event : null),
        c: common_vendor.p({
          size: "32",
          modelValue: common_vendor.unref(rateValue)
        }),
        d: placeholder.value,
        e: common_vendor.f([1, 2, 3, 4], (item, k0, i0) => {
          return {
            a: item
          };
        }),
        f: common_assets._imports_0$2,
        g: common_vendor.p({
          type: "image",
          color: "#848484",
          size: "40"
        }),
        h: common_vendor.o(uploadPhoto),
        i: common_vendor.o(handleSend)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-886a6f04"]]);
wx.createPage(MiniProgramPage);
