"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
const stores_authStore = require("../../../stores/authStore.js");
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
    const authStore = stores_authStore.useAuthStore();
    const formData = common_vendor.reactive({
      name: "",
      sex: 1
    });
    const range = common_vendor.ref([
      { value: 0, text: "女" },
      { value: 1, text: "男" }
    ]);
    const change = () => {
    };
    const code = common_vendor.ref();
    const handleSave = async () => {
      try {
        common_vendor.index.showLoading({
          mask: true,
          title: "保存中～"
        });
        const profileRes = await common_vendor.index.getUserProfile({
          provider: "weixin",
          desc: "太友趣小程序隐私保护指引"
        });
        console.log("用户信息获取成功:", profileRes);
        let userInfo = JSON.parse(profileRes.rawData);
        console.log("user", userInfo);
        const loginRes = await common_vendor.index.login({ provider: "weixin" });
        console.log("登录成功，code:", loginRes.code);
        code.value = loginRes.code;
        console.log("code.value", code.value);
        utils_request.post(utils_Interface.Interface.login, {
          code: code.value,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }).then((res) => {
          console.log("res", res);
          if (res.code === 2e4) {
            let { wechatOpenid } = res.data;
            console.log("wechatOpenid", wechatOpenid);
            try {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "保存成功！",
                duration: 3e3,
                success: (res2) => {
                  setTimeout(() => {
                    authStore.setToken(wechatOpenid);
                    common_vendor.index.navigateBack({
                      delta: 1
                    });
                  }, 1e3);
                }
              });
            } catch {
            }
          }
        });
      } catch (err) {
        console.log("err", err);
      }
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
