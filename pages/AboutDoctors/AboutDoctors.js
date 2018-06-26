var cityData = require('../utils/city.js');
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    inputCity: "城市",
    inputHospital: "医院",
    inputOffice: "科室",
    inputTtile: "职称",
    content: [],
    nv: [],
    px: [],
    zc: [],
    qyopen: false,
    qyshow: false,
    pxopen: false,
    nzopen: false,
    zcopen: false,
    nzshow: false,
    pxshow: false,
    zcshow: false,
    isfull: false,
    cityleft: cityData.getCity(),
    citycenter: {},
    cityright: {},
    select1: '',
    select2: '',
    shownavindex: ''
  },
  showCity: function (e) {
    this.setData({
      inputCity: e.target.dataset.text
    })
    this.listqy();
  },
  showHospital: function (e) {
    this.setData({
      inputHospital: e.target.dataset.text
    })
    this.list();
  },
  showOffice: function (e) {
    this.setData({
      inputOffice: e.target.dataset.text
    })
    this.listpx();
  },
  showTitle: function (e) {
    this.setData({
      inputTtile: e.target.dataset.text
    })
    this.listzc();
  },
  onLoad: function () {
    this.setData({
      nv: ['全部', '南山医院', '北山医院', '西山医院', '东山医院', '中山医院'],
      px: ['全部', '内科', '外科', '妇产科', "儿科", "骨科", "口腔科", "耳鼻喉科", "康复医学科", "其他科室"],
      zc: ['全部', '主任医师', '主治医生', '主管药师', '副主任医师', '教授', '营养师']
    })
  },
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        zcopen: false,
        nzshow: true,
        pxshow: true,
        zcshow: true,
        qyshow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        qyopen: true,
        pxopen: false,
        nzopen: false,
        zcopen: false,
        nzshow: true,
        pxshow: true,
        zcshow: true,
        qyshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }

  },
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        zcopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        zcshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.nv,
        nzopen: true,
        pxopen: false,
        qyopen: false,
        zcopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        zcshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        zcopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        zcshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.px,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        zcopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        zcshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  listzc: function (e) {
    if (this.data.zcopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        zcopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: true,
        zcshow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.zc,
        nzopen: false,
        pxopen: false,
        qyopen: false,
        zcopen: true,
        nzshow: true,
        pxshow: true,
        qyshow: true,
        zcshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  selectleft: function (e) {

    this.setData({
      cityright: {},
      citycenter: this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2: ''
    });
  },
  selectcenter: function (e) {

    this.setData({
      cityright: this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  hidebg: function (e) {

    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  lower: function (e) {

  },
  toin: function () {
    wx.navigateTo({
      url: '../DoctorsHome/DoctorsHome'
    })
    console.log(2);
  }
});
