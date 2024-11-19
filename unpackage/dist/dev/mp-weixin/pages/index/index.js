"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      indicatorDots: false,
      autoplay: true,
      interval: 5e3,
      duration: 500,
      images: [
        "/static/img/1.png",
        "/static/img/2.png",
        "/static/img/3.png"
      ],
      current: 0
    };
  },
  onLoad() {
  },
  methods: {
    onSwiperChange(e) {
      this.current = e.detail.current;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.images, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args)),
    g: common_vendor.f($data.images, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n($data.current === index ? "active" : "")
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
