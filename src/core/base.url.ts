const base = "http://109.205.180.74";
const urls = {
  theme: `${base}:3002/additional-instructor/theme`,
  signin: `${base}:2000/api/v1/auth/login`,
  resetemail: `${base}:3002/additional-instructor/corporate/redeem`,
  verify: `${base}:2000/api/v1/auth/reset/verify`,
  resetPwd: `${base}:2000/api/v1/auth/reset/verify`,
};

export default urls;
