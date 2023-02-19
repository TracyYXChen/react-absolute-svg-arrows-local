(this["webpackJsonpreact-absolute-svg-arrows"]=this["webpackJsonpreact-absolute-svg-arrows"]||[]).push([[0],{16:function(n,t,o){"use strict";o.r(t),o.d(t,"Arrow",(function(){return m}));var e,a,r,c,i,s,x,l,d,u=o(6),h=o(2),y=(o(0),o(3)),b=0,f=function(n,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:b;if(n>0)return 0;var e=t<0?-1:1,a=Math.round(o*Math.pow(.9,Math.pow(1.2,Math.abs(t)/10)));return 0===a?0:e*a},p=function(n){var t=n.absDx,o=n.absDy,e=n.dx,a=n.dy,r=0,c=0,i=t,s=o;if(e<0){var x=[i,r];r=x[0],i=x[1]}if(a<0){var l=[s,c];c=l[0],s=l[1]}var d=function(n,t){return Math.round(0*Math.sqrt(n)+0*Math.sqrt(t))}(t,o),u=f(e,a),h=Math.abs(f(e,a,0));return{p1:{x:r,y:c},p2:{x:r+d+h,y:c+u},p3:{x:i-d-h,y:s-u},p4:{x:i,y:s}}},g=o(1),j=y.a.svg.attrs((function(n){var t=n.$xTranslate,o=n.$yTranslate;return{style:{transform:"translate(".concat(t,"px, ").concat(o,"px)")}}}))(e||(e=Object(h.a)(["\n  pointer-events: none;\n  z-index: ",";\n  position: absolute;\n  left: 0;\n  top: 0;\n"])),(function(n){return n.$isHighlighted?2:1})),v=Object(y.a)(j)(a||(a=Object(h.a)(["\n  border: ",";\n"])),(function(n){var t=n.$showDebugGuideLines,o=n.$boundingBoxColor;return t?"dashed 1px ".concat(void 0===o?"black":o):"0"})),k=y.a.path(r||(r=Object(h.a)(["\n  transition: stroke 300ms;\n"]))),O=Object(y.a)(j)(c||(c=Object(h.a)(["\n  pointer-events: none;\n  z-index: ",";\n"])),(function(n){return n.$isHighlighted?11:10})),M=y.a.path.attrs((function(n){var t=n.$xTranslate,o=n.$yTranslate;return{style:{transform:"translate(".concat(t,"px, ").concat(o,"px)")}}}))(i||(i=Object(h.a)(["\n  transition: stroke 300ms;\n"]))),D=y.a.circle(s||(s=Object(h.a)(["\n  transition: stroke 300ms;\n"]))),w=y.a.path(x||(x=Object(h.a)(["\n  cursor: default;\n"]))),$=Object(y.a)(M)(l||(l=Object(h.a)(["\n  cursor: default;\n"]))),L=y.a.circle(d||(d=Object(h.a)(["\n  cursor: default;\n"]))),B=function(n){var t=n.p1,o=n.p2,e=n.p3,a=n.p4,r=n.color;return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("circle",{cx:o.x,cy:o.y,r:5,strokeWidth:"0",fill:r}),Object(g.jsx)("circle",{cx:e.x,cy:e.y,r:5,strokeWidth:"0",fill:r}),Object(g.jsx)("line",{strokeDasharray:"1,3",stroke:r,x1:t.x,y1:t.y,x2:o.x,y2:o.y}),Object(g.jsx)("line",{strokeDasharray:"1,3",stroke:r,x1:e.x,y1:e.y,x2:a.x,y2:a.y})]})},m=function(n){var t=n.startPoint,o=n.endPoint,e=n.isHighlighted,a=void 0!==e&&e,r=n.showDebugGuideLines,c=void 0!==r&&r,i=n.onMouseEnter,s=n.onMouseLeave,x=n.onClick,l=n.onMouseDown,d=n.config,h=n.tooltip;console.log(t,o);var y=Object(u.a)(Object(u.a)({},{arrowColor:"#bcc4cc",arrowHighlightedColor:"#4da6ff",controlPointsColor:"#ff4747",boundingBoxColor:"#ffcccc",dotEndingBackground:"#fff",dotEndingRadius:3,arrowHeadEndingSize:29,hoverableLineWidth:15,strokeWidth:1}),d),b=y.arrowColor,f=y.arrowHighlightedColor,j=y.controlPointsColor,m=y.boundingBoxColor,C=y.arrowHeadEndingSize,W=y.strokeWidth,E=y.hoverableLineWidth,T=y.dotEndingBackground,H=y.dotEndingRadius,z=C/2,P=W+C/2+H+2.5,G=function(n,t){var o=t.x-n.x,e=t.y-n.y;return{dx:o,dy:e,absDx:Math.abs(o),absDy:Math.abs(e)}}(t,o),q=G.absDx,F=G.absDy,J=function(n){var t=n.boundingBoxElementsBuffer,o=n.absDx,e=n.absDy,a=n.dx,r=n.dy,c=p({absDx:o,absDy:e,dx:a,dy:r}),i=c.p1,s=c.p2,x=c.p3,l=c.p4,d=Math.min(i.y,s.y,x.y,l.y),u=Math.max(i.y,s.y,x.y,l.y),h=Math.min(i.x,s.x,x.x,l.x),y=(u-d-e)/2+t,b=(Math.max(i.x,s.x,x.x,l.x)-h-o)/2+t,f={vertical:y,horizontal:b};return{p1:{x:i.x+b,y:i.y+y},p2:{x:s.x+b,y:s.y+y},p3:{x:x.x+b,y:x.y+y},p4:{x:l.x+b,y:l.y+y},boundingBoxBuffer:f}}({boundingBoxElementsBuffer:P,dx:G.dx,dy:G.dy,absDx:q,absDy:F}),R=J.p1,S=J.p2,A=J.p3,I=J.p4,K=J.boundingBoxBuffer,N=function(n){var t=n.absDx,o=n.absDy,e=n.boundingBoxBuffer;return{canvasWidth:t+2*e.horizontal,canvasHeight:o+2*e.vertical}}({absDx:q,absDy:F,boundingBoxBuffer:K}),Q=N.canvasWidth,U=N.canvasHeight,V=Math.min(t.x,o.x)-K.horizontal,X=Math.min(t.y,o.y)-K.vertical,Y="\n    M ".concat(R.x," ").concat(R.y,"\n    C ").concat(S.x," ").concat(S.y,",\n    ").concat(A.x," ").concat(A.y,",\n    ").concat(I.x-0," ").concat(I.y,"\n    L ").concat(I.x," ").concat(I.y),Z=function(){return a?f:b},_="";t.y===o.y&&(_=t.x<o.x?"right":"left");var nn=(o.y-t.y)/(o.x-t.x),tn="";"up"===(_=nn<-1||nn>1?o.y>t.y?"down":"up":o.x>t.x?"right":"left")?tn="M ".concat(0,"  ",C,"\n      L ").concat(5*C/5," ").concat(2*C/5," \n      L ").concat(8*C/5," ").concat(C):"down"===_?tn="M ".concat(0,"  ",2*C/5,"\n    L ").concat(5*C/5," ").concat(3*C/5," \n    L ").concat(10*C/5," ").concat(2*C/5):"right"===_?tn="M ".concat(C/5*4," 0\n      L ").concat(C," ").concat(C/2,"\n      L ").concat(C/5*4," ").concat(C):"left"===_&&(tn="M ".concat(6*C/5," 0\n      L ").concat(4*C/5," ").concat(C/2,"\n      L ").concat(6*C/5," ").concat(C)),console.log("p4",I.x,I.y),console.log("end point",o.x,o.y);var on=Z();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)(v,{width:Q,height:U,$isHighlighted:a,$showDebugGuideLines:c,$boundingBoxColor:m,$xTranslate:V,$yTranslate:X,children:[Object(g.jsx)(k,{d:Y,strokeWidth:W,stroke:Z(),fill:"none"}),Object(g.jsx)(w,{d:Y,strokeWidth:E,stroke:"transparent",pointerEvents:"all",fill:"none",onMouseEnter:i,onMouseLeave:s,onClick:x,onMouseDown:l,children:h&&Object(g.jsx)("title",{children:h})}),Object(g.jsx)($,{d:tn,fill:"none",stroke:"transparent",strokeWidth:E,strokeLinecap:"round",pointerEvents:"all",$xTranslate:I.x-2*z,$yTranslate:I.y-z,onMouseEnter:i,onMouseLeave:s,onClick:x,onMouseDown:l,children:h&&Object(g.jsx)("title",{children:h})}),Object(g.jsx)(L,{cx:R.x,cy:R.y,r:H,stroke:"transparent",strokeWidth:E,fill:"transparent",children:h&&Object(g.jsx)("title",{children:h})})]}),Object(g.jsxs)(O,{width:Q,height:U,$isHighlighted:a,$xTranslate:V,$yTranslate:X,children:[Object(g.jsx)(D,{cx:R.x,cy:R.y,r:H,stroke:on,strokeWidth:W,fill:T}),Object(g.jsx)(M,{d:tn,fill:"none",stroke:on,strokeWidth:W,strokeLinecap:"round",$xTranslate:I.x-2*z,$yTranslate:I.y-z}),c&&Object(g.jsx)(B,{p1:R,p2:S,p3:A,p4:I,color:j})]})]})}}},[[16,1,2]]]);
//# sourceMappingURL=main.f10e60f3.chunk.js.map