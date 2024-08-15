import { handleLogin } from "../../utils/login";

var http = require("../../utils/http.js");
var crypto = require("../../utils/crypto.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    agree: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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

  handleCheckboxChange() {
    this.setData({ agree: !this.data.agree });
  },

  handleProfile() {
    wx.getUserProfile({
      desc: "登录验证",
      success: (res) => {
        const { userInfo } = res;
        // userInfo example
        // {
        //   nickName: "example",
        //   language: "zh_CN",
        //   avatarUrl: "https://github.com/example.png",
        // };
        wx.setStorageSync("userInfo", userInfo);
        console.log("save userInfo storage", userInfo);

        handleLogin();

        wx.switchTab({ url: "/pages/index/index" });
      },
      fail: (err) => {
        console.log("[wx.getUserProfile fail]", err);
      },
    });
  },
});
