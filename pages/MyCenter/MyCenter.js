// pages/MyCenter/MyCenter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    this.getAccount();
    this.getMemberDetail();
    console.log(this.data)
  },
  /**
   * 获取会员信息
   */
  getMemberDetail:function(){
    var that = this;
    wx.request({
      url: app.globalData.domain +"member/getMemberDetail.do",
      data: {
        memberNumber: wx.getStorageSync("memberId")
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          "item":res.data.data
        })
        wx.setStorage({
          key: 'memberName',
          data: res.data.data.name,
        })
      },
      fail: function(res) {
        console.log("请求会员信息失败")
      },
      complete: function(res) {},
    })
  },
  /**
   * 获取会员账户详情
   */
  getAccount:function(){
    var that = this;
    wx.request({
      url: app.globalData.domain +'member/getAccountDetail.do',
      data: {
        "memberNumber": wx.getStorageSync("memberId")
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          "balance": res.data.data.accBalance
        })
      },
      fail: function(res) {
        console.log("获取账户信息失败")
      },
      complete: function(res) {},
    })
  },
  toMyService: function () {
    wx.switchTab({
      url: '/pages/MyServices/MyServices'
    })
  },
  toAccountWater:function(){
    wx.navigateTo({
      url: '/pages/AccountWater/AccountWater'
    })
  },
  toOrderList:function(){
    wx.navigateTo({
      url: '/pages/OrderList/OrderList',
    })
  },
  toRecharge:function(){
    wx.navigateTo({
      url: '/pages/AccountRecharge/AccountRecharge',
    })
  },
  toInformation:function(){
    wx.navigateTo({
      url: '/pages/MemberInformation/MemberInformation',
    })
  },
  /**
   * 关于我们
   */
  toWe:function(){
    wx.navigateTo({
      url:"/pages/AboutUs/AboutUs"
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