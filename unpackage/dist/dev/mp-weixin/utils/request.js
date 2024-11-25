"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://47.96.15.8:9006";
const TIMEOUT = 5e3;
const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${url}`,
      data,
      method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: TIMEOUT,
      success(res) {
        resolve(res);
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
exports.get = get;
