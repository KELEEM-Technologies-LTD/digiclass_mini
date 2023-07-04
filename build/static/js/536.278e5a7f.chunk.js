"use strict";(self.webpackChunkdigiclass_mini=self.webpackChunkdigiclass_mini||[]).push([[536],{3107:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(4165),a=n(5861),i=n(9439),s=n(9201),o=n(184),l=(0,s.Z)((0,o.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"}),"PauseCircle"),c=(0,s.Z)((0,o.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z"}),"PlayCircle"),d=n(2791),u=n(8356),v=n(5240),x=n(4880),h=n(2981),f=n(5770);function p(e){var t=(0,d.useContext)(v.Z),n=t.theme,s=t.setCurrent,p=t.current,m=e.data,b=e.checkStatus,w=m.name,j=m.course_id,Z=m.url,g=m.section_id,y=function(){s({url:Z,section_name:w,course_id:j})},_=(0,d.useState)(!1),k=(0,i.Z)(_,2),C=k[0],N=k[1],z=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=x.d.retrieveUserData(),e.prev=1,e.next=4,f.Z.put(h.Z.updateSection+"/".concat(t.user_id,"/").concat(j,"/").concat(g),{});case 4:N(!C),b(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t,n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=x.d.retrieveUserData(),e.prev=1,e.next=4,f.Z.get(h.Z.getSectionStatus+"/".concat(t.user_id,"/").concat(g));case 4:i=e.sent,0===(null===(n=i.data)||void 0===n||null===(a=n.payload)||void 0===a?void 0:a.length)?N(!1):N(!0),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();return(0,d.useEffect)((function(){S()}),[]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"flex mb-3 ml-5",children:[(null===p||void 0===p?void 0:p.section_name)===w?(0,o.jsx)(l,{style:{color:null===n||void 0===n?void 0:n.primary_color},onClick:y,className:"w-7 h-7 mr-2 cursor-pointer"}):(0,o.jsx)(c,{style:{color:null===n||void 0===n?void 0:n.primary_color},className:"w-7 h-7 mr-2 cursor-pointer",onClick:y}),(0,o.jsx)("div",{className:"flex flex-col",children:(0,o.jsx)("p",{className:"text-sm",children:w})}),(0,o.jsx)("div",{className:"ml-auto text-sm",children:(0,o.jsx)(u.Z.Check,{type:"switch",label:"Mark as completed",checked:C,onChange:z})})]})})}},8429:function(e,t,n){n.r(t),n.d(t,{default:function(){return M}});var r=n(4165),a=n(5861),i=n(9439),s=n(9631),o=n(8484),l=n(827),c=n(9124),d=n(3896),u=n(2791),v=n(7022),x=n(6710),h=n(7689),f=n(3908),p=n(5240),m=n(2981),b=n(5770),w=n(4880),j=n(5672),Z=n(3758),g=n(8076),y=n(3107),_=n(6379),k=n(3367),C=n(2426),N=n.n(C),z=n(9588),S=n(184);function M(){var e,t=(0,u.useContext)(p.Z),n=t.current,C=t.theme,M=t.setCurrent,q=(t.player,t.setPlayer),H=t.corpid,V=t.setCorpId,U=(0,h.UO)(),Y=U.corp_id,D=U.course_id;(0,u.useEffect)((function(){w.d.retrieveUserData().corporate_id!==Y&&(w.d.clearStorage(),window.location.href="/sign-in/".concat(Y)),""===H&&V(Y)}),[]);var F=(0,u.useState)(!1),A=(0,i.Z)(F,2),E=A[0],P=A[1],I=(0,u.useState)([]),Q=(0,i.Z)(I,2),O=Q[0],R=Q[1],L=(0,u.useState)([]),B=(0,i.Z)(L,2),G=B[0],J=B[1],K=(0,u.useState)([]),T=(0,i.Z)(K,2),W=(T[0],T[1]),X=(0,u.useState)([]),$=(0,i.Z)(X,2),ee=$[0],te=$[1],ne=(0,u.useState)([]),re=(0,i.Z)(ne,2),ae=re[0],ie=re[1],se=(0,u.useState)([]),oe=(0,i.Z)(se,2),le=oe[0],ce=oe[1],de=(0,u.useState)(!1),ue=(0,i.Z)(de,2),ve=ue[0],xe=ue[1],he=(0,u.useState)((0,S.jsx)(S.Fragment,{})),fe=(0,i.Z)(he,2),pe=fe[0],me=fe[1],be=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t,n,a,i,s,o,l,c,d,u,x,h,f,p,j,Z,g,y,_,k,z,H,V,U,F,A,E,I,Q,O,L,B,G,K,T,X,$,ee,ne,re,ae,se,oe;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.Z.get(m.Z.getCourses+"/".concat(D,"?query_fields=title,status,about,caption,short_description,description,about,skill_level,language,price,caption,instructor,configurations,certificate,contract_percentage,status,view_status,updatedAt,thumbnail"));case 3:return g=e.sent,R(null===(t=g.data)||void 0===t?void 0:t.data),e.next=7,b.Z.get(m.Z.getUser+"/".concat(null===g||void 0===g||null===(n=g.data)||void 0===n||null===(a=n.data)||void 0===a?void 0:a.instructor));case 7:if(y=e.sent,ce(null===(i=y.data)||void 0===i?void 0:i.data),null===(s=g.data)||void 0===s||null===(o=s.data)||void 0===o||null===(l=o.configurations)||void 0===l||!l.quiz_required){e.next=37;break}return z=w.d.retrieveUserData(),e.next=13,b.Z.get(m.Z.results+"/".concat(null===z||void 0===z?void 0:z.user_id,"/").concat(D));case 13:if(H=e.sent,"passed"!==(V=null===(_=H.data)||void 0===_||null===(k=_.payload)||void 0===k?void 0:k.result_status)){e.next=20;break}xe(!0),me((0,S.jsxs)(v.Z,{children:[(0,S.jsxs)("p",{children:["You have completed ",null===(U=g.data)||void 0===U||null===(F=U.data)||void 0===F?void 0:F.title," your certificate is ready here"]}),(0,S.jsxs)("div",{className:"mt-2 flex flex-col md:flex-row justify-between p-2",children:[(0,S.jsx)("button",{className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2",onClick:function(){ge(!1),xe(!1)},children:"Continue watching"}),(0,S.jsx)("button",{onClick:function(){var e;return ze("/certifications/".concat(Y,"/").concat(null===(e=g.data)||void 0===e?void 0:e.data.course_id))},className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[".concat(null===C||void 0===C?void 0:C.primary_color,"] px-5 py-2 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800"),children:"Certificate"})]})]})),e.next=37;break;case 20:if("pending"!==V){e.next=25;break}xe(!0),me((0,S.jsxs)(v.Z,{children:[(0,S.jsx)("p",{children:"Quiz submitted, please await instructor review"}),(0,S.jsx)("div",{className:"mt-2 flex flex-col md:flex-row justify-between p-2",children:(0,S.jsx)("button",{className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2",onClick:function(){ge(!1),xe(!1)},children:"Continue watching"})})]})),e.next=37;break;case 25:if("failed"!==V){e.next=37;break}if(G=null===(A=H.data)||void 0===A||null===(E=A.payload)||void 0===E?void 0:E.date_added,K=parseInt(null===(I=g.data)||void 0===I||null===(Q=I.data)||void 0===Q||null===(O=Q.configurations)||void 0===O?void 0:O.reseat),T=N()(G).add(K,"days"),X=T.format(),!N()().isAfter(T)){e.next=35;break}return console.log("time expired"),e.next=34,b.Z.put(m.Z.request_reseat+"/".concat(null===z||void 0===z?void 0:z.user_id,"/").concat(D),{});case 34:window.location.reload();case 35:xe(!0),me((0,S.jsxs)(v.Z,{children:[(0,S.jsxs)("p",{className:"p-4",children:["You have completed ",null===(L=g.data)||void 0===L||null===(B=L.data)||void 0===B?void 0:B.title,", however you did no meet the course requirements for a pass, contact instructor to schedule a retake of the quiz ",(0,S.jsx)("br",{}),"Quiz would be available on"," ",N()(X).format("Do MMMM YYYY, HH:MM:SS")]}),(0,S.jsx)("div",{className:"mt-2 flex flex-col md:flex-row justify-between p-2",children:(0,S.jsx)("button",{className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2",onClick:function(){ge(!1),xe(!1)},children:"Continue watching"})})]}));case 37:return e.next=39,b.Z.get(m.Z.getReviews+"?course_id=".concat(D));case 39:return $=e.sent,J(null===(c=$.data)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.data),ee=w.d.retrieveUserData(),e.next=44,b.Z.get(m.Z.getCourses+"/".concat(D,"/users/").concat(ee.user_id));case 44:return ne=e.sent,re=null===(u=ne.data)||void 0===u||null===(x=u.data)||void 0===x?void 0:x.videos,ae=null===(h=ne.data)||void 0===h||null===(f=h.data)||void 0===f?void 0:f.sections,W(re),te(ae),se={url:re[null===(p=ae[0])||void 0===p?void 0:p.section_id][0].url,section_name:null===(j=ae[0])||void 0===j?void 0:j.name,course_id:D,paid:!0},M(se),q(!1),e.next=54,b.Z.get(m.Z.faq+"/".concat(D));case 54:oe=e.sent,ie(null===(Z=oe.data)||void 0===Z?void 0:Z.payload),P(!1),e.next=62;break;case 59:e.prev=59,e.t0=e.catch(0),console.log(e.t0);case 62:case"end":return e.stop()}}),e,null,[[0,59]])})));return function(){return e.apply(this,arguments)}}();(0,u.useEffect)((function(){be()}),[]),(0,u.useEffect)((function(){ye(ee.length)}),[ee]);var we=(0,u.useState)(!1),je=(0,i.Z)(we,2),Ze=je[0],ge=je[1],ye=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,_.c)(D,t);case 2:n=e.sent,ge(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_e=(0,u.useState)(0),ke=(0,i.Z)(_e,2),Ce=ke[0],Ne=ke[1],ze=(0,h.s0)();return E?(0,S.jsx)(f.Z,{}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("div",{className:"bg-[".concat(null===C||void 0===C?void 0:C.primary_color,"] w-full py-6 px-4 flex gap-3"),children:(0,S.jsxs)("button",{onClick:function(){return ze(-1)},className:"text-white",children:[(0,S.jsx)(s.Z,{}),null===O||void 0===O?void 0:O.title]})}),(0,S.jsxs)("div",{style:{minHeight:"100vh"},children:[(0,S.jsxs)("div",{className:"flex flex-wrap",children:[(0,S.jsx)("div",{className:"w-full md:w-8/12",children:ve?(0,S.jsx)("div",{className:"w-full h-[60vh] flex items-center justify-center",children:pe}):Ze?(0,S.jsx)(u.Fragment,{children:(0,S.jsx)("div",{className:"w-full h-[60vh] flex flex-col md:flex-row items-center justify-center",children:null!==(e=O.configurations)&&void 0!==e&&e.quiz_required?(0,S.jsxs)("div",{children:[(0,S.jsxs)("p",{children:["You have completed ",null===O||void 0===O?void 0:O.title," please take a quiz now"]}),(0,S.jsxs)("div",{className:"mt-2 flex flex-col md:flex-row justify-between p-2",children:[(0,S.jsx)("button",{className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2",onClick:function(){return ge(!1)},children:"Continue watching"}),(0,S.jsx)("button",{onClick:function(){return ze("/start-quiz/".concat(Y,"/").concat(D))},className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[".concat(null===C||void 0===C?void 0:C.primary_color,"] px-5 py-2 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800"),children:"Start quiz"})]})]}):(0,S.jsxs)("div",{children:[(0,S.jsxs)("p",{children:["You have completed ",null===O||void 0===O?void 0:O.title," your certificate is ready here"]}),(0,S.jsxs)("div",{className:"mt-2 flex flex-col md:flex-row justify-between p-2",children:[(0,S.jsx)("button",{className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[#f54242] px-10 py-2 text-base font-medium text-white shadow-xl hover:bg-[#e87979] mb-2",onClick:function(){return ge(!1)},children:"Continue watching"}),(0,S.jsx)("button",{onClick:function(){return ze("/certifications/".concat(Y,"/").concat(O.course_id))},className:"ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2 border border-transparent bg-[".concat(null===C||void 0===C?void 0:C.primary_color,"] px-5 py-2 text-base font-medium text-white shadow-xl w-10 hover:bg-secondary-800"),children:"Certificate"})]})]})})}):(0,S.jsxs)(u.Fragment,{children:[(0,S.jsx)(x.Z,{width:"100%",height:"70vh",url:null===n||void 0===n?void 0:n.url,playing:!1,controls:!0,light:null===O||void 0===O?void 0:O.thumbnail,playIcon:(0,S.jsx)(o.Z,{className:"w-20 h-20 my-40",style:{color:"white"}}),config:{file:{attributes:{controlsList:"nodownload"}}}}),(0,S.jsx)(l.Z,{style:{color:null===C||void 0===C?void 0:C.primary_color,cursor:"pointer"},onClick:function(){return q(!0)}})]})}),(0,S.jsxs)("div",{className:"w-full md:w-4/12",children:[(0,S.jsx)("div",{className:"px-4 py-3 bg-white",children:(0,S.jsx)("p",{className:"text-[".concat(null===C||void 0===C?void 0:C.primary_color,"] text-lg"),children:"Course content"})}),(0,S.jsx)("hr",{className:"my-1 mx-5 border-t border-blue-400"}),(0,S.jsx)("div",{className:"px-4 pt-4 pb-2 text-sm text-secondary-500",children:ee.map((function(e,t){return(0,S.jsx)(y.Z,{data:e,checkStatus:function(){return ye(ee.length)}},t)}))})]})]}),(0,S.jsxs)(v.Z,{fluid:!0,children:[(0,S.jsxs)(c.Z,{value:Ce,onChange:function(e,t){return Ne(t)},children:[(0,S.jsx)(d.Z,{label:"Overview"}),(0,S.jsx)(d.Z,{label:"Reviews"}),(0,S.jsx)(d.Z,{label:"Author"}),(0,S.jsx)(d.Z,{label:"FAQ"}),(0,S.jsx)(d.Z,{label:"Files"})]}),(0,S.jsxs)("div",{style:{minHeight:"50vh"},className:"px-5 mt-4",children:[0===Ce?(0,S.jsx)(Z.Z,{data:O,completed:Ze,setCompleted:ge}):null,1===Ce?(0,S.jsx)(g.Z,{data:G,reload:be}):null,2===Ce?(0,S.jsx)(z.Z,{instructor:le,course_detail:O}):null,3===Ce?(0,S.jsx)(j.Z,{data:ae}):null,4===Ce?(0,S.jsx)(k.Z,{course_id:D}):null]})]})]})]})}},6379:function(e,t,n){n.d(t,{c:function(){return l}});var r=n(4165),a=n(5861),i=n(2981),s=n(5770),o=n(4880),l=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n){var a,l,c,d;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.Z.get(i.Z.getAllCompletedSections+"/".concat(o.d.retrieveUserData().user_id,"/").concat(t));case 3:if(c=e.sent,d=null===(a=c.data)||void 0===a||null===(l=a.payload)||void 0===l?void 0:l.length,!(d/n<1)){e.next=10;break}return e.abrupt("return",!1);case 10:return e.abrupt("return",!0);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(0),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n){return e.apply(this,arguments)}}()},827:function(e,t,n){var r=n(9201),a=n(184);t.Z=(0,r.Z)((0,a.jsx)("path",{d:"M23 15h-2v2h2v-2zm0-4h-2v2h2v-2zm0 8h-2v2c1 0 2-1 2-2zM15 3h-2v2h2V3zm8 4h-2v2h2V7zm-2-4v2h2c0-1-1-2-2-2zM3 21h8v-6H1v4c0 1.1.9 2 2 2zM3 7H1v2h2V7zm12 12h-2v2h2v-2zm4-16h-2v2h2V3zm0 16h-2v2h2v-2zM3 3C2 3 1 4 1 5h2V3zm0 8H1v2h2v-2zm8-8H9v2h2V3zM7 3H5v2h2V3z"}),"PhotoSizeSelectSmall")}}]);
//# sourceMappingURL=536.278e5a7f.chunk.js.map