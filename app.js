//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //发起网络请求
        wx.request({
          url: 'http://localhost:8080/wxpay/openid.do',
          data: {
            code: res.code
          },
          success:function(e){
            wx.setStorage({
              key: 'openid',
              data: e.data.openid,
            })
            wx.request({
              url: 'http://localhost:8080/member/wxlogin.do',
              data:{
                openid:e.data.openid
              },
              success:function(result){
                console.log("我登录了")
                console.log(result);
                if(result.data.memberId==""){
                  wx.redirectTo({
                    url: 'register'
                  })
                }
              }
            })
          },
          fail:function(){
            console.log("登录失败！")
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
  },
   bb:'helloe',

})