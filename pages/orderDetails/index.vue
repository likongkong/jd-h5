<template>
	<view class="wrap">
		<view class="topStatusWrap">
			<text>待发货</text>
			<text>请尽快进行手动发货。若您超时未发货，将有可能自动发货至您的默认收货地址</text>
		</view>
		<view class="content">
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
			<view class="goodsPriceWrap">
				<view class="goodsAmount">
					<text>商品金额</text>
					<text>￥59</text>
				</view>
				<view class="discountAmount">
					<text>优惠金额</text>
					<text>￥0</text>
				</view>
				<view class="totalAmount">
					<text></text>
					<text>实付:￥59</text>
				</view>
			</view>
			<view class="orderInfo">
				<view class="orderItemWrap">
					<view>订单编号：<text>202110296319163268</text></view>
					<view class="">
						<text class="copy">复制</text>
					</view>
				</view>
				<view class="orderItemWrap">
					<view>下单时间：<text>2022-01-19 18:43:52</text></view>
					<view class=""></view>
				</view>
				<view class="orderItemWrap">
					<view>付款时间：<text>2022-01-19 18:43:59</text></view>
					<view class=""></view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				发货
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
$bg_color: #f5f6fa;
$fontSize28: 28rpx;
$fontSize24: 24rpx;
page {
	background-color: $bg_color;
	padding-bottom: 150rpx;
}
.topStatusWrap{
	width: 100%;
	height: 200rpx;
	padding: 34rpx 34rpx 0 34rpx;
	box-sizing: border-box;
	background: #FF2742;
	text:first-child{
		font-size: 36rpx;
		color: #FFFFFF;
		display: block;
	}
	text:last-child{
		font-size: 24rpx;
		color: #FFFFFF;
		display: block;
		margin-top: 14rpx;
	}
}
.goodsItem{
	width: 100%;
	padding: 24rpx 34rpx 0 34rpx;
	background: #FFFFFF;
	box-sizing: border-box;
	display: flex;
	border-bottom: 2rpx solid $bg_color;
	border-bottom: none;
	.goodsItem_right{
		width: 100%;
		display: flex;
		.goodsImg{
			width: 172rpx;
			height: 172rpx;
			border-radius: 10rpx;
		}
		.goodsInfo{
			width: 510rpx;
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
.goodsPriceWrap{
	padding: 24rpx 34rpx 36rpx 34rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
	}
	.goodsAmount,.discountAmount{
		text:first-child{
			font-size: $fontSize28;
			color: #909090;
		}
		text:last-child{
			font-size: $fontSize24;
			color: #909090;
		}
	}
	.totalAmount{
		text:last-child{
			font-size: $fontSize28;
			color: #101010;
		}
	}
}
.orderInfo{
	padding: 36rpx 34rpx 36rpx 34rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	margin-top: 16rpx;
	.orderItemWrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		view{
			font-size: $fontSize28;
			color: #909090;
			text{
				color: #101010;
			}
			.copy{
				font-size: $fontSize24;
				display: inline-block;
				background: #F5F6FA;
				text-align: center;
				padding: 2rpx 8rpx;
			}
		}
		view:first-child{
			width: 80%;
		}
		view:last-child{
			width: 20%;
		}
	}
	.orderItemWrap:last-child{
		margin-bottom: 0;
	}
}
.footer{
	width: 100%;
	height: 102rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #FFFFFF;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	.btn{
		width: 220rpx;
		height: 68rpx;
		background: #5CA7FE;
		color: #FFFFFF;
		font-size: $fontSize28;
		text-align: center;
		line-height: 68rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
}
</style>
