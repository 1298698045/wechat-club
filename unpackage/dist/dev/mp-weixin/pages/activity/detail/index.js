"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
const stores_authStore = require("../../../stores/authStore.js");
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
    const authStore = stores_authStore.useAuthStore();
    const id = common_vendor.ref("");
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const data = common_vendor.reactive({
      isExpand: false,
      detail: {},
      currentImg: "",
      peopleList: [],
      isCancel: false,
      stateCode: 0,
      isEnd: false,
      isBook: false,
      category: 1
    });
    const { isExpand, detail, currentImg, peopleList, isCancel, stateCode, isEnd, isBook, category } = common_vendor.toRefs(data);
    const weekName = (date) => {
      const day = common_vendor.hooks(date).day();
      return weeks[day];
    };
    const handleExpand = () => {
      data.isExpand = !data.isExpand;
    };
    const getStatus = () => {
      utils_request.get(utils_Interface.Interface.activity.getMyStateCode, {
        id: id.value
      }).then((res) => {
        data.stateCode = res.data.stateCode;
      });
    };
    common_vendor.onLoad((options) => {
      console.log("options", options);
      id.value = options.id;
      if (options.invitee) {
        let invitee = options.invitee;
        authStore.setInvitee(invitee);
      }
      getDetail();
      getSignUpPeoples();
    });
    common_vendor.onShow(() => {
      if (isToken()) {
        getStatus();
      }
    });
    const getDetail = () => {
      utils_request.get(utils_Interface.Interface.activity.detail, {
        id: id.value
      }).then((res) => {
        var _a;
        data.detail = res.data;
        let currentImgData = data.detail.pictures.find((row) => row.isRecommend == true);
        let currentImg2 = "";
        if (currentImgData) {
          currentImg2 = utils_Interface.Interface.uploadUrl + currentImgData.fileLocation;
        }
        if (currentImgData == void 0) {
          if (data.detail.pictures && data.detail.pictures.length) {
            currentImg2 = utils_Interface.Interface.uploadUrl + ((_a = data.detail.pictures[0]) == null ? void 0 : _a.fileLocation);
          }
        }
        data.currentImg = currentImg2;
        const then = common_vendor.hooks(data.detail.cancelTime);
        const isBefore = common_vendor.hooks().isBefore(then);
        console.log("isBefore", isBefore);
        data.isCancel = isBefore;
        data.isEnd = common_vendor.hooks().isAfter(data.detail.endTime);
        console.log("isEnd", data.isEnd);
      });
    };
    const getSignUpPeoples = () => {
      utils_request.get(utils_Interface.Interface.activity.signPeoples, {
        id: id.value
      }).then((res) => {
        data.peopleList = res.data;
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
      let latitude = data.detail.latitude || 39.904599;
      let longitude = data.detail.longitude || 116.407001;
      common_vendor.index.openLocation({
        latitude,
        longitude,
        scale: 18,
        // 缩放级别，范围为5-18，默认值为18
        name: "当前位置",
        // 地点名称，可选
        address: data.detail.address,
        // 地址描述，可选
        success: function() {
          console.log("打开地图成功");
        },
        fail: function(err) {
          console.error("打开地图失败", err);
        }
      });
    };
    common_vendor.onShareAppMessage(() => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: "自定义转发标题"
          });
        }, 2e3);
      });
      return {
        title: "自定义转发标题",
        path: "/pages/activity/detail/index?id=" + data.id + "&invitee=" + authStore.invitationCode,
        promise
      };
    });
    const isToken = () => {
      let token = common_vendor.index.getStorageSync("token");
      return token ? true : false;
    };
    const handleSignup = () => {
      if (data.isBook)
        return;
      data.isBook = true;
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
      } else {
        common_vendor.index.showLoading({
          mask: true,
          title: "报名中～"
        });
        let d = {
          id: id.value,
          category: 1
        };
        utils_request.get(utils_Interface.Interface.create, d).then((res) => {
          console.log("res", res);
          let orderInfo = res.data;
          const { appId, nonceStr, paySign, signType, timeStamp } = res.data;
          common_vendor.index.hideLoading();
          common_vendor.index.requestPayment({
            provider: "wxpay",
            appid: appId,
            timeStamp: String(timeStamp),
            nonceStr,
            package: orderInfo.package,
            signType,
            paySign,
            success(res2) {
              data.isBook = false;
              common_vendor.index.showToast({
                title: "报名成功！",
                duration: 3e3,
                icon: "success"
              });
              getDetail();
              getStatus();
            },
            fail(err) {
              console.log("err", err);
              data.isBook = false;
              common_vendor.index.showToast({
                title: "已取消支付",
                duration: 3e3,
                icon: "success"
              });
            }
          });
        });
      }
    };
    const cancelSignup = () => {
      utils_request.get(utils_Interface.Interface.revoke, {
        category: data.category,
        id: id.value
      }).then((res) => {
        common_vendor.index.showToast({
          title: res.message,
          duration: 3e3,
          icon: "success"
        });
        if (res.status == 200) {
          getDetail();
          getStatus();
        }
      });
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
        o: common_vendor.t(common_vendor.unref(detail).currentStudents),
        p: common_vendor.t(common_vendor.unref(detail).maxStudents),
        q: !common_vendor.unref(isExpand)
      }, !common_vendor.unref(isExpand) ? {
        r: common_vendor.p({
          type: "down"
        })
      } : {
        s: common_vendor.p({
          type: "up"
        })
      }, {
        t: common_vendor.o(handleExpand),
        v: !common_vendor.unref(isExpand)
      }, !common_vendor.unref(isExpand) ? {
        w: common_vendor.f(common_vendor.unref(peopleList), (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: index
          };
        })
      } : {
        x: common_vendor.f(common_vendor.unref(peopleList), (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: common_vendor.t(item.userName),
            c: "f6d487c6-4-" + i0,
            d: common_vendor.p({
              type: "person",
              color: item.gender == 0 ? "#db7e9e" : "blue"
            }),
            e: common_vendor.t(item.levelName),
            f: index
          };
        })
      }, {
        y: common_vendor.unref(detail).description,
        z: !isToken() || common_vendor.unref(stateCode) == 0 || common_vendor.unref(isCancel) && common_vendor.unref(stateCode) == 1
      }, !isToken() || common_vendor.unref(stateCode) == 0 || common_vendor.unref(isCancel) && common_vendor.unref(stateCode) == 1 ? common_vendor.e({
        A: !isToken() || common_vendor.unref(stateCode) == 0
      }, !isToken() || common_vendor.unref(stateCode) == 0 ? {
        B: common_vendor.t(common_vendor.unref(common_vendor.hooks)(common_vendor.unref(detail).cancelTime).format("YYYY-MM-DD hh:mm")),
        C: common_vendor.o(handleSignup)
      } : common_vendor.unref(isCancel) && common_vendor.unref(stateCode) == 1 ? {
        E: common_vendor.o(cancelSignup)
      } : {}, {
        D: common_vendor.unref(isCancel) && common_vendor.unref(stateCode) == 1
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6d487c6"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
