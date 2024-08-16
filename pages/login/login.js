import { handleLogin } from "../../utils/login";

const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: "",
    theme: wx.getSystemInfoSync().theme,
    agree: false,
    loginDisable: true,
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

  checkLoginDisable() {
    const { nickName, avatarUrl, agree } = this.data;

    const loginDisable = !(
      agree &&
      nickName.length > 0 &&
      avatarUrl !== defaultAvatarUrl
    );

    this.setData({ loginDisable });

    return loginDisable;
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
    this.checkLoginDisable();
  },

  handleInput(e) {
    console.log("handleInput", e);
    this.setData({ nickName: e.detail.value });
    this.checkLoginDisable();
  },

  handleCheckboxChange() {
    this.setData({ agree: !this.data.agree });
    this.checkLoginDisable();
  },

  handleProfile() {
    if (this.checkLoginDisable()) {
      console.log("参数不全，请输入");
      return;
    }

    const { nickName, avatarUrl } = this.data;
    const userInfo = { nickName, avatarUrl };

    wx.setStorageSync("userInfo", userInfo);
    console.log("save userInfo storage", userInfo);

    handleLogin();

    wx.switchTab({ url: "/pages/index/index" });
  },
});
