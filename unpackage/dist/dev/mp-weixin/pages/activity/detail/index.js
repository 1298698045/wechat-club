"use strict";
const common_vendor = require("../../../common/vendor.js");
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
    const id = common_vendor.ref("");
    const data = common_vendor.reactive({
      isExpand: false
    });
    const { isExpand } = common_vendor.toRefs(data);
    const handleExpand = () => {
      data.isExpand = !data.isExpand;
    };
    common_vendor.onLoad((options) => {
      console.log("options", options);
      id.value = options.id;
    });
    const handleShare = () => {
      console.log("123123");
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    const handleLocation = () => {
      console.log("获取位置信息");
      common_vendor.index.getLocation({
        type: "gcj02",
        // 使用GCJ-02坐标系，适配腾讯地图和微信内置地图
        success: function(res) {
          console.log("定位成功", res);
          const { latitude, longitude } = res;
          common_vendor.index.openLocation({
            latitude,
            longitude,
            scale: 18,
            // 缩放级别，范围为5-18，默认值为18
            name: "当前位置",
            // 地点名称，可选
            address: "你所在的位置",
            // 地址描述，可选
            success: function() {
              console.log("打开地图成功");
            },
            fail: function(err) {
              console.error("打开地图失败", err);
            }
          });
        },
        fail: function(err) {
          console.error("定位失败", err);
        }
      });
    };
    common_vendor.onShareAppMessage(() => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: "自定义转发标题123"
          });
        }, 2e3);
      });
      return {
        title: "自定义转发标题123",
        path: "/pages/activity/detail/index?id=123",
        promise
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "redo",
          color: "#fff"
        }),
        b: common_vendor.o(handleShare),
        c: common_vendor.p({
          type: "location",
          color: "#fff"
        }),
        d: common_vendor.o(handleLocation),
        e: common_vendor.p({
          type: "down"
        }),
        f: !common_vendor.unref(isExpand)
      }, !common_vendor.unref(isExpand) ? {
        g: common_vendor.p({
          type: "down"
        })
      } : {
        h: common_vendor.p({
          type: "up"
        })
      }, {
        i: common_vendor.o(handleExpand),
        j: !common_vendor.unref(isExpand)
      }, !common_vendor.unref(isExpand) ? {
        k: common_vendor.f([1, 2, 3, 4, 5, 6, 7, 8], (item, k0, i0) => {
          return {
            a: item
          };
        })
      } : {
        l: common_vendor.f([1, 2, 3, 4, 5, 6, 7, 8], (item, k0, i0) => {
          return {
            a: "f6d487c6-5-" + i0,
            b: item
          };
        }),
        m: common_vendor.p({
          type: "person",
          color: "#db7e9e"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6d487c6"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
