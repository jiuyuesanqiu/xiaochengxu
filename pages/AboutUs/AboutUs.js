Page({
  data:{

  },
  onShow:function(){
    var res = wx.getSystemInfoSync();
    this.setData({
      "height": res.windowHeight
    })
    console.log(res.windowHeight)
  }
})