// pages/AccountWater/AccountWater.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:false
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
    this.getAccountWater();
  },
  /**
   * 获取账户流水
   */
  getAccountWater(){
    var that = this;
    wx.request({
      url: app.globalData.domain+"member/getAccountWater.do",
      data: {
        "memberNumber":wx.getStorageSync("memberId")
        // "memberNumber":40454540
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if (res.data.data.length == 0) {
          that.setData({
            "condition": true
          })
          return false;
        }
        that.setData({
          "accountWater":res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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
  
  }
})