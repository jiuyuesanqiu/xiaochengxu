// pages/AccountRecharge/AccountRecharge.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 设置充值金额
   */
  setAmount:function(e){
    console.log(e);
    this.setData({
      "amount":e.detail.value
    })
  },
  recharge:function(e){
    var that = this;
    console.log(that.data.amount)
    if(that.data.amount==undefined||that.data.amount==""){
      //弹出错误提示
      that.openAlert();
      return false;
    }
    //body,total_fee,spbill_create_ip,openid
    wx.request({
      url: app.globalData.domain + "wxpay/order.do",
      data: {
        "body":"储值账户充值",
        "total_fee": that.data.amount,
        "spbill_create_ip":"218.18.102.113",
        "openid":wx.getStorageSync("openid")
      },
      header: {
        "content-type":"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        //小程序调起支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp + "",
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function(res) {
            wx.request({
              url: app.globalData.domain + "member/accountRecharge.do",
              data: {
                "amount": that.data.amount,
                "memberNumber":wx.getStorageSync("memberId")
              },
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              success: function(res) {
                that.openToast();
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          fail: function(res) {},
          complete: function(res) {
          },
        })
      },
      fail: function(res) {
        console.log("请求未成功")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 弹出错误提示
   */
  openAlert: function () {
    wx.showModal({
      content: '充值金额不能为空',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  /**
   * 展示充值成功
   */
  openToast: function () {
    wx.showToast({
      title: '充值成功',
      icon: 'success',
      duration: 1500
    });
  }
})