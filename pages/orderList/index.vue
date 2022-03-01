<template>
	<view class="wrap">
		<view class="topTabbar">
			<!-- 一级Tabbar -->
			<view class="oneTabbar">
				<view data-index='0' :class="active==0?'active':''" @click="tabChange">待发货</view>
				<view data-index='1' :class="active==1?'active':''" @click="tabChange">待收货</view>
				<view data-index='2' :class="active==2?'active':''" @click="tabChange">已完成</view>
			</view>
			<!-- 待发货二级Tabbar -->
			<view v-if="active==0" class="waitTabbar">
				<view class="active">全部待发货</view>
				<view class="">仅看可发货</view>
			</view>
		</view>
		<view class="content" :style="active!=0?'padding-top: 108rpx;':''">
			<!-- 待发货 -->
			<view class="waitSendOutWrap" v-if="active==0">
				<view class="goodsItem" v-for="(item,index) in dataList" :key='index'>
					<view class="goodsItem_left" :data-ischecked='item.checked' :data-index="index" @click="checkBoxChange">
						<image :src="item.checked?'https://cdn.51chaidan.com/images/icon/radioagreement1.png':'https://cdn.51chaidan.com/images/icon/radioagreement.png'" mode="widthFix"></image>
					</view>
					<view class="goodsItem_right" @click="$toPage.toPage('orderDetails/index',{},0)">
						<image class="goodsImg" :src="item.image" mode="aspectFill"></image>
						<view class="goodsInfo">
							<text class="goodsName">{{item.name}}</text>
							<view class="">
								<text class="goodsStyle">{{item.type}}</text>
								<text class="goodsSendOutDate">{{item.date}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 待收货 -->
			<view class="waitReceivingWrap" v-else-if="active==1">
				<view class="goodsGroupWrap">
					<view class="goodsItems">
						<view class="goodsItem">
							<view class="goodsItem_right">
								<image class="goodsImg" src="https://mc-1300990269.cos.ap-beijing.myqcloud.com/images/goods/16425794874800_28816.jpg" mode="aspectFill"></image>
								<view class="goodsInfo">
									<text class="goodsName">上古九狐修仙篇 寻找雨露上仙系列盲盒</text>
									<view class="">
										<text class="goodsStyle">雨露小仙</text>
										<text class="goodsSendOutDate">2022-02-15 18:15:56 申请发货</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="goodsSendOutBtnWrap">
						<view class="">查看物流</view>
						<view class="">确认收货</view>
					</view>
				</view>
			</view>
			
			<!-- 已完成 -->
			<view class="finishedWrap" v-else>
				<view class="goodsItem">
					<view class="goodsItem_right">
						<image class="goodsImg" src="https://mc-1300990269.cos.ap-beijing.myqcloud.com/images/goods/16425794874800_28816.jpg" mode="aspectFill"></image>
						<view class="goodsInfo">
							<text class="goodsName">上古九狐修仙篇 寻找雨露上仙系列盲盒</text>
							<view class="">
								<text class="goodsStyle">贝吉塔手办（全一款）</text>
								<text class="goodsSendOutDate">已完成</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> 
		
		<!-- 底部发货 -->
		<view class="footer position-sticky" v-if="active==0">
			<view class="checkAll" data-ischeckedall='true' @click="checkBoxChange">
				<image :src="isCheckedAll?'https://cdn.51chaidan.com/images/icon/radioagreement1.png':'https://cdn.51chaidan.com/images/icon/radioagreement.png'" mode="widthFix"></image>
				<text>全选</text>
			</view>
			<view class="footerRightWrap">
				<view class="selectionInfo">
					<view class="num">已选{{selectedGoodsNum}}个</view>
					<view class="">
						<text>需支付运费15元</text>
						<image src="https://cdn.51chaidan.com/images/icon/explain.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="sendOutBtn" @click="toggleAddressAffirmMask">确认发货</view>
			</view>
		</view>
	
		<!-- 弹框部分 -->
		<!-- ------收货地址确认弹框------- -->
		<view class="mask" v-if="isAddressAffirm" @touchmove.stop.prevent="moveHandle" @click="toggleAddressAffirmMask">
			<view class="addressConfirmBox" @click="true">
				<text class="title">收货地址确认</text>
				<view class="confirmInfo">
					<view class="addressInfo">
						<image class="addressIcon" src="https://cdn.51chaidan.com/images/icon/icon_address2.png" mode="widthFix"></image>
						<view class="peopleInfo">
							<view class="name">
								<text>郑先生</text><text>132612345678</text>
							</view>
							<text class="address">北京北京市朝阳区胜古南里128号楼三单805</text>
						</view>
						<image class="arrowsIcon" src="https://cdn.51chaidan.com/images/icon/icon_in.png" mode="widthFix"></image>
					</view>
					<view class="isPinkageWrap">
						<view class="">
							<text>还差2件商品包邮</text>
							<text class="cdTxt">去凑单></text>
						</view>
						<view class="">运费8元</view>
					</view>
					<view class="payFreightBtn">
						支付8元运费
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { yifanshangList } from '../../utils/api.js';
	var util = require('../../utils/util.js');
	export default {
		data() {
			return {
				active:0, 
				dataList:[
					{
						image:'https://mc-1300990269.cos.ap-beijing.myqcloud.com/images/goods/16425794874800_28816.jpg',
						name:'上古九狐修仙篇 寻找雨露上仙系列盲盒',
						type:'雨露小仙',
						id:0,
						date:'请在2月8日前发货'
					},
					{
						image:'https://mc-1300990269.cos.ap-beijing.myqcloud.com/images/goods/16425794874800_28816.jpg',
						name:'上古九狐修仙篇 寻找雨露上仙系列盲盒',
						type:'雨露小仙',
						id:1,
						date:'请在2月8日前发货'
					},
					{
						image:'https://mc-1300990269.cos.ap-beijing.myqcloud.com/images/goods/16425794874800_28816.jpg',
						name:'上古九狐修仙篇 寻找雨露上仙系列盲盒',
						type:'雨露小仙',
						id:2,
						date:'请在2月8日前发货'
					},
				],
				selectedGoods:[],   //选中的商品
				isCheckedAll:false,   //是否是全选
				selectedGoodsNum:0,    //已选商品数量
				isAddressAffirm:false,   //地址确认弹框
			};
		},
		onLoad() {
			let that = this;
		},
		methods: {
			moveHandle(){},
			// tab切换
			tabChange(e) {
				let index = e.currentTarget.dataset.index;
				this.active=index;
			},
			// 多选框改变
			checkBoxChange(e){
				let index = e.currentTarget.dataset.index;
				let ischecked = e.currentTarget.dataset.ischecked;
				let ischeckedall = e.currentTarget.dataset.ischeckedall || false;
				if(!ischeckedall){  //单选
					if(ischecked){
						this.$set(this.dataList[index],'checked',false);
						for(let i=0;i<this.selectedGoods.length;i++){
							if(this.selectedGoods[i].id == this.dataList[index].id){
								this.selectedGoods.splice(i,1);
							}
						}
						this.isCheckedAll=false;
					}else{
						this.$set(this.dataList[index],'checked',true);
						this.selectedGoods.push(this.dataList[index]);
					}
				}else{     //全选
					if(this.isCheckedAll){
						for(let i=0;i<this.dataList.length;i++){
							this.$set(this.dataList[i],'checked',false);
							this.selectedGoods = [];
						}
					}else{
						for(let i=0;i<this.dataList.length;i++){
							if(!this.dataList[i].checked){
								this.$set(this.dataList[i],'checked',true);
								this.selectedGoods.push(this.dataList[i]);
							}
						}
					}
					this.isCheckedAll=!this.isCheckedAll;
				}
				this.selectedGoodsNum=this.selectedGoods.length;
				console.log(this.selectedGoods)
			},
			toggleAddressAffirmMask(){
				this.isAddressAffirm=!this.isAddressAffirm;
			}
		},
		onPullDownRefresh(){
		
		}
	}
</script>

<style lang="scss">
$bg_color: #f5f6fa;
$fontSize28: 28rpx;
$fontSize24: 24rpx;
* {
	// box-sizing: border-box;
}
.mask{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
	z-index: 11;
}
page {
	background-color: $bg_color;
	padding-bottom: 150rpx;
}
.topTabbar {
	width: 100%;
	border-bottom: 2rpx solid $bg_color;
	background-color: #ffffff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	.oneTabbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #101010;
		view {
			width: 33.3333%;
			height: 106rpx;
			line-height: 106rpx;
			text-align: center;
			position: relative;
		}
		.active::after {
			content: '';
			position: absolute;
			width: 32rpx;
			height: 6rpx;
			background: #000000;
			bottom: 28rpx;
			left: 50%;
			margin-left: -16rpx;
		}
	}
	.waitTabbar {
		width: 100%;
		display: flex;
		padding: 0 32rpx 32rpx;
		box-sizing: border-box;
		view {
			display: inline-block;
			height: 34rpx;
			line-height: 34rpx;
			font-size: 22rpx;
			color: #5ca7fe;
			border: 2rpx solid #5ca7fe;
			padding: 0 20rpx;
			border-radius: 6rpx;
			margin-right: 16rpx;
		}
		view:last-child {
			margin-right: 0;
		}
		.active {
			height: 34rpx;
			line-height: 34rpx;
			color: #ffffff;
			background: #5ca7fe;
		}
	}
}

.content{
	padding-top: 176rpx;
	.goodsItem{
		width: 100%;
		padding: 24rpx 34rpx 24rpx 0;
		background: #FFFFFF;
		box-sizing: border-box;
		display: flex;
		border-bottom: 2rpx solid $bg_color;
		.goodsItem_left{
			width: 112rpx;
			display: flex;
			align-items: center;
			image{
				width: 38rpx;
				height: auto;
				margin: 0 auto;
				display: block;
			}
		}
		.goodsItem_right{
			width: 604rpx;
			display: flex;
			.goodsImg{
				width: 172rpx;
				height: 172rpx;
				border-radius: 10rpx;
			}
			.goodsInfo{
				width: 432rpx;
				height: 100%;
				padding-left: 18rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction:column;
				justify-content: space-between;
				.goodsName{
					font-size: $fontSize28;
					color: #101010;
				}
				view{
					text{
						display: block;
					}
					.goodsStyle{
						font-size: $fontSize24;
						color: #FF2742;
						margin-bottom: 10rpx;
					}
					.goodsSendOutDate{
						font-size: $fontSize24;
						color: #1F6A1E;
					}
				}
				
			}
		}
	}
	.waitReceivingWrap{
		.goodsGroupWrap{
			background: #FFFFFF;
			margin-top: 20rpx;
			.goodsItem{
				padding: 24rpx 34rpx 0 34rpx;
				border-bottom: none;
				.goodsItem_right{
					width: 100%;
					.goodsInfo{
						width: 510rpx;
					}
				}
			}
			.goodsSendOutBtnWrap{
				width: 100%;
				padding: 40rpx 34rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
				view{
					width: 200rpx;
					height: 64rpx;
					background: #5CA7FE;
					font-size: $fontSize28;
					color: #FFFFFF;
					border-radius: 10rpx;
					line-height: 64rpx;
					text-align: center;
					margin-right: 20rpx;
				}
				view:last-child{
					margin-right: 0;
				}
			}
		}
		.goodsGroupWrap:first-child{
			margin-top: 0;
		}
	}
	.finishedWrap{
		.goodsItem{
			padding: 24rpx 34rpx 24rpx 34rpx;
			.goodsItem_right{
				width: 100%;
				.goodsInfo{
					width: 510rpx;
				}
			}
		}
	}
}
.footer{
	width: 100%;
	position: fixed;
	bottom: calc(var(--window-bottom));
	left: 0;
	background: #FFFFFF;
	padding: $fontSize28 30rpx $fontSize28 40rpx;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	.checkAll{
		display: flex;
		align-items: center;
		image{
			width: 38rpx;
			height: auto;
			margin-right: 12rpx;
		}
		text{
			display: block;
			font-size: $fontSize28;				
			color: #101010;
		}
	}
	.footerRightWrap{
		display: flex;
		.selectionInfo{
			margin-right: 30rpx;
			.num{
				display: block;
				font-size: $fontSize28;
				color: #909090;
				text-align: right;
			}
			view{
				display: flex;
				align-items: center;
				justify-content: space-between;
				text{
					font-size: $fontSize24;
					color: #101010;
					margin-right: 12rpx;
				}
				image{
					width: 34rpx;
					height: auto;
				}
			}
		}
		.sendOutBtn{
			width: 220rpx;
			height: 80rpx;
			font-size: $fontSize28;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
			border-radius: 10rpx;
			background: #5CA7FE;
		}
	}
}
.addressConfirmBox{
	width: 100%;
	position: fixed;
	left: 0;
	bottom: calc( var(--window-bottom));
	background-color: #FFFFFF;
	border-top-left-radius: 40rpx;
	border-top-right-radius: 40rpx;
	padding-bottom: 24rpx;
	.title{
		width: 100%;
		height: 100rpx;
		display: block;
		line-height: 100rpx;
		text-align: center;
	}
	.confirmInfo{
		padding: 0 24rpx;
		box-sizing: border-box;
		.addressInfo{
			width: 100%;
			background: #F5F6FA;
			border-radius: 14rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 22rpx 0;
			.addressIcon{
				width: 40rpx;
				height: auto;
				margin: 0 25rpx;
			}
			.arrowsIcon{
				width: 24rpx;
				height: auto;	
				margin: 0 20rpx;
			}
			text{
				font-size: $fontSize28;
			}
			.name{
				text{
					margin-right: 44rpx;
				}
			}
			.address{
				color: #909090;
			}
		}
		.isPinkageWrap{
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				font-size: $fontSize24;
				color: #101010;
			}
			.cdTxt{
				color: #5CA7FE;
				margin-left: 22rpx;
			}
		}
		.payFreightBtn{
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 10rpx;
			background: #5CA7FE;
			text-align: center;
			font-size: $fontSize28;
			color: #FFFFFF;
		}
	}
}
</style>
