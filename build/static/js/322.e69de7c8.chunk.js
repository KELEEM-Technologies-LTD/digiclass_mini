"use strict";(self.webpackChunkdigiclass_mini=self.webpackChunkdigiclass_mini||[]).push([[322],{3053:function(e,a,i){var s=i(1413),r=i(5987),l=i(1694),t=i.n(l),o=i(2791),n=i(323),c=i(162),d=i(184),f=["bsPrefix","className","children","controlId","label"],v=o.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,o=e.children,v=e.controlId,m=e.label,u=(0,r.Z)(e,f);return i=(0,c.vE)(i,"form-floating"),(0,d.jsxs)(n.Z,(0,s.Z)((0,s.Z)({ref:a,className:t()(l,i),controlId:v},u),{},{children:[o,(0,d.jsx)("label",{htmlFor:v,children:m})]}))}));v.displayName="FloatingLabel",a.Z=v},8356:function(e,a,i){i.d(a,{Z:function(){return X}});var s=i(1413),r=i(5987),l=i(1694),t=i.n(l),o=i(2007),n=i.n(o),c=i(2791),d=i(184),f=["as","className","type","tooltip"],v={type:n().string,tooltip:n().bool,as:n().elementType},m=c.forwardRef((function(e,a){var i=e.as,l=void 0===i?"div":i,o=e.className,n=e.type,c=void 0===n?"valid":n,v=e.tooltip,m=void 0!==v&&v,u=(0,r.Z)(e,f);return(0,d.jsx)(l,(0,s.Z)((0,s.Z)({},u),{},{ref:a,className:t()(o,"".concat(c,"-").concat(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=v;var u=m,p=i(4934),b=i(162),x=["id","bsPrefix","className","type","isValid","isInvalid","as"],Z=c.forwardRef((function(e,a){var i=e.id,l=e.bsPrefix,o=e.className,n=e.type,f=void 0===n?"checkbox":n,v=e.isValid,m=void 0!==v&&v,u=e.isInvalid,Z=void 0!==u&&u,h=e.as,y=void 0===h?"input":h,N=(0,r.Z)(e,x),I=(0,c.useContext)(p.Z).controlId;return l=(0,b.vE)(l,"form-check-input"),(0,d.jsx)(y,(0,s.Z)((0,s.Z)({},N),{},{ref:a,type:f,id:i||I,className:t()(o,l,m&&"is-valid",Z&&"is-invalid")}))}));Z.displayName="FormCheckInput";var h=Z,y=["bsPrefix","className","htmlFor"],N=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,o=e.htmlFor,n=(0,r.Z)(e,y),f=(0,c.useContext)(p.Z).controlId;return i=(0,b.vE)(i,"form-check-label"),(0,d.jsx)("label",(0,s.Z)((0,s.Z)({},n),{},{ref:a,htmlFor:o||f,className:t()(l,i)}))}));N.displayName="FormCheckLabel";var I=N;var j=["id","bsPrefix","bsSwitchPrefix","inline","reverse","disabled","isValid","isInvalid","feedbackTooltip","feedback","feedbackType","className","style","title","type","label","children","as"],w=c.forwardRef((function(e,a){var i=e.id,l=e.bsPrefix,o=e.bsSwitchPrefix,n=e.inline,f=void 0!==n&&n,v=e.reverse,m=void 0!==v&&v,x=e.disabled,Z=void 0!==x&&x,y=e.isValid,N=void 0!==y&&y,w=e.isInvalid,F=void 0!==w&&w,k=e.feedbackTooltip,P=void 0!==k&&k,g=e.feedback,C=e.feedbackType,R=e.className,E=e.style,z=e.title,S=void 0===z?"":z,T=e.type,V=void 0===T?"checkbox":T,L=e.label,O=e.children,_=e.as,G=void 0===_?"input":_,H=(0,r.Z)(e,j);l=(0,b.vE)(l,"form-check"),o=(0,b.vE)(o,"form-switch");var M=(0,c.useContext)(p.Z).controlId,A=(0,c.useMemo)((function(){return{controlId:i||M}}),[M,i]),q=!O&&null!=L&&!1!==L||function(e,a){return c.Children.toArray(e).some((function(e){return c.isValidElement(e)&&e.type===a}))}(O,I),B=(0,d.jsx)(h,(0,s.Z)((0,s.Z)({},H),{},{type:"switch"===V?"checkbox":V,ref:a,isValid:N,isInvalid:F,disabled:Z,as:G}));return(0,d.jsx)(p.Z.Provider,{value:A,children:(0,d.jsx)("div",{style:E,className:t()(R,q&&l,f&&"".concat(l,"-inline"),m&&"".concat(l,"-reverse"),"switch"===V&&o),children:O||(0,d.jsxs)(d.Fragment,{children:[B,q&&(0,d.jsx)(I,{title:S,children:L}),g&&(0,d.jsx)(u,{type:C,tooltip:P,children:g})]})})})}));w.displayName="FormCheck";var F=Object.assign(w,{Input:h,Label:I}),k=i(4942),P=(i(2391),["bsPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","as"]),g=c.forwardRef((function(e,a){var i,l,o=e.bsPrefix,n=e.type,f=e.size,v=e.htmlSize,m=e.id,u=e.className,x=e.isValid,Z=void 0!==x&&x,h=e.isInvalid,y=void 0!==h&&h,N=e.plaintext,I=e.readOnly,j=e.as,w=void 0===j?"input":j,F=(0,r.Z)(e,P),g=(0,c.useContext)(p.Z).controlId;(o=(0,b.vE)(o,"form-control"),N)?i=(0,k.Z)({},"".concat(o,"-plaintext"),!0):(l={},(0,k.Z)(l,o,!0),(0,k.Z)(l,"".concat(o,"-").concat(f),f),i=l);return(0,d.jsx)(w,(0,s.Z)((0,s.Z)({},F),{},{type:n,size:v,ref:a,readOnly:I,id:m||g,className:t()(u,i,Z&&"is-valid",y&&"is-invalid","color"===n&&"".concat(o,"-color"))}))}));g.displayName="FormControl";var C=Object.assign(g,{Feedback:u}),R=(0,i(6543).Z)("form-floating"),E=i(323),z=i(2677),S=["as","bsPrefix","column","visuallyHidden","className","htmlFor"],T=c.forwardRef((function(e,a){var i=e.as,l=void 0===i?"label":i,o=e.bsPrefix,n=e.column,f=void 0!==n&&n,v=e.visuallyHidden,m=void 0!==v&&v,u=e.className,x=e.htmlFor,Z=(0,r.Z)(e,S),h=(0,c.useContext)(p.Z).controlId;o=(0,b.vE)(o,"form-label");var y="col-form-label";"string"===typeof f&&(y="".concat(y," ").concat(y,"-").concat(f));var N=t()(u,o,m&&"visually-hidden",f&&y);return x=x||h,f?(0,d.jsx)(z.Z,(0,s.Z)({ref:a,as:"label",className:N,htmlFor:x},Z)):(0,d.jsx)(l,(0,s.Z)({ref:a,className:N,htmlFor:x},Z))}));T.displayName="FormLabel";var V=T,L=["bsPrefix","className","id"],O=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,o=e.id,n=(0,r.Z)(e,L),f=(0,c.useContext)(p.Z).controlId;return i=(0,b.vE)(i,"form-range"),(0,d.jsx)("input",(0,s.Z)((0,s.Z)({},n),{},{type:"range",ref:a,className:t()(l,i),id:o||f}))}));O.displayName="FormRange";var _=O,G=["bsPrefix","size","htmlSize","className","isValid","isInvalid","id"],H=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.size,o=e.htmlSize,n=e.className,f=e.isValid,v=void 0!==f&&f,m=e.isInvalid,u=void 0!==m&&m,x=e.id,Z=(0,r.Z)(e,G),h=(0,c.useContext)(p.Z).controlId;return i=(0,b.vE)(i,"form-select"),(0,d.jsx)("select",(0,s.Z)((0,s.Z)({},Z),{},{size:o,ref:a,className:t()(n,i,l&&"".concat(i,"-").concat(l),v&&"is-valid",u&&"is-invalid"),id:x||h}))}));H.displayName="FormSelect";var M=H,A=["bsPrefix","className","as","muted"],q=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,o=e.as,n=void 0===o?"small":o,c=e.muted,f=(0,r.Z)(e,A);return i=(0,b.vE)(i,"form-text"),(0,d.jsx)(n,(0,s.Z)((0,s.Z)({},f),{},{ref:a,className:t()(l,i,c&&"text-muted")}))}));q.displayName="FormText";var B=q,D=c.forwardRef((function(e,a){return(0,d.jsx)(F,(0,s.Z)((0,s.Z)({},e),{},{ref:a,type:"switch"}))}));D.displayName="Switch";var J=Object.assign(D,{Input:F.Input,Label:F.Label}),K=i(3053),Q=["className","validated","as"],U={_ref:n().any,validated:n().bool,as:n().elementType},W=c.forwardRef((function(e,a){var i=e.className,l=e.validated,o=e.as,n=void 0===o?"form":o,c=(0,r.Z)(e,Q);return(0,d.jsx)(n,(0,s.Z)((0,s.Z)({},c),{},{ref:a,className:t()(i,l&&"was-validated")}))}));W.displayName="Form",W.propTypes=U;var X=Object.assign(W,{Group:E.Z,Control:C,Floating:R,Check:F,Switch:J,Label:V,Text:B,Range:_,Select:M,FloatingLabel:K.Z})},4934:function(e,a,i){var s=i(2791).createContext({});a.Z=s},323:function(e,a,i){var s=i(1413),r=i(5987),l=i(2791),t=i(4934),o=i(184),n=["controlId","as"],c=l.forwardRef((function(e,a){var i=e.controlId,c=e.as,d=void 0===c?"div":c,f=(0,r.Z)(e,n),v=(0,l.useMemo)((function(){return{controlId:i}}),[i]);return(0,o.jsx)(t.Z.Provider,{value:v,children:(0,o.jsx)(d,(0,s.Z)((0,s.Z)({},f),{},{ref:a}))})}));c.displayName="FormGroup",a.Z=c},2391:function(e){var a=function(){};e.exports=a}}]);
//# sourceMappingURL=322.e69de7c8.chunk.js.map