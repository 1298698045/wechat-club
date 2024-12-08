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
    const id = common_vendor.ref("");
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const data = common_vendor.reactive({
      isExpand: false,
      detail: {},
      currentImg: ""
    });
    const { isExpand, detail, currentImg } = common_vendor.toRefs(data);
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const handleExpand = () => {
      data.isExpand = !data.isExpand;
    };
    common_vendor.onLoad((options) => {
      console.log("options", options);
      id.value = options.id;
      getDetail();
    });
    const getDetail = () => {
      utils_request.get(utils_Interface.Interface.activity.detail, {
        id: id.value
      }).then((res) => {
        data.detail = res.data;
        let currentImgData = data.detail.activitiePictures.find((row) => row.isRecommend == true);
        let currentImg2 = "";
        if (currentImgData) {
          currentImg2 = currentImgData.fileLocation;
        }
        data.currentImg = currentImg2;
      });
    };
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
    const isToken = () => {
      let token = common_vendor.index.getStorageSync("token");
      return token ? true : false;
    };
    const handleSignup = () => {
      if (!isToken()) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请先完善用户信息",
          showCancel: false,
          success(res) {
            if (res.confirm == true) {
              common_vendor.index.navigateTo({
                url: "/pages/my/personInfo/index"
              });
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(currentImg),
        b: common_vendor.t(common_vendor.unref(detail).price),
        c: common_vendor.t(common_vendor.unref(detail).name),
        d: common_vendor.p({
          type: "redo",
          color: "#fff"
        }),
        e: common_vendor.o(handleShare),
        f: common_vendor.t(common_vendor.unref(detail).address),
        g: common_vendor.p({
          type: "location",
          color: "#fff"
        }),
        h: common_vendor.t(common_vendor.unref(detail).address),
        i: common_vendor.o(handleLocation),
        j: common_vendor.t(common_vendor.unref(common_vendor.hooks)(common_vendor.unref(detail).startTime).format("MM")),
        k: common_vendor.t(common_vendor.unref(common_vendor.hooks)(common_vendor.unref(detail).startTime).format("DD")),
        l: common_vendor.t(weekName(common_vendor.unref(detail).startTime)),
        m: common_vendor.t(common_vendor.unref(common_vendor.hooks)(common_vendor.unref(detail).startTime).format("hh:mm")),
        n: common_vendor.t(common_vendor.unref(common_vendor.hooks)(common_vendor.unref(detail).endTime).format("hh:mm")),
        o: !common_vendor.unref(isExpand)
      }, !common_vendor.unref(isExpand) ? {
        p: common_vendor.p({
          type: "down"
        })
      } : {
        q: common_vendor.p({
          type: "up"
        })
      }, {
        r: common_vendor.o(handleExpand),
        s: !common_vendor.unref(isExpand)
      }, !common_vendor.unref(isExpand) ? {
        t: common_vendor.f([1, 2, 3, 4, 5, 6, 7, 8], (item, k0, i0) => {
          return {
            a: item
          };
        })
      } : {
        v: common_vendor.f([1, 2, 3, 4, 5, 6, 7, 8], (item, k0, i0) => {
          return {
            a: "f6d487c6-4-" + i0,
            b: item
          };
        }),
        w: common_vendor.p({
          type: "person",
          color: "#db7e9e"
        })
      }, {
        x: common_vendor.t(common_vendor.unref(detail).description),
        y: common_vendor.o(handleSignup)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6d487c6"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
