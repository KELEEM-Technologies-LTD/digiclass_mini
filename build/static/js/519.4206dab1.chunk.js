"use strict";(self.webpackChunkdigiclass_mini=self.webpackChunkdigiclass_mini||[]).push([[519],{3519:function(e,c,n){n.r(c);var t=n(4165),a=n(5861),r=n(7689),s=n(3239),o=n(2791),i=n(4880),u=n(5770),l=n(2981),f=n(106),d=n(2426),p=n.n(d),h=n(184);c.default=function(){var e=(0,r.TH)(),c=new URLSearchParams(e.search),n=c.get("trxref"),d=c.get("reference"),v=(0,r.UO)().corp_id,m=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var c,a,r,s,o,h,m;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!d||!n){e.next=32;break}return c={reference:d},a=i.d.retrieveUserData(),e.prev=3,e.next=6,u.Z.put(l.Z.verifyTransactions+"/".concat(a.user_id),c);case 6:return h=e.sent,(0,f.BY)("Transaction successful",(function(){window.location.href="/account/".concat(v,"?tab=2")})),m=null===(r=h.data)||void 0===r||null===(s=r.payload)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.amount,e.prev=9,e.next=12,u.Z.post(l.Z.sendemail,{to:a.email,subject:"Course purchase complete",text:"Course purchase completed, the course has been successfully added to the list of your courses"});case 12:e.next=16;break;case 14:e.prev=14,e.t0=e.catch(9);case 16:return e.prev=16,e.next=19,u.Z.post(l.Z.send_sms+"/".concat(null===a||void 0===a?void 0:a.user_id),{message:"Hi ".concat(a.first_name,", Your course purchase  has been successfully completed. A payment of GH ").concat(m/10," cedis was made on ").concat(p()().format("Do MMMM YYYY")," TransactionId : ").concat(d)});case 19:e.next=24;break;case 21:e.prev=21,e.t1=e.catch(16),console.log(e.t1);case 24:e.next=30;break;case 26:e.prev=26,e.t2=e.catch(3),(0,f.e)("Transaction verification failed",2e3,(function(){window.location.href="/account/".concat(v,"?tab=2")})),console.log(e.t2);case 30:e.next=33;break;case 32:(0,f.e)("Transaction verification failed, transaction id not found",2e3,(function(){window.location.href="/account/".concat(v,"?tab=2")}));case 33:case"end":return e.stop()}}),e,null,[[3,26],[9,14],[16,21]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){m()}),[]),(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"flex items-center justify-center h-screen bg-primary-200",children:(0,h.jsx)(s.Z,{color:"primary",size:60,thickness:5})})})}}}]);
//# sourceMappingURL=519.4206dab1.chunk.js.map