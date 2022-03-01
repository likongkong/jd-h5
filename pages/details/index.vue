<template>
	<view class="ardbox">
		<view class="adhbanner" style="position:relative;">
			<swiper class="adhswiper" circular="true" autoplay="true" interval="3000" duration="450">
				<swiper-item v-for="(item, index) in activity.listBanner" :key="index"><image :src="item" mode="aspectFit" class="adhswiperimg"></image></swiper-item>
			</swiper>
			<view class="adhbannerBox">
				<view class="progress-box">
					<progress
						:percent="(activity.suplusNum / activity.limit_users) * 100"
						:color="
							(activity.suplusNum / activity.limit_users) * 100 === 100
								? '#6FBE0D'
								: (activity.suplusNum / activity.limit_users) * 100 < 100 && (activity.suplusNum / activity.limit_users) * 100 > 50
								? '#FEB51D'
								: '#ff2742'
						"
						backgroundColor="#cccccc"
						stroke-width="12"
						active
						duration="5"
					/>
					<text style="padding-left:15rpx;">
						<block v-if="activity.status != 1">剩余：{{ activity.suplusNum }}</block>
						<block v-else-if="activity.nameSuffix">{{ activity.nameSuffix }}</block>
					</text>
				</view>
			</view>
		</view>
		<view class="adhcontent">
			<view class="adhceve" v-for="(item, index) in goodsdata" @click="jumpposition" :data-ind="index" :key="index" :style="index % 4 == 3 ? 'margin-right:0;' : ''">
				<swiper class="adcswiper" circular="true" autoplay="true" interval="3000" duration="450">
					<swiper-item v-for="(item, index) in item.img_arr" :key="index"><image :src="item" class="adhceveimg" mode="aspectFit"></image></swiper-item>
				</swiper>
				<view class="adhclet">{{ item.gear }}</view>
				<view class="adhcnum" v-if="activity.status != 1">
					<view class="adhcnumbg"></view>
					<view class="adhcnumtxt">{{ item.suplus }}/{{ item.limit }}</view>
				</view>
				<!-- 蒙层 -->
				<view class="adhcevehbg" v-if="item.suplus == 0"></view>
			</view>
		</view>
		<view class="adheadutnum" style="text-align:center;">50元随机获得一款限定周边(最终赏除外)</view>
		<view class="adcspecial">
			<view class="adcweve" id="evepos0" style="height:520rpx;border-top: 4rpx dashed #000;">
				<view class="adcspezzs">
					<view class="adcspezzstxt" style="line-height:60rpx;">最</view>
					<view class="adcspezzstxt">终</view>
					<view class="adcspezzstxt" style="line-height:40rpx;">赏</view>
				</view>
				<view class="adcspenum">共1个</view>
				<view class="adcspename multilineellipsis">{{ finalReward.title }}</view>
				<view class="adcspencxy">
					<block v-if="finalReward.isShowPrice">价值:￥{{ finalReward.shop_price }}</block>
					<block v-else>超稀有!</block>
				</view>
				<view class="adcspenum">买走最后一个周边免费获得</view>
				<view
					class="leaveunused"
					v-if="activity.isOfficial == 2 && (finalReward.cabinetMaxPrice != 0 || finalReward.cabinetMinPrice != 0)"
					@click="jumpOcamcart"
					:data-name="finalReward.title_idle"
					:data-minprice="finalReward.cabinetMinPrice"
					:data-maxprice="finalReward.cabinetMaxPrice"
					:data-goods_id="finalReward.goods_id"
				>
					闲置：
					<text v-if="finalReward.cabinetMinPrice != 0">￥{{ finalReward.cabinetMinPrice }}</text>
					<text v-if="finalReward.cabinetMaxPrice != 0 && finalReward.cabinetMinPrice != 0">-</text>
					<text v-if="finalReward.cabinetMaxPrice != 0">￥{{ finalReward.cabinetMaxPrice }}</text>
				</view>
			</view>
			<view
				class="adcweve flexCenter"
				:style="'border-left: 4rpx dashed #f5f6fa;height:' + finalReward.height < 500 ? 520 : finalReward.height + 'rpx;border-top: 4rpx dashed #000;'"
			>
				<image
					class="adcspecialimg"
					@click="iftrdetailpagen"
					data-index="10000"
					:data-is_buy="finalReward.is_buy"
					:data-goods_id="finalReward.goods_id"
					:src="finalReward.img"
					mode="widthFix"
				></image>
			</view>
		</view>
		<view :class="'flexWrap' + [oddNumber ? ' oddNumber' : '']">
			<view
				v-for="(item, index) in goodsExhibition"
				:key="index"
				:id="'evepos' + (index + 1)"
				class="goods_gear_item"
				:style="item.length > 1 || item[0].is_width ? +'text-align: center;' : 'display:inline-block;' + item[0].is_width ? +'border-top: 4rpx dashed #000;' : ''"
			>
				<view
					class="adcweve"
					v-for="(w, num) in item"
					:key="num"
					:style="w.rightline ? +'border-right: 4rpx dashed #000;' : '' + !item[0].is_width && num < 2 ? +'border-top: 4rpx dashed #000;' : ''"
				>
					<view class="adcweveleft" v-if="w.gear">
						<view class="adcwelbg">
							<view class="adcweltxt" style="line-height:60rpx;">{{ w.gear }}</view>
							<view class="adcweltxt" style="line-height:40rpx;">赏</view>
						</view>
					</view>
					<image
						@click="iftrdetailpagen"
						:data-index="index"
						:data-num="num"
						:data-is_buy="w.is_buy"
						:data-goods_id="w.goods_id"
						class="adcweveimg"
						:src="w.img"
						mode="widthFix"
					></image>
					<view class="adcwevename multilineellipsis">{{ w.title }}</view>
					<view class="marketValue specialellipsis" v-if="w.shop_price || w.suplusRatio">
						<view>市场参考价:￥{{ w.shop_price }}</view>
						<view @click="activity.status == 1 ? '' : 'tipsuplusRatio'" :data-ind="index">
							<block v-if="activity.status == 1">概率:未公布</block>
							<block v-else-if="w.suplusRatio == 0">已售罄</block>
							<block v-else>概率:{{ w.suplusRatio }}%</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ardbottomeve prizeScrapingRecord" style="width:600rpx">刮卡记录</view>
		<view class="record">
			<block v-for="(item, index) in history" :key="index">
				<view class="recordbox">
					<image class="avatar" :src="item.litpic" mode="widthFix"></image>
					<view class="gear" :style="'color:' + [item.color ? item.color : '#000000']">
						刮到了
						<text>{{ item.gear }}</text>
						赏
					</view>
					<view :style="'color:' + [item.color ? item.color : '#000000']" class="good_name">{{ item.title }}</view>
					<view class="time">
						<text :style="'color:' + [item.color ? item.color : '#000000']">{{ item.insert_time }}</text>
					</view>
				</view>
			</block>
		</view>
		<view class="ardbottom">
			<view v-if="activity.status == 3 || activity.suplusNum <= 0" class="ardbottomeve ardbmerightbottom" @click="jumpaRewardList">已结束</view>
			<view v-else-if="activity.isInQueue" class="ardbottomeve ardbmerightbottom" @click="scrapingPurfun">我要刮卡</view>
		</view>
		<!-- 刮奖购买 -->
		<!--  -->
		<view class="wsh" v-if="scrapingPur && activity.suplusNum > 0" @touchmove.stop.prevent="true">
			<view class="tgimgboxgb" @click="scrapingPurfun"></view>
			<view
				@click="scrapingPurfun"
				v-if="!activity.isAllHidePrice && finalReward.isShowPrice"
				:style="'width:100%;height:' + [worthSubsidiaryHeight - 109] + 'px;display: flex;align-items: center;justify-content: center;position:absolute;left: 0;top: 0;'"
			>
				<view class="worthSubsidiary" :style="!isPurchase ? 'height:832rpx;' : ''" @click="zhanwei">
					<view class="adcspecialPrice">
						<view>
							<image :src="finalReward.img" mode="aspectFill"></image>
							<text>
								<block v-if="finalReward.isShowPrice">最终赏 价值{{ finalReward.shop_price }}</block>
								<block v-else>超稀有!</block>
							</text>
						</view>
					</view>
					<scroll-view scroll-y="true" class="otherPrice">
						<view v-for="(item, index) in goodsdata" :key="index" style="overflow: hidden;margin-bottom:10rpx;display: flex;justify-content: space-between;">
							<view class="otherPricecom" style="text-align: right;width:76rpx;">{{ item.gear == '终' ? '最' : '' }}{{ item.gear }}赏</view>
							<view class="otherPricecom" style="float:right;">
								<view class="otherPriceRight specialellipsis" style="width:130rpx;text-align:right;">
									<block v-if="item.isShowPrice && item.suplus != 0">￥{{ item.shop_price }}x{{ item.suplus }}</block>
									<block v-else-if="item.isShowPrice && item.suplus == 0">抢完了</block>
									<block v-else>暂无价值</block>
								</view>
							</view>
							<view class="otherPricecom" style="text-align: right;width:180rpx;">
								<view class="otherPriceRight">总价值:</view>
								<block v-if="item.isShowPrice && item.suplus != 0">￥{{ item.suplus != 0 ? item.shop_price * item.suplus : item.shop_price }}</block>
								<block v-else-if="item.isShowPrice && item.suplus == 0">抢完了</block>
								<block v-else>暂无价值</block>
							</view>
						</view>
					</scroll-view>

					<view class="totalPrice">
						<text>剩余{{ activity.suplusNum }}抽</text>
						<text>
							总价值:
							<block v-if="activity.total_value">￥{{ activity.total_value }}</block>
							<block v-else>暂无价值</block>
							+
						</text>
					</view>
					<view
						v-if="isPurchase"
						style="width: 300rpx;height: 60rpx;background: #e94f57;text-align: center;line-height: 60rpx;color: #fff;border-radius: 10rpx;font-size: 24rpx; position: absolute;bottom: 20rpx;left: 50%;margin-left: -150rpx;"
						@click="!is_finish ? 'placeAnOrder' : ''"
						data-number="0"
					>
						<text style="margin-bottom:6rpx;">￥{{ activity.suplusNum * activity.shopPrice }}全收</text>
						<view class="adhcevehbg" v-if="is_finish"></view>
					</view>
				</view>
			</view>
			<!-- <view
				@click="scrapingPurfun"
				v-if="isBlindboxRuleMask"
				:style="'width:100%;height:'+worthSubsidiaryHeight-109+'px;display: flex;align-items: center;justify-content: center;position:absolute;left: 0;top: 0;z-index:10'"
			>
				<view class="useBlindboxRuleMask"><template is="wxParse" :data="wxParseData:article.nodes" /></view>
			</view> -->
			<view>
				<view v-if="isPurchase" class="scrapingPurchase">
					<view class="scrPurEve" @click="!is_finish ? 'placeAnOrder' : ''" data-number="0">
						<view class="adhcevehbg" v-if="is_finish"></view>
						<view class="scrOutBox">
							<text style="margin-bottom:8rpx;">￥{{ activity.suplusNum * activity.shopPrice }}</text>
							<text style="margin-bottom:8rpx;">全收</text>
						</view>
					</view>
					<view class="scrPurEve" @click="activity.suplusNum >= 10 ? 'placeAnOrder' : ''" data-number="10">
						<view class="adhcevehbg" v-if="activity.suplusNum < 10"></view>
						<view class="scrOutBox">
							<text style="margin-bottom:8rpx;">￥{{ 10 * activity.shopPrice }}</text>
							<text style="margin-bottom:8rpx;">刮10张</text>
						</view>
					</view>
					<view class="scrPurEve" @click="activity.suplusNum >= 3 ? 'placeAnOrder' : ''" data-number="3">
						<view class="adhcevehbg" v-if="activity.suplusNum < 3"></view>
						<view class="scrOutBox">
							<text style="margin-bottom:8rpx;">￥{{ 3 * activity.shopPrice }}</text>
							<text style="margin-bottom:8rpx;">刮3张</text>
						</view>
					</view>
					<view
						class="scrPurEve"
						@click="!is_finish ? 'placeAnOrder' : ''"
						data-number="1"
						:style="infoSales && infoSales.freeTimes > 0 ? 'background: linear-gradient(#FFEEDD,#FFCE96);color:#E67307;' : ''"
					>
						<view class="adhcevehbg" v-if="is_finish"></view>
						<view class="scrOutBox">
							<text style="margin-bottom:8rpx;">
								<block v-if="infoSales && infoSales.freeTimes > 0">免费</block>
								<block v-else>￥{{ activity.shopPrice }}</block>
							</text>
							<text style="margin-bottom:8rpx;">刮1张</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 支付成功：刮奖 -->
		<view class="wsh" @touchmove.stop.prevent="true" v-if='scrapingBox'>
		    <view class="scrapingbox" :style="'height:100%;z-index:999;'">
		        <scroll-view scroll-y="true" class="scrapbscroll">
		            <view class="scrapbscrollHead">60s后自动刮开全部奖券</view>
		            <block v-for="(item,index) in cardList" :key='index' :data-index="index">
		              <view class="card">
		                <!-- <image class="bgimg" src="{{activity.lottoBackGround}}" mode="aspectFill"></image> -->
		                <image class="bgimg" src="https://cdn.51chaidan.com/images/sign/shave_img.jpg" mode="aspectFill"></image>
		                <!--正面的框 -->
		                <view class="box" :animation="item.animation_main" :data-orderid="item.orderId" :data-gear="item.gear" :data-isReplace="item.isReplace" @click='rotateFn' :data-index="index" data-id="1" >
		                  <!-- <text>点击刮卡</text> -->
		                </view>
		                <!--背面的框 -->
		                <view class="box b2" :animation="item.animation_back" :data-gear="item.gear" @click='rotateFn' :data-index="index" data-id="2">
		                    <view class="scratchBgBox">
		                        <view class="boxbtbox">
		                        <image class="boxbtboximg" mode='aspectFit' :src="item.cover"></image>
		                        <view class="boxbt" :style="item.gear=='终'?'font-size:34rpx;color:#ff2742;':''">{{item.gear}}<view class="boxbtappre">赏</view></view>
		                        </view>
		                        <view class="boxbtright multilineellipsis">{{item.name}}</view>                   
		                    </view>
		                    <image class="scratchBgImg" src="https://cdn.51chaidan.com/images/sign/base_map.jpg"></image>
		                </view>
		              </view>
		            </block>
		        </scroll-view>
		        <view class="scrapboxbottom">
		           <view class="scrapboxbutcontinue" @click="scratchOrList?'scrapingBoxfun':'jumpaRewardList'">
		              <!-- <block v-if='scratchOrList'>继续刮奖 ({{remaintime}}s)</block> -->
		              <!-- <block v-else>返回列表</block> -->
		           </view>
		        </view>
		    </view>
		</view>
		
		<!-- 商品详情  -->
		<view style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:199;" @touchmove.stop.prevent="true" v-if="iftrdetailpagetwo">
			<view class="tgimgboxgb" @click="iftrdetailpageb"></view>
			<view style="width:100%;height:65%;position:absolute;left:0;bottom:0;background:#ccc;z-index:9;">
				<image
					src="https://www.51chaidan.com/images/spread/dial/fork.png"
					@click="iftrdetailpageb"
					style="width:50rpx;height:50rpx;padding:30rpx;border-radius:50%;display:block;position:absolute;top:0rpx;right:0;z-index:10;"
				></image>
				<scroll-view scroll-y="true" style="width:100%;height:100%;background:#f0eff5;" class="detailsmokebox">
					<!-- <template is="wxParse" data="{{wxParseData:article.nodes}}" /> -->
					<rich-text :nodes="goods_desc"></rich-text>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { yifanshangInfo } from '../../utils/api.js';
var util = require('../../utils/util.js');
export default {
	data() {
		return {
			activity: {
				id: '509467',
				name: 'Little James 一番赏',
				cover: 'https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/1640596283.jpg',
				status: '2',
				limit_users: '105',
				start_time: '1643531162',
				activity_id: '1639623650_623',
				adesc: '',
				detail: '0',
				brandId: '0',
				specialWay: '0',
				isAllHidePrice: false,
				shopPrice: '39',
				lottoBackGround: 'https:\/\/cdn.51chaidan.com\/images\/202112\/thumb_img\/39777_thumb_G_1639568273062.jpg',
				listBanner: ['https:\/\/cdn.51chaidan.com\/images\/spread\/yiFanShang\/bannerImg_1640596283.jpg'],
				isFlagship: false,
				flagshipArr: '',
				liveOpenActivity: false,
				nameSuffix: '',
				isToyCabinet: true,
				isOfficial: 1,
				isCheckOther: 2,
				otherAllNum: 2,
				otherNowNum: 1,
				total_value: 3120,
				refreshTime: 1645430483,
				refreshTimeForQueuer: 1645430473,
				is_jump: 1,
				otherActivity: [],
				isInQueue: true,
				queueNum: 1,
				aheadUser: true,
				suplusNum: 71,
				explain:
					'1.一番赏活动会根据周边商品的款式和数量分为A赏，B赏等多个等级。每次刮卡可随机获得1种赏（最终赏除外）。\n2.进入一番赏详情无需排队等待，同时刮卡以支付时间为准，如遇库存不足则进行退款。\n3.可选择刮卡1次，3次，10次或全部刮开（购买完成60s后，如有未刮开卡片，系统将自动为您刮开所有卡片，且不支持更换）。\n4.每场活动都会有最终赏奖励。\n5.最终赏获得方式：买走最后一个周边的玩家会额外获得最终赏。\n6.当前场次剩余有哪些周边商品可在一番赏详细页查看，也可以通过刮卡记录查看本场刮卡的明细和当日历史场次明细。\n7.部分奖励为多款中随机一款，刮到时自动提示是否更换，如想更换需分享给好友，系统自动为您更换随机一个其他款式，限一次（如其他款式已被领走则不可更换）。\n8.监修中表明官方暂未出图，商品以官方出货实物为准，介意勿抽。\n9.一番赏商品一经售出不退不换，介意勿抽。'
			},
			goodsdata: [
				{
					color: '6',
					gear: '终',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39777',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39777_thumb_G_1639568273062.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39777_thumb_G_1639568273062.jpg'],
					isShowPrice: false,
					is_buy: 2,
					is_hand_do: '1',
					limit: 1,
					roleId: 0,
					shop_price: 999,
					suplus: 1,
					title: 'Little James 小王子异色版（全1款）'
				},
				{
					color: '1',
					gear: 'A',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39778',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg'],
					isBetter: true,
					isGrayGoods: false,
					isShowPrice: false,
					is_buy: 2,
					is_hand_do: '1',
					limit: 1,
					roleId: '1',
					shop_price: 999,
					suplus: 1,
					title: 'Little James 恶龙异色版（全1款）'
				},
				{
					color: '2',
					gear: 'B',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39779',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39779_thumb_G_1639568366151.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39779_thumb_G_1639568366151.jpg'],
					isBetter: true,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '1',
					limit: 4,
					roleId: '2',
					shop_price: 69,
					suplus: 2,
					title: 'Little James 桃子地毯（全1款）'
				},
				{
					color: '3',
					gear: 'C',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39374',
					img: 'https://cdn.51chaidan.com/images/toyShow3/brandGoodsRotation/20211020/49e92d077601580312c2b7908240c27b.png',
					img_arr: ['https://cdn.51chaidan.com/images/toyShow3/brandGoodsRotation/20211020/49e92d077601580312c2b7908240c27b.png'],
					isBetter: false,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '2',
					limit: 16,
					roleId: '3',
					shop_price: 59,
					suplus: 11,
					title: 'Little James 童梦奇缘系列（全8款）随机一款'
				},
				{
					color: '4',
					gear: 'D',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39781',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39781_thumb_G_1639568464945.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39781_thumb_G_1639568464945.jpg'],
					isBetter: false,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '1',
					limit: 20,
					roleId: '4',
					shop_price: 49,
					suplus: 11,
					title: 'Little James 徽章（全5款）随机一款'
				},
				{
					color: '4',
					gear: 'E',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39782',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg'],
					isBetter: false,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '1',
					limit: 20,
					roleId: '5',
					shop_price: 39,
					suplus: 15,
					title: 'Little James 亚克力钥匙链（全10款）随机一款'
				},
				{
					color: '4',
					gear: 'E',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39782',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg'],
					isBetter: false,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '1',
					limit: 20,
					roleId: '5',
					shop_price: 39,
					suplus: 15,
					title: 'Little James 亚克力钥匙链（全10款）随机一款'
				},
				{
					color: '4',
					gear: 'E',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39782',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg'],
					isBetter: false,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '1',
					limit: 20,
					roleId: '5',
					shop_price: 39,
					suplus: 15,
					title: 'Little James 亚克力钥匙链（全10款）随机一款'
				},
				{
					color: '4',
					gear: 'E',
					goodsRoleInfo: [],
					goodsType: '1',
					goods_id: '39782',
					img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg',
					img_arr: ['https://cdn.51chaidan.com/images/202112/thumb_img/39782_thumb_G_1639568527348.jpg'],
					isBetter: false,
					isGrayGoods: false,
					isShowPrice: true,
					is_buy: 1,
					is_hand_do: '1',
					limit: 20,
					roleId: '5',
					shop_price: 39,
					suplus: 15,
					title: 'Little James 亚克力钥匙链（全10款）随机一款'
				}
			],
			finalReward: {
				color: '6',
				gear: '终',
				goodsRoleInfo: [],
				goodsType: '1',
				goods_desc:
					"<p><img src='https://cdn.51chaidan.com/images/spread/james.jpg' style='max-width:100%;'></p><p><img src='https://www.51chaidan.com/images/wangEditor/ecshop/20211215/bbcbebf9d39ae0eaea3508c46c01cd9b.jpg' style='max-width:100%;'></p>",
				goods_id: '39777',
				img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39777_thumb_G_1639568273062.jpg',
				isShowPrice: true,
				is_buy: 2,
				is_hand_do: '1',
				limit: '1',
				roleId: 0,
				shop_price: 999,
				suplus: 1,
				title: 'Little James 小王子异色版（全1款）',
				title_idle: 'Little James 小王子异色版（全1款）'
			},
			goodsExhibition: [
				[
					{
						color: '1',
						gear: 'A',
						goodsRoleInfo: [],
						goodsType: '1',
						goods_desc:
							"<p><img src='https://cdn.51chaidan.com/images/spread/james.jpg' style='max-width:100%;'></p><p><img src='https://www.51chaidan.com/images/wangEditor/ecshop/20211215/21b42324b09548b9e0dd0d1df5c8c22b.jpg' style='max-width:100%;'></p>",
						goods_id: '39778',
						img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg',
						isBetter: true,
						isGrayGoods: false,
						isShowPrice: false,
						is_buy: 2,
						is_hand_do: '1',
						limit: '1',
						roleId: '1',
						shop_price: 999,
						suplus: 1,
						suplusRatio: 1.41,
						title: 'Little James 恶龙异色版（全1款）',
						title_idle: 'Little James 恶龙异色版（全1款）'
					}
				],
				[
					{
						color: '1',
						gear: 'A',
						goodsRoleInfo: [],
						goodsType: '1',
						goods_desc:
							"<p><img src='https://cdn.51chaidan.com/images/spread/james.jpg' style='max-width:100%;'></p><p><img src='https://www.51chaidan.com/images/wangEditor/ecshop/20211215/21b42324b09548b9e0dd0d1df5c8c22b.jpg' style='max-width:100%;'></p>",
						goods_id: '39778',
						img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg',
						isBetter: true,
						isGrayGoods: false,
						isShowPrice: false,
						is_buy: 2,
						is_hand_do: '1',
						limit: '1',
						roleId: '1',
						shop_price: 999,
						suplus: 1,
						suplusRatio: 1.41,
						title: 'Little James 恶龙异色版（全1款）',
						title_idle: 'Little James 恶龙异色版（全1款）'
					}
				],
				[
					{
						color: '1',
						gear: 'A',
						goodsRoleInfo: [],
						goodsType: '1',
						goods_desc:
							"<p><img src='https://cdn.51chaidan.com/images/spread/james.jpg' style='max-width:100%;'></p><p><img src='https://www.51chaidan.com/images/wangEditor/ecshop/20211215/21b42324b09548b9e0dd0d1df5c8c22b.jpg' style='max-width:100%;'></p>",
						goods_id: '39778',
						img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg',
						isBetter: true,
						isGrayGoods: false,
						isShowPrice: false,
						is_buy: 2,
						is_hand_do: '1',
						limit: '1',
						roleId: '1',
						shop_price: 999,
						suplus: 1,
						suplusRatio: 1.41,
						title: 'Little James 恶龙异色版（全1款）',
						title_idle: 'Little James 恶龙异色版（全1款）'
					}
				],
				[
					{
						color: '1',
						gear: 'A',
						goodsRoleInfo: [],
						goodsType: '1',
						goods_desc:
							"<p><img src='https://cdn.51chaidan.com/images/spread/james.jpg' style='max-width:100%;'></p><p><img src='https://www.51chaidan.com/images/wangEditor/ecshop/20211215/21b42324b09548b9e0dd0d1df5c8c22b.jpg' style='max-width:100%;'></p>",
						goods_id: '39778',
						img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg',
						isBetter: true,
						isGrayGoods: false,
						isShowPrice: false,
						is_buy: 2,
						is_hand_do: '1',
						limit: '1',
						roleId: '1',
						shop_price: 999,
						suplus: 1,
						suplusRatio: 1.41,
						title: 'Little James 恶龙异色版（全1款）',
						title_idle: 'Little James 恶龙异色版（全1款）'
					}
				],
				[
					{
						color: '1',
						gear: 'A',
						goodsRoleInfo: [],
						goodsType: '1',
						goods_desc:
							"<p><img src='https://cdn.51chaidan.com/images/spread/james.jpg' style='max-width:100%;'></p><p><img src='https://www.51chaidan.com/images/wangEditor/ecshop/20211215/21b42324b09548b9e0dd0d1df5c8c22b.jpg' style='max-width:100%;'></p>",
						goods_id: '39778',
						img: 'https://cdn.51chaidan.com/images/202112/thumb_img/39778_thumb_G_1639568321895.jpg',
						isBetter: true,
						isGrayGoods: false,
						isShowPrice: false,
						is_buy: 2,
						is_hand_do: '1',
						limit: '1',
						roleId: '1',
						shop_price: 999,
						suplus: 1,
						suplusRatio: 1.41,
						title: 'Little James 恶龙异色版（全1款）',
						title_idle: 'Little James 恶龙异色版（全1款）'
					}
				]
			],
			history: [
				{
					activity_id: '509467',
					color: '#1E88E5',
					gear: 'C',
					insert_time: '2022-02-20 19:57:45',
					isBetter: false,
					isVip: true,
					litpic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKwGREickg3xqR97qus8EZ8lw0aQy2CXqSiapRBhBTQat0cibe1QwicaCgYRpUNulE3mbiaoM868LwJXuQ/132',
					title: 'Little James 童梦奇缘系列（全8款）随机一款'
				},
				{
					activity_id: '509467',
					color: '#4CAF50',
					gear: 'C',
					insert_time: '2022-02-20 19:57:45',
					isBetter: false,
					isVip: true,
					litpic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKwGREickg3xqR97qus8EZ8lw0aQy2CXqSiapRBhBTQat0cibe1QwicaCgYRpUNulE3mbiaoM868LwJXuQ/132',
					title: 'Little James 童梦奇缘系列（全8款）随机一款'
				},
				{
					activity_id: '509467',
					color: '#673AB7',
					gear: 'C',
					insert_time: '2022-02-20 19:57:45',
					isBetter: false,
					isVip: true,
					litpic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKwGREickg3xqR97qus8EZ8lw0aQy2CXqSiapRBhBTQat0cibe1QwicaCgYRpUNulE3mbiaoM868LwJXuQ/132',
					title: 'Little James 童梦奇缘系列（全8款）随机一款'
				},
				{
					activity_id: '509467',
					color: '#1E88E5',
					gear: 'C',
					insert_time: '2022-02-20 19:57:45',
					isBetter: false,
					isVip: true,
					litpic: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKwGREickg3xqR97qus8EZ8lw0aQy2CXqSiapRBhBTQat0cibe1QwicaCgYRpUNulE3mbiaoM868LwJXuQ/132',
					title: 'Little James 童梦奇缘系列（全8款）随机一款'
				}
			],
			scrapingPur: false,
			isPurchase: false,
			is_finish: true,
			infoSales: true,
			iftrdetailpagetwo: false, //详情图
			scrapingBox:false,
			cardList:[
				{
					cover: "https://cdn.51chaidan.com//images/spread/blindBox/39328_6_1634731233.jpg",
					gear: "C",
					isReplace: false,
					isTurned: true,
					name: "Little James 童梦奇缘系列（全8款）随机一款",
					orderId: 5250617,
					order_sn: "202202221963332680",
					roleImg: "https://cdn.51chaidan.com//images/spread/blindBox/39328_6_1634731233.jpg",
					roleName: "骑士",
				},
				{
					cover: "https://cdn.51chaidan.com//images/spread/blindBox/39328_6_1634731233.jpg",
					gear: "C",
					isReplace: false,
					isTurned: true,
					name: "Little James 童梦奇缘系列（全8款）随机一款",
					orderId: 5250617,
					order_sn: "202202221963332680",
					roleImg: "https://cdn.51chaidan.com//images/spread/blindBox/39328_6_1634731233.jpg",
					roleName: "骑士",
				},
				{
					cover: "https://cdn.51chaidan.com//images/spread/blindBox/39328_6_1634731233.jpg",
					gear: "C",
					isReplace: false,
					isTurned: true,
					name: "Little James 童梦奇缘系列（全8款）随机一款",
					orderId: 5250617,
					order_sn: "202202221963332680",
					roleImg: "https://cdn.51chaidan.com//images/spread/blindBox/39328_6_1634731233.jpg",
					roleName: "骑士",
				},
			],
			scratchOrList:true
		};
	},
	onLoad(opction) {
		console.log(opction)
		let that = this;
		this.id=opction.id || '',
		uni.getSystemInfo({
			success: function(res) {
				that.windowWidth = res.windowWidth;
				that.worthSubsidiaryHeight = res.windowHeight;
				console.log(res);
			}
		});
		this.oddNumber = this.goodsExhibition.length % 2 === 0 ? false : true;
		this.yifanshangInfo();
	},
	methods: {
		yifanshangInfo(){
			uni.showLoading({
				title: '加载中'
			});
			yifanshangInfo({id:this.id})
				.then(res => {
					uni.stopPullDownRefresh();
					console.log('详情==', res);
					
				})
				.catch(err => {
					util.showToast(err, 1500);
					console.log(err);
				});
		},
		// 刮奖购买
		scrapingPurfun(e) {
			if (e.currentTarget.dataset.purchase) {
				this.isPurchase = false;
			} else {
				this.isPurchase = true;
			}
			this.scrapingPur = !this.scrapingPur;
		},
		// 显示商品详情
		iftrdetailpagen(w) {
			var index = w.currentTarget.dataset.index || w.target.dataset.index || 0;
			if (index == 10000) {
				var finalReward = this.finalReward;
				if (finalReward.goods_desc) {
					this.goods_desc = finalReward.goods_desc;
				}
			} else {
				var goodsExhibition = this.goodsExhibition;
				var num = w.currentTarget.dataset.num || w.target.dataset.num || 0;
				if (goodsExhibition[index]) {
					if (goodsExhibition[index][num]) {
						this.goods_desc = goodsExhibition[index][num].goods_desc;
					}
				}
			}
			console.log(this.goods_desc);
			this.iftrdetailpagetwo = true;
		},
		// 隐藏商品详情
		iftrdetailpageb() {
			this.iftrdetailpagetwo = false;
		},
		// 跳转定位
		jumpposition: function(w) {
			var ind = w.currentTarget.dataset.ind || w.target.dataset.ind || 0;
			var query = uni.createSelectorQuery();
			query.select('#evepos' + ind).boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function(res) {
				if (res && res[0] && res[1]) {
					uni.pageScrollTo({
						scrollTop: res[0].top + res[1].scrollTop,
						duration: 100
					});
				}
			});
		},
		// 刮奖翻转卡片
		  rotateFn(e) {
			 console.log(e)
		    var index = e.currentTarget.dataset.index;
		    var id = e.currentTarget.dataset.id;
		    var gear = e.currentTarget.dataset.gear;  //档位
		    var isreplace = e.currentTarget.dataset.isreplace;  //是否可替换
		    var orderid = e.currentTarget.dataset.orderid;  //是否可替换
		    let animation_main = uni.createAnimation({
		      duration:400,
		      timingFunction:'linear'
		     })
		    let animation_back = uni.createAnimation({
		      duration:400,
		      timingFunction:'linear'
		     })
		    // 点击正面
		    if (id==1) {
				console.log(11111)
		      animation_main.rotateY(180).step()
		      animation_back.rotateY(0).step()
		      this.cardList[index].animation_main = animation_main.export() 
		      this.cardList[index].animation_back   = animation_back.export() 
		      // this.setData({
		      //   cardList: this.data.cardList,
		      //   gear:gear,
		      //   orderid:orderid
		      // })
		      // if(isreplace && this.data.gearCount[this.data.gear]>0){
		      //   this.setData({
		      //     awardsData: this.data.cardList[index],
		      //     isChangeAwards:false,
		      //     isSharingSAwards:true,
		      //     awardsIndex:index
		      //   })
		      // }
		    }
		  },
	}
};
</script>

<style>
.flexWrap {
	display: flex;
	flex-wrap: wrap;
}
.flexCenter {
	display: flex;
	justify-content: center;
	align-items: center;
}
.ardbox {
	padding: 0 20rpx 240rpx;
}
.adhead {
	height: 130rpx;
	padding: 0 20rpx 0 0;
	box-sizing: border-box;
}
.adhleft {
	width: 550rpx;
	height: 130rpx;
	white-space: nowrap;
	float: left;
}
.adhleftItem:first-child {
	margin-left: 20rpx;
}
.adhlimg {
	display: block;
	width: 100%;
	height: auto;
	border-radius: 50%;
}
.adhright {
	float: right;
	width: 70rpx;
	height: 130rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.adhright text {
	font-size: 24rpx;
	text-align: right;
	color: #777777;
	display: block;
}

.adheadutnum {
	font-size: 22rpx;
	width: 100%;
	height: 50rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
}
.adhbanner {
	width: 100%;
	height: 306rpx;
	position: relative;
	margin-bottom: 44rpx;
}
.adhswiper {
	width: 100%;
	height: 100%;
}
.adhswiperimg {
	width: 100%;
	height: 100%;
	display: block;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
}
.adhcontent {
	width: 100%;
	margin-bottom: 20rpx;
}

.adhceve {
	display: inline-block;
	width: 163rpx;
	height: 163rpx;
	box-shadow: 2px 2px 10px 0px #999;
	border-radius: 10rpx;
	margin-right: 20rpx;
	margin-bottom: 40rpx;
	position: relative;
}
.adcswiper {
	width: 100%;
	height: 100%;
}

.adhcevehbg {
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
	background: #000;
	opacity: 0.5;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
}
.adhceveimg {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 10rpx;
}
.adhclet {
	width: 55rpx;
	height: 55rpx;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	background: #ff2742;
	color: #fff;
	font-size: 28rpx;
	text-align: center;
	line-height: 55rpx;
	border-radius: 8rpx;
}
.adhcnum {
	width: 100rpx;
	height: 44rpx;
	position: absolute;
	left: 0;
	right: 0;
	bottom: -23rpx;
	margin: auto;
	z-index: 2;
}
.adhcnumbg {
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.5;
	border-radius: 30rpx;
}
.adhcnumtxt {
	width: 100%;
	height: 100%;
	text-align: center;
	font-size: 26rpx;
	color: #fff;
	line-height: 44rpx;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}
.adcspecial {
	width: 100%;
	display: flex;
}
.adcweve {
	width: 351rpx;
	vertical-align: top;
	position: relative;
}
.goods_gear_item {
	border-top: 2px dashed rgb(0, 0, 0);
	border-right: 2px dashed rgb(0, 0, 0);
}
.goods_gear_item:nth-child(2n) {
	border-right: none;
}
.goods_gear_item .adcweve {
	padding-top: 30rpx;
}
.oddNumber > view:last-child {
	width: 100%;
	border-right: none;
}
.oddNumber > view:last-child .adcweve {
	border-right: 2px dashed rgb(0, 0, 0);
}
.adcspecialimg {
	width: 310rpx;
	height: auto;
	display: block;
	border-radius: 13rpx;
}
.adcspezzs {
	width: 70rpx;
	height: 150rpx;
	background: #ff2742;
	margin: 60rpx auto 0;
	border-radius: 12rpx;
}
.adcspezzstxt {
	width: 70rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	font-size: 26rpx;
	color: #fff;
	font-weight: bold;
}
.adcspenum {
	width: 100%;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 24rpx;
	color: #ff2742;
}
.adcspename {
	width: 100%;
	max-height: 35px;
	font-size: 24rpx;
	color: #000;
	text-align: center;
}
.adcspencxy {
	width: 100%;
	height: 60rpx;
	line-height: 80rpx;
	text-align: center;
	color: #ff2742;
	font-size: 30rpx;
	font-weight: bold;
}
.adcweveleft {
	width: 120rpx;
	position: absolute;
	top: 30rpx;
	left: 21rpx;
	z-index: 1;
}
.adcwelbg {
	width: 70rpx;
	height: 100rpx;
	background: #ff2742;
	border-radius: 12rpx;
}
.adcweltxt {
	width: 70rpx;
	height: 50rpx;
	text-align: center;
	font-size: 26rpx;
	color: #fff;
	font-weight: bold;
}
.adcweveimg {
	margin: 0 auto 0;
	width: 310rpx;
	display: block;
	height: auto;
	border-radius: 10rpx;
}
.adcwevename {
	margin: 8rpx 15rpx 8rpx 15rpx;
	width: 320rpx;
	height: 35px;
	line-height: 36rpx;
	font-size: 24rpx;
}
.ardbottom {
	width: 100%;
	height: 120rpx;
	position: fixed;
	bottom: 112rpx;
	left: 0;
	z-index: 10;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.ardbottomeve {
	width: 300rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 60rpx;
	font-size: 28rpx;
	text-align: center;
	position: relative;
}

.ardbmeleft {
	float: left;
	margin-left: 50rpx;
	border: 2rpx solid #ccc;
	background: #fff;
}
.scrapboxbutcontinue {
	width: 600rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 10rpx;
	font-size: 26rpx;
	text-align: center;
	background: #fed943;
	color: #c68100;
	margin: auto;
}
.ardbmeright {
	float: right;
	margin-right: 50rpx;
	background: #ff2742;
	color: #fff;
}
.ardbmerightbottom {
	width: 310rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 auto;
	background: #e94f57;
	color: #fff;
	box-shadow: 0 5rpx 16rpx #999999;
}
.ardbmeleftbottom {
	width: 310rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 0 auto;
	background: #ffffff;
	color: #000;
	box-shadow: 0 5rpx 6rpx #999999;
}
.prizeScrapingRecord {
	width: 600rpx;
	margin: 20rpx auto;
	/* border:2rpx solid #ccc;background: #fff; */
}
.scrapingPurchase {
	width: 100%;
	height: 230rpx;
	background: #fff;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 11;
	padding-top: 44rpx;
	display: flex;
}
.scrapPurtime {
	width: 100%;
	height: 40rpx;
	line-height: 40rpx;
	text-align: center;
	font-size: 24rpx;
	position: absolute;
	left: 0;
	top: -20rpx;
}
.deduct {
	width: 100%;
	height: 100rpx;
	line-height: 40rpx;
	text-align: center;
	font-size: 24rpx;
	position: absolute;
	left: 0;
	top: -80rpx;
	background: #fff;
}
.deductWrap {
	width: 680rpx;
	height: 100rpx;
	margin-left: 35rpx;
	border-bottom: 1rpx solid #c8c8c8;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.deductWrap view {
	display: flex;
	align-items: center;
	font-size: 24rpx;
}
.scrPurEve {
	height: 150rpx;
	/* line-height: 150rpx; */
	text-align: center;
	width: 150rpx;
	background: #e94f57;
	border-radius: 10rpx;
	font-size: 26rpx;
	color: #fff;
	margin-left: 30rpx;
	/* display: inline-block; */
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.scrPurEve text {
	display: block;
	text-align: center;
}
.scrPurEve text:last-child {
	font-size: 22rpx;
}
.useBlindboxRuleMask {
	width: 560rpx;
	height: 920rpx;
	background: #fff;
	border-radius: 8rpx;
}
.adhBannerVol {
	position: absolute;
	top: 15rpx;
	left: 15rpx;
	z-index: 3;
	color: #fff;
	font-size: 24rpx;
}
.scrapingbox {
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	background: #f5f6fa;
	z-index: 10;
}
.scrapbscroll {
	width: 100%;
}
.scrapboxbottom {
	width: 100%;
	height: 50px;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 1;
}

.card {
	width: 100%;
	height: 208rpx;
	position: relative;
	margin-bottom: 15rpx;
}
.bgimg {
	width: 100%;
	height: 100%;
	display: block;
}
.box {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 1;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
}
.b1 {
	background: rgba(0, 0, 0, 0.5);
	border: 4rpx dashed #fff;
}
.b1 text {
	width: 100%;
	display: block;
	color: #fff;
	font-size: 30rpx;
	line-height: 140rpx;
	text-align: center;
}
.b2 {
	background: #fff;
	transform: rotateY(-180deg);
	border-radius: 10rpx;
}

.boxbt {
	height: 40rpx;
	line-height: 40rpx;
	font-size: 40rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	color: #fff;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 8rpx 8rpx 8rpx 8rpx;
}

.boxbtappre {
	width: 24rpx;
	height: 24rpx;
	display: inline-block;
	position: relative;
	top: -1rpx;
	font-size: 20rpx;
	line-height: 24rpx;
	margin-left: 4rpx;
}

.boxbtbox {
	position: absolute;
	left: 50rpx;
	top: 0;
	bottom: 0;
	margin: auto;
	width: 160rpx;
	height: 160rpx;
}
.boxbtboximg {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 10rpx;
	box-shadow: 2px 2px 6px 0px #999;
}

.boxbtright {
	width: 460rpx;
	line-height: 36rpx;
	font-size: 30rpx;
	float: right;
	margin: 70rpx 30rpx 0 0;
	position: relative;
	font-weight: bold;
}

.closestyle {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	right: 0;
	top: 0;
	margin: 5rpx;
	text-align: center;
}

.setcomplie {
	width: 500rpx;
	line-height: 80rpx;
	position: absolute;
	left: 75rpx;
	bottom: 10rpx;
	background: white;
	text-align: center;
	border-radius: 10rpx;
}

.recgadbotleftimg {
	width: 34rpx;
	height: 34rpx;
	display: inline-block;
	position: relative;
	top: 6rpx;
	margin: 58rpx 0 0 33rpx;
}

.howToPlay {
	width: 500rpx;
	height: 700rpx;
	background: #fff;
	border-radius: 10rpx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 2;
}
.howToPlayHead {
	width: 100%;
	height: 85rpx;
	text-align: center;
	line-height: 85rpx;
	font-size: 26rpx;
}

.howToPlayScroll {
	width: 100%;
	height: 500rpx;
}
.howToPlayTxt {
	width: 80%;
	display: block;
	font-size: 24rpx;
	margin: auto;
}
.howToPlayBut {
	width: 300rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
	color: #fff;
	font-size: 26rpx;
	margin: 30rpx auto 0;
	background: #ff2742;
	border-radius: 15rpx;
}

.buyNow {
	background: #e94f57;
	color: #fff;
	position: absolute;
	bottom: 30rpx;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 30;
}

.detailsmokebox image {
	display: block;
	width: 100% !important;
}

/*  双行  */
.multilineellipsis {
	display: -webkit-box;
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.SharingSAwards {
	width: 500rpx;
	height: 530rpx;
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 3;
	border-radius: 15rpx;
}
.SSAhead {
	height: 60rpx;
	width: 100%;
	text-align: center;
	line-height: 60rpx;
	font-size: 28rpx;
	font-weight: bold;
}
.SSAname {
	height: 35px;
	width: 400rpx;
	font-size: 24rpx;
	line-height: 36rpx;
	margin: 0 auto 10rpx;
}
.SSAimg {
	width: 230rpx;
	height: 230rpx;
	display: block;
	margin: 0 auto 10rpx;
	border-radius: 10rpx;
}
.SSAsharetxt {
	width: 400rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 24rpx;
	color: #8abe38;
	margin: auto;
}
.SSAbut {
	width: 100%;
	height: 60rpx;
	text-align: center;
	margin-top: 10rpx;
}
.SSAbutLeft {
	color: #2072c4;
	background: #e7f1fb;
	position: relative;
	margin-right: 20rpx;
}
.SSAbutRight {
	color: #c68100;
	background: #fed943;
}
.SSLcomlr {
	width: 200rpx;
	height: 55rpx;
	text-align: center;
	line-height: 55rpx;
	font-size: 24rpx;
	display: inline-block;
	box-shadow: 5px 5px 10px 0px #999;
	border-radius: 10rpx;
}
.SSAbutShare {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	opacity: 0;
	z-index: 1;
}

.scrapbscrollHead {
	width: 100%;
	height: 80rpx;
	color: #999;
	font-size: 26rpx;
	line-height: 80rpx;
	text-align: center;
}
.scratchBgImg {
	width: 100%;
	height: 100%;
	display: block;
}
.scratchBgBox {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 1;
}
/* 幸运值 */
.bgstyle {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: #000;
	opacity: 0.6;
}

.redpackage {
	width: 600rpx;
	height: 800rpx;
	border-radius: 20rpx;
	position: relative;
	color: #f0ca97;
	margin-bottom: 40rpx;
}

.readpagname {
	width: 100%;
	text-align: center;
	margin-top: 60rpx;
	font-size: 30rpx;
}

.redpagbtom {
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 30rpx;
	font-size: 30rpx;
}

.redbg {
	width: 600rpx;
	height: 1000rpx;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	margin: auto;
	border-radius: 20rpx;
	color: #f0ca97;
	background: white;
	font-size: 30rpx;
}

.pagshare {
	width: 50rpx;
	height: 50rpx;
	position: absolute;
	top: 10rpx;
	right: 10rpx;
}

.getpagbtm {
	width: 100%;
	height: 650rpx;
	border-radius: 20rpx;
	background: white;
	margin-top: -20rpx;
	position: relative;
}

.alreadyget {
	width: 580rpx;
	font-size: 28rpx;
	line-height: 70rpx;
	color: gray;
	border-bottom: 2rpx solid #e3e3e3;
	margin-left: 20rpx;
}

.stoptime {
	width: 100%;
	line-height: 40rpx;
	color: gray;
	background: white;
	font-size: 25rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	text-align: center;
}

.pagitem {
	height: 100rpx;
	width: 500rpx;
	display: inline-block;
	border-bottom: 2rpx solid #e3e3e3;
	font-size: 25rpx;
	text-align: center;
}

.imgtextstyle {
	font-size: 30rpx;
	line-height: 70rpx;
	display: inline-block;
	vertical-align: top;
	margin-left: 20rpx;
}

.headsty {
	width: 70rpx;
	height: 70rpx;
	display: inline-block;
	vertical-align: top;
	border-radius: 5rpx;
}

.sharebtn {
	width: 360rpx;
	line-height: 60rpx;
	background: #fb595f;
	font-size: 26rpx;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 40rpx;
	margin: 0 auto;
	color: white;
	text-align: center;
	border-radius: 10rpx;
}

.snapshotshareclass {
	width: 300px;
	height: 240px;
	position: fixed;
	top: -9999px;
	left: 0;
}
.worthSubsidiary {
	width: 560rpx;
	height: 920rpx;
	background: #ffffff;
	border-radius: 10rpx;
	z-index: 3;
	position: relative;
}
.adcspecialPrice {
	width: 100%;
}
.adcspecialPrice image {
	width: 280rpx;
	border-radius: 10rpx;
	height: 280rpx;
	margin: 40rpx auto 6rpx;
	display: block;
}
.adcspecialPrice text {
	font-size: 24rpx;
	color: #101010;
	display: block;
	text-align: center;
}
.otherPrice {
	width: 480rpx;
	border-top: 2rpx solid #bbb;
	border-bottom: 2rpx solid #bbb;
	margin: 20rpx auto 0;
	padding: 20rpx 0;
	/* height: 230rpx; */
	height: 346rpx;
}
.otherPrice > view {
	display: flex;
	justify-content: space-between;
	padding: 0 24rpx;
	box-sizing: border-box;
	margin-bottom: 20rpx;
}
.otherPrice > view:last-child {
	margin-bottom: 0;
}
.otherPrice > view text {
	font-size: 24rpx;
	color: #101010;
}
.totalPrice {
	width: 480rpx;
	margin-left: 40rpx;
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
	box-sizing: border-box;
}
.totalPrice text {
	font-size: 24rpx;
	color: #101010;
}
.otherPricecom {
	font-size: 24rpx;
	color: #101010;
	float: left;
}
.otherPriceRight {
	display: inline-block;
	vertical-align: top;
}

.finishedBox {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
}
.finishedBox .mask {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	background: #000;
	opacity: 0.5;
	z-index: -1;
}
.finishedBox .popup {
	width: 580rpx;
	height: 460rpx;
	background: #fff;
	border-radius: 10rpx;
	padding-top: 46rpx;
	box-sizing: border-box;
}
.finishedBox .popup > text {
	font-size: 26rpx;
	color: #000;
	display: block;
	text-align: center;
	margin-bottom: 34rpx;
}
.finishedBox .activityBox {
	width: 550rpx;
	height: auto;
	margin-left: 15rpx;
	border-radius: 10rpx;
	overflow: hidden;
	position: relative;
}
.finishedBox .activityBox image {
	width: 100%;
	height: 235rpx;
	display: block;
}
.finishedBox .progressBox {
	position: relative;
	overflow: hidden;
}
.finishedBox .progressBox text {
	display: inline-block;
	height: 24rpx;
	line-height: 24rpx;
	font-size: 20rpx;
	color: #fff;
}
.finishedBox .gray {
	width: 100%;
	height: 40rpx;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10rpx;
	box-sizing: border-box;
}
.finishedBox .gray text {
	color: #fff;
	font-size: 22rpx;
	display: inline-block;
}
.adhbannerBox {
	position: relative;
}
.yfsNumWrap {
	width: 100%;
	height: 48rpx;
	display: flex;
	justify-content: space-between;
}
.yfsNumWrap > view {
	display: block;
	padding: 0 20rpx;
	height: 48rpx;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 28rpx;
	text-align: center;
	box-sizing: border-box;
	line-height: 48rpx;
}

.progress-box {
	width: 100%;
	/* border-radius: 0 0 10rpx 10rpx; */
	position: relative;
	overflow: hidden;
}
.progress-box text {
	display: inline-block;
	height: 24rpx;
	line-height: 24rpx;
	position: absolute;
	top: 0;
	font-size: 20rpx;
	color: #fff;
}

.useBlindboxRuleMask {
	padding: 0 30rpx;
	box-sizing: border-box;
}
.wxParse-h1 > view {
	text-align: center;
	font-size: 24rpx;
	margin: 50rpx 0 20rpx 0;
}
.wxParse-h2 > view {
	font-size: 24rpx;
	margin-bottom: 25rpx;
	margin-top: 32rpx;
}
.wxParse-p > view {
	color: #666;
	font-size: 24rpx;
	padding: 0 18rpx;
	box-sizing: border-box;
}
.wxParse-span > view {
	color: #666;
	font-size: 24rpx;
	padding: 0 18rpx;
	box-sizing: border-box;
	margin: 15rpx 0;
}

.leaveunused {
	font-size: 24rpx;
	color: #101010;
	text-align: center;
	color: #ff2742;
}
.leaveunused text {
	color: #ff2742;
}

.nottip {
	position: absolute;
	bottom: 22rpx;
	left: 28rpx;
	right: 28rpx;
	font-size: 20rpx;
	color: #101010;
}

.orderMask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
}
.orderMaskBox {
	width: 70%;
	height: auto;
	background-color: #fff;
	border-radius: 10rpx;
}
.orderMaskBoxTitle {
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
	display: block;
	margin: 35rpx 0;
}
.orderBoxContent {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 94rpx;
	box-sizing: border-box;
	margin-bottom: 10rpx;
}
.orderBoxContent text:first-child {
	font-size: 28rpx;
	color: #999999;
}
.orderBoxContent text:last-child {
	font-size: 28rpx;
	color: #000;
}
.orderBoxBtn {
	border-top: 1rpx solid #eeeeee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 40rpx;
}
.orderBoxBtn text {
	display: block;
	width: 50%;
	font-size: 30rpx;
	text-align: center;
	height: 90rpx;
	line-height: 90rpx;
}
.orderBoxBtn text:last-child {
	color: #61749c;
	border-left: 1rpx solid #eeeeee;
}
.marketValue {
	padding: 0 15rpx;
	height: 40rpx;
	font-size: 22rpx;
	color: #909090;
	display: flex;
	justify-content: space-between;
}

.probabilityTip {
	padding: 30rpx 30rpx 30rpx;
	width: 600rpx;
	height: 380rpx;
	background: #fff;
	border-radius: 16rpx;
}
.proTipHead {
	width: 100%;
	height: 200rpx;
}
.proTipHeadImg {
	width: 200rpx;
	height: 200rpx;
	float: left;
	border-radius: 10rpx;
}
.proTipHeadRight {
	height: 200rpx;
	width: 380rpx;
	float: right;
}

.aproTname {
	width: 100%;
	height: 35px;
	line-height: 36rpx;
	font-size: 24rpx;
}
.proTipEve {
	display: flex;
	justify-content: space-between;
	font-size: 24rpx;
	margin-top: 32rpx;
}
.proTipC {
	color: #909090;
	font-size: 26rpx;
	text-align: center;
	width: 100%;
	padding: 20rpx 0 30rpx;
	margin-top: 20rpx;
	border-top: 1rpx solid #f5f5f5;
}

.proTipButton {
	width: 400rpx;
	height: 66rpx;
	line-height: 66rpx;
	border-radius: 56rpx;
	background-color: rgba(233, 78, 89, 100);
	color: rgba(255, 255, 255, 100);
	font-size: 26rpx;
	text-align: center;
	margin: auto;
}

.webview1 {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100rpx;
	z-index: 10;
}
.webview2 {
	position: absolute;
	top: 100rpx;
	width: 100%;
	height: 100rpx;
	z-index: 10;
}

/* 新年活动 */
.orderMangAddressARL {
	width: 580rpx;
	height: 610rpx;
	background: #fff;
	border-radius: 16rpx;
}
.SFAHEad {
	padding: 30rpx;
	font-size: 28rpx;
	text-align: center;
}
.SFAScroll {
	width: 500rpx;
	padding: 0 20rpx;
	height: 360rpx;
	display: block;
	margin: auto;
	font-size: 28rpx;
}
.SFAHBottom {
	background: #5ca7fe;
	height: 78rpx;
	line-height: 78rpx;
	text-align: center;
	color: #fff;
	font-size: 28rpx;
	width: 500rpx;
	margin: 30rpx auto 0;
	border-radius: 78rpx;
}

.SFARBbo {
	background: #7298c8;
	width: 140rpx;
	height: 160rpx;
	border-radius: 16rpx;
	position: fixed;
	bottom: 330rpx;
	right: 18rpx;
	z-index: 111;
}
.SFARBboHead {
	padding: 6rpx;
	text-align: center;
	font-size: 18rpx;
	color: #fff;
}
.SFARBboHeadCon {
	background: #fff;
	width: 120rpx;
	height: 36rpx;
	line-height: 36rpx;
	text-align: center;
	font-size: 18rpx;
	color: #7298c8;
	border-radius: 10rpx;
	margin: 0 auto 7rpx;
}
/* 结束 */

/* 抽奖记录 */
.recordbox {
	/* display: flex;
  justify-content: space-between;
  align-items: center; */
	margin-bottom: 10rpx;
	overflow: hidden;
}
.recordbox text {
	line-height: 60rpx;
	display: inline-block;
}
.recordbox .avatar {
	width: 60rpx;
	height: auto;
	margin-right: 14rpx;
	float: left;
}
.recordbox .good_name {
	width: 190rpx;
	font-size: 22rpx;
	line-height: 60rpx;
	font-weight: bold;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	float: left;
	margin-left: 20rpx;
}
.recordbox .gear {
	font-size: 24rpx;
	float: left;
}
.recordbox .time {
	width: 260rpx;
	font-size: 24rpx;
	float: right;
}
.recordbox .time text {
	float: right;
}

.wsh {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
}
.tgimgboxgb {
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.5;
	display: block;
}
</style>
