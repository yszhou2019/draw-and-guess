(function(e){function t(t){for(var s,o,r=t[0],c=t[1],u=t[2],d=0,h=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&h.push(a[o][0]),a[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(h.length)h.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],s=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(s=!1)}s&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var s={},a={app:0},i=[];function o(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=s,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var u=0;u<r.length;u++)t(r[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"0dd1":function(e,t,n){"use strict";n("c3ab")},"169e":function(e,t,n){"use strict";n("583a")},"28a4":function(e,t,n){"use strict";n("688f")},"4e57":function(e,t,n){"use strict";n("eb43")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],o={name:"App"},r=o,c=(n("034f"),n("2877")),u=Object(c["a"])(r,a,i,!1,null,null,null),l=u.exports,d=n("8c4f"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"homePage"},[n("home-header"),n("home-content")],1)},m=[],g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[1==e.showLogin?n("div",[n("el-dialog",{attrs:{title:"登录用户",visible:e.showLogin,width:"50%"},on:{"update:visible":function(t){e.showLogin=t},close:e.dialogClosed}},[n("el-form",{ref:"loginFormRef",attrs:{model:e.loginForm,rules:e.loginFormRules,"label-width":"70px"}},[n("el-form-item",{attrs:{label:"用户名",prop:"userid"}},[n("el-input",{model:{value:e.loginForm.userid,callback:function(t){e.$set(e.loginForm,"userid",t)},expression:"loginForm.userid"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.dialogClosed}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.saveID}},[e._v("确 定")])],1)],1)],1):e._e(),n("div",{staticClass:"header"},[n("div",{staticClass:"header-content"},[n("div",{staticClass:"header-left"},[e._v("你画我猜")]),n("div",{staticClass:"header-right"},[n("ul",[n("li",[""==e.username?n("a",{on:{click:e.login}},[e._v("登录")]):n("a",{on:{click:e.login}},[e._v("欢迎 "+e._s(e.username))])]),e._m(0),n("li",[n("a",[e._v(e._s(e.roomID))])]),n("li",[n("a",{on:{click:e.logout}},[e._v("退出")])])])])])])])},f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"https://github.com/buppt",target:"_blank"}},[e._v("Github")])])}],p=(n("96cf"),n("1da1")),w={name:"PageHeader",data:function(){return{showLogin:!1,inputName:"",loginForm:{userid:""},loginFormRules:{userid:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"用户名的长度在3~10个字符之间",trigger:"blur"}]}}},mounted:function(){if(window.sessionStorage){var e=window.sessionStorage,t=e.getItem("username");null!=t&&""!=t&&(this.username=t,this.inputName=t,this.showLogin=!1,this.$store.commit("username/setUsername",t))}else alert("浏览器不支持sessionStorage!")},computed:{username:function(){return this.$store.state.username.username},roomID:function(){return this.$store.state.beginGame.roomID}},methods:{login:function(){this.showLogin=!0},hideLogin:function(){this.showLogin=!1},saveName:function(){if(window.sessionStorage){var e=window.sessionStorage;e.setItem("username",this.inputName)}else alert("浏览器不支持sessionStorage!");this.username=this.inputName,this.showLogin=0,this.$store.commit("username/setUsername",this.inputName)},logout:function(){this.$store.state.wsStore.ws.send("disconnect,".concat(this.$store.state.username.username)),this.$store.state.wsStore.ws.close(1e3,"".concat(this.$store.state.username.username)),this.$store.commit("wsStore/changeSeats",["空位","空位","空位","空位","空位","空位"]),this.$store.commit("username/setUsername","")},saveID:function(){var e=this;this.$refs.loginFormRef.validate(function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.showLogin=!1,e.$refs.loginFormRef.resetFields();case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},dialogClosed:function(){this.showLogin=!1,this.$refs.loginFormRef.resetFields()}},directives:{focus:{inserted:function(e){e.focus()}}}},v=w,b=(n("ee03"),Object(c["a"])(v,g,f,!1,null,"3ab92db7",null)),y=b.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"homeContent"},[n("div",{staticClass:"boardleft"},[n("div",{staticClass:"showBoard"},[e.beginGame?n("div",[e._v(" 当前画家："+e._s(e.drawuser)+" 剩余时间："+e._s(e.second)+" ")]):n("div",[e._v("请等待一楼开始游戏")]),e.beginGame&&e.drawuser!=e.username?n("show-board",{key:e.drawKey}):n("draw-board",{key:e.drawKey}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.beginGame&&e.drawuser===e.username,expression:"beginGame && drawuser === username"}],staticClass:"guassWord"},[e._v(" 要画的词是："+e._s(e.guassWord)+" ")])],1),n("the-seats",{staticClass:"seat"})],1),n("div",{staticClass:"boardright"},[n("chat-board",{staticClass:"chatBoard"}),n("input-board",{staticClass:"inputBoard"})],1),n("div",{staticClass:"clear"})])},x=[],C=(n("caad"),n("fb6a"),n("ac1f"),n("1276"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"drawBoard"},[n("div",{staticClass:"canvasSetting"},[n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.drawType,expression:"drawType"}],attrs:{name:"drawType",type:"radio",value:"画笔"},domProps:{checked:e._q(e.drawType,"画笔")},on:{change:function(t){e.drawType="画笔"}}}),e._v("画笔 ")]),n("br"),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.drawType,expression:"drawType"}],attrs:{name:"drawType",type:"radio",value:"直线"},domProps:{checked:e._q(e.drawType,"直线")},on:{change:function(t){e.drawType="直线"}}}),e._v("直线 ")]),n("br"),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.drawType,expression:"drawType"}],attrs:{name:"drawType",type:"radio",value:"矩形"},domProps:{checked:e._q(e.drawType,"矩形")},on:{change:function(t){e.drawType="矩形"}}}),e._v("矩形 ")]),n("br"),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.drawType,expression:"drawType"}],attrs:{name:"drawType",type:"radio",value:"圆"},domProps:{checked:e._q(e.drawType,"圆")},on:{change:function(t){e.drawType="圆"}}}),e._v("圆 ")]),n("br"),e._v(" 填充颜色： "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.fillColor,expression:"fillColor"}],attrs:{type:"color"},domProps:{value:e.fillColor},on:{input:function(t){t.target.composing||(e.fillColor=t.target.value)}}}),n("br"),e._v(" 选择颜色： "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.drawColor,expression:"drawColor"}],attrs:{type:"color"},domProps:{value:e.drawColor},on:{input:function(t){t.target.composing||(e.drawColor=t.target.value)}}}),n("br"),e._v(" 笔粗细 "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.drawLineWidth,expression:"drawLineWidth"}],attrs:{type:"range",min:"1",max:"10"},domProps:{value:e.drawLineWidth},on:{__r:function(t){e.drawLineWidth=t.target.value}}}),e._v(e._s(e.drawLineWidth)+" "),n("br"),e._v(" 线端点类型 "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.lineEndType,expression:"lineEndType"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.lineEndType=t.target.multiple?n:n[0]}}},[n("option",[e._v("默认")]),n("option",[e._v("半圆")]),n("option",[e._v("矩形")])]),n("br"),e._v(" 矩形角类型 "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.lineNodeType,expression:"lineNodeType"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.lineNodeType=t.target.multiple?n:n[0]}}},[n("option",[e._v("默认")]),n("option",[e._v("半圆")]),n("option",[e._v("斜角")])])]),n("canvas",{ref:"drawBoard",attrs:{id:"drawBoard",width:"700",height:"400"}}),n("button",{staticClass:"clearButton",on:{click:function(t){return e.clearDraw()}}},[e._v("clear")])]),n("br")])}),$=[],S=(n("99af"),n("cb29"),n("d4ec")),k=n("bee2"),T={name:"DrawBoard",data:function(){return{draw:null,drawColor:"#000000",fillColor:"#000000",drawLineWidth:1,drawType:"画笔",lineEndType:"默认",lineNodeType:"默认"}},mounted:function(){this.draw=new X(this.$refs.drawBoard,this.$store.state.wsStore.ws,this.$store.state.beginGame.beginGame),this.draw.draw()},created:function(){},watch:{drawColor:function(){this.draw.changeColor(this.drawColor)},drawLineWidth:function(){this.draw.changeLineWidth(this.drawLineWidth)},fillColor:function(){this.draw.changeFillColor(this.fillColor)},lineEndType:function(){var e={"默认":"butt","半圆":"round","矩形":"square"};this.draw.changeLineEnd(e[this.lineEndType])},lineNodeType:function(){var e={"默认":"miter","半圆":"round","斜角":"bevel"};this.draw.changeLineNode(e[this.lineNodeType])},drawType:function(){"直线"===this.drawType?this.draw.drawLine():"矩形"===this.drawType?this.draw.drawRect():"圆"===this.drawType?this.draw.drawRound():this.draw.draw()}},methods:{clearDraw:function(){this.draw.clearCanvas()}}},X=function(){function e(t,n,s){Object(S["a"])(this,e),this.ws=n,this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.stage_info=this.canvas.getBoundingClientRect(),this.path={beginX:0,beginY:0,endX:0,endY:0},this.isDraw=!1,this.color="black",this.fillColor="white",this.beginGame=s,this.msg=""}return Object(k["a"])(e,[{key:"changeColor",value:function(e){this.ctx.strokeStyle=e,this.msg="color,".concat(e),this.sendMsg()}},{key:"changeLineWidth",value:function(e){this.ctx.lineWidth=e,this.msg="lineWidth,".concat(e),this.sendMsg()}},{key:"changeFillColor",value:function(e){this.ctx.fillStyle=e,this.msg="fillColor,".concat(e),this.sendMsg()}},{key:"changeLineEnd",value:function(e){this.ctx.lineCap=e,this.msg="lineEndType,".concat(e),this.sendMsg()}},{key:"changeLineNode",value:function(e){this.ctx.lineJoin=e,this.msg="lineNode,".concat(e),this.sendMsg()}},{key:"drawLine",value:function(){var e=this;this.canvas.onmousedown=function(){e.ctx.beginPath(),e.path.beginX=event.pageX-e.stage_info.left,e.path.beginY=event.pageY-e.stage_info.top,e.ctx.moveTo(e.path.beginX,e.path.beginY)},this.canvas.onmouseup=function(){e.path.endX=event.pageX-e.stage_info.left,e.path.endY=event.pageY-e.stage_info.top,e.ctx.lineTo(e.path.endX,e.path.endY),e.ctx.stroke(),e.msg="drawline,".concat(e.path.beginX,",").concat(e.path.beginY,",").concat(e.path.endX,",").concat(e.path.endY),e.sendMsg()}}},{key:"drawRect",value:function(){var e=this;this.canvas.onmousedown=function(){e.ctx.beginPath(),e.path.beginX=event.pageX-e.stage_info.left,e.path.beginY=event.pageY-e.stage_info.top},this.canvas.onmouseup=function(){e.path.endX=event.pageX-e.stage_info.left,e.path.endY=event.pageY-e.stage_info.top,e.ctx.rect(e.path.beginX,e.path.beginY,e.path.endX-e.path.beginX,e.path.endY-e.path.beginY),e.ctx.fill(),e.ctx.stroke(),e.msg="drawrect,".concat(e.path.beginX,",").concat(e.path.beginY,",").concat(e.path.endX,",").concat(e.path.endY),e.sendMsg()}}},{key:"drawRound",value:function(){var e=this;this.canvas.onmousedown=function(){e.ctx.beginPath(),e.path.beginX=event.pageX-e.stage_info.left,e.path.beginY=event.pageY-e.stage_info.top},this.canvas.onmouseup=function(){e.path.endX=event.pageX-e.stage_info.left,e.path.endY=event.pageY-e.stage_info.top;var t=e.path.endX-e.path.beginX,n=e.path.endY-e.path.beginY;e.ctx.arc(e.path.beginX+t/2,e.path.beginY+n/2,Math.sqrt(t*t+n*n)/2,0,2*Math.PI),e.ctx.fill(),e.ctx.stroke(),e.msg="drawround,".concat(e.path.beginX,",").concat(e.path.beginY,",").concat(e.path.endX,",").concat(e.path.endY),e.sendMsg()}}},{key:"draw",value:function(){var e=this,t=this;this.canvas.onmousedown=function(){t.ctx.beginPath(),t.path.beginX=event.pageX-t.stage_info.left,t.path.beginY=event.pageY-t.stage_info.top,t.ctx.moveTo(t.path.beginX,t.path.beginY),t.isDraw=!0},this.canvas.onmousemove=function(){t.isDraw&&t.drawing(event)},this.canvas.onmouseup=function(){t.isDraw=!1,e.msg="stop,",e.sendMsg()}}},{key:"drawing",value:function(e){this.path.endX=e.pageX-this.stage_info.left,this.path.endY=e.pageY-this.stage_info.top,this.ctx.lineTo(this.path.endX,this.path.endY),this.ctx.stroke(),this.msg="draw,".concat(this.path.beginX,",").concat(this.path.beginY,",").concat(this.path.endX,",").concat(this.path.endY),this.sendMsg()}},{key:"clearCanvas",value:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.msg="clear,",this.sendMsg()}},{key:"sendMsg",value:function(){this.beginGame&&this.ws.send(this.msg)}}]),e}(),Y=T,N=(n("aa24"),Object(c["a"])(Y,C,$,!1,null,"3af962dc",null)),D=N.exports,W=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"showBoard"},[n("canvas",{ref:"showing",attrs:{id:"showing",width:"700",height:"400"}})])])},G=[],P={name:"ShowBoard",data:function(){return{canvas:"",ctx:"",draw:"",isDraw:1,stage_info:null}},mounted:function(){this.canvas=this.$refs.showing,this.stage_info=this.canvas.getBoundingClientRect(),this.ctx=this.canvas.getContext("2d"),this.ctx.strokeStyle="#000"},watch:{msg:function(e,t){if("draw"==this.msg[0]||"stop"==this.msg[0])1==this.isDraw&&"draw"==this.msg[0]?(this.ctx.beginPath(),this.ctx.moveTo(this.msg[1],this.msg[2]),this.isDraw=0):0==this.isDraw&&"stop"==this.msg[0]&&(this.isDraw=1),this.ctx.lineTo(this.msg[3],this.msg[4]),this.ctx.stroke();else if("drawline"==this.msg[0])this.ctx.beginPath(),this.ctx.moveTo(this.msg[1],this.msg[2]),this.ctx.lineTo(this.msg[3],this.msg[4]),this.ctx.stroke();else if("drawrect"==this.msg[0])this.ctx.beginPath(),this.ctx.rect(this.msg[1],this.msg[2],this.msg[3]-this.msg[1],this.msg[4]-this.msg[2]),this.ctx.fill(),this.ctx.stroke();else if("drawround"==this.msg[0]){this.ctx.beginPath();var n=this.msg[3]-this.msg[1],s=this.msg[4]-this.msg[2];this.ctx.arc(this.msg[1]+n/2,this.msg[2]+s/2,Math.sqrt(n*n+s*s)/2,0,2*Math.PI),this.ctx.fill(),this.ctx.stroke()}else"clear"==this.msg[0]?this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height):"color"==this.msg[0]?this.ctx.strokeStyle=this.msg[1]:"lineWidth"==this.msg[0]?this.ctx.lineWidth=this.msg[1]:"fillColor"==this.msg[0]?this.ctx.fillStyle=this.msg[1]:"lineEndType"==this.msg[0]?this.ctx.lineCap=this.msg[1]:"lineNode"==this.msg[0]&&(this.ctx.lineJoin=this.msg[1])}},computed:{msg:function(){return this.$store.state.wsStore.draw}},methods:{clearDraw:function(){this.draw.clearCanvas()}}},L=P,B=(n("0dd1"),Object(c["a"])(L,W,G,!1,null,"43cb3e4d",null)),O=B.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"seatContent"},[n("div",{staticClass:"startButton"},[e.seats[0]==e.username?n("button",{attrs:{disabled:e.btnNotAllow},on:{click:function(t){return e.begin()}}},[e._v(" 开始游戏 ")]):n("button",{attrs:{disabled:e.btnNotAllow},on:{click:function(t){return e.seatDown(0)}}},[e._v(" 一楼房主 ")]),n("div",{staticClass:"clear"})]),e._l(e.seats,(function(t,s){return n("div",{key:s,staticClass:"seats-block"},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.beginGame&&e.drawuser==t,expression:"beginGame && drawuser == seat"}],staticClass:"drawuser"},[e._v(" 画 ")]),n("button",{staticClass:"seat-num",class:"空位"==t?"blue":"green",attrs:{type:"primary",plain:"",disabled:e.btnNotAllow},on:{click:function(t){return e.seatDown(s)}}},[e._v(" "+e._s(t)+" ")])])}))],2)},R=[],j={name:"TheSeats",data:function(){return{buttonShow:"空位",btnNotAllow:!1}},computed:{username:function(){return this.$store.state.username.username},seats:function(){return this.$store.state.wsStore.seats},beginGame:function(){return this.$store.state.beginGame.beginGame},drawuser:function(){return this.$store.state.beginGame.drawUser}},watch:{beginGame:function(e,t){this.beginGame?this.btnNotAllow=!0:this.btnNotAllow=!1}},methods:{seatDown:function(e){3!=this.$store.state.wsStore.ws.readyState?null==this.username||""==this.username?this.$message("请登陆"):"空位"==this.seats[e]?this.$store.state.wsStore.ws.send("seats,".concat(e,",").concat(this.username)):this.$message("此位置有人"):this.$message("服务器未连接")},begin:function(){this.$store.state.wsStore.ws.send("begin,")}}},M=j,I=(n("e486"),Object(c["a"])(M,E,R,!1,null,"52bd07a1",null)),F=I.exports,U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{ref:"totalBoard",staticClass:"totalBoard",attrs:{id:"totalBoard"}},[e._l(e.chatRecords,(function(t,s){return n("div",{key:s,staticClass:"record"},[n("span",{staticClass:"blue"},[e._v(e._s(t.username))]),e._v(":"+e._s(t.content)+" ")])})),n("div",{staticClass:"blank"})],2),n("button",{staticClass:"clearScreen",on:{click:e.clearScreen}},[e._v("清屏")])])},A=[],q={name:"ChatBoard",data:function(){return{chatRecords:[]}},watch:{msg:function(e,t){var n={username:this.msg[1],content:this.msg[2]};this.chatRecords.push(n);var s=this.$refs.totalBoard;this.$nextTick((function(){s.scrollTop=s.scrollHeight}))}},computed:{msg:function(){return this.$store.state.wsStore.chat}},methods:{clearScreen:function(){this.chatRecords=[]}}},H=q,K=(n("169e"),Object(c["a"])(H,U,A,!1,null,"853a37be",null)),J=K.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"totalBoard"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.guassWord,expression:"guassWord"}],ref:"input",staticClass:"inputContent",attrs:{type:"text",placeholder:"这里输入内容",disabled:e.allowSend},domProps:{value:e.guassWord},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitWord(t)},input:function(t){t.target.composing||(e.guassWord=t.target.value)}}}),n("el-button",{ref:"btn",staticClass:"submitButton",attrs:{type:"primary",disabled:e.allowSend},on:{click:e.submitWord}},[e._v("发送 ")])],1)])},Q=[],V={name:"ChatBoard",data:function(){return{guassWord:"",allowSend:!1}},computed:{username:function(){return this.$store.state.username.username},drawuser:function(){return this.$store.state.beginGame.drawUser}},watch:{drawuser:function(e,t){this.drawuser==this.username?this.allowSend=!0:this.allowSend=!1}},methods:{submitWord:function(){3!=this.$store.state.wsStore.ws.readyState?null!=this.username&&""!=this.username?""!=this.guassWord&&(this.$store.state.wsStore.ws.send("chat,".concat(this.username,",").concat(this.guassWord)),this.guassWord=""):this.$message("请登陆"):this.$message("服务器未连接")}}},Z=V,ee=(n("8f10"),Object(c["a"])(Z,z,Q,!1,null,"0c2772d7",null)),te=ee.exports,ne={name:"HomeContent",components:{DrawBoard:D,ShowBoard:O,TheSeats:F,ChatBoard:J,InputBoard:te},data:function(){return{second:20,timer:null}},computed:{username:function(){return this.$store.state.username.username},drawuser:function(){return this.$store.state.beginGame.drawUser},beginGame:function(){return this.$store.state.beginGame.beginGame},guassWord:function(){return this.$store.state.beginGame.drawWord},drawKey:function(){return this.$store.state.wsStore.drawKey}},watch:{drawuser:function(e,t){this.second=20,this.countDown()}},methods:{countDown:function(){var e=this;clearInterval(this.timer),this.timer=null,this.timer=setInterval((function(){e.second--,0===e.second&&(clearInterval(e.timer),e.timer=null)}),1e3)}},mounted:function(){var e=new WebSocket("ws://localhost:3000/");this.$store.commit("wsStore/connect",e);var t=this,n=["drawline","drawrect","drawround","color","lineWidth","fillColor","lineEndType","lineNode"];e.onmessage=function(e){var s=e.data.split(",");"seats"===s[0]?t.$store.commit("wsStore/changeSeats",s.slice(1,7)):"chat"===s[0]&&3===s.length?t.$store.commit("wsStore/acceptChat",s):"draw"===s[0]||"stop"===s[0]||"clear"===s[0]?t.$store.commit("wsStore/acceptDraw",s):"begin"===s[0]||"end"===s[0]?(t.$store.commit("beginGame/countDown",s),t.$store.commit("wsStore/rerender")):n.includes(s[0])?t.$store.commit("wsStore/acceptDraw",s):"disconnect"===s[0]?t.$store.commit("wsStore/changeSeats",s.slice(1,7)):"userid"===s[0]?t.$store.commit("username/setUsername",s[1]):"roomID"===s[0]&&t.$store.commit("beginGame/getRoomID",s[1])},window.onbeforeunload=function(e){t.$store.state.wsStore.ws.send("disconnect,".concat(t.$store.state.username.username)),t.$store.state.wsStore.ws.close(1e3,"".concat(t.$store.state.username.username))}}},se=ne,ae=(n("4e57"),Object(c["a"])(se,_,x,!1,null,"f3b56646",null)),ie=ae.exports,oe={name:"HomePage",components:{HomeHeader:y,HomeContent:ie}},re=oe,ce=(n("28a4"),Object(c["a"])(re,h,m,!1,null,"73560a98",null)),ue=ce.exports;s["default"].use(d["a"]);var le=new d["a"]({routes:[{path:"/",name:"HomePage",component:ue}]}),de=n("2f62"),he={username:"",count:0},me={getUsername:function(e){return e.username},setUsername:function(e,t){e.username=t},increment:function(e,t){e.count+=t}},ge={namespaced:!0,state:he,mutations:me},fe={ws:null,seats:["空位","空位","空位","空位","空位","空位"],chat:[],draw:[],drawKey:0},pe={connect:function(e,t){e.ws=t},changeSeats:function(e,t){e.seats=t},acceptChat:function(e,t){e.chat=t},acceptDraw:function(e,t){e.draw=t},rerender:function(e){e.drawKey++},userleave:function(e,t){e.seats[t]="空位"}},we={namespaced:!0,state:fe,mutations:pe},ve={beginGame:!1,drawUser:"",drawWord:"",roomID:null},be={countDown:function(e,t){"begin"==t[0]?(e.beginGame=!0,e.drawUser=t[1],e.drawWord=t[2]):("end"==t[0]||void 0==t[0])&&(e.beginGame=!1)},getRoomID:function(e,t){e.roomID=t}},ye={namespaced:!0,state:ve,mutations:be};s["default"].use(de["a"]);var _e=new de["a"].Store({modules:{username:ge,wsStore:we,beginGame:ye},strict:!1}),xe=(n("0fb7"),n("450d"),n("f529")),Ce=n.n(xe),$e=(n("10cb"),n("f3ad")),Se=n.n($e),ke=(n("eca7"),n("3787")),Te=n.n(ke),Xe=(n("425f"),n("4105")),Ye=n.n(Xe),Ne=(n("a7cc"),n("df33")),De=n.n(Ne),We=(n("1951"),n("eedf")),Ge=n.n(We);s["default"].use(Ge.a),s["default"].use(De.a),s["default"].use(Ye.a),s["default"].use(Te.a),s["default"].use(Se.a),s["default"].prototype.$message=Ce.a,s["default"].config.productionTip=!1,new s["default"]({router:le,store:_e,render:function(e){return e(l)}}).$mount("#app")},"57dd":function(e,t,n){},"583a":function(e,t,n){},"688f":function(e,t,n){},"85ec":function(e,t,n){},"8f10":function(e,t,n){"use strict";n("e95f")},"9cb1":function(e,t,n){},a784:function(e,t,n){},aa24:function(e,t,n){"use strict";n("a784")},c3ab:function(e,t,n){},e486:function(e,t,n){"use strict";n("57dd")},e95f:function(e,t,n){},eb43:function(e,t,n){},ee03:function(e,t,n){"use strict";n("9cb1")}});
//# sourceMappingURL=app.419b907f.js.map