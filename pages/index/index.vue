<template>
	<view class="content">
		<view class="classifyTab">
		  <scroll-view 
			scroll-x="true" 
			style="width: 100%;height: 100%;white-space: nowrap;" 
			scroll-with-animation="true" 
			:scroll-left='scrollleft'
			>
				<view 
				v-for="(item,index) in classifyList"
				:key="index" 
				:id="'ele'+index" 
				:class="'classifyItem '+[classifyIndex == index?'active':'']"
				:data-index="index" 
				:data-name="item.name" 
				@click="classifyChange">
				{{item.name}}
				</view>
		  </scroll-view>
		</view>
		<view class="content" style='padding:0 0 180rpx 0;'>
			<block v-for="(item,index) in datalist" :key="index">
				<view v-if="classifyName == '' || item.classifyName == classifyName" class="card specialCard">		
					<view class="cardTbox" style="position:relative;">
						<image class="pic" :src="item.cover" mode="aspectFill"></image>
					</view>
					<view class="progress-box">
						<progress :percent="(item.suplusGoods/item.limitGoods)*100" :color="(item.suplusGoods/item.limitGoods)*100 === 100?'#6FBE0D':(item.suplusGoods/item.limitGoods)*100 < 100 && (item.suplusGoods/item.limitGoods)*100 > 50?'#FEB51D':'#ff2742'" backgroundColor="#cccccc" stroke-width='12' active duration="5"/>
						<view style="padding-left:15rpx;">
							<block v-if='item.status != 1'>剩余：{{item.suplusGoods}}</block>
							<block v-else-if='item.nameSuffix'>{{item.nameSuffix}}</block>
						</view>
					</view>
					<view class="cardBbox"> 
						<view class="price">
							<text>￥</text>{{item.shopPrice}}
							<!-- <view v-if='{{item.list_arr[0].status == 1}}' class="subList" catchtap="subfuncap" :data-id='item.list_arr[0].id'>开售订阅</view> -->
						</view>
						<view class="title">{{item.name}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {yifanshangList} from '../../utils/api.js'
	var util = require('../../utils/util.js')
	export default {
		data() {
			return {
				title: 'Hello',
				classifyList:[],
				classifyIndex:0,
				scrollleft:0,
				classifyName:'',
				datalist:[
					{
						"name": "Little James 一番赏",
						"shopPrice": "39",
						"classifyName": "官方出品",
						"sort_order": "1644377222",
						"id": "509467",
						"haveData": true,
						"status": "2",
						"adesc": "",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1640596283.jpg",
						"lottoBackGround": null,
						"limitGoods": 105,
						"suplusGoods": 20,
						"uuid_activity_id": "1639623650_623",
						"flagshipArr": [],
						"isScratch": false,
						"isFlagship": false
					}, {
						"shopPrice": "58",
						"classifyName": "七龙珠",
						"id": "459882",
						"name": "ドラゴンボール VSオムニバス超-预计22年2月开售",
						"nameSuffix": "预计22年2月开售",
						"haveData": true,
						"status": "1",
						"sort_order": "1645001293",
						"adesc": "七龙珠",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1629527268.jpg",
						"lottoBackGround": null,
						"limitGoods": 10,
						"suplusGoods": 10,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}, {
						"shopPrice": "58",
						"classifyName": "宝可梦",
						"sort_order": "1644992221",
						"id": "508402",
						"name": "宝可梦 晶灿钻石 明亮珍珠",
						"nameSuffix": "预计22年2月开售",
						"haveData": true,
						"status": "2",
						"adesc": "宝可梦",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1640869899.jpg",
						"lottoBackGround": null,
						"limitGoods": 66,
						"suplusGoods": 66,
						"flagshipArr": [],
						"isScratch": false,
						"isFlagship": false
					}, {
						"classifyName": "航海王",
						"sort_order": "1644989767",
						"id": "495668",
						"name": "航海王 大海賊百景-预计22年3月开售",
						"nameSuffix": "预计22年3月开售",
						"haveData": true,
						"status": "1",
						"adesc": "航海王",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1634290191.jpg",
						"lottoBackGround": null,
						"shopPrice": "59",
						"limitGoods": 11,
						"suplusGoods": 11,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}, {
						"classifyName": "七龙珠",
						"id": "507596",
						"name": "龙珠BACKTOTHEFILM",
						"nameSuffix": "预计22年3月开售",
						"haveData": true,
						"status": "2",
						"sort_order": "1644966361",
						"adesc": "七龙珠",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1622189913.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 80,
						"suplusGoods": 80,
						"flagshipArr": [],
						"isScratch": false,
						"isFlagship": false
					}, {
						"classifyName": "宝可梦",
						"id": "459881",
						"name": "宝可梦 Happiness room collection-预计22年2月开售",
						"nameSuffix": "预计22年2月开售",
						"haveData": true,
						"status": "1",
						"sort_order": "1644950394",
						"adesc": "宝可梦",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1629526673.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 7,
						"suplusGoods": 7,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}, {
						"classifyName": "罗小黑",
						"sort_order": "1644946022",
						"id": "509700",
						"name": "航海王x罗小黑战记-现货",
						"nameSuffix": "现货",
						"haveData": true,
						"status": "2", 
						"adesc": "罗小黑",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1642676884.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 66,
						"suplusGoods": 66,
						"isScratch": false,
						"isFlagship": false,
						"flagshipArr": []
					}, {
						"classifyName": "七龙珠",
						"sort_order": "1644927094",
						"id": "459021",
						"name": "龙珠 SUPER DRAGONBALL HEROES 3rd MISSION-预计3月开售",
						"nameSuffix": "预计3月开售",
						"haveData": true,
						"status": "1",
						"adesc": "七龙珠",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1629019812.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 80,
						"suplusGoods": 80,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}, {
						"classifyName": "七龙珠",
						"sort_order": "1644927094",
						"id": "459021",
						"name": "龙珠 SUPER DRAGONBALL HEROES 3rd MISSION-预计3月开售",
						"nameSuffix": "预计3月开售",
						"haveData": true,
						"status": "1",
						"adesc": "七龙珠",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1629019812.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 80,
						"suplusGoods": 80,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}, {
						"classifyName": "七龙珠",
						"sort_order": "1644927094",
						"id": "459021",
						"name": "龙珠 SUPER DRAGONBALL HEROES 3rd MISSION-预计3月开售",
						"nameSuffix": "预计3月开售",
						"haveData": true,
						"status": "1",
						"adesc": "七龙珠",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1629019812.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 80,
						"suplusGoods": 80,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}, {
						"classifyName": "七龙珠",
						"sort_order": "1644927094",
						"id": "459021",
						"name": "龙珠 SUPER DRAGONBALL HEROES 3rd MISSION-预计3月开售",
						"nameSuffix": "预计3月开售",
						"haveData": true,
						"status": "1",
						"adesc": "七龙珠",
						"cover": "https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1629019812.jpg",
						"lottoBackGround": null,
						"shopPrice": "58",
						"limitGoods": 80,
						"suplusGoods": 80,
						"isFlagship": false,
						"flagshipArr": [],
						"isScratch": false
					}
				]
				
			}
		},
		onLoad() {
			let that = this;
			uni.getSystemInfo({
				success: function (res) {
					that.windowWidth = res.windowWidth;
				}
			});
			this.yifanshangList();//一番赏列表
		},
		methods: {
			// 导航切换
			classifyChange(e){
				let that = this;
				let index = e.currentTarget.dataset.index;
				let name = e.currentTarget.dataset.name;
				let ele = '#ele' + index;
				this.classifyIndex = index;
				this.classifyName = index != 0?name:'';
				this.loadprompt = false;
				//创建节点选择器
				var query = uni.createSelectorQuery();
				//选择id
				query.select(ele).boundingClientRect();
				query.exec(function(res) {
				  that.scrollleft = e.currentTarget.offsetLeft - that.windowWidth/2 + (res[0].width/2);
				})
			},
			//一番赏列表
			yifanshangList() {
				uni.showLoading({
					title: '加载中'
				});
				yifanshangList().then((res)=>{
					// uni.hideLoading();
					console.log('列表==',res)
					// util.showToast(res.msg,1500);
					this.classifyList = res.List.classifyList;
				}).catch(err => {
					util.showToast(err,1500);
					console.log(err)
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.specialellipsis {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	/* 隐藏滚动条 */
	scroll-view ::-webkit-scrollbar {
	  width: 0;
	  height: 0;
	  color: transparent;
	  display: none;
	}
	.main{
	  /* padding: 0 15rpx 20rpx 15rpx; */
	  /* padding: 0 0 20rpx 0; */
	  overflow: hidden;
	  /* box-sizing: border-box; */
	}
	.content{
		display: block;
		overflow: hidden;
	}
	.rewardswiper swiper{
	 height: 438rpx;
	}
	.classifyTab{
	  width: 100%;
	  height: 80rpx;
	}
	.classifyItem{
	  display: inline-block;
	  padding: 0 15rpx;
	  line-height: 80rpx;
	  font-size: 26rpx;
	  color: #999;
	  box-sizing: border-box;
	}
	.active{
	  color: #000;
	  position: relative;
	}
	.active::before{
	  content: '';
	  position: absolute;
	  bottom: 10rpx;
	  left: 50%;
	  width: 50%;
	  height: 6rpx;
	  background: #000000;
	  transform: translate(-50%, 0);  
	}
	.consumemessage{
	  width: 720rpx;
	  margin: 0 15rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.consumemessage swiper{
	  width: 80%;
	  height: 80rpx;
	}
	.consumemessage .swiper-item>view{
	  height: 80rpx;
	  line-height: 80rpx;
	  font-size: 24rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	
	.card{
	  width: 720rpx;
	  margin: 0 15rpx;
	  box-sizing: border-box;
	  margin-top: 20rpx;
	  box-shadow: 1px 2px 6px #999999;
	  border-radius: 10rpx;
	  overflow: hidden;
	}
	.specialCard{
	  margin: 20rpx 0 0 0;
	  width: 352.2rpx;
	  display: inline-block;
	}
	.specialCard:nth-child(1n){
	  margin-left: 15rpx;
	  float: left;
	}
	.specialCard:nth-child(2n){
	  margin-right: 15rpx;
	  float: right;
	}
	.cardTbox{
	  width: 100%;
	  height: 308rpx;
	  position: relative;
	}
	.cardTbox .serialnum{
	  display: block;
	  position: absolute;
	  top: 6rpx;
	  left: 6rpx;
	  padding: 8rpx;
	  box-sizing: border-box;
	  font-size: 24rpx;
	  color: #fff;
	  background: rgba(0,0,0,.5);
	}
	.cardTbox .pic{
	  width: 100%;
	  height: 308rpx;
	  border-radius: 10rpx 10rpx 0 0;
	}
	.specialCard .cardTbox{
	  height: 150rpx;
	}
	.specialCard .cardTbox .serialnum{
	  font-size: 16rpx;
	}
	.specialCard .cardTbox .pic{
	  height: 150rpx;
	}
	.cardTbox .reward-num{
	  position: absolute;
	  top: 6rpx;
	  right: 6rpx;
	  padding: 8rpx 12rpx;
	  box-sizing: border-box;
	  background: rgba(0,0,0,.5);
	}
	.cardTbox .reward-num view{
	  height: 40rpx;
	  color: #fff;
	  font-size: 24rpx;
	  line-height: 40rpx;
	  display: block;
	  opacity: .8;
	}
	.specialCard .reward-num view{
	  height: 22rpx;
	  font-size: 16rpx;
	  line-height: 22rpx;
	}
	.progress-box{
	  position: relative;
	  /* border-radius: 0 0 10rpx 10rpx; */
	  overflow: hidden;
	}
	.progress-box view{
	  display: inline-block;
	  height: 24rpx;
	  line-height: 24rpx;
	  position: absolute;
	  top: 0;font-size: 20rpx;
	  color: #fff;
	}
	.cardBbox{
	  width: 100%;
	  padding: 0 10rpx;
	  box-sizing: border-box;
	  display: flex;
	  justify-content: space-between;
	}
	.cardBbox view{
	  height: 70rpx;
	  line-height: 70rpx;
	  color: #333;
	  font-size: 24rpx;
	  /* margin-top: 10rpx; */
	}
	.specialCard .cardBbox{
	  display: block;
	  padding: 10rpx 10rpx 16rpx 10rpx;
	  box-sizing: border-box;
	}
	.specialCard .cardBbox .price{
	  color: #d64650;
	  height: 40rpx;
	  line-height: 40rpx;
	}
	.specialCard .cardBbox .price text{
	  font-size: 20rpx;
	}
	.specialCard .cardBbox .price{
	  font-size: 32rpx;
	}
	.specialCard .cardBbox .title{
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  height: 32rpx;
	  line-height: 32rpx;
	}
	.cardBbox .subList{
	  padding:0 30rpx;
	  height: 40rpx;
	  line-height: 40rpx;
	  border-radius: 70rpx;
	  color:#fff;
	  font-size:24rpx;
	  background:#eeae19;
	  float: right;
	}
	/*   单行  */
	.specialellipsis{
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap;  
	}
	
	.orderMangAddressARL{
	  width: 580rpx;
	  height: 610rpx;
	  background: #fff;
	  border-radius: 16rpx;
	}
	.SFAHEad{
	  padding: 30rpx;
	  font-size: 28rpx;
	  text-align: center;
	}
	.SFAScroll{
	  width: 500rpx;
	  padding: 0 20rpx;
	  height: 360rpx;
	  display: block;
	  margin: auto;
	  font-size: 28rpx;
	}
	.SFAHBottom{
	  background: #5CA7FE;
	  height: 78rpx;
	  line-height: 78rpx;
	  text-align: center;
	  color: #fff;
	  font-size: 28rpx;
	  width: 500rpx;
	  margin: 30rpx auto 0;
	  border-radius: 78rpx;
	}
	
	.SFARBbo{
	  background: #7298C8;
	  width:140rpx;
	  height:160rpx ;
	  border-radius: 16rpx;
	  position: fixed;
	  bottom: 120rpx;
	  right: 18rpx;
	  z-index: 10;
	}
	.SFARBboHead{
	  padding: 6rpx;
	  text-align: center;
	  font-size: 18rpx;
	  color: #fff;
	}
	.SFARBboHeadCon{
	  background: #FFF;
	  width: 120rpx;
	  height: 36rpx;
	  line-height: 36rpx;
	  text-align: center;
	  font-size: 18rpx;
	  color: #7298C8;
	  border-radius: 10rpx;
	  margin:0 auto 7rpx;
	}
</style>
