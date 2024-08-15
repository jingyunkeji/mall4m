const config = require('./config');
const crypto = require('./crypto');

const defaultPassword = "12345678";

export const handleLoginTest = () => {
  console.log("[handleLoginTest]");

  const userInfo = wx.getStorageSync('userInfo');

  if (!userInfo) {
    console.log('[wx.getUserProfile] start');
    wx.navigateTo({ url: '/pages/login/login' });
    return;
  }

  console.log('[userInfo exist]', userInfo);
  const { nickName, avatarUrl } = userInfo;

  // get open id by code
  console.log('wx.request wechat-login');
  wx.login({
    success(res) {
      if (res.code) {
        console.log("res.code: ", res.code);

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

      if (res.errMsg) {
        // console.log("[login error] " + res.errMsg);
      }
    },
  });
};

export const handleLogin = () => {
  // get userInfo
  wx.getUserProfile({
    desc: "登录验证",
    success: (res) => {
      console.log(res.userInfo);
      // this.setData();
    },
  });

  let that = this;
  wx.login({
    success(res) {
      if (res.code) {
        console.log(res.code);

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
        console.log("[login] code is null");
      }

      if (res.errMsg) {
        console.log("[login error] " + res.errMsg);
      }
    },
  });
};
