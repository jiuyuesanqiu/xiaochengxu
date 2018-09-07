var util = require('../utils/util.js');
var app = getApp();
Page({
  data: {
    
  },
  onLoad: function(option) {
    this.setData({
      "option": option
    })
    this.getDate()
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onShow:function(){
    this.setData({
      "memberName":wx.getStorageSync("memberName")
    })
  },
  consultant: function(e) {
    this.setData({
      consultantIndex: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiindex: e.detail.value
    })
  },
  ReturnVisit: function(e) {
    this.setData({
      ReturnVisitIndex: e.detail.value
    })
  },
  score: function(e) {
    this.setData({
      scoreIndex: e.detail.value
    })
  },
  PaymentMethod: function(e) {
    this.setData({
      PaymentMethodIndex: e.detail.value
    })
  },
  AccompanyingDiagnosis: function(e) {
    this.setData({
      AccompanyingDiagnosisIndex: e.detail.value
    })
  },
  MedicalCard: function(e) {
    this.setData({
      MedicalCardIndex: e.detail.value
    })
  },
  DoctorReturnVisit: function(e) {
    this.setData({
      DoctorReturnVisitIndex: e.detail.value
    })
  },
  send: function(e) {
    this.setData({
      sendIndex: e.detail.value
    })
  },
  sex: function(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },

  sub: function() {
    //创建订单
    if (this.data.date == undefined) {
      this.openAlert()
    } else {
      this.createOrder();
      wx.navigateTo({
        url: '../PaymentPage-doctor/PaymentPage-doctor'
      })
    }
  },
  /**
   * 创建预约订单
   */
  createOrder: function() {
    var that = this;
    console.log(wx.getStorageSync("memberId"));
    wx.request({
      url: app.globalData.domain + 'order/wxCreateOrder.do',
      data: {
        "prctCode": "BH0012", //产品代码
        "memberNumber": wx.getStorageSync("memberId"),
        "quan": 1, //购买数量
        "remark": "来自小程序的订单"
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wx.setStorageSync("orderId", res.data.orderId)
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 获取今天的日期
   */
  getDate: function() {
    var time = util.formatTime(new Date());
    this.setData({
      "start": time
    })
  },
  /**
   * 弹出错误提示
   */
  openAlert: function() {
    wx.showModal({
      content: '请选择预约日期！',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  /**
   * 提交表单保存预约信息到全局变量
   */
  formSubmit:function(e){
    app.globalData.consumeProduct = e.detail.value;
    console.log(app.globalData.consumeProduct)
  }
})