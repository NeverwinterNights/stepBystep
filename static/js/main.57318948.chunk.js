(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{128:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),r=a.n(c),l=(a(95),a(63)),o=a(13),u=a(35),s=a(21),d=(a(96),a(163)),m=a(154),f=a(155),b=function(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(""),o=Object(s.a)(l,2),u=o[0],b=o[1];return i.a.createElement("div",null,i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement(d.a,{size:"small",helperText:u&&"Title is required",variant:"outlined",label:"Type value",value:c,onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(t){b(""),13===t.charCode&&(e.addItem(c),r(""))},error:!!u}),i.a.createElement(m.a,{onClick:function(){""!==c.trim()?(e.addItem(c.trim()),r("")):b("Title is required")},color:"primary"},i.a.createElement(f.a,null))))},j=function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(e.title),o=Object(s.a)(l,2),u=o[0],m=o[1],f=function(){r(!1),e.changeTitle(u)};return c?i.a.createElement(d.a,{onKeyPress:function(e){13===e.charCode&&f()},onChange:function(e){m(e.currentTarget.value)},value:u,autoFocus:!0,onBlur:f}):i.a.createElement("span",{onDoubleClick:function(){r(!0)}},e.title)},O=a(165),E=a(157),h=a(156);function p(e){return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(j,{title:e.title,changeTitle:function(t){e.changeToDoTitle(t,e.id)}}),i.a.createElement(m.a,{onClick:function(){e.removeToDoList(e.id)}},i.a.createElement(h.a,null))),i.a.createElement(b,{addItem:function(t){e.addTask(t,e.id)}}),i.a.createElement("ul",null,e.tasks.map((function(t){return i.a.createElement("li",{key:t.id,className:t.isDone?"is-done ":""},i.a.createElement(O.a,{color:"primary",onChange:function(a){e.changeStatus(t.id,a.currentTarget.checked,e.id)},checked:t.isDone}),i.a.createElement(j,{title:t.title,changeTitle:function(a){e.changeTaskTitle(t.id,a,e.id)}}),i.a.createElement(m.a,{size:"small",onClick:function(){e.removeTask(t.id,e.id)}},i.a.createElement(h.a,null)))}))),i.a.createElement("div",null,i.a.createElement(E.a,{size:"small",variant:"contained",color:"all"===e.filter?"secondary":"primary",onClick:function(){return e.changeFilter("all",e.id)}},"All"),i.a.createElement(E.a,{size:"small",variant:"contained",color:"active"===e.filter?"secondary":"primary",onClick:function(){return e.changeFilter("active",e.id)}},"Active"),i.a.createElement(E.a,{size:"small",variant:"contained",color:"completed"===e.filter?"secondary":"primary",onClick:function(){return e.changeFilter("completed",e.id)}},"Completed ")))}var v=a(164),g=a(82),T=a.n(g),k=a(158),y=a(74),D=a(159),C=a(161),S=a(162),w=a(160);var x=function(){var e,t=Object(v.a)(),a=Object(v.a)(),c=Object(n.useState)([{id:t,title:"What to learn",filter:"all"},{id:a,title:"What to buy",filter:"all"}]),r=Object(s.a)(c,2),d=r[0],f=r[1],j=Object(n.useState)((e={},Object(u.a)(e,t,[{id:Object(v.a)(),title:"HTML&CSS",isDone:!0},{id:Object(v.a)(),title:"JS",isDone:!0},{id:Object(v.a)(),title:"ReactJS",isDone:!1}]),Object(u.a)(e,a,[{id:Object(v.a)(),title:"HTML&CSS",isDone:!0},{id:Object(v.a)(),title:"JS",isDone:!0},{id:Object(v.a)(),title:"ReactJS",isDone:!1}]),e)),O=Object(s.a)(j,2),h=O[0],g=O[1],x=function(e,t){h[t]=h[t].filter((function(t){return t.id!==e})),g(Object(o.a)({},h))},I=function(e,t){var a={id:Object(v.a)(),title:e,isDone:!1};h[t]=[a].concat(Object(l.a)(h[t])),g(Object(o.a)({},h))},J=function(e,t,a){h[a]=h[a].map((function(a){return a.id===e?Object(o.a)(Object(o.a)({},a),{},{isDone:t}):a})),g(Object(o.a)({},h))},z=function(e){f(d.filter((function(t){return t.id!==e}))),delete h[e]},F=function(e){return"completed"===e.filter?h[e.id].filter((function(e){return e.isDone})):"active"===e.filter?h[e.id].filter((function(e){return!e.isDone})):h[e.id]},L=function(e,t){f(d.map((function(a){return a.id===t?Object(o.a)(Object(o.a)({},a),{},{filter:e}):a})))},W=function(e,t){f(d.map((function(a){return a.id===t?Object(o.a)(Object(o.a)({},a),{},{title:e}):a})))},A=function(e,t,a){h[a]=h[a].map((function(a){return a.id===e?Object(o.a)(Object(o.a)({},a),{},{title:t}):a})),g(Object(o.a)({},h))},B=d.map((function(e){return i.a.createElement(k.a,{item:!0},i.a.createElement(y.a,{style:{padding:"20px"},elevation:5},i.a.createElement(p,{key:e.id,id:e.id,title:e.title,tasks:F(e),removeTask:x,changeFilter:L,addTask:I,changeStatus:J,filter:e.filter,removeToDoList:z,changeTaskTitle:A,changeToDoTitle:W})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(T.a,{position:"static"},i.a.createElement(D.a,{style:{justifyContent:"space-between"}},i.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(w.a,null)),i.a.createElement(C.a,{variant:"h6"},"News"),i.a.createElement(E.a,{color:"inherit"},"Login"))),i.a.createElement(S.a,{fixed:!0},i.a.createElement(k.a,{container:!0,style:{marginTop:"20px"}},i.a.createElement(b,{addItem:function(e){var t=Object(v.a)(),a={id:t,title:e,filter:"all"};f([].concat(Object(l.a)(d),[a])),g(Object(o.a)(Object(o.a)({},h),{},Object(u.a)({},t,[])))}})),i.a.createElement(k.a,{container:!0,spacing:5,style:{marginTop:"20px"}},B)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},90:function(e,t,a){e.exports=a(128)},95:function(e,t,a){},96:function(e,t,a){}},[[90,1,2]]]);
//# sourceMappingURL=main.57318948.chunk.js.map