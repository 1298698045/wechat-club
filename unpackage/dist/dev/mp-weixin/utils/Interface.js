"use strict";
const Interface = {
  activity: {
    // list: "/api/activitie/GetPageList",
    recordList: "/api/activitie/GetPageList",
    list: "/api/activitie/getActivitys",
    recommend: "/api/activitie/getRecommends",
    // 获取推荐活动列表
    detail: "/api/activitie/getById",
    signPeoples: "/api/activitieLessonSignIn/getListByActivitieId"
    // 获取报名列表
  },
  category: "/api/itemCategory/GetList",
  login: "/api/members/Login",
  member: {
    list: "/api/members/GetPageList"
    // 成员信息获取
  },
  order: {
    list: "/api/orders/getMyOrderList"
  },
  course: {
    list: "/api/courses/getCourses"
  },
  comment: {
    upload: "/api/comment/upload",
    add: "/api/comment",
    list: "/api/comment/getPageList"
  }
};
exports.Interface = Interface;
