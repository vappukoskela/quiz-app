(this["webpackJsonpquiz-app"]=this["webpackJsonpquiz-app"]||[]).push([[0],{149:function(e,t,n){},151:function(e,t,n){},213:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),s=n.n(r),i=n(10),c=n.n(i),o=(n(149),n(42)),u=n(12),d=n(11),l=n.n(d),j=n(19),b=n(18),x=(n(151),n(251)),O=n(254),p=n(256),h=n(59),f=n(257),w=n(270),v=n(261),g=n(43),q=n(122),m=new(n.n(q).a)({en:{login:"Login",register:"Register",email:"Email",password:"Password",reglink:"Register here",firstname:"First name",surname:"Surname",adminuser:"Admin user",teachermode:"Teacher mode",showcorrect:"Show correct answers",hidecorrect:"Hide correct answers",question:"Question",answer:"Answer",addnewquestion:"Add new question",addnewanswer:"Add new answer",addnewquiz:"Add new quiz",delete:"Delete",regerror:"Registration failed",files:"Files"},fi:{login:"Kirjaudu",register:"Rekister\xf6idy",email:"S\xe4hk\xf6posti",password:"Salasana",reglink:"Rekister\xf6idy t\xe4st\xe4",firstname:"Etunimi",surname:"Sukunimi",adminuser:"Admin-k\xe4ytt\xe4j\xe4",teachermode:"Opettaja",showcorrect:"N\xe4yt\xe4 oikeat vastaukset",hidecorrect:"Piilota oikeat vastaukset",question:"Kysymys",answer:"Vastaus",addnewquestion:"Lis\xe4\xe4 uusi kysymys",addnewanswer:"Lis\xe4\xe4 uusi vastaus",addnewquiz:"Lis\xe4\xe4 uusi tentti",delete:"Poista",regerror:"Rekister\xf6ityminen ep\xe4onnistui",files:"Tiedostot"}}),z=Object(x.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},lanselect:{margin:e.spacing(1),width:"70px",paddingInlineStart:"15px"}}}));var k=function(e){m.setLanguage(e.language);var t=z();return Object(a.jsx)("div",{className:t.root,children:Object(a.jsx)(O.a,{position:"fixed",children:Object(a.jsxs)(p.a,{children:[Object(a.jsx)(h.a,{variant:"h6",className:t.title,children:Object(a.jsx)(g.b,{to:"/",style:{textDecoration:"none",color:"white"},children:"Quiz App"})}),Object(a.jsx)(g.b,{to:"/login",style:{textDecoration:"none"},children:Object(a.jsx)(f.a,{variant:"contained",color:"primary",disableElevation:!0,children:m.login})}),Object(a.jsxs)(w.a,{className:t.lanselect,defaultValue:"en",style:{color:"white"},onChange:function(t){return e.switchLanguage(t.target.value)},children:[Object(a.jsx)(v.a,{value:"en",selected:!0,children:" EN "}),Object(a.jsx)(v.a,{value:"fi",children:" FI "})]})]})})})},I=n(260),E=n(78),C=n.n(E),y=n(130),Q=n.n(y),N=n(267),T=n(268),S=n(269),D=n(214),A=n(20),_=n.n(A),R=n(215),L=n(272),G=n(273),B=function(){var e=Object(r.useState)({firstname:"",surname:"",email:"",password:"",role_id:2}),t=Object(b.a)(e,2),n=t[0],s=t[1],i=Object(r.useState)(!0),c=Object(b.a)(i,2),d=c[0],x=c[1],O=Object(r.useState)(""),p=Object(b.a)(O,2),h=p[0],w=p[1],v=function(e,t){s(Object(u.a)(Object(u.a)({},n),{},Object(o.a)({},t,e.target.value)))};Object(r.useEffect)((function(){s(d?Object(u.a)(Object(u.a)({},n),{},{role_id:2}):Object(u.a)(Object(u.a)({},n),{},{role_id:3}))}),[d]);var g=function(){var e=Object(j.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),a={email:n.email,password:n.password,firstname:n.firstname,surname:n.surname,role_id:n.role_id},console.log(a),t.preventDefault(),e.prev=4,e.next=7,_.a.post("http://localhost:5000/register/",a).then((function(e){w("")}));case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(4),w(m.regerror),console.log("registration error",e.t0);case 13:case"end":return e.stop()}}),e,null,[[4,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)("div",{className:"container",children:Object(a.jsxs)(I.a,{children:[Object(a.jsx)(R.a,{children:Object(a.jsx)("h2",{children:m.register})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(L.a,{onChange:function(e){return v(e,"firstname")},size:"small",label:m.firstname,variant:"outlined"})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(L.a,{onChange:function(e){return v(e,"surname")},size:"small",label:m.surname,variant:"outlined"})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(L.a,{onChange:function(e){return v(e,"email")},size:"small",label:m.email,variant:"outlined"})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(L.a,{onChange:function(e){return v(e,"password")},size:"small",label:m.password,type:"password",variant:"outlined"})}),Object(a.jsxs)(R.a,{children:[Object(a.jsx)(G.a,{checked:d,onChange:function(e){return x(!d)}})," ",m.adminuser,"?"]}),Object(a.jsx)(R.a,{children:Object(a.jsx)(f.a,{variant:"outlined",onClick:function(e){return g(e)},children:m.register})}),Object(a.jsx)(R.a,{className:"errorMessage",children:h})]})})},H=n(77),U=n.n(H),M=n(128),W=n.n(M),F=n(131),P=n(127),X=n.n(P);var J=function(e){var t={flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",borderWidth:2,borderRadius:2,borderColor:"#eeeeee",borderStyle:"dashed",backgroundColor:"#fafafa",color:"#bdbdbd",outline:"none",transition:"border .24s ease-in-out"},n={borderColor:"#2196f3"},s={borderColor:"#00e676"},i={borderColor:"#ff1744"},c=Object(r.useCallback)(function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),n=X.a.post("http://localhost:5000/upload"),t.forEach((function(e){n.attach("file",e),console.log(e)})),n.end((function(e,t){console.log("THIS IS THE RES",t)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),o=Object(F.a)({onDrop:c}),d=o.acceptedFiles,b=o.getRootProps,x=o.getInputProps,O=o.isDragActive,p=o.isDragAccept,h=o.isDragReject,f=Object(r.useMemo)((function(){return Object(u.a)(Object(u.a)(Object(u.a)(Object(u.a)({},t),O?n:{}),p?s:{}),h?i:{})})),w=d.map((function(e){return Object(a.jsxs)("li",{children:[e.path," - ",e.size," bytes"]},e.path)}));return Object(a.jsxs)("section",{children:[Object(a.jsxs)("div",Object(u.a)(Object(u.a)({},b({style:f})),{},{children:[Object(a.jsx)("input",Object(u.a)({},x())),O?Object(a.jsx)("p",{children:"Drop the files here ..."}):Object(a.jsx)("p",{children:"Drag 'n' drop some files here, or click to select files"})]})),Object(a.jsxs)("aside",{children:[Object(a.jsx)("ul",{children:m.files}),Object(a.jsx)("ul",{children:w})]})]})};var K=function(e){var t=Object(r.useState)(!1),n=Object(b.a)(t,2),s=n[0],i=n[1];return Object(a.jsxs)("div",{children:[Object(a.jsxs)(R.a,{role:void 0,dense:!0,children:[Object(a.jsx)(L.a,{fullWidth:!0,onChange:function(t){return e.updateQuestion(t,e.quiz,e.parentIndex)},size:"small",label:m.question+" "+(e.parentIndex+1),variant:"outlined",value:e.value.question}),Object(a.jsx)(f.a,{className:"deleteButton",onClick:function(t){return e.deleteQuestion(t,e.quiz,e.parentIndex)},children:Object(a.jsx)(U.a,{})}),Object(a.jsx)(f.a,{className:"deleteButton",onClick:function(e){i(!s)},children:Object(a.jsx)(W.a,{})})]},e.value.id),Object(a.jsx)(R.a,{children:s?Object(a.jsx)(J,{}):""})]})},V=n(262),Z=n(6),$=n(80);var Y=function(e){var t=Object(Z.a)({root:{color:$.a[400],"&$checked":{color:$.a[600]}},checked:{}})((function(e){return Object(a.jsx)(G.a,Object(u.a)({color:"default"},e))}));return Object(a.jsxs)(R.a,{role:void 0,dense:!0,children:[Object(a.jsx)(V.a,{children:Object(a.jsx)(t,{onChange:function(t){return e.updateAnsweroption(t,e.quiz,e.parentIndex,e.index,"CHECKBOX")},checked:!1,edge:"start",tabIndex:-1})}),Object(a.jsx)(V.a,{children:Object(a.jsx)(G.a,{onChange:function(t){return e.dispatch({type:"SELECT_TOGGLE",data:{newText:t.target.value,quizIndex:e.quiz,questionIndex:e.parentIndex,answerIndex:e.index}})},checked:e.value.selected,edge:"start",tabIndex:-1})}),Object(a.jsxs)("div",{children:[Object(a.jsx)(L.a,{onChange:function(t){return e.updateAnsweroption(t,e.quiz,e.parentIndex,e.index,"TEXT")},size:"small",label:m.answer+" "+(e.index+1),variant:"outlined",value:e.value.answer}),Object(a.jsx)(f.a,{className:"deleteButton",onClick:function(t){return e.deleteAnsweroption(t,e.quiz,e.parentIndex,e.index)},children:Object(a.jsx)(U.a,{})})]})]},"editansweropt"+e.value.id)},ee=n(263);var te=function(e){var t=Object(Z.a)({root:{color:$.a[400],"&$checked":{color:$.a[600]}},checked:{}})((function(e){return Object(a.jsx)(G.a,Object(u.a)({color:"default"},e))}));return Object(a.jsxs)(R.a,{role:void 0,dense:!0,children:[Object(a.jsx)(V.a,{children:e.answersVisible?Object(a.jsx)(t,{checked:e.value.correct,edge:"start",tabIndex:-1,disabled:!0}):null}),Object(a.jsx)(V.a,{children:Object(a.jsx)(G.a,{checked:e.value.selected,edge:"start",tabIndex:-1})}),Object(a.jsx)("div",{children:Object(a.jsx)(ee.a,{id:e.index,primary:e.value.answer})})]},e.value.id)},ne=function(){var e=Object(r.useState)({email:"",password:""}),t=Object(b.a)(e,2),n=t[0],s=t[1],i=function(e,t){s(Object(u.a)(Object(u.a)({},n),{},Object(o.a)({},t,e.target.value)))};return Object(a.jsx)("div",{className:"container",children:Object(a.jsxs)(I.a,{children:[Object(a.jsx)(R.a,{children:Object(a.jsx)("h2",{children:m.login})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(L.a,{onChange:function(e){return i(e,"email")},size:"small",label:m.email,variant:"outlined"})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(L.a,{onChange:function(e){return i(e,"password")},size:"small",label:m.password,type:"password",variant:"outlined"})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(f.a,{variant:"outlined",children:m.login})}),Object(a.jsx)(R.a,{children:Object(a.jsx)(g.b,{to:"/register",children:Object(a.jsx)("i",{children:m.reglink})})})]})})},ae=n(16),re=n(65),se=n(129),ie=n.n(se),ce=n(274),oe=n(266),ue=n(265),de=n(264);var le=function(e){var t=s.a.useState(!1),n=Object(b.a)(t,2),i=n[0],c=n[1],o=Object(r.useState)(""),u=Object(b.a)(o,2),d=u[0],l=u[1],j=function(){c(!1)};return Object(a.jsxs)("div",{children:[Object(a.jsxs)(f.a,{onClick:function(){c(!0)},children:[Object(a.jsx)(C.a,{})," Add new quiz "]}),Object(a.jsxs)(ce.a,{open:i,onClose:j,"aria-labelledby":"form-dialog-title",children:[Object(a.jsx)(de.a,{id:"form-dialog-title",children:"Create New Quiz"}),Object(a.jsx)(ue.a,{children:Object(a.jsx)(L.a,{autoFocus:!0,margin:"dense",id:"name",label:"Quiz name",fullWidth:!0,onChange:function(e){return l(e.target.value)}})}),Object(a.jsxs)(oe.a,{children:[Object(a.jsx)(f.a,{onClick:j,color:"primary",children:"Cancel"}),Object(a.jsx)(f.a,{onClick:function(t){j(),e.addNewQuiz(d)},color:"primary",children:"Create new quiz"})]})]})]})},je=Object(x.a)((function(e){return{root:{width:"100%",maxWidth:"100%",backgroundColor:e.palette.background.paper,"& > *":{margin:e.spacing(1)}}}})),be=null;function xe(e,t){var n=JSON.parse(JSON.stringify(e));switch(t.type){case"increment":return{count:e.count+1};case"INIT_DATA":return console.log(t),t.data;case"ANSWER_CHANGED":return n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions[t.data.answerIndex].answer=t.data.newText,n;case"QUESTION_CHANGED":return n[t.data.quizIndex].quizQuestions[t.data.questionIndex].question=t.data.newText,n;case"QUIZ_CHANGED":return n[t.data.quizIndex].quizName=t.data.newText,n;case"ADD_ANSWER":var a={answer:"",correct:!1,selected:!1,id:t.data.id};return n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions.push(a),n;case"ADD_QUESTION":var r={question:"",answerOptions:[],id:t.data.id};return n[t.data.quizIndex].quizQuestions.push(r),n;case"ADD_QUIZ":var s={id:t.data.quizId,quizname:t.data.quizname,quizQuestions:[]};return n.push(s),n;case"DELETE_ANSWER":return n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions.splice(t.data.answerIndex,1),n;case"DELETE_QUESTION":return n[t.data.quizIndex].quizQuestions.splice(t.data.questionIndex,1),n;case"DELETE_QUIZ":return n[t.data.quizIndex].splice(t.data.quizIndex,1),n;case"SELECT_TOGGLE":return n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions[t.data.answerIndex].selected=!n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions[t.data.answerIndex].selected,n;case"CORRECT_TOGGLE":return n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions[t.data.answerIndex].correct=!n[t.data.quizIndex].quizQuestions[t.data.questionIndex].answerOptions[t.data.answerIndex].correct,n;default:throw new Error}}be="https://vappus-quiz-app.herokuapp.com/";var Oe=Object(re.c)((function(){var e=je(),t=Object(r.useState)(!1),n=Object(b.a)(t,2),i=n[0],c=n[1],d=Object(r.useState)(0),x=Object(b.a)(d,2),O=x[0],p=x[1],h=Object(r.useState)(!1),w=Object(b.a)(h,2),v=w[0],g=w[1],q=Object(r.useReducer)(xe,[]),z=Object(b.a)(q,2),E=z[0],y=z[1],A=Object(r.useState)(),R=Object(b.a)(A,2),L=(R[0],R[1],Object(r.useState)("en")),G=Object(b.a)(L,2),H=G[0],U=G[1],M=Object(re.b)(),W=M.enqueueSnackbar;M.closeSnackbar,Object(r.useEffect)((function(){var e=ie()("ws://localhost:9000");e.on("connected",(function(t){console.log("CONNECTED"),e.emit("ready for data",{}),W("Socket connected!")})),e.on("update",(function(e){var t="";switch(console.log("UPDATED",e.message.payload),e.message.channel){case"addquiz":t="New Quiz: "+e.message.payload;break;case"adduser":t=e.message.payload+" just registered for the first time!";break;case"alterquiz":var n=JSON.parse(e.message.payload);console.log("hi from here"),console.log(n),t="Quiz: "+n.old+" was renamed to "+n.new;break;case"addedrecord":t="this is a test!"}W(t)}))}),[]),Object(r.useEffect)((function(){(function(){var e=Object(j.a)(l.a.mark((function e(){var t,n,a,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.a.get(be+"quiz");case 3:if(!((t=e.sent).data.length>0)){e.next=31;break}n=0;case 6:if(!(n<t.data.length)){e.next=26;break}return t.data[n].quizQuestions=[],e.next=10,_.a.get(be+"quiz/"+t.data[n].id+"/question/");case 10:if(a=e.sent,t.data[n].quizQuestions=a.data,!(t.data[n].quizQuestions.length>0)){e.next=23;break}r=0;case 14:if(!(r<t.data[n].quizQuestions.length)){e.next=23;break}return t.data[n].quizQuestions[r].answerOptions=[],e.next=18,_.a.get(be+"quiz/"+t.data[n].id+"/question/"+t.data[n].quizQuestions[r].id+"/answer");case 18:s=e.sent,t.data[n].quizQuestions[r].answerOptions=s.data;case 20:r++,e.next=14;break;case 23:n++,e.next=6;break;case 26:console.log(t.data),y({type:"INIT_DATA",data:t.data}),c(!0),e.next=32;break;case 31:throw"No data :(";case 32:e.next=37;break;case 34:e.prev=34,e.t0=e.catch(0),console.log(e.t0);case 37:case"end":return e.stop()}}),e,null,[[0,34]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var F=function(){var e=Object(j.a)(l.a.mark((function e(t,n){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=E[n].id,r={},e.prev=2,e.next=5,_.a.post(be+"quiz/"+a,r).then((function(e){console.log("new id"+e.data.id),y({type:"ADD_QUESTION",data:{quizIndex:O,id:e.data.id}})}));case 5:e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,n){return e.apply(this,arguments)}}(),P=function(){var e=Object(j.a)(l.a.mark((function e(t,n,a){var r,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=E[n].id,s=E[n].quizQuestions[a].id,i={correct:!1},e.prev=3,e.next=6,_.a.post(be+"quiz/"+r+"/question/"+s,i).then((function(e){console.log("new id"+e.data.id),y({type:"ADD_ANSWER",data:{quizIndex:O,questionIndex:a,id:e.data.id}})}));case 6:e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t,n,a){return e.apply(this,arguments)}}(),X=function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={quizname:t},e.prev=1,e.next=4,_.a.post(be+"quiz/",n).then((function(e){console.log("new id"+e.data.id),y({type:"ADD_QUIZ",data:{quizId:e.data.id,quizname:t}})}));case 4:e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(j.a)(l.a.mark((function e(t,n,a){var r,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=E[n].id,s=E[n].quizQuestions[a].id,i={question:t.target.value},e.prev=3,e.next=6,_.a.put(be+"quiz/"+r+"/question/"+s,i);case 6:e.sent,y({type:"QUESTION_CHANGED",data:{newText:i.question,quizIndex:n,questionIndex:a}}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t,n,a){return e.apply(this,arguments)}}(),V=function(){var e=Object(j.a)(l.a.mark((function e(t,n,a,r,s){var i,c,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=E[n].id,c=E[n].quizQuestions[a].id,o=E[n].quizQuestions[a].answerOptions[r].id,u={},e.t0=s,e.next="TEXT"===e.t0?7:"CHECKBOX"===e.t0?10:13;break;case 7:return u.answer=t.target.value,u.correct=E[n].quizQuestions[a].answerOptions[r].correct,e.abrupt("break",16);case 10:return u.answer=E[n].quizQuestions[a].answerOptions[r].answer,u.correct=!E[n].quizQuestions[a].answerOptions[r].correct,e.abrupt("break",16);case 13:return u.answer=E[n].quizQuestions[a].answerOptions[r].answer,u.correct=E[n].quizQuestions[a].answerOptions[r].correct,e.abrupt("break",16);case 16:return e.prev=16,e.next=19,_.a.put(be+"quiz/"+i+"/question/"+c+"/answer/"+o,u);case 19:e.sent,e.t1=s,e.next="TEXT"===e.t1?23:"CHECKBOX"===e.t1?25:27;break;case 23:return y({type:"ANSWER_CHANGED",data:{newText:u.answer,quizIndex:n,questionIndex:a,answerIndex:r}}),e.abrupt("break",28);case 25:return y({type:"CORRECT_TOGGLE",data:{newText:u.answer,quizIndex:n,questionIndex:a,answerIndex:r}}),e.abrupt("break",28);case 27:return e.abrupt("break",28);case 28:e.next=33;break;case 30:e.prev=30,e.t2=e.catch(16),console.log(e.t2);case 33:case"end":return e.stop()}}),e,null,[[16,30]])})));return function(t,n,a,r,s){return e.apply(this,arguments)}}(),Z=function(){var e=Object(j.a)(l.a.mark((function e(t,n,a){var r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=E[n].id,s=E[n].quizQuestions[a].id,e.prev=2,e.next=5,_.a.delete(be+"quiz/"+r+"/question/"+s);case 5:e.sent,y({type:"DELETE_QUESTION",data:{newText:"",quizIndex:O,questionIndex:a}}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,n,a){return e.apply(this,arguments)}}(),$=function(){var e=Object(j.a)(l.a.mark((function e(t,n,a,r){var s,i,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=E[n].id,i=E[n].quizQuestions[a].id,c=E[n].quizQuestions[a].answerOptions[r].id,e.prev=3,e.next=6,_.a.delete(be+"quiz/"+s+"/question/"+i+"/answer/"+c);case 6:e.sent,y({type:"DELETE_ANSWER",data:{newText:"",quizIndex:O,questionIndex:a,answerIndex:r}}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t,n,a,r){return e.apply(this,arguments)}}(),ee=s.a.useState({teacherMode:!1}),se=Object(b.a)(ee,2),ce=se[0],oe=se[1];return Object(a.jsx)("div",{children:Object(a.jsxs)(N.a,{className:"quizContainer",children:[Object(a.jsx)(k,{switchLanguage:function(e){U(e),m.setLanguage(e)},language:H}),Object(a.jsxs)(ae.c,{children:[Object(a.jsx)(ae.a,{exact:!0,path:"/register",component:Object(ae.f)(B)}),Object(a.jsx)(ae.a,{exact:!0,path:"/login",component:Object(ae.f)(ne)}),Object(a.jsxs)(ae.a,{exact:!0,path:"/",children:[Object(a.jsxs)("div",{className:e.root,children:[Object(a.jsx)(T.a,{control:Object(a.jsx)(S.a,{checked:ce.teacherMode,onChange:function(e){oe(Object(u.a)(Object(u.a)({},ce),{},Object(o.a)({},e.target.name,e.target.checked)))},name:"teacherMode",inputProps:{"aria-label":"secondary checkbox"}}),label:m.teachermode}),Object(a.jsx)("br",{}),i?E.map((function(e,t){return Object(a.jsx)(f.a,{variant:"outlined",onClick:function(){p(t)},children:e.quizname})})):null,ce.teacherMode&&i?Object(a.jsx)("div",{children:Object(a.jsx)(le,{addNewQuiz:X})}):""]}),i?E[O].quizQuestions.map((function(t,n){return Object(a.jsx)("div",{className:"questionCard",children:Object(a.jsx)(D.a,{elevation:1,children:Object(a.jsxs)(I.a,{className:e.root,children:[Object(a.jsx)("h3",{children:t.topicArea}),ce.teacherMode?Object(a.jsx)(K,{value:t,quiz:O,parentIndex:n,updateQuestion:J,deleteQuestion:Z}):Object(a.jsx)("div",{className:"question",children:t.question}),t.answerOptions.map((function(e,t){return Object(a.jsx)("div",{children:ce.teacherMode?Object(a.jsx)(Y,{value:e,quiz:O,parentIndex:n,index:t,status:ce,updateAnsweroption:V,deleteAnsweroption:$,dispatch:y}):Object(a.jsx)(te,{value:e,quiz:O,parentIndex:n,index:t,answersVisible:v})})})),ce.teacherMode?Object(a.jsx)("div",{className:"addButton",children:Object(a.jsx)(f.a,{onClick:function(e){return P(e,O,n)},children:Object(a.jsx)(C.a,{})})}):""]})})})})):null,Object(a.jsx)("div",{className:"bottomButtons",children:ce.teacherMode?Object(a.jsxs)(f.a,{variant:"contained",onClick:function(e){return F(e,O)},children:[Object(a.jsx)(Q.a,{}),"   ",m.addnewanswer]}):Object(a.jsx)(f.a,{variant:"contained",onClick:function(){g(!v)},children:v?m.hidecorrect:m.showcorrect})})]})]})]})})})),pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,277)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))};c.a.render(Object(a.jsx)(g.a,{children:Object(a.jsx)(re.a,{maxSnack:3,variant:"info",children:Object(a.jsx)(Oe,{})})}),document.getElementById("root")),pe()}},[[213,1,2]]]);
//# sourceMappingURL=main.f93fa008.chunk.js.map