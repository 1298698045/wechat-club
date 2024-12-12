const BASE_URL = "http://47.96.15.8:9006";
const TIMEOUT = 5000;
const request = (method, url, data) => {
	let token = uni.getStorageSync('token');
	
	let header = {
		'Content-Type': "application/json"
	};
	if(token){
		header['token'] = token;
	}
	
	return new Promise((resolve, reject)=>{		
		uni.request({
			url: `${BASE_URL}${url}`,
			data: data,
			method: method,
			// header:{
			// 	'Content-Type': "application/json",
			// 	'token': token
			// 	// 'Content-Type': 'application/x-www-form-urlencoded'
			// },
			header: header,
			timeout: TIMEOUT,
			success(res) {
				resolve(res.data);
			},
			fail(error) {
				console.log("error", error);
			}
		})
	})
}

export const get = (url, data) => {
	return request("GET", url, data);
};
export const post = (url, data) => {
	return request("POST", url, data);
};
export const put = (url, data) => {
	return request("PUT", url, data);
};