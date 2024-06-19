var http = require("../../utils/http.js");
var crypto = require("../../utils/crypto.js");

const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
const defaultPassword = "12345678";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    openid: "",
    // 用户名
    nickName: "",
    // 密码
    password: defaultPassword,
    // 是否显示注册
    isRegister: false,
    theme: wx.getSystemInfoSync().theme,
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
    });
  },

  onGotUserInfo: function (res) {
    http.updateUserInfo();
    wx.navigateBack({
      delta: 1,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isRegister: options.isRegister == 0,
    });
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 输入框的值
   */
  getInputVal: function (e) {
    const type = e.currentTarget.dataset.type;
    if (type == "account") {
      this.setData({
        userName: e.detail.value,
      });
    } else if (type == "password") {
      this.setData({
        password: e.detail.value,
      });
    }
  },

  /**
   * 切换注册/登录
   */
  handleChangeShowType() {
    let str = this.data.isRegister ? "1" : "0";
    wx.redirectTo({
      url: "/pages/login/login?isRegister=" + str,
    });
  },

  /**
   * 注册/登录按钮
   */
  handleLoginOrRegister() {
    const that = this;
    if (!this.data.userName.trim()) {
      wx.showToast({
        title: "请输入用户名",
        icon: "none",
      });
      return;
    }
    if (!this.data.password.trim()) {
      wx.showToast({
        title: "请输入密码",
        icon: "none",
      });
      return;
    }
    const params = {
      url: this.data.isRegister ? "/user/register" : "/login",
      method: "POST",
      data: {
        userName: this.data.userName,
        passWord: crypto.encrypt(this.data.password),
      },
      callBack: (res) => {
        wx.setStorageSync("token", res.accessToken);
        if (this.data.isRegister) {
          that.setData({
            userName: "",
            password: "",
            isRegister: !that.data.isRegister,
          });
          wx.showToast({
            title: "注册成功，请登录",
            icon: "none",
          });
        } else {
          wx.switchTab({
            url: "/pages/index/index",
          });
        }
      },
    };
    http.request(params);
  },

  /**
   * 登录按钮
   */
  handleLogin() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          const params = {
            url: "/wechat-login",
            method: "POST",
            data: {
              userName: res.code,
              nickName: that.data.nickName,
              passWord: crypto.encrypt(that.data.password),
              avatarUrl: that.data.avatarUrl,
            },
            callBack: (res) => {
              wx.setStorageSync("token", res.accessToken);
              wx.switchTab({ url: "/pages/index/index" });
            },
          };

          http.request(params);

          console.log("login success, internet request...");
          console.log("res.code: ", res.code);
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  },
});
