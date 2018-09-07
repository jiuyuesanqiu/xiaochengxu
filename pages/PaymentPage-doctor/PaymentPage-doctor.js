// pages/PaymentPage/PaymentPage.js
var app = getApp();
Page({
  data: {
    radioItems: [{
      name: '余额支付',
      value: 'PREPAID',
      imgurl: "../img/money@2x.png"
    },
    {
      name: '微信支付',
      value: 'WEIXIN',
      checked: true,
      imgurl: "../img/wechat@2x.png"
    }
    ],
    paidMode:'WEIXIN'
  },
  onShow:function(){
    this.setData({
      "parameters": app.globalData.consumeProduct
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      paidMode: e.detail.value
    });
  },
  sub: function () {
    var that = this;
    //判断选择的是微信支付还是余额支付
    if (that.data.paidMode=="WEIXIN"){
      that.WXpay();
    }else{
      that.modifyOrderStatus();
      wx.navigateTo({
        url: '../PaymentSuccess/PaymentSuccess'
      })
    }
    
  },
  /**
   * 微信支付
   */
  WXpay:function(){
    var that = this;
    wx.request({
      url: app.globalData.domain + 'wxpay/order.do',
      data: {
        "body": "图文咨询",
        "total_fee": "1",
        "openid": wx.getStorageSync("openid"),
        "spbill_create_ip": "218.18.102.113"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp + "",
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            //支付成功修改订单状态
            that.modifyOrderStatus();
            wx.navigateTo({
              url: '../PaymentSuccess/PaymentSuccess'
            })
          },
          fail(res) {
            console.log("支付失败" + res)
          }
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 修改订单状态
   */
  modifyOrderStatus:function(){
    var that = this;
    console.log(wx.getStorageSync("orderId"));
    wx.request({
      url: app.globalData.domain +'order/modifyOrder.do',
      data: {
        "orderId": wx.getStorageSync("orderId"),
        "amount": 1,
        "paidMode": that.data.paidMode
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log("修改订单状态成功")
        //预约服务
        that.wxconsumeProduct();
      },
      fail: function(res) {
        console.log("修改订单状态失败")
      },
      complete: function(res) {},
    })
  },
  /**
   * 预约服务
   */
  wxconsumeProduct:function(){
    var that = this;
    this.setData({
      "parameters.memberNumber":wx.getStorageSync("memberId"),
      "parameters.prctCode":"BH0012"
    })
    wx.request({
      url: app.globalData.domain + 'member/wxconsumeProduct.do',
      data: this.data.parameters,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        console.log("创建服务成功")
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})