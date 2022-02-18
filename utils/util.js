function showToast (title,duration,icon = 'none') {
	uni.showToast({
	    title: title,
		duration: duration,
		icon:icon,
	});
}


/**
 * @param {data} 后端返回的基本配置数据
 * @param {param} 页面传过来的数据
 */
function initAPIs(data,wx) {
	console.log('jweixin==',data)
	wx.config({
        debug: data.debug ,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:data.appId, // 必填，公众号的唯一标识
        timestamp:data.timestamp, // 必填，生成签名的时间戳
        nonceStr:data.nonceStr, // 必填，生成签名的随机串
        signature:data.signature,// 必填，签名，见附录1
        jsApiList: data.jsApiList
    });
	wx.error(function(res){
		console.log('error==',res)
	  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	});
    wx.ready(function () { // 在这里调用 API
        //分享到朋友圈
        wx.updateAppMessageShareData({
            title:'买宠险来宠物e族', // 分享标题
            desc:'宠物有保障，养宠更安心，买一份保险，多一份宠爱，点击购买', // 分享描述
            link: 'http://test-h5.chongwuyizu.com', // 分享链接
            imgUrl: 'http://img.poorfriends.com/tmp%2FQSmBdugv7Lgj2299ea2736c9b2d2a769fd310888e4a3.jpg', // 分享图标
            success: function (){ // 用户确认分享后执行的回调函数
                //alert('分享成功');
            },
            cancel: function (){ // 用户取消分享后执行的回调函数
                //alert('取消分享');
            },
            fail: function(){ // 用户分享失败后执行的回调函数
                //alert('分享失败');
            }
        });
        //分享给朋友
        wx.updateTimelineShareData({
            title:'买宠险来宠物e族', // 分享标题
            desc:'宠物有保障，养宠更安心，买一份保险，多一份宠爱，点击购买', // 分享描述
            link: 'http://test-h5.chongwuyizu.com', // 分享链接
            imgUrl: 'http://img.poorfriends.com/tmp%2FQSmBdugv7Lgj2299ea2736c9b2d2a769fd310888e4a3.jpg', // 分享图标
            success: function (){ // 用户确认分享后执行的回调函数
                //alert('分享成功');
            },
            cancel: function (){ // 用户取消分享后执行的回调函数
                //alert('取消分享');
            },
            fail: function(){ // 用户分享失败后执行的回调函数
                //alert('分享失败');
            }
        });
    })
	
} 


module.exports = {
	showToast,
	initAPIs
}