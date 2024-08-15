const config = require('./config');
const crypto = require('./crypto');

const defaultPassword = "12345678";

export const handleLogin = () => {
  const userInfo = wx.getStorageSync('userInfo');

  if (!userInfo) {
    console.log('[wx.getUserProfile] start');
    wx.navigateTo({ url: '/pages/login/login' });
    return;
  }

  console.log('[userInfo exist]', userInfo);
  const { nickName, avatarUrl } = userInfo;

  // get open id by code
  wx.login({
    success(res) {
      if (res.code) {
        console.log("res.code: ", res.code);

        console.log('[wx.request /wechat-login]');
        wx.request({
          url: config.domain + "/wechat-login",
          method: "POST",
          data: {
            userName: res.code,
            passWord: crypto.encrypt(defaultPassword),
            nickName,
            avatarUrl,
          },
          success: (res) => {
            console.log("[login] res: ", res);

            const token = res.data.data.accessToken;
            wx.setStorageSync("token", token);
            console.log("[login], set token to storage", token);
          },
          fail: (res) => {
            console.log("[login] fail: ", res);
          },
        });
        console.log("[login end] internet request...");
      } else {
        console.log("[login error] code is null");
      }
    },
  });
};
