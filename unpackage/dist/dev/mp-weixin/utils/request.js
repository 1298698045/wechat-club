"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://taiyouqu.fun";
const TIMEOUT = 5e4;
const request = (method, url, data, type = "") => {
  let token = common_vendor.index.getStorageSync("token");
  let header = {
    "Content-Type": "application/json"
  };
  if (token) {
    header["token"] = token;
  }
  if (type != "") {
    header["Content-Type"] = type;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${url}`,
      data,
      method,
      // header:{
      // 	'Content-Type': "application/json",
      // 	'token': token
      // 	// 'Content-Type': 'application/x-www-form-urlencoded'
      // },
      header,
      timeout: TIMEOUT,
      success(res) {
        resolve(res.data);
      },
      fail(error) {
        console.log("error", error);
      }
    });
  });
};
const get = (url, data) => {
  return request("GET", url, data);
};
const post = (url, data) => {
  return request("POST", url, data);
};
const put = (url, data) => {
  return request("PUT", url, data);
};
exports.get = get;
exports.post = post;
exports.put = put;
