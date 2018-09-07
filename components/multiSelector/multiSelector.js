// components/multiSelector/multiSelector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrayData: {
      type: Array,
      observer: function(newVal, oldVal, changedPath) {
        this.init(newVal);
      }
    },
    condition: {
      type:Boolean,
      value: false,
    },
    thisId: String,
    key: String,
    itemName: String,
  },


  /**
   * 组件的初始数据
   */
  data: {
    multiIndex: [0, 0],
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    onshow:function(){
      console.log("用手玩")
    },
    onTap: function() {
      this.triggerEvent("change", {}, {
        bubbles: true,
        composed: true
      })
    },
    _dataTransform: function(departmentArray) {
      var first = [];
      var second = [];
      var result = [];
      for (var i = 0; i < departmentArray.length; ++i) {
        if (departmentArray[i].pid == 0) {
          first.push(departmentArray[i])
        } else {
          second.push(departmentArray[i])
        }
      }
      result.push(first);
      result.push(second);
      return result;
    },
    /**
     * 根据pid查找第二列数据
     */
    findData: function(pid, second) {
      var result = [];
      for (var i = 0; i < second.length; ++i) {
        second[i].pid == pid ? result.push(second[i]) : "";
      }
      return result;
    },
    bindMultichange: function(e) {
      var that = this;
      var tempId = that.data.array[1][e.detail.value[1]][that.properties.thisId];
      this.triggerEvent('idChange', {
        "thisId": tempId
      })
      if (this.data.condition == false) {
        this.setData({
          condition: true,
        })
      }
      this.setData({
        multiIndex: e.detail.value,
        array_bk: this.data.array
      })
    },
    bindMulticolumnchange: function(e) {
      // 第0列滚动才替换第1列数据
      if (e.detail.column == 0) {
        var result = this.findData(this.data.array[0][e.detail.value][this.properties.thisId], this.data.second)
        this.setData({
          "array[1]": result
        })
      }
    },
    init: function(newVal) {
      if (newVal.length != 0) {
        var array = this._dataTransform(newVal);
        var thisId = this.properties.thisId;
        //把第二列数据存起来
        var second = array[1];
        var result = this.findData(array[0][0][thisId], second);
        array[1] = result;
        this.setData({
          "array": array,
          "array_bk": array,
          "second": second
        })
      }
    }
  }
})