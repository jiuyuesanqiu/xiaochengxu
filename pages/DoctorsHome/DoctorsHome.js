var sliderWidth = 88; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data: {
    tabs: ["服务项目", "医生评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    //根据doctorid请求医生详情
    wx.request({
      url: app.globalData.domain +"doctor/dcotorInfoAndScheduling.do",
      data: {
        "doctorId": e.doctorId
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          "doctorDetails":res.data.data,
          "introduction": e.introduction
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  toleft:function(){
    wx.navigateTo({
      url: '../GraphicReservation/GraphicReservation'
    })
  },
  tocenter: function () {
    wx.navigateTo({
      url: '../TelephoneReservation/TelephoneReservation'
    })
  },
  toright: function () {
    wx.navigateTo({
      url: '../DoctorReservation/DoctorReservation?city=' + this.data.doctorDetails.areaName + "&hospital=" + this.data.doctorDetails.hospital + "&depart=" + this.data.doctorDetails.depart + "&doctorName=" + this.data.doctorDetails.doctorName
    })
  }
  ,
  /**
   * 弹出服务说明
   */
  openAlert1: function () {
    wx.showModal({
      content: '文字/图片方式留言，等医生上线回复',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  openAlert2: function () {
    wx.showModal({
      content: '与医生本人通过电话咨询',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  openAlert3: function () {
    wx.showModal({
      content: '与医生面对面看诊',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }
});