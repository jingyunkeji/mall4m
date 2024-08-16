// pages/user/user.js

var http = require("../../utils/http.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfX2tynrrLn6eqrsbXq7O3h4+SyuLva3d6/w8bLz9HU19nR1NbIzM66v8KaEzi7AAAFHUlEQVR4nO2d23LjIAxAjREXYwP//7cLTrpNUzs1IEdyhvOwM7vbB5+RAHHtMHQ6nU6n0+l0Op1Op9PpdDqdTqfT6XQ6nU4JoDUMZhoTk1n/clHSt5vFRftNdN5oTf1dFYA2wYrf2HA5H9DBSrXhIoSSYoYLpRsMQcpNkxtSBkP9jUcxs3qlsuqoYC4QHTDebufXk4717HVgcuqIS2o7yk28bcDHYyqrjvWc+zUI4rhLshGBb2zAFZjcdNzAVAcKUuy/TeRpU+PC1qbKJdswHEBdnUsacQL1p/8i1Lqk2MzUH/8TWKpVcg+9sGo25lAJs4udqAUeqW4w99hEPqEB3+aSOgFGhU2jSo4Nl9Do8Nf05YCMYxIaaHdJNjyGTh0RXISILEJjMAKT4DBV043d8n8cvQyYrdWxCpSlD42ecVwSM3mrAZzmL3LvTN2hwYSUZQk7EucZ4GVZmgoQ5xlg9WWCQZ5NlZPlTZlIOxOABa/JJGgnaZhNJjcaWpmGqf+GDO3ShkFs/+Q9AGb7X5fQCPMMJrTxf4W0PIMRtTMTgrIGQO6ZhSKVaV6WeZJZ6FzQZeQnySj/QTLyk2Ro20zL4v+mTB9nmMqQLtB8UjmDXTWTFprNu0xPMrRTAOTJGe1OLfK02dNOm1G7M+pVQPNBS024i4DURzXAI6410zaZofk4wwPkWZY3zpBc0ihDHRjMwpk8y5IN1jZgpDYZEPcBA/kuYAJwXCy1xwrMKCc0mJwKhqLDzHtQW9yBpT00kkFXdqPuEPAjynJo/SswNQeG040N35Zoktf52abiWTnqz/8BTC31puWUZEPjTg31MZNfNExsKFfL96it0Xg1/i/mqmbD0wVqOmjS7aXXjAdvAn67UG7I/AEYWxIcKchn/a+AwR23kbzGyg30cnBCoNTCprjcBYw7pOOYDfvbgB7j6+JGKRvHq7zaALA4uxuepOKWS70IAFNwdqOjzkEJ05VUMgBm9CFaKdXqlP6U0kY3j+ZqKivJx0yLD8FlQpiXabqmyZ307eaL4coi62stT1xQJ3/2YCY/pwyLD8/OuJxqZv3fa5BayhKikCtP3Zm6/6t188TysvkX+dtSMJz97bA11qQfyj3bYPhJ5WY+zlmkZA6QfjqGlHecfFJi5YioIpHvzEs5tzBJOtBDDknprOynj4jB05cFqWxpNHnwWQbKTk6/LChLfVLVNhsqHT34iKZy8xE2TBQ6WgdEjQfi26MD4Nsbyg7yvUfokopAutC8hZLubas2qVwpWlCq0RHhLXMFGEbUo4x7OtafP46CCWgnf17bKDeeG5y8UnFyhj3o2FOf2oPhTWH50onnbUMB7nW5IzZ2Pqnl6OWtYblzzmtuULeX1Io6Zff2fS3/yUZij6BgIpGLyDfRUGMDeMdKq2wwTwm1HVlAAPE6OrkLog0DlwSOzfuHym0w2g3gXl6qx2L0aajXfVpAuJDWeCwOkebXQ2Fk49J8boB4sHymbfAEqoJsB9VQdGIcWEZFNby1h3TKH5H6REN7IA+Tyh6t/ej1CdS+t6l5lDHPVA2dMFJ/9iZ1oWEamKprtujvFmBRc2kQ82osKqripWoms5gtiudp4Kk/eZfyJxC4TMm2KO0CsB8uQ6X0QQfs13FQKc4zmoXlgxROoDk3mVQ7FzUazOdxT6Dsvh2MnAMjVNFvFmM3xXyibJ0G5e71edgSGcNm5W+HIhkneVNUa66/AZMxZaMm8KbIpdPpdDqdTucq/AMef1AMtjuGRwAAAABJRU5ErkJggg==',
    nickName: '微信用户',
    orderAmount: '',
    sts: '',
    collectionCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      url: '/p/user/userInfo',
      method: 'GET',
      callBack: (res) => {
        console.log(res);
        
        const { nickName, pic: avatarUrl } = res;

        if (nickName && avatarUrl) this.setData({ nickName, avatarUrl })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    //加载订单数字
    var ths = this;
    // var status = ths.data.status
    wx.showLoading();
    var params = {
      url: "/p/myOrder/orderCount",
      method: "GET",
      data: {},
      callBack: function (res) {
        wx.hideLoading();
        ths.setData({
          orderAmount: res
        });
      }
    };
    http.request(params);
    this.showCollectionCount();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toDistCenter: function () {
    wx.showToast({
      icon: "none",
      title: '该功能未开源'
    })
  },

  toCouponCenter: function () {
    wx.showToast({
      icon: "none",
      title: '该功能未开源'
    })
  },

  toMyCouponPage: function () {
    wx.showToast({
      icon: "none",
      title: '该功能未开源'
    })
  },

  toAddressList: function () {
    wx.navigateTo({
      url: '/pages/delivery-address/delivery-address',
    })
  },

  // 跳转绑定手机号
  toBindingPhone: function () {
    wx.navigateTo({
      url: '/pages/binding-phone/binding-phone',
    })
  },

  /**
 * 退出登录
 */
  logout: function () {
    // 请求退出登陆接口
    http.request({
      url: '/logOut',
      method: 'post',
      callBack: res => {
        util.removeTabBadge()

        wx.removeStorageSync('loginResult');
        wx.removeStorageSync('token');

        // this.$Router.pushTab('/pages/index/index')
        wx.showToast({
          title: "退出成功",
          icon: "none"
        })

        this.setData({
          orderAmount: ''
        });
        setTimeout(() => {
          wx.switchTab({
            url: "/pages/index/index"
          })
        }, 1000)
      }
    })
  },

  toOrderListPage: function (e) {
    var sts = e.currentTarget.dataset.sts;
    wx.navigateTo({
      url: '/pages/orderList/orderList?sts=' + sts,
    })
  },
  /**
   * 查询所有的收藏量
   */
  showCollectionCount: function () {
    var ths = this;
    wx.showLoading();
    var params = {
      url: "/p/user/collection/count",
      method: "GET",
      data: {},
      callBack: function (res) {
        wx.hideLoading();
        ths.setData({
          collectionCount: res
        });
      }
    };
    http.request(params);
  },
  /**
   * 我的收藏跳转
   */
  myCollectionHandle: function () {
    var url = '/pages/prod-classify/prod-classify?sts=5';
    var id = 0;
    var title = "我的收藏商品";
    if (id) {
      url += "&tagid=" + id + "&title=" + title;
    }
    wx.navigateTo({
      url: url
    })
  }
})