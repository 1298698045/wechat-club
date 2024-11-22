"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const stores_counter = require("../../../stores/counter.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_nav_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_icons + Tabs + ActivityItem + BottomText)();
}
const Tabs = () => "../../../components/Tabs/Tabs.js";
const ActivityItem = () => "../../../components/Activity/ActivityItem.js";
const BottomText = () => "../../../components/BottomText/BottomText.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = stores_counter.useCounterStore();
    console.log("count:", store.count);
    const data = common_vendor.reactive({
      title: "Hello",
      indicatorDots: false,
      autoplay: true,
      interval: 5e3,
      duration: 500,
      images: [
        "/static/img/1.jpg",
        "/static/img/2.jpg",
        "/static/img/3.jpg"
      ],
      current: 0,
      tabs: [
        {
          name: "活动"
        },
        {
          name: "评价"
        },
        {
          name: "周期表"
        }
      ],
      currentTab: 0,
      backColor: "transparent",
      color: "#fff"
    });
    const {
      title,
      indicatorDots,
      autoplay,
      interval,
      duration,
      images,
      current,
      tabs,
      currentTab,
      backColor,
      color
    } = common_vendor.toRefs(data);
    const onSwiperChange = (e) => {
      data.current = e.detail.current;
    };
    const handleTab = (e) => {
      console.log("handleTab", e);
    };
    const goto = () => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/list/index"
      });
    };
    common_vendor.onLoad(() => {
      const sys = common_vendor.index.getSystemSetting();
      console.log("sys", sys);
    });
    common_vendor.onPageScroll((e) => {
      if (e.scrollTop >= 100) {
        data.backColor = "#fff";
        data.color = "black";
      } else {
        data.backColor = "transparent";
        data.color = "#fff";
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          color: common_vendor.unref(color),
          backgroundColor: common_vendor.unref(backColor),
          border: false,
          title: "太友趣"
        }),
        b: common_vendor.unref(color) == "black" ? 1 : "",
        c: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        d: common_vendor.unref(indicatorDots),
        e: common_vendor.unref(autoplay),
        f: common_vendor.unref(interval),
        g: common_vendor.unref(duration),
        h: common_vendor.o(onSwiperChange),
        i: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.unref(current) === index ? 1 : ""
          };
        }),
        j: common_assets._imports_0,
        k: common_vendor.f([1, 2, 3, 4], (item, k0, i0) => {
          return {
            a: item
          };
        }),
        l: common_vendor.p({
          type: "calendar",
          size: "30",
          color: "#6be8f5"
        }),
        m: common_vendor.p({
          type: "image",
          size: "30",
          color: "#6be8f5"
        }),
        n: common_vendor.p({
          type: "list",
          size: "30",
          color: "#6be8f5"
        }),
        o: common_vendor.o(goto),
        p: common_vendor.p({
          type: "wallet",
          size: "30",
          color: "#6be8f5"
        }),
        q: common_vendor.o(handleTab),
        r: common_vendor.p({
          tabs: common_vendor.unref(tabs)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-184b8d5d"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
