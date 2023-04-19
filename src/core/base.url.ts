const base = "http://109.205.180.74";
const urls = {
  user: `${base}:1904/api/v1/users`,
  transactions: `${base}:1098/transactions/list`,
  notifications: `${base}:1099/notification/list`,

  theme: `${base}:3002/additional-instructor/theme`,
  signin: `${base}:2000/api/v1/auth/login`,
  resetemail: `${base}:3002/additional-instructor/corporate/redeem`,
  verify: `${base}:2000/api/v1/auth/reset/verify`,
  resetPwd: `${base}:2000/api/v1/auth/reset/verify`,

  courses: `${base}:3001/adcourse/corporate_courses`,
  getCourses: `${base}:1906/api/v1/courses`,
  get_single: `${base}:3001/adcourse/free_courses`,
  getmypaidc: `${base}:1098/transactions/listpaid`,
  initiatePyament: `${base}:1098/transactions/initialize`,
  verifyTransactions: `${base}:1098/transactions/verify`,
};

export default urls;
