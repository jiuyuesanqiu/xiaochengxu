var app = getApp();
var doctorResult = []; //请求医生列表接口返回的数据
Page({
  data: {
    inputShowed: false,
    doctorArray: [], //医生列表渲染数据
  },
  onLoad:function(){
    this.getCityList();
    this.getHospitalList();
    this.getDepartmentList();
    this.getTitleList();
  },
  onShow: function() {
    //初始化页面数据
    this.setData({
      nodata:false,
      loadStatus:false,
      condition: false,
      parameters: {
        "keywords": "", //搜索关键词
        "beginRow": 0, //起始行数
        "count": 10, //每页条数
        "cityId": 0, //城市编码
        "hospitalId": 0, //医院编码
        "departmentId": 0, //部门编码
        "jobtitle": "" //职称
      }
    })
    //设置滚动条高度
    this.setScrollheight();
    this.getDoctorList().then((res) => {
      this.setData({
        "doctorArray": doctorResult
      })
    });
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    //清除关键字搜索
    var e = {
      "detail": { "value": "" }
    };
    this.search(e)
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  toin: function(e) {
    wx.navigateTo({
      url: '../DoctorsHome/DoctorsHome?doctorId=' + e.currentTarget.dataset.doctorid + "&introduction=" + e.currentTarget.dataset.introduction
    })
  },
  //按条件搜索
  search: function(e) {
    var that = this;
    var keywords = "";
    if(e!=undefined){
      keywords=e.detail.value
    }
    console.log("搜索内容是",keywords)
    console.log("搜索的条件是", that.data.parameters)
    //初始化
    that.setData({
      "parameters.keywords": keywords,
      "parameters.beginRow": 0,
      "nodata": false
    })
    that.getDoctorList().then(res=>{
      that.setData({
        "doctorArray": doctorResult
      })
    });
  },
  setScrollheight: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          "scrollHeight": res.windowHeight-48
        })
      },
    })
  },
  /**
   * 获取医生列表数据
   */
  getDoctorList: function() {
    var that = this;
    var promise = new Promise((resolve, reject) => {
      var url = app.globalData.domain + 'doctor/famousDoctorList.do';
      app.post(url, that.data.parameters).then((res) => {
        doctorResult = res;
        resolve("赋值成功")
      })
    });
    return promise;
  },
  /**
   * 滚动到底部时加载下一页数据
   */
  lower: function() {
    if (doctorResult.length == 0) {
      return false;
    }
    //显示加载中
    this.setData({
      loadStatus:true
    })
    var that = this;
    var parameters = that.data.parameters;
    var beginRow = parameters.beginRow + parameters.count;
    that.setData({
      "parameters.beginRow": beginRow
    })
    that.getDoctorList().then((res) => {
      if (doctorResult.length == 0) {
        that.setData({
          loadStatus: false,
          "nodata": true
        })
        return false;
      }
      setTimeout(() => {
        that.setData({
          "doctorArray": that.data.doctorArray.concat(doctorResult),
          //隐藏加载中
          loadStatus: false
        })
      }, 500)
    })
  },
  /**
   * 获取城市列表数据
   */
  getCityList: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + 'doctor/areaList.do',
      success: function (res) {
        //在数组前添加元素
        res.data.data.unshift({
          "cityId": 9999,
          "cityName": "全部",
          "pid": 0
        },{
            "cityId": 0,
            "cityName": "全部",
            "pid": 9999
          })
        that.setData({
          "cityArray": res.data.data
        })
      },
    })
  },
  /**
   * 获取医院列表
   */
  getHospitalList: function (cityId) {
    cityId == undefined ? cityId = 0 : cityId;
    var that = this;
    wx.request({
      url: app.globalData.domain + 'doctor/hospitalList.do',
      data: {
        "areaId": cityId
      },
      success: function (res) {
        res.data.data.unshift({
          "hospitalName": "全部",
          "hospitalId": 0,
          "areaId": 0
        })
        that.setData({
          "hospitalArray": res.data.data
        })
      },
    })
  },
  /**
   * 获取科室列表
   */
  getDepartmentList: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + 'doctor/deptList.do',
      success: function (res) {
        res.data.data.unshift({
          "pid": 9999,
          "departmentId": 0,
          "departmentName": "全部"
        },{
            "pid": 0,
            "departmentId": 9999,
            "departmentName": "全部"
          })
        that.setData({
          "departmentArray": res.data.data
        })
      },
    })
  },
  /**
   * 获取职称列表
   */
  getTitleList: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + 'doctor/docJobTitleList.do',
      success: function (res) {
        res.data.data.unshift({
          "jobtitle": "全部",
          "sumJobTitle": "",
          "depId": 0
        })
        that.setData({
          "titleArray": res.data.data
        })
      },
    })
  },
  /**
   * 城市修改后
   */
  cityChange: function (e) {
    //修改医院数据
    this.getHospitalList(e.detail.thisId)
    this.setData({
      "parameters.cityId":e.detail.thisId
    })
    this.search()
  },
  titleChange: function (e) {
    if(e.detail.thisId=="全部"){
      e.detail.thisId=""
    }
    this.setData({
      "parameters.jobtitle": e.detail.thisId
    })
    this.search()
  },
  hospitalChange: function (e) {
    this.setData({
      "parameters.hospitalId": e.detail.thisId
    })
    this.search()
  },
  departmentChange:function(e){
    this.setData({
      "parameters.departmentId": e.detail.thisId
    })
    this.search()
  }
});