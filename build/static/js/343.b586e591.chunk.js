"use strict";(self.webpackChunkdigiclass_mini=self.webpackChunkdigiclass_mini||[]).push([[343],{670:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(2791),s=n(2677),a=n(7689),i=n(5240),o=n(2663),l=n(7809),c=n(184);function d(e){var t=e.course,n=t.thumbnail,d=t.title,u=t.first_name,x=t.last_name,m=t.course_id,v=t.configurations,h=t.price,p=(0,r.useContext)(i.Z),f=p.theme,j=p.corpid,g=p.myCourseArray,y=(0,r.useContext)(l.$),w=(y.convertValue,y.convertOldValue,(0,a.s0)());return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(s.Z,{md:4,lg:3,sm:12,className:"mb-4",children:(0,c.jsxs)("div",{className:"relative cursor-pointer flex flex-col rounded-md overflow-hidden shadow-md",onClick:function(){return w(null!==v&&void 0!==v&&v.paid?g.includes(m)?"/my-course/".concat(m,"/").concat(j):"/paid-course/".concat(m,"/").concat(j):"/course/".concat(m,"/").concat(j))},children:[null!==v&&void 0!==v&&v.paid?null:(0,c.jsx)("span",{className:"absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold",children:"Free"}),(0,c.jsx)("div",{className:"h-40",children:(0,c.jsx)("img",{className:"object-cover w-full h-full",src:n,alt:n})}),(0,c.jsxs)("div",{className:"p-4 flex-grow",children:[(0,c.jsx)("h2",{className:"text-base text-semibold font-semibold mb-2",children:d}),(0,c.jsxs)("p",{className:"text-primary-600 text-sm mb-2",children:[u," ",x]}),(0,c.jsxs)("div",{className:"flex items-center mb-2",children:[(0,c.jsx)("i",{className:"fa fa-star text-[".concat(null===f||void 0===f?void 0:f.primary_color,"] text-sm")}),(0,c.jsx)("i",{className:"fa fa-star text-[".concat(null===f||void 0===f?void 0:f.primary_color,"] text-sm")}),(0,c.jsx)("i",{className:"fa fa-star-half-alt text-[".concat(null===f||void 0===f?void 0:f.primary_color,"] text-sm")}),(0,c.jsx)("i",{className:"far fa-star text-[".concat(null===f||void 0===f?void 0:f.primary_color,"] text-sm")}),(0,c.jsx)("i",{className:"far fa-star text-[".concat(null===f||void 0===f?void 0:f.primary_color,"] text-sm")})]}),(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("p",{className:"text-base text-[black] font-bold",children:(0,o.$X)(h,"GHS")}),(0,c.jsx)("p",{className:"text-primary-600 text-sm line-through",children:(0,o.$X)(h,"GHS")})]})]})]})})})}},5162:function(e,t,n){n.d(t,{Z:function(){return C}});var r=n(9439),s=n(2801),a=n(4116),i=n(6488),o=n(3044),l=n(2791),c=n(7997),d=n(7022),u=n(7689),x=n(1087),m=n(5240),v=n(4880),h=n(4165),p=n(5861),f=n(5770),j=n(2981),g=n(184);function y(){var e=(0,u.s0)(),t=(0,l.useContext)(m.Z),n=t.theme,s=t.corpid,a=(0,l.useState)(0),i=(0,r.Z)(a,2),o=i[0],c=i[1],d=(0,l.useState)(!1),x=(0,r.Z)(d,2),y=(x[0],x[1]);function w(){return(w=(0,p.Z)((0,h.Z)().mark((function e(){var t,n,r,s;return(0,h.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v.d.retrieveUserData(),y(!0),e.prev=2,e.next=5,f.Z.get(j.Z.unreadConvo+"/".concat(null===t||void 0===t?void 0:t.user_id));case 5:r=e.sent,s=null===(n=r.data)||void 0===n?void 0:n.payload,c(s),y(!1),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})))).apply(this,arguments)}return(0,l.useEffect)((function(){!function(){w.apply(this,arguments)}()}),[]),(0,g.jsxs)("div",{onClick:function(){return e("/messages/".concat(s))},className:"position-relative  ml-4",style:{cursor:"pointer"},children:[(0,g.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",style:{height:"30px",width:"30px",marginRight:"13px",color:"gray"},children:(0,g.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"})}),(0,g.jsx)("span",{style:{fontSize:"11px",background:null===n||void 0===n?void 0:n.primary_color},className:"position-absolute top-0 start-0 translate-middle rounded-circle text-white px-1",children:o})]})}var w=n(3433);function b(){(0,u.s0)();var e=(0,l.useContext)(m.Z),t=(e.theme,e.corpid,e.openNotification);return(0,g.jsx)("div",{onClick:function(){return t()},className:"position-relative ml-1",style:{cursor:"pointer"},children:(0,g.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",style:{height:"30px",width:"30px",marginRight:"13px",color:"gray"},children:(0,g.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"})})})}var N=n(2663);function Z(e){var t=(0,l.useContext)(m.Z),n=t.read,s=t.unread,a=t.openNotification,i=t.pop,o=(0,l.useState)([]),c=(0,r.Z)(o,2),d=c[0],u=c[1];return(0,l.useEffect)((function(){u([].concat((0,w.Z)(n),(0,w.Z)(s)))}),[n,s]),(0,g.jsxs)("div",{children:[(0,g.jsx)(b,{}),i?(0,g.jsx)("div",{className:"w-full  absolute z-10 right-0 h-screen overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700",id:"notification",children:(0,g.jsxs)("div",{className:"2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0",style:{scrollbarWidth:"thin",scrollbarColor:"transparent"},children:[(0,g.jsxs)("div",{className:"flex items-center justify-between",children:[(0,g.jsx)("p",{className:"text-lg font-semibold leading-6 text-gray-800",children:"Notifications"}),(0,g.jsx)("div",{className:"cursor-pointer",onClick:function(){return a()},children:(0,g.jsxs)("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,g.jsx)("path",{d:"M18 6L6 18",stroke:"#4B5563",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,g.jsx)("path",{d:"M6 6L18 18",stroke:"#4B5563",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]})})]}),d.map((function(e,t){return(0,g.jsxs)("div",{className:"w-full p-3 mt-4 bg-white rounded hover:shadow flex",children:[(0,g.jsx)("div",{className:"w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center",children:(0,g.jsx)("svg",{width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,g.jsx)("path",{d:"M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z",fill:"#4338CA"})})}),(0,g.jsxs)("div",{className:"pl-3",children:[(0,g.jsx)("p",{className:"text-sm leading-none",children:e.message}),(0,g.jsx)("p",{className:"text-xs flex leading-3 pt-1 text-gray-500",children:(0,N.BK)(e.date)})]})]},t)})),(0,g.jsxs)("div",{className:"flex items-center justiyf-between",children:[(0,g.jsx)("hr",{className:"w-full"}),(0,g.jsx)("p",{className:"text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500",children:"Thats all for now :)"}),(0,g.jsx)("hr",{className:"w-full"})]})]})}):null]})}function C(){var e,t,n,h,p=(0,l.useContext)(m.Z),f=p.theme,j=p.corpid,w=(0,u.s0)(),b=v.d.retrieveUserData(),N=(0,l.useState)(!1),C=(0,r.Z)(N,2),k=C[0],_=C[1],S=[{name:"My courses",url:"/my-courses/".concat(j)},{name:"Messages",url:"/messages/".concat(j)},{name:"Account",url:"/account/".concat(j,"?tab=0")},{name:"Transactions",url:"/account/".concat(j,"?tab=2")}];return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c.Z,{bg:"light",children:(0,g.jsxs)(d.Z,{children:[(0,g.jsx)("div",{className:"h-12 w-16 cursor-pointer",onClick:function(){return w("/main/".concat(b?b.corporate_id:j))},children:(0,g.jsx)("img",{src:null===f||void 0===f?void 0:f.img,alt:"logo",className:"h-full w-full"})}),(0,g.jsxs)("div",{className:"d-flex",children:[(0,g.jsx)("span",{style:{color:null===f||void 0===f?void 0:f.primary_color,fontWeight:"bolder",marginRight:"10px",marginTop:"10px"},children:null===f||void 0===f?void 0:f.name}),(0,g.jsxs)("div",{className:"mx-2 flex items-center justify-center",children:[(0,g.jsx)(y,{}),(0,g.jsx)(Z,{})]}),(0,g.jsxs)(o.Z,{onClick:function(){return _(!0)},style:{cursor:"pointer"},children:[null===(e=v.d.retrieveUserData())||void 0===e||null===(t=e.first_name)||void 0===t?void 0:t[0],null===(n=v.d.retrieveUserData())||void 0===n||null===(h=n.last_name)||void 0===h?void 0:h[0]]})]})]})}),(0,g.jsx)(s.u.Root,{show:k,as:l.Fragment,children:(0,g.jsxs)(a.V,{as:"div",className:"relative z-10",onClose:_,children:[(0,g.jsx)(s.u.Child,{as:l.Fragment,enter:"transition ease-out duration-200",enterFrom:"opacity-0 translate-y-1",enterTo:"opacity-100 translate-y-0",leave:"transition ease-in duration-150",leaveFrom:"opacity-100 translate-y-0",leaveTo:"opacity-0 translate-y-1",children:(0,g.jsx)("div",{className:"fixed inset-0 transition-opacity"})}),(0,g.jsx)("div",{className:"fixed inset-0 overflow-hidden",children:(0,g.jsx)("div",{className:"absolute inset-0 overflow-hidden",children:(0,g.jsx)("div",{className:"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10",children:(0,g.jsx)(s.u.Child,{as:l.Fragment,enter:"transition ease-out duration-200",enterFrom:"opacity-0 translate-y-1",enterTo:"opacity-100 translate-y-0",leave:"transition ease-in duration-150",leaveFrom:"opacity-100 translate-y-0",leaveTo:"opacity-0 translate-y-1",children:(0,g.jsx)(a.V.Panel,{className:"pointer-events-auto w-screen max-w-md pl-6 pr-6",children:(0,g.jsx)("div",{className:"flex font-serif flex-col overflow-y-hidden bg-transparent px-5",children:(0,g.jsx)("div",{className:"flex-1 overflow-y-auto py-6 px-4 sm:px-6",children:(0,g.jsx)("div",{className:"mt-8",children:(0,g.jsxs)("div",{className:"bg-white rounded-5 font-serif overflow-y-hidden",children:[(0,g.jsx)("div",{className:"py-4 px-4",children:(0,g.jsx)("ul",{children:S.map((function(e,t){return(0,g.jsxs)(l.Fragment,{children:[(0,g.jsx)("li",{className:"mt-2",children:(0,g.jsx)(x.rU,{to:null===e||void 0===e?void 0:e.url,className:"text-decoration-none text-[".concat(null===f||void 0===f?void 0:f.primary_color,"] hover:text-[").concat(null===f||void 0===f?void 0:f.primary_color,"]"),children:e.name})}),1===t?(0,g.jsx)("hr",{className:"my-1 mb-3 border-t border-secondary-400"}):null]},t)}))})}),(0,g.jsx)("hr",{className:"my-1 mx-5 border-t border-secondary-400"}),(0,g.jsxs)("button",{className:"flex gap-6 px-4 mt-7 mb-5",onClick:function(){v.d.clearStorage(),window.location.href="/sign-in/".concat(j)},children:[(0,g.jsx)(i.Z,{style:{color:null===f||void 0===f?void 0:f.primary_color}}),(0,g.jsx)("p",{children:"Logout"})]})]})})})})})})})})})]})})]})}},3343:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var r=n(4165),s=n(5861),a=n(9439),i=n(2791),o=n(7689),l=n(4880),c=n(5240),d=n(5162),u=n(5770),x=n(2981),m=n(106),v=n(7022),h=n(9743),p=n(4849),f=n(2677),j=n(6088),g=n(670),y=n(3908),w=n(184);function b(){var e,t=(0,o.UO)(),n=t.corp_id,b=t.instructor_id,N=(0,i.useContext)(c.Z),Z=(N.current,N.theme),C=(N.setCurrent,N.player,N.setPlayer,N.corpid),k=N.setCorpId,_=(0,i.useState)([]),S=(0,a.Z)(_,2),L=S[0],F=S[1],V=(0,i.useState)(!0),M=(0,a.Z)(V,2),U=M[0],A=M[1],B=(0,o.s0)();(0,i.useEffect)((function(){l.d.retrieveUserData().corporate_id!==n&&(l.d.clearStorage(),window.location.href="/sign-in/".concat(n)),""===C&&k(n);var e=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var t,n,s,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.get(x.Z.getUser+"/".concat(b));case 3:n=e.sent,F(null===(t=n.data)||void 0===t?void 0:t.data),A(!1),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),(0,m.e)(null===(s=e.t0.response)||void 0===s||null===(a=s.data)||void 0===a?void 0:a.message),B(-1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[n,C,b,B,k]);var H=(0,i.useState)(!0),T=(0,a.Z)(H,2),W=T[0],z=T[1],D=(0,i.useState)([]),E=(0,a.Z)(D,2),P=E[0],R=E[1],$=(0,i.useState)(1),G=(0,a.Z)($,2),O=G[0],X=G[1],I=(0,i.useState)("public"),K=(0,a.Z)(I,2),q=K[0],J=K[1];(0,i.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.get(x.Z.course+"?filter=instructor=".concat(b,",status=active,view_status=").concat(q,"&page=").concat(O,"&size=8"));case 3:n=e.sent,R(null===(t=n.data)||void 0===t?void 0:t.data),z(!1),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),z(!1);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[q,b,O]);var Q=[{label:"Public Courses",filter:"public"},{label:"Available only on ".concat(null===Z||void 0===Z?void 0:Z.name),filter:"private"}];return U?(0,w.jsx)(y.Z,{}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(d.Z,{}),(0,w.jsx)("div",{className:"flex flex-col font-serif",children:(0,w.jsx)("div",{className:"flex flex-col bg-[".concat(null===Z||void 0===Z?void 0:Z.primary_color,"] md:px-16 px-4 justify-end"),children:(0,w.jsx)("div",{className:"flex justify-between items-center",children:(0,w.jsxs)("p",{className:" text-2xl md:text-4xl md:font-semibold text-white py-7",children:["Courses by"," ",(0,w.jsx)("span",{children:(null===L||void 0===L?void 0:L.first_name)+" "+(null===L||void 0===L?void 0:L.last_name)})]})})})}),(0,w.jsx)("div",{className:"flex justify-end gap-3 mt-4",children:Q.map((function(e,t){return(0,w.jsx)("button",{className:e.filter===q?"bg-[".concat(null===Z||void 0===Z?void 0:Z.primary_color,"] text-white font-bold py-2 px-4 rounded"):"bg-transparent hover:bg-[".concat(null===Z||void 0===Z?void 0:Z.primary_color,"] text-[").concat(null===Z||void 0===Z?void 0:Z.primary_color,"] font-semibold hover:text-[").concat(null===Z||void 0===Z?void 0:Z.primary_color,"] py-2 px-4 border border-[").concat(null===Z||void 0===Z?void 0:Z.primary_color,"] hover:border-transparent rounded"),onClick:function(){return J(e.filter)},children:e.label},t)}))}),(0,w.jsxs)(v.Z,{className:"mt-5",fluid:!0,children:[(0,w.jsx)(h.Z,{className:"mt-3",children:W?(0,w.jsx)(p.Z,{}):null===P||void 0===P||null===(e=P.data)||void 0===e?void 0:e.map((function(e,t){return(0,w.jsx)(g.Z,{course:e},t)}))}),(0,w.jsx)(f.Z,{md:12,className:"mt-3",children:(0,w.jsx)(j.Z,{count:null===P||void 0===P?void 0:P.totalPages,page:O,onChange:function(e,t){z(!0),X(t)}})})]})]})}}}]);
//# sourceMappingURL=343.b586e591.chunk.js.map