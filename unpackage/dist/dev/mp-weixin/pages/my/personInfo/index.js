"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const formData = common_vendor.reactive({
      name: "",
      sex: ""
    });
    const range = common_vendor.ref([
      { value: 0, text: "男" },
      { value: 1, text: "女" }
    ]);
    const change = () => {
    };
    const handleSave = () => {
      console.log("formData:", formData);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => formData.name = $event),
        b: common_vendor.p({
          type: "text",
          placeholder: "请输入昵称",
          modelValue: formData.name
        }),
        c: common_vendor.p({
          label: "昵称",
          name: "name"
        }),
        d: common_vendor.o(change),
        e: common_vendor.o(($event) => formData.sex = $event),
        f: common_vendor.p({
          placeholder: "请选择性别",
          localdata: range.value,
          modelValue: formData.sex
        }),
        g: common_vendor.p({
          label: "性别",
          name: "sex"
        }),
        h: common_vendor.p({
          modelValue: formData
        }),
        i: common_vendor.o(handleSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d728849a"]]);
wx.createPage(MiniProgramPage);
