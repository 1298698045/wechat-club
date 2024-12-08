"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://47.96.15.8:9006";
const TIMEOUT = 5e3;
const request = (method, url, data) => {
  let token = common_vendor.index.getStorageSync("token");
  let header = {
    "Content-Type": "application/json"
  };
  if (token) {
    header["token"] = token;
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
exports.get = get;
exports.post = post;
