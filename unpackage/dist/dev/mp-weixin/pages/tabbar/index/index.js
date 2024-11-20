"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_counter = require("../../../stores/counter.js");
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
      currentTab: 0
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
      currentTab
    } = common_vendor.toRefs(data);
    const onSwiperChange = (e) => {
      console.log("e", e, data.current);
      data.current = e.detail.current;
    };
    const handleTab = (index, item) => {
      data.currentTab = index;
    };
    const goto = () => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/list/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.unref(indicatorDots),
        c: common_vendor.unref(autoplay),
        d: common_vendor.unref(interval),
        e: common_vendor.unref(duration),
        f: common_vendor.o(onSwiperChange),
        g: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.n(common_vendor.unref(current) == index ? "active" : "")
          };
        }),
        h: common_vendor.p({
          type: "calendar",
          size: "30",
          color: "#6be8f5"
        }),
        i: common_vendor.p({
          type: "image",
          size: "30",
          color: "#6be8f5"
        }),
        j: common_vendor.p({
          type: "list",
          size: "30",
          color: "#6be8f5"
        }),
        k: common_vendor.o(goto),
        l: common_vendor.p({
          type: "wallet",
          size: "30",
          color: "#6be8f5"
        }),
        m: common_vendor.f(common_vendor.unref(tabs), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(currentTab) == index ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => handleTab(index), index)
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
