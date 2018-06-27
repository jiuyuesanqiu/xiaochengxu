// pages/MyCenter/MyCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 注册
   */
  register: function(e){
    console.log(e.detail.value.name)
    wx.request({
      url: 'http://localhost:8080/member/register.do',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        "name":e.detail.value.name,
        "phone":e.detail.value.phone,
        "verifyCode": e.detail.value.verifyCode
      },
      method:"POST",
      success: function (res) {
        console.log(res.data)
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
  
  }
})