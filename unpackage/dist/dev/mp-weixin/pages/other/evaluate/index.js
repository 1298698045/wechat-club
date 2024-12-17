"use strict";
const common_vendor = require("../../../common/vendor.js");
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
      images: [],
      content: ""
    });
    const { rateValue, images, content } = common_vendor.toRefs(data);
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
          common_vendor.index.showLoading({
            title: "上传中"
          });
          const tempFilePaths = res.tempFilePaths[0];
          console.log("url", url);
          common_vendor.index.uploadFile({
            url,
            filePath: tempFilePaths,
            name: "files",
            formData: {},
            success(uploadRes) {
              console.log("uploadRes", uploadRes);
              const info = JSON.parse(uploadRes.data);
              info.data.forEach((item) => {
                item.photoUrl = utils_Interface.Interface.uploadUrl + decodeURIComponent(item.fileLocation);
              });
              data.images = data.images.concat(info.data);
              if (info.code === 2e3) {
                common_vendor.index.showToast({
                  title: "上传成功",
                  icon: "success"
                });
              } else {
                common_vendor.index.showToast({
                  title: "上传失败",
                  icon: "none"
                });
              }
            },
            fail: (error) => {
              console.error("上传失败：", error);
              common_vendor.index.showToast({
                title: "上传失败，请重试",
                icon: "none"
              });
            },
            complete: () => {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    };
    const previewImg = (item) => {
      let url = item.photoUrl;
      const urls = data.images.map((item2) => item2.photoUrl);
      common_vendor.index.previewImage({
        urls,
        current: url,
        success: (res) => {
        }
      });
    };
    const handleSend = () => {
      let commentPictures = [];
      data.images.forEach((item, index) => {
        let obj = {
          id: item.id,
          name: item.name,
          fileSize: item.fileSize,
          fileLocation: item.fileLocation,
          fileExtension: item.fileExtension,
          sortNumber: index
        };
        commentPictures.push(obj);
      });
      utils_request.post(utils_Interface.Interface.comment.add, {
        body: data.content,
        rating: data.rateValue,
        commentPictures
      }).then((res) => {
        common_vendor.index.showToast({
          title: "发布成功！",
          duration: 3e3,
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
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
        e: common_vendor.unref(content),
        f: common_vendor.o(($event) => common_vendor.isRef(content) ? content.value = $event.detail.value : null),
        g: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: item.photoUrl,
            b: index,
            c: common_vendor.o(($event) => previewImg(item), index)
          };
        }),
        h: common_vendor.p({
          type: "image",
          color: "#848484",
          size: "40"
        }),
        i: common_vendor.o(uploadPhoto),
        j: common_vendor.o(handleSend)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-886a6f04"]]);
wx.createPage(MiniProgramPage);
