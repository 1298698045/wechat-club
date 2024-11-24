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
  (_easycom_uni_nav_bar + _easycom_uni_icons + Tabs + ActivityItem + CommentItem + BottomText)();
}
const Tabs = () => "../../../components/Tabs/Tabs.js";
const ActivityItem = () => "../../../components/Activity/ActivityItem.js";
const CommentItem = () => "../../../components/Comment/CommentItem.js";
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
      color: "#fff",
      statusBarHeight: 0,
      isTabsFixed: false,
      top: 0
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
      color,
      statusBarHeight,
      isTabsFixed,
      top
    } = common_vendor.toRefs(data);
    const onSwiperChange = (e) => {
      data.current = e.detail.current;
    };
    const handleTab = (e) => {
      data.currentTab = e;
      common_vendor.index.showLoading({
        title: "加载中",
        duration: 2e3,
        success() {
          setTimeout(() => {
            common_vendor.index.hideLoading();
          }, 1e3);
        }
      });
    };
    const goto = () => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/list/index"
      });
    };
    common_vendor.onLoad(() => {
      const windowInfo = common_vendor.index.getWindowInfo();
      console.log("windowInfo", windowInfo);
      data.statusBarHeight = windowInfo.statusBarHeight;
      data.top = windowInfo.statusBarHeight + 44;
    });
    common_vendor.onPageScroll((e) => {
      if (e.scrollTop >= 100) {
        data.backColor = "#fff";
        data.color = "black";
      } else {
        data.backColor = "transparent";
        data.color = "#fff";
      }
      if (e.scrollTop >= 460) {
        data.isTabsFixed = true;
      } else {
        data.isTabsFixed = false;
      }
    });
    common_vendor.onPullDownRefresh(() => {
      console.log("12123");
      common_vendor.index.stopPullDownRefresh();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          color: common_vendor.unref(color),
          backgroundColor: common_vendor.unref(backColor),
          border: false,
          title: "太友趣"
        }),
        b: common_vendor.unref(color) == "black" ? 1 : "",
        c: common_vendor.unref(statusBarHeight) + "px",
        d: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        e: common_vendor.unref(indicatorDots),
        f: common_vendor.unref(autoplay),
        g: common_vendor.unref(interval),
        h: common_vendor.unref(duration),
        i: common_vendor.o(onSwiperChange),
        j: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.unref(current) === index ? 1 : ""
          };
        }),
        k: common_assets._imports_0,
        l: common_vendor.f([1, 2, 3, 4], (item, k0, i0) => {
          return {
            a: item
          };
        }),
        m: common_vendor.p({
          type: "calendar",
          size: "30",
          color: "#6be8f5"
        }),
        n: common_vendor.p({
          type: "image",
          size: "30",
          color: "#6be8f5"
        }),
        o: common_assets._imports_1,
        p: common_vendor.o(goto),
        q: common_vendor.p({
          type: "wallet",
          size: "30",
          color: "#6be8f5"
        }),
        r: common_vendor.o(handleTab),
        s: common_vendor.p({
          tabs: common_vendor.unref(tabs)
        }),
        t: common_vendor.unref(isTabsFixed) ? 1 : "",
        v: common_vendor.unref(top) + "px",
        w: common_vendor.unref(currentTab) == 0
      }, common_vendor.unref(currentTab) == 0 ? {} : common_vendor.unref(currentTab) == 1 ? {} : {}, {
        x: common_vendor.unref(currentTab) == 1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-184b8d5d"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
