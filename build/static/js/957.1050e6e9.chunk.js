"use strict";(self.webpackChunkdigiclass_mini=self.webpackChunkdigiclass_mini||[]).push([[957],{3957:function(e,n,t){t.r(n);var a=t(4165),r=t(5861),o=t(9439),i=t(2791),s=t(2592),c=t(4849),l=t(3908),d=t(5240),u=t(5770),v=t(2981),p=t(7689),f=t(1087),m=t(4880),h=t(106),g=t(456),x=t(184);n.default=function(){var e=(0,i.useContext)(d.Z),n=e.loading,t=e.theme,w=e.corpid,b=e.setCorpId;document.title="".concat(null===t||void 0===t?void 0:t.name," - DigiClass");var y=(0,i.useState)(""),j=(0,o.Z)(y,2),Z=(j[0],j[1]),k=(0,i.useState)(!1),N=(0,o.Z)(k,2),C=N[0],S=N[1],U=(0,i.useState)(""),_=(0,o.Z)(U,2),E=_[0],I=_[1],T=(0,i.useState)(""),z=(0,o.Z)(T,2),D=z[0],q=z[1],P=(0,i.useState)(""),R=(0,o.Z)(P,2),A=R[0],L=R[1],B=(0,p.UO)().corp_id;(0,i.useEffect)((function(){""===w&&b(B)}),[]);var O=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(n){var t,r,o,i,s,c,l,d,p,f,h,g,x,b;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),S(!0),e.prev=2,e.next=5,u.Z.post(v.Z.signin,{username:D,password:A});case 5:if(i=e.sent,null===(s=null===(t=i.data)||void 0===t?void 0:t.data)||void 0===s||null===(r=s.user)||void 0===r||!r.is_corporate||(null===s||void 0===s||null===(o=s.user)||void 0===o?void 0:o.corporate_id)!==w){e.next=18;break}return l=s.token,m.d.saveAccessToken(l),e.next=12,u.Z.get(v.Z.get_corporate+"/".concat(w,"?"));case 12:d=e.sent,p=null===(c=d.data)||void 0===c?void 0:c.data,f=s.user,p.verify_auth?"pending"===f.user_state?I("This organization has not approved your account to view content on their page."):(h=s.user,m.d.saveUserData(h),window.location.href="/main/".concat(w)):(m.d.saveUserData(f),window.location.href="/main/".concat(w)),e.next=19;break;case 18:I("This organization has not authorized you to view content on their page.");case 19:S(!1),e.next=26;break;case 22:e.prev=22,e.t0=e.catch(2),I(null!==(g=null===e.t0||void 0===e.t0||null===(x=e.t0.response)||void 0===x||null===(b=x.data)||void 0===b?void 0:b.message)&&void 0!==g?g:"There was an error"),S(!1);case 26:case"end":return e.stop()}}),e,null,[[2,22]])})));return function(n){return e.apply(this,arguments)}}(),F=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(n){var t,r,o,i,s,c,l,d,p,f;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,g.Z)(n.credential),e.prev=1,(0,h.t)("authenticating...."),e.next=5,u.Z.post(v.Z.signin,{username:t.email,password:"880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com"});case 5:200===(r=e.sent).status?(l=null===(o=r.data)||void 0===o||null===(i=o.data)||void 0===i?void 0:i.user,d=null===(s=r.data)||void 0===s||null===(c=s.data)||void 0===c?void 0:c.token,m.d.saveUserData(l),m.d.saveAccessToken(d),(0,h.BY)("Logged in successfully",(function(){var e=new URLSearchParams(window.location.search).get("currentUrl");window.location.href=null!==e?"/reload?currentUrl=".concat(e):"/reload"}))):(0,h.e)("There was an error, please reload the page and try again"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),(0,h.e)(null===(p=e.t0.response)||void 0===p||null===(f=p.data)||void 0===f?void 0:f.message);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(n){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){google.accounts.id.initialize({client_id:"880710449497-8k8qttcfig311nqmh16l0qjbd53er8he.apps.googleusercontent.com",callback:F}),google.accounts.id.renderButton(document.getElementById("google_sign_icon"),{theme:"outline",size:"large"});var e=new URLSearchParams(window.location.search).get("currentUrl");Z(e),H()}),[]);var H=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){var n,t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.d.getAccessToken();case 2:return n=e.sent,e.next=5,m.d.retrieveUserData();case 5:if(t=e.sent,null===n||null===t){e.next=10;break}window.location.href="/main/".concat(w||t.corporate_id),e.next=12;break;case 10:return e.next=12,m.d.clearStorage();case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return n?(0,x.jsx)(l.Z,{}):(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("div",{className:"bg-gray-100",style:{minHeight:"100vh"},children:(0,x.jsx)("div",{style:{},className:"flex flex-col justify-center  md:items-center pt-8",children:(0,x.jsxs)("div",{className:" md:w-3/12 md:p-0 px-6",children:[(0,x.jsx)("div",{className:"flex flex-col",children:(0,x.jsx)("div",{className:"flex justify-center items-center mb-3",children:(0,x.jsx)(s.Z,{fluid:!0,src:null===t||void 0===t?void 0:t.img,alt:"Logo",style:{height:"100px"}})})}),(0,x.jsx)("p",{className:"text-2xl mb-3 font-semibold text-dark text-center",children:"Log into your account"}),(0,x.jsx)("div",{style:{height:"1.4px"},className:"my-4 bg-slate-300"}),(0,x.jsx)("div",{id:"google_sign_icon"}),(0,x.jsx)("small",{className:"text-danger",children:E}),(0,x.jsxs)("form",{action:"",onSubmit:O,children:[(0,x.jsx)("div",{className:"mt-3",children:(0,x.jsx)("input",{type:"text",className:"py-3 px-4 w-full border border-black rounded bg-gray-50 outline-none",placeholder:"Enter your user id",value:D,onChange:function(e){return q(e.target.value)}})}),(0,x.jsx)("div",{className:"mt-3",children:(0,x.jsx)("input",{type:"password",className:"py-3 px-4 w-full border border-black rounded bg-gray-50 outline-none",placeholder:"Enter your password",value:A,onChange:function(e){return L(e.target.value)}})}),(0,x.jsx)("div",{className:"flex justify-end",children:(0,x.jsx)(f.rU,{to:"/redeem/".concat(w),className:"text-decoration-none text-base mt-3",children:"Redeem account"})}),(0,x.jsx)("div",{className:"mt-4 text-center",children:(0,x.jsx)("button",{type:"submit",style:{backgroundColor:null===t||void 0===t?void 0:t.primary_color},disabled:C,className:"whitespace-nonwrap border py-2 px-12 text-base font-medium text-white hover:bg-secondary-800",children:C?(0,x.jsx)(c.Z,{}):"Sign In"})})]}),(0,x.jsxs)("div",{className:"flex items-center mt-4 justify-center",children:[(0,x.jsx)("p",{children:"New to Digiclass?"}),(0,x.jsx)(f.rU,{to:"/sign-up/".concat(w),children:(0,x.jsx)("p",{className:"ml-2 text-base text-gray-700",children:"Sign Up"})})]})]})})})})}},456:function(e,n,t){function a(e){this.message=e}a.prototype=new Error,a.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var n=String(e).replace(/=+$/,"");if(n.length%4==1)throw new a("'atob' failed: The string to be decoded is not correctly encoded.");for(var t,r,o=0,i=0,s="";r=n.charAt(i++);~r&&(t=o%4?64*t+r:r,o++%4)?s+=String.fromCharCode(255&t>>(-2*o&6)):0)r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);return s};function o(e){var n=e.replace(/-/g,"+").replace(/_/g,"/");switch(n.length%4){case 0:break;case 2:n+="==";break;case 3:n+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,n){var t=n.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(n)}catch(e){return r(n)}}function i(e){this.message=e}i.prototype=new Error,i.prototype.name="InvalidTokenError",n.Z=function(e,n){if("string"!=typeof e)throw new i("Invalid token specified");var t=!0===(n=n||{}).header?0:1;try{return JSON.parse(o(e.split(".")[t]))}catch(e){throw new i("Invalid token specified: "+e.message)}}},2592:function(e,n,t){var a=t(1413),r=t(5987),o=t(1694),i=t.n(o),s=t(2791),c=t(2007),l=t.n(c),d=t(162),u=t(184),v=["bsPrefix","className","fluid","rounded","roundedCircle","thumbnail"],p=(l().string,l().bool,l().bool,l().bool,l().bool,s.forwardRef((function(e,n){var t=e.bsPrefix,o=e.className,s=e.fluid,c=void 0!==s&&s,l=e.rounded,p=void 0!==l&&l,f=e.roundedCircle,m=void 0!==f&&f,h=e.thumbnail,g=void 0!==h&&h,x=(0,r.Z)(e,v);return t=(0,d.vE)(t,"img"),(0,u.jsx)("img",(0,a.Z)((0,a.Z)({ref:n},x),{},{className:i()(o,c&&"".concat(t,"-fluid"),p&&"rounded",m&&"rounded-circle",g&&"".concat(t,"-thumbnail"))}))})));p.displayName="Image",n.Z=p},4849:function(e,n,t){var a=t(1413),r=t(5987),o=t(1694),i=t.n(o),s=t(2791),c=t(162),l=t(184),d=["bsPrefix","variant","animation","size","as","className"],u=s.forwardRef((function(e,n){var t=e.bsPrefix,o=e.variant,s=e.animation,u=void 0===s?"border":s,v=e.size,p=e.as,f=void 0===p?"div":p,m=e.className,h=(0,r.Z)(e,d);t=(0,c.vE)(t,"spinner");var g="".concat(t,"-").concat(u);return(0,l.jsx)(f,(0,a.Z)((0,a.Z)({ref:n},h),{},{className:i()(m,g,v&&"".concat(g,"-").concat(v),o&&"text-".concat(o))}))}));u.displayName="Spinner",n.Z=u}}]);
//# sourceMappingURL=957.1050e6e9.chunk.js.map