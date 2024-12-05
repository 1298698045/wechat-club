"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/tabbar/index/index.js";
  "./pages/tabbar/activity/index.js";
  "./pages/tabbar/course/index.js";
  "./pages/tabbar/tourism/index.js";
  "./pages/tabbar/my/index.js";
  "./pages/activity/list/index.js";
  "./pages/activity/detail/index.js";
  "./pages/activity/recordList/index.js";
  "./pages/activity/album/index.js";
  "./pages/other/discountRules/index.js";
  "./pages/my/personInfo/index.js";
  "./pages/my/order/index.js";
  "./pages/my/activity/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
