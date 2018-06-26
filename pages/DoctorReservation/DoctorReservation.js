Page({
  data: {
    consultantArray: ['林宝  男  24岁', '天线    男   24岁', '宝宝  女  25岁', '大宝  女  26岁'],
    consultantIndex: 0,

    scoreArray: ['请选择自定义选项(选填)', '20', '30', '40', '50'],
    scoreIndex: 0,

    ReturnVisitArray: ['请选择自定义选项(选填)', '十分满意', '满意'],
    ReturnVisitIndex: 0,
  },

  consultant: function (e) {
    this.setData({
      consultantIndex: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiindex: e.detail.value
    })
  },
  ReturnVisit: function (e) {
    this.setData({
      ReturnVisitIndex: e.detail.value
    })
  },
  score: function (e) {
    this.setData({
      scoreIndex: e.detail.value
    })
  },
  sub: function () {
    wx.navigateTo({
      url: '../PaymentPage-doctor/PaymentPage-doctor'
    })
  }
})