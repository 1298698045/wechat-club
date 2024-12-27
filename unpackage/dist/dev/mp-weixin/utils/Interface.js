"use strict";
const Interface = {
  activity: {
    // list: "/api/activitie/GetPageList",
    recordList: "/api/activitie/GetPageList",
    list: "/api/activitie/getActivitys",
    recommend: "/api/activitie/getRecommends",
    // 获取推荐活动列表
    detail: "/api/activitie/getById",
    signPeoples: "/api/activitieLessonSignIn/getListByActivitieId",
    // 获取报名列表
    getMyStateCode: "/api/activitieLessonSignIn/getMyStateCode",
    sign: "/api/activitie/ActivitieSignUp"
  },
  category: "/api/itemCategory/GetList",
  login: "/api/members/Login",
  member: {
    list: "/api/members/GetPageList",
    // 成员信息获取
    detail: "/api/members/getInfo",
    editUserInfo: "/api/members/EditPersonalInfo"
  },
  order: {
    list: "/api/orders/getMyOrderList"
  },
  course: {
    list: "/api/courses/getCourses",
    detail: "/api/courses/getById",
    signPeoples: "/api/courseSignUpDetail/getMyStateCode",
    // 获取报名列表
    getMyStateCode: "/api/activitieLessonSignIn/getMyStateCode"
  },
  comment: {
    upload: "/api/comment/upload",
    add: "/api/comment",
    list: "/api/comment/getPageList"
  },
  tourism: {
    list: "/api/travels/getTravels",
    detail: "/api/travels/getById",
    signPeoples: "/api/travelsLessonSignIn/getListByTravelId",
    // 获取报名列表
    getMyStateCode: "/api/travelsLessonSignIn/getMyStateCode"
  },
  uploadUrl: "http://47.96.15.8:9006",
  // uploadUrl: "http://182.92.73.72:9006",
  create: "/api/orders/create",
  // 生成订单
  sign: "/api/common/signIn",
  // 扫码签到
  memberlevels: "/api/memberlevels/GetPageList"
  // 会员等级操作
};
exports.Interface = Interface;
