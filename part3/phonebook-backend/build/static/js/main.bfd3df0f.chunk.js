(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),a=t.n(r),u=t(14),o=t.n(u),i=t(3),s=function(e){var n=e.handleFiltering;return Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{onChange:n})]})},d=function(e){var n=e.addName,t=e.newName,r=e.newNumber,a=e.handleNameChange,u=e.handleNumberChange;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:t,onChange:a})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:r,onChange:u})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.filteredPersons,t=e.deletePerson;return Object(c.jsx)(c.Fragment,{children:n.map((function(e){return Object(c.jsxs)("p",{children:[e.name," ",e.number,Object(c.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))})},j=t(4),f=t.n(j),b="/api/persons",h=function(){return f.a.get(b).then((function(e){return e.data}))},m=function(e){return f.a.post(b,e).then((function(e){return e.data}))},O=function(e,n){return f.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},x=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"success",children:n})},v=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},g=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],u=Object(r.useState)(""),o=Object(i.a)(u,2),j=o[0],f=o[1],b=Object(r.useState)(""),g=Object(i.a)(b,2),w=g[0],N=g[1],C=Object(r.useState)([]),S=Object(i.a)(C,2),k=S[0],P=S[1],T=Object(r.useState)(null),y=Object(i.a)(T,2),F=y[0],D=y[1],E=Object(r.useState)(null),J=Object(i.a)(E,2),A=J[0],B=J[1];Object(r.useEffect)((function(){h().then((function(e){a(e),P(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Phonebook"}),Object(c.jsx)(x,{message:F}),Object(c.jsx)(v,{message:A}),Object(c.jsx)(s,{handleFiltering:function(e){var n=t.filter((function(n){return n.name.toLowerCase().includes(e.target.value)}));P(n)}}),Object(c.jsx)("h2",{children:"add a new"}),Object(c.jsx)(d,{addName:function(e){e.preventDefault();var n={name:j,number:w},c=t.find((function(e){return e.name===n.name}));c?window.confirm("".concat(j," is already added to phonebook, replace the old number with new one?"))&&O(c.id,n).then((function(e){a(t.map((function(n){return n.id!==c.id?n:e}))),P(t.map((function(n){return n.id!==c.id?n:e}))),D("Updated ".concat(e.name)),setTimeout((function(){D(null)}),3e3)})).catch((function(e){console.log(e.response.data),B(e.response.data.error),setTimeout((function(){B(null)}),3e3)})):m(n).then((function(e){a(t.concat(e)),P(t.concat(e)),D("Added ".concat(e.name)),setTimeout((function(){D(null)}),3e3)})).catch((function(e){console.log(e.response.data),B(e.response.data.error),setTimeout((function(){B(null)}),3e3)})),f(""),N("")},newName:j,newNumber:w,handleNameChange:function(e){return f(e.target.value)},handleNumberChange:function(e){return N(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(l,{filteredPersons:k,deletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&p(e.id).then((function(n){a(t.filter((function(n){return n.id!==e.id}))),P(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){console.log(n),B("".concat(e.name," was already deleted from server")),setTimeout((function(){B(null)}),3e3),a(t.filter((function(n){return n.id!==e.id})))}))}})]})};t(38);o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.bfd3df0f.chunk.js.map