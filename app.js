//app.js
App({
  onLaunch: function() {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //发起网络请求
        wx.request({
          url: that.globalData.domain + 'wxpay/openid.do',
          data: {
            code: res.code
          },
          success: function(e) {
            console.log(e)
            //统一判断错误代码
            if (e.data.errorcode!=0){
              console.log("请求openid失败！")
              return false;
            }
            wx.setStorage({
              key: 'openid',
              data: JSON.parse(e.data.data).openid,
            })
            wx.request({
              url: that.globalData.domain + 'member/wxlogin.do',
              data: {
                openid: e.data.data.openid
              },
              success: function(result) {
                //统一判断错误代码
                if (result.data.errorcode != 0) {
                  console.log("登录失败！")
                  return false;
                }
                console.log(result.data.data.memberId.length)
                if (result.data.data.memberId.length!=0) {
                  wx.switchTab({
                    url: '/pages/AboutDoctors/AboutDoctors'
                  })
                } else {
                  wx.setStorageSync("memberId", result.data.data.memberId)
                  that.getMemberDetail();
                  wx.switchTab({
                    url: 'register'
                  })
                }
              },
              fail() {
                console.log("发起网络请求错误！")
              }
            })
          },
          fail: function() {
            console.log("发起网络请求错误！")
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // domain: "http://localhost:8084/",
    domain: "https://bms.dev.imingyi.com/",
    consumeProduct: ""
  },
  bb: 'helloe',
  getMemberDetail: function() {
    wx.request({
      url: this.globalData.domain + "member/getMemberDetail.do",
      data: {
        memberNumber: wx.getStorageSync("memberId")
      },
      success: function(res) {
        if (res.data.errorcode != 0) {
          console.log("获取会员信息失败！")
          return false;
        }
        wx.setStorage({
          key: 'memberName',
          data: res.data.data.name,
        })
      }
    })
  },
  /**
   * 用promise封装request请求
   */
  get: function(url, data) {
    var promise = new Promise((resolve, reject) => {
      var getData = data;
      //网络请求
      wx.request({
        url: url,
        data: getData,
        success: function(res) { //服务器返回数据
          resolve(res.data.data)
        },
        error: function(e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
  post: function(url, data) {
    var promise = new Promise((resolve, reject) => {
      var getData = data;
      //网络请求
      wx.request({
        url: url,
        data: getData,
        method:"POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) { //服务器返回数据
          resolve(res.data.data)
        },
        error: function(e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  },
})