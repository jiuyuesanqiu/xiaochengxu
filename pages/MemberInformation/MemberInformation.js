// pages/MemberInformation/MemberInformation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
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
    this.getMemberDetail()
  },

  /**
   * 获取会员信息
   */
  getMemberDetail: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + "member/getMemberDetail.do",
      data: {
        memberNumber: wx.getStorageSync("memberId")
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          "member": res.data.data
        })
      },
      fail: function (res) {
        console.log("请求会员信息失败")
      },
      complete: function (res) { },
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