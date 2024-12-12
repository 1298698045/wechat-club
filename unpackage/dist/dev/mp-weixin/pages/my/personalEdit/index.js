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
    const formData = common_vendor.reactive({
      name: "",
      sex: 1,
      age: "",
      signature: ""
    });
    const index = common_vendor.ref(1);
    const range = common_vendor.ref([
      { value: 0, text: "男" },
      { value: 1, text: "女" }
    ]);
    const sexs = common_vendor.ref(["男", "女"]);
    common_vendor.ref();
    const getDetail = () => {
      utils_request.get(utils_Interface.Interface.member.detail, {
        // id: 
      }).then((res) => {
        console.log("res", res);
        const { userName, gender, age, signature } = res.data;
        formData.name = userName;
        index.value = Number(gender) || 0;
        formData.age = age;
        formData.signature = signature;
      });
    };
    getDetail();
    const change = (e) => {
      index.value = e.detail.value;
    };
    const handleSave = async () => {
      try {
        utils_request.put(utils_Interface.Interface.member.editUserInfo, {
          userName: formData.name,
          gender: index.value,
          age: formData.age,
          signature: formData.signature
        }).then((res) => {
          common_vendor.index.showToast({
            duration: 2e3,
            title: "保存成功！",
            icon: "success"
          });
        });
      } catch (err) {
        console.log("err", err);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: formData.name,
        b: common_vendor.o(($event) => formData.name = $event.detail.value),
        c: common_vendor.p({
          type: "right"
        }),
        d: sexs.value[index.value],
        e: common_vendor.o(($event) => sexs.value[index.value] = $event.detail.value),
        f: common_vendor.o(change),
        g: index.value,
        h: range.value,
        i: common_vendor.p({
          type: "right"
        }),
        j: formData.age,
        k: common_vendor.o(($event) => formData.age = $event.detail.value),
        l: common_vendor.p({
          type: "right"
        }),
        m: formData.signature,
        n: common_vendor.o(($event) => formData.signature = $event.detail.value),
        o: common_vendor.p({
          type: "right"
        }),
        p: common_vendor.o(handleSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f1d2ff72"]]);
wx.createPage(MiniProgramPage);
