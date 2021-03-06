const toPage = function(url, data, num) {
	// url参数拼接
	url = '/pages/'+url+(url.indexOf('?') < 0 ? '?' : '&') + param(data)
	if(parseInt(num) == 0){
		uni.navigateTo({
			url:url
		})
	}else if(parseInt(num) == 1){
		uni.redirectTo({
			url:url
		})
	}
	else if(parseInt(num) == 2){
		uni.switchTab({
			url:url
		})
	}
	
}

// 返回上一页
const navBack = function(){
	uni.navigateBack();
}

// 格式化参数对象
function param(data) {
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(value)
	}
	return url ? url.substring(1) : ''
}

export{
	toPage,
	navBack
}