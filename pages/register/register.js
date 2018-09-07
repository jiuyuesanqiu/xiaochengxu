// pages/MyCenter/MyCenter.js
var interval = null //倒计时函数
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    localVerifyCode: "",
    showTopTips: false,
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    code:"获取验证码",
    verifyCode:"verifyCode",
    name:""
  },
  inputname:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  verifiCodeInput: function(e) {
    this.setData({
      localVerifyCode: e.detail.value
    })
    console.log(this.data.localVerifyCode)
  },
  /**
   * 获取验证码
   */
  verifyCode: function() {
    //校验手机号是否输入
    var that = this;
    if (that.data.phone.length != 11) {
      that.showTopTips("手机号输入错误")
      return;
    }
    //移除事件
    this.setData({
      "verifyCode":""
    })
    //开始倒计时
    this.countdown(60);
    that.getCode();
    wx.request({
      url: app.globalData.domain +'member/getVerifyCode.do',
      data: {
        "phone": this.data.phone
      },
      success: function(res) {
        wx.setStorage({
          key: "verifyCode",
          data: res.data
        })
      }
    })
  },
  /**
   * 倒计时
   */
  countdown:function(time){
    var that = this;
    if(time==0){
      that.setData({
        code: "重新获取验证码",
        verifyCode: ""
      })
      //绑定事件
      return false;
    }
    time--
    setTimeout(function(){
      that.setData({
        code: time+"秒后重新获取"
      })
      that.countdown(time)
    },1000)
  },
  /**
   * 注册
   */
  register: function(e) {
    console.log(e)
    //判断姓名是否已输入
    if(this.data.name==""){
      this.showTopTips("请输入姓名")
      return false;
    }
    if(this.data.phone.length!=11){
      this.showTopTips("请输入正确的手机号")
      return false;
    }
    if (this.data.localVerifyCode==""){
      this.showTopTips("请输入验证码")
      return false;
    }
    
    //判断输入的验证码是否正确
    var that = this;
    wx.getStorage({
      key: 'verifyCode',
      success: function(res) {
        console.log(res.data)
        if (res.data != that.data.localVerifyCode) {
          that.showTopTips("验证码错误");
        } else {
          wx.request({
            url: app.globalData.domain + 'member/wxRegister.do',
            header: {
              'content-type': 'application/x-www-form-urlencoded' 
            },
            data: {
              "name": that.data.name,
              "phone": that.data.phone,
              "openid": wx.getStorageSync("openid")
            },
            method: "POST",
            success: function(result) {
              that.openToast();
              wx.setStorage({
                key: 'memberId',
                data: result.data.memberId,
                success: function() {
                  //跳转到约名医界面
                    wx.switchTab({
                      url: '/pages/AboutDoctors/AboutDoctors'
                    })
                }
              })
            }
          })
        }
      }
    })
  },
  //展示错误提示
  showTopTips: function(msg) {
    var that = this;
    this.setData({
      "errormsg":msg,
      "showTopTips": true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  getCode: function(options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime + 's'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.verifyCode();
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  //弹出登录成功提示
  openToast: function() {
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 3000
    });
  },
})