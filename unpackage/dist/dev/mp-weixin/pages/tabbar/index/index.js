"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const stores_counter = require("../../../stores/counter.js");
const utils_Interface = require("../../../utils/Interface.js");
const utils_request = require("../../../utils/request.js");
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
    const commonRef = common_vendor.ref(null);
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
          id: 0,
          name: "活动"
        },
        {
          id: 1,
          name: "评价"
        }
        // {
        // 	name: "周期表"
        // }
      ],
      currentTab: 0,
      backColor: "transparent",
      color: "#fff",
      statusBarHeight: 0,
      isTabsFixed: false,
      top: 0,
      listData: [],
      members: [],
      memberNumber: 0
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
      top,
      listData,
      members,
      memberNumber
    } = common_vendor.toRefs(data);
    const onSwiperChange = (e) => {
      data.current = e.detail.current;
    };
    const getMemberList = (e) => {
      utils_request.get(utils_Interface.Interface.member.list, {
        page: 1,
        rows: 5
      }).then((res) => {
        data.members = res.data;
        data.memberNumber = res.total;
      });
    };
    getMemberList();
    const getRecommends = () => {
      utils_request.get(utils_Interface.Interface.activity.recommend, {}).then((res) => {
        data.listData = res.data.map((item) => {
          let currentImgData = item.pictures.find((row) => row.isRecommend == true);
          let currentImg = "";
          if (currentImgData) {
            currentImg = utils_Interface.Interface.uploadUrl + currentImgData.fileLocation;
          }
          item.currentImg = currentImg;
          return item;
        });
      });
    };
    getRecommends();
    const handleTab = (e) => {
      data.currentTab = e.id;
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
        url: "/pages/activity/recordList/index"
      });
    };
    const handleAlbum = () => {
      common_vendor.index.navigateTo({
        url: "/pages/activity/album/index"
      });
    };
    const gotoDiscout = () => {
      common_vendor.index.navigateTo({
        url: "/pages/other/discountRules/index"
      });
    };
    common_vendor.onLoad(() => {
      const windowInfo = common_vendor.index.getWindowInfo();
      console.log("windowInfo", windowInfo);
      data.statusBarHeight = windowInfo.statusBarHeight;
      data.top = windowInfo.statusBarHeight + 44;
    });
    common_vendor.onShow(() => {
      if (commonRef && commonRef.value) {
        commonRef.value.getQuery();
      }
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
    const handleEval = () => {
      common_vendor.index.navigateTo({
        url: "/pages/other/evaluate/index"
      });
    };
    const previewMember = () => {
      common_vendor.index.navigateTo({
        url: "/pages/other/memberInfo/index"
      });
    };
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
        l: common_vendor.t(common_vendor.unref(memberNumber)),
        m: common_vendor.f(common_vendor.unref(members), (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: index
          };
        }),
        n: common_vendor.o(previewMember),
        o: common_vendor.p({
          type: "calendar",
          size: "30",
          color: "#6be8f5"
        }),
        p: common_vendor.p({
          type: "image",
          size: "30",
          color: "#6be8f5"
        }),
        q: common_vendor.o(handleAlbum),
        r: common_vendor.p({
          type: "list",
          size: "30",
          color: "#6be8f5"
        }),
        s: common_vendor.o(goto),
        t: common_vendor.p({
          type: "wallet",
          size: "30",
          color: "#6be8f5"
        }),
        v: common_vendor.o(gotoDiscout),
        w: common_vendor.o(handleTab),
        x: common_vendor.p({
          tabs: common_vendor.unref(tabs)
        }),
        y: common_vendor.unref(isTabsFixed) ? 1 : "",
        z: common_vendor.unref(top) + "px",
        A: common_vendor.unref(currentTab) == 0
      }, common_vendor.unref(currentTab) == 0 ? {} : {}, {
        B: common_vendor.unref(currentTab) == 1
      }, common_vendor.unref(currentTab) == 1 ? {
        C: common_vendor.o(handleEval)
      } : {}, {
        D: common_vendor.unref(currentTab) == 0
      }, common_vendor.unref(currentTab) == 0 ? {
        E: common_vendor.p({
          list: common_vendor.unref(listData)
        })
      } : common_vendor.unref(currentTab) == 1 ? {
        G: common_vendor.sr(commonRef, "184b8d5d-7", {
          "k": "commonRef"
        })
      } : {}, {
        F: common_vendor.unref(currentTab) == 1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-184b8d5d"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
