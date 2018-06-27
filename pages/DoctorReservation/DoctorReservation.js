Page({
  data: {
    consultantArray: ['林宝  男  24岁', '天线    男   24岁', '宝宝  女  25岁', '大宝  女  26岁'],
    consultantIndex: 0,

    scoreArray: ['请选择自定义选项(选填)', '20', '30', '40', '50'],
    scoreIndex: 0,

    ReturnVisitArray: ['请选择自定义选项(选填)', '十分满意', '满意'],
    ReturnVisitIndex: 0,

    PaymentMethodArray: ['请选择自定义选项(选填)', '医保', '自费'],
    PaymentMethodIndex:0,

    AccompanyingDiagnosisArray: ['请选择自定义选项(选填)', '是', '否'],
    AccompanyingDiagnosisIndex:0,
   
    MedicalCardArray: ['请选择自定义选项(选填)', '是', '否'],
    MedicalCardIndex: 0,
    
    DoctorReturnVisitArray: ['请选择自定义选项(选填)', '是', '否'],
    DoctorReturnVisitIndex: 0,
    
    sendArray: ['请选择自定义选项(选填)', '是', '否'],
    sendIndex: 0,

    sexArray: ['请选择自定义选项(选填)', '男', '女'],
    sexIndex: 0,
  },
  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
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
  PaymentMethod: function (e) {
    this.setData({
      PaymentMethodIndex: e.detail.value
    })
  },
  AccompanyingDiagnosis: function (e) {
    this.setData({
      AccompanyingDiagnosisIndex: e.detail.value
    })
  },
  MedicalCard: function (e) {
    this.setData({
      MedicalCardIndex: e.detail.value
    })
  },
  DoctorReturnVisit: function (e) {
    this.setData({
      DoctorReturnVisitIndex: e.detail.value
    })
  },
  send: function (e) {
    this.setData({
      sendIndex: e.detail.value
    })
  },
  sex: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },

  sub: function () {
    wx.navigateTo({
      url: '../PaymentPage-doctor/PaymentPage-doctor'
    })
  }
})