(function(){"use strict";var t={3286:function(t,n,r){var e=r(5130),i=r(6768);const o={id:"app"},u=["width","height"];function a(t,n,r,e,a,s){return(0,i.uX)(),(0,i.CE)("div",o,[((0,i.uX)(),(0,i.CE)("svg",{ref:"svg",width:a.width,height:a.height},null,8,u))])}r(4114);var s=r(4455),h={name:"App",data(){return{width:800,height:600,x:.01,y:0,z:0}},mounted(){this.createLorenzAttractor()},methods:{createLorenzAttractor(){const t=s.Ltv(this.$refs.svg),n=t.append("g").attr("transform",`translate(${this.width/2}, ${this.height/2})`),r=.01,e=10,i=28,o=8/3,u=[];for(let s=0;s<1e4;s++){const t=e*(this.y-this.x)*r,n=(this.x*(i-this.z)-this.y)*r,a=(this.x*this.y-o*this.z)*r;this.x+=t,this.y+=n,this.z+=a,u.push([this.x,this.y])}const a=10,h=s.n8j().x((t=>t[0]*a)).y((t=>t[1]*a));n.append("path").datum(u).attr("fill","none").attr("stroke","white").attr("stroke-width",.5).attr("d",h)}}},c=r(1241);const f=(0,c.A)(h,[["render",a]]);var d=f;(0,e.Ef)(d).mount("#app")}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}};return t[e].call(o.exports,o,o.exports,r),o.exports}r.m=t,function(){var t=[];r.O=function(n,e,i,o){if(!e){var u=1/0;for(c=0;c<t.length;c++){e=t[c][0],i=t[c][1],o=t[c][2];for(var a=!0,s=0;s<e.length;s++)(!1&o||u>=o)&&Object.keys(r.O).every((function(t){return r.O[t](e[s])}))?e.splice(s--,1):(a=!1,o<u&&(u=o));if(a){t.splice(c--,1);var h=i();void 0!==h&&(n=h)}}return n}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[e,i,o]}}(),function(){r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,{a:n}),n}}(),function(){r.d=function(t,n){for(var e in n)r.o(n,e)&&!r.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={524:0};r.O.j=function(n){return 0===t[n]};var n=function(n,e){var i,o,u=e[0],a=e[1],s=e[2],h=0;if(u.some((function(n){return 0!==t[n]}))){for(i in a)r.o(a,i)&&(r.m[i]=a[i]);if(s)var c=s(r)}for(n&&n(e);h<u.length;h++)o=u[h],r.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return r.O(c)},e=self["webpackChunkstrange_attractor"]=self["webpackChunkstrange_attractor"]||[];e.forEach(n.bind(null,0)),e.push=n.bind(null,e.push.bind(e))}();var e=r.O(void 0,[504],(function(){return r(3286)}));e=r.O(e)})();
//# sourceMappingURL=app.dd0e6635.js.map