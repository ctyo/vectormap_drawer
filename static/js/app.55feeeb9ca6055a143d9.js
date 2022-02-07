webpackJsonp([1],{NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[this._m(0),this._v(" "),t("router-view")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("a",{staticClass:"forkme-line",attrs:{href:"https://github.com/ctyo/vectormap_drawer"}},[t("img",{staticClass:"attachment-full size-full",attrs:{width:"149",height:"149",src:"https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149",alt:"Fork me on GitHub","data-recalc-dims":"1"}})])}]};var o=a("VU/8")({name:"App"},r,!1,function(e){a("qEwU")},null,null).exports,i=a("/ocq"),s=a("mvHQ"),l=a.n(s),p=a("1e2d"),u=a.n(p),c=a("oCme"),m=a.n(c),d=a("Njgl"),h=a("S/0q"),y=a("ADgS"),f={name:"Map",mounted:function(){this.$route.query.token&&(this.token=this.$route.query.token),this.$route.query.style&&(this.style=this.$route.query.style),this.$route.query.input&&(this.input=this.$route.query.input),this.drawMap()},methods:{drawMap:function(){var e=this;u.a.accessToken=this.token,this.map=new u.a.Map({container:"map",style:this.style,center:[139.767,35.681],zoom:11}),this.map.on("load",function(){e.map.addSource("trace",{type:"geojson",data:{type:"FeatureCollection",features:[]}}).addLayer({id:"trace-point",type:"circle",source:"trace",paint:{"circle-color":"red","circle-opacity":.6,"circle-radius":{base:1.75,stops:[[0,4],[22,180]]}},filter:["==","$type","Point"]}).addLayer({id:"trace-line",type:"line",source:"trace",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"red","line-width":5},filter:["==","$type","LineString"]}).addLayer({id:"trace-geohash",type:"fill",source:"trace",paint:{"fill-color":{type:"identity",property:"color"}},filter:["==","$type","Polygon"]}).addLayer({id:"trace-label",type:"symbol",source:"trace",layout:{"text-field":"{name}\n","text-size":12,"symbol-placement":"point","text-variable-anchor":["top","bottom","left","right"],"text-radial-offset":.5,"text-justify":"auto"},paint:{"text-color":["case",["boolean",["feature-state","hover"],!1],"rgba(255,0,0,0.75)","rgba(255,0,0,0.75)"],"text-halo-color":["case",["boolean",["feature-state","hover"],!1],"rgba(255,255,0,0.75)","rgba(255,255,255,0.75)"],"text-halo-width":2,"text-halo-blur":0}}),e.inputChange()})},inputChange:function(){var e={type:"FeatureCollection",features:[]};this.input.split("\n").map(function(t){if(""!==t&&"\n"!==t)if(3===t.split(",").length){var a={type:"Feature",geometry:{type:"Point",coordinates:[1*t.split(",")[1],1*t.split(",")[0]]},properties:{name:t.split(",")[2],"marker-color":"#3bb2d0","marker-size":"large","marker-symbol":"rocket"}};e.features.push(a)}else if(2===t.split(",").length){var n={type:"Feature",geometry:{type:"Point",coordinates:[1*t.split(",")[1],1*t.split(",")[0]]},properties:{name:t,"marker-color":"#3bb2d0","marker-size":"large","marker-symbol":"rocket"}};e.features.push(n)}else if(t.split(",").length===t.split("|").length+1)for(var r=t.split("|").map(function(e){return e.split(",")}),o=0;o<r.length;o++){var i={type:"Feature",geometry:{type:"Point",coordinates:[1*r[o][0],1*r[o][1]]},properties:{name:o+1,"marker-color":"#3bb2d0","marker-size":"large","marker-symbol":"rocket"}};e.features.push(i)}else if(t.length<12){var s=d.a.bounds(t),l={type:"Feature",geometry:{type:"Polygon",coordinates:[[[s.ne.lon,s.sw.lat],[s.ne.lon,s.ne.lat],[s.sw.lon,s.ne.lat],[s.sw.lon,s.sw.lat]]]},properties:{name:t,color:Object(h.geohashToRGB)(t,.3)}};e.features.push(l)}else{var p={type:"Feature",geometry:{type:"LineString",coordinates:m.a.decode(t).map(function(e){return[1*e[1],1*e[0]]})},properties:{name:t}};e.features.push(p)}}),this.geojson=l()(e,null,2),this.map.getSource("trace").setData(e),this.map.fitBounds(y(e)),console.dir(y(e)),this.changeUrl()},changeUrl:function(){this.$router.push({path:"/",query:{token:this.token!==this.mapstyles[0].token?this.token:"",style:this.style!==this.mapstyles[0].style?this.style:"",input:this.input}})}},data:function(){return{map:null,mapstyles:[{id:"mapbox",token:"pk.eyJ1IjoiY3R5byIsImEiOiJjanF2cTNjMm8weHVjNDJrOGV2anp3NDFwIn0.4pGtZ9Run1--9FR8NBkuqg",style:"mapbox://styles/ctyo/ckbvv9hj50ite1ho6xrmqyqd8"}],token:"pk.eyJ1IjoiY3R5byIsImEiOiJjanF2cTNjMm8weHVjNDJrOGV2anp3NDFwIn0.4pGtZ9Run1--9FR8NBkuqg",style:"mapbox://styles/ctyo/ckbvv9hj50ite1ho6xrmqyqd8",input:"35.7094313,139.7130015\n35.6590845,139.6552845\n35.6563709,139.7610576\neixxEqiftYaaD|jQhgHcyA??\nxn774\nxn7784\nxn777\nxn774fk",geojson:"{}"}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper"},[a("div",{attrs:{id:"map"}}),e._v(" "),a("div",{attrs:{id:"control"}},[a("select",{attrs:{name:"”mapstyle”"}},e._l(e.mapstyles,function(t){return a("option",{key:t.id,domProps:{value:t.id}},[e._v("\n        "+e._s(t.id)+"\n      ")])}),0),e._v(" "),a("br"),e._v(" "),a("input",{attrs:{id:"tile",type:"text",placeholder:"tile style"},domProps:{value:e.style}}),e._v(" "),a("input",{attrs:{id:"token",type:"text"},domProps:{value:e.token}}),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("input")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],domProps:{value:e.input},on:{change:e.inputChange,input:function(t){t.target.composing||(e.input=t.target.value)}}}),e._v(" "),a("p",[e._v("geojson")]),e._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.geojson,expression:"geojson"}],domProps:{value:e.geojson},on:{input:function(t){t.target.composing||(e.geojson=t.target.value)}}})])])},staticRenderFns:[]};var v=a("VU/8")(f,g,!1,function(e){a("kFiY")},"data-v-ca378476",null).exports,k=a("AYPi"),b=a.n(k);n.a.use(i.a),n.a.use(b.a,{id:"UA-11027566-8"});var x=new i.a({routes:[{path:"/",name:"Map",component:v}]});a("xnE8");n.a.config.productionTip=!1,new n.a({el:"#app",router:x,components:{App:o},template:"<App/>"})},kFiY:function(e,t){},qEwU:function(e,t){},xnE8:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.55feeeb9ca6055a143d9.js.map