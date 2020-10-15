// miniprogram/pages/Qpage/Qpage.js
const app = getApp()

Page({
  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    inputValue: '',
    items: [
      { name: 'Y', value: 'Yes. ' },
      { name: 'N', value: 'No.  ' },
      { name: 'M', value: 'Maybe.' },
    ],
    items_2: [
      { name: 'Y', value: 'Yes.  ' },
      { name: 'N', value: 'No.' },
    ],
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    array: ['TongJi University', 'FuDan University', 'SHJTU', 'ECNU'],
    objectArray: [
      {
        id: 0,
        name: 'TongJi University'
      },
      {
        id: 1,
        name: 'FuDan University'
      },
      {
        id: 2,
        name: 'SHJTU'
      },
      {
        id: 3,
        name: 'ECNU'
      }
    ],
    index: -1
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        // 描述，String 类型
        "description": "learn mini-program cloud service",
        // 截止时间，Date 类型
        "due": Date("2018-09-01"),
        "name":de,
        // 个性化样式，Object 类型
        "style": {
          "color": "red"
        },
        // 是否已完成，Boolean 类型
        "done": false
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        wx.navigateTo({
          url: "../submit/submit" //跳转到新的页面
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  
  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  //提交表单
  formSubmit:function(e){
    //获取表单中输入框数据
        var value = e.detail.value;
        console.log(value);
        if(value.username&&value.userID){
          wx.setStorage({
            name: value.username,
            success(){
              wx.navigateBack();
            }
          })
        } else{
          wx.showModal({
            title: '提示',
            content: '请填写完整资料',
            showCancel:false
          })
        }
      },

})