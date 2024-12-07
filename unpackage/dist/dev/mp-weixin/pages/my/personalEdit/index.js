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
    const index = common_vendor.ref(0);
    const range = common_vendor.ref([
      { value: 0, text: "男" },
      { value: 1, text: "女" }
    ]);
    const sexs = common_vendor.ref(["男", "女"]);
    const change = (e) => {
      index.value = e.detail.value;
    };
    const code = common_vendor.ref();
    const handleSave = async () => {
      try {
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
              common_vendor.index.setStorageSync("token", wechatOpenid);
              common_vendor.index.navigateBack({
                delta: 1
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
        a: common_vendor.p({
          type: "right"
        }),
        b: sexs.value[index.value],
        c: common_vendor.o(($event) => sexs.value[index.value] = $event.detail.value),
        d: common_vendor.o(change),
        e: index.value,
        f: range.value,
        g: common_vendor.p({
          type: "right"
        }),
        h: common_vendor.p({
          type: "right"
        }),
        i: common_vendor.p({
          type: "right"
        }),
        j: common_vendor.o(handleSave)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f1d2ff72"]]);
wx.createPage(MiniProgramPage);
