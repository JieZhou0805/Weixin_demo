// pages/table.js
Page({
  data: {
    items: [
      { name: 'Y', value: 'Yes. \t\t' },
      { name: 'N', value: 'No.  ' },
      { name: 'M', value: 'Maybe' },
    ],
    items_2: [
      { name: 'Y', value: 'Yes.  ' },
      { name: 'N', value: 'No.' },
    ]
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})
