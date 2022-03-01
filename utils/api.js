import { apiResquest } from './http.js'
//一番赏列表
export const yifanshangList = (query) => {
	return apiResquest({
		url: 'spread.php?mod=yifanshang&operation=list',
		method: 'GET',
		query: {...query}
	})
}
//一番赏详情
export const yifanshangInfo = (query) => {
	return apiResquest({
		url: 'spread.php?mod=yifanshang&operation=info',
		method: 'GET',
		query: {...query}
	})
}


//获取签名
// export const wxGetJssdkConfig = (query) => {
// 	return apiResquest({
// 		url: 'wx/get-jssdk-config',
// 		method: 'POST',
// 		query: {...query}
// 	})
// }



//GET 请求案例可以传递参数也可以不传递
// export const validateCode  = (query) => {
// 	let str = query
// 	return apiResquest({
// 		url: `您的API地址 ?${str}`,
// 		method: 'GET'
// 	})
// }