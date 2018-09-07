var app = getApp();
function getCity() {
  wx.request({
    url: app.globalData.domain + "doctor/areaList.do",
    success: function(res) {
      console.log(res)
      return res.data.data;
    },
  })
}

module.exports = {
  getCity: getCity
}