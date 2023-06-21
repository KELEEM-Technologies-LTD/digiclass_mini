const base = "http://109.205.180.74";
const urls = {
  user: `${base}:1904/api/v1/users`,
  getUser: `${base}:1904/api/v1/users`,
  updateProfile: `${base}:1904/api/v1/users`,
  transactions: `${base}:1098/transactions/list`,
  notifications: `${base}:1099/notification/list`,
  postNotification: `${base}:1099/notification/send-notification`,

  theme: `${base}:3002/additional-instructor/theme`,
  signin: `${base}:2000/api/v1/auth/login`,
  signup: `${base}:2003/api/v1/corp/signup`,
  get_signup_questions: `${base}:2003/api/v1/fields`,
  resetemail: `${base}:3002/additional-instructor/corporate/redeem`,
  verify: `${base}:2000/api/v1/auth/reset/verify`,
  resetPwd: `${base}:2000/api/v1/auth/reset/verify`,

  courses: `${base}:3001/adcourse/corporate-courses`,
  course: `${base}:1906/api/v1/courses`,
  getCourses: `${base}:1906/api/v1/courses`,
  get_single: `${base}:3001/adcourse/free_courses`,
  getmypaidc: `${base}:1098/transactions/listpaid`,
  initiatePyament: `${base}:1098/transactions/initialize`,
  verifyTransactions: `${base}:1098/transactions/verify`,

  getReviews: `${base}:1908/api/v1/reviews`,
  updateSection: `${base}:3001/adcourse/sections/complete`,
  getSectionStatus: `${base}:3001/adcourse/sections`,
  faq: `${base}:3031/faq`,
  getAllCompletedSections: `${base}:3001/adcourse/sections/all`,

  //quiz
  results: `${base}:3031/quiz/quiz-results`,
  quiz_questions: `${base}:3031/quiz/question`,
  quiz_asnwers: `${base}:3031/quiz/answers`,
  secondary_upload: `${base}:1101/upload`,
  scores: `${base}:3031/quiz/scores`,
  getCerts: `${base}:3001/adcourse/certs`,
  sendEmail: `${base}:1100/send-email`,
  request_reseat: `${base}:3031/quiz/request-reseat`,

  files: `${base}:3002/additional-instructor/files`,

  hidden_courses: `${base}:3002/additional-instructor/enrolled-courses`,
  corporate_ids: `${base}:3002/additional-instructor/corporate-ids`,

  chatlist: `${base}:9110/simple-chat/chats`,
  conversations: `${base}:9110/simple-chat/messages`,
  getMsgName: `${base}:3000/messages/name`,

  preview: `${base}:3001/adcourse/course-preview`,
};

export default urls;
