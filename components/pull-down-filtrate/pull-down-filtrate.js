// components/pull-down-filtrate/pull-down-filtrate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    array:Array,
    key:String,
    index:Number,
    thisId:String,
    itemName: String,
    condition: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  methods: {
    _bindPickerChange: function (e) {
      var that = this;
      var tempId = that.properties.array[e.detail.value][that.properties.thisId];
      this.triggerEvent('idChange', { "thisId": tempId })
      if (this.data.condition == false) {
        this.setData({
          condition: true,
        })
      }
      this.setData({
        index: e.detail.value
      })
    },
  }
})
