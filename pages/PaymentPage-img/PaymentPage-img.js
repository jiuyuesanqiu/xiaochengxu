// pages/PaymentPage/PaymentPage.js
var app = getApp();
Page({
  data: {
    radioItems: [{
        name: '余额支付',
        value: '0',
        imgurl: "../img/money@2x.png"
      },
      {
        name: '微信支付',
        value: '1',
        checked: true,
        imgurl: "../img/wechat@2x.png"
      }
    ],
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  sub: function() {
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
      success: function(res) {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.data.timeStamp+"",
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            wx.navigateTo({
              url: '../PaymentSuccess/PaymentSuccess'
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})