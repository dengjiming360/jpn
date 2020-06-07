(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c6080fd"],{"28d5":function(t,n,e){n=t.exports=e("690e")(!1),n.push([t.i,"\n#writeDeclaration {\n  font-size: 0.26rem;\n}\n#writeDeclaration .main {\n  padding: 0.3rem 0.32rem;\n}\n#writeDeclaration .main .info {\n  margin-bottom: 0.8rem;\n  background-color: #ffffff;\n  border-radius: 0.2rem;\n}\n#writeDeclaration .main .info .infoTit {\n  background: #f4e5aa;\n  padding: 0.15rem 0.5rem;\n  font-size: 0.24rem;\n  color: #d17e02;\n  border-radius: 0.24rem 0.24rem 0 0;\n}\n#writeDeclaration .main .info .form {\n  padding: 0.42rem 0.4rem;\n}\n#writeDeclaration .main .info .form .coupon {\n  height: 0.7rem;\n  line-height: 0.7rem;\n  text-align: center;\n  padding: 0 0.48rem;\n  border: 0.02rem solid #384258;\n  border-radius: 0.5rem;\n  font-size: 0.28rem;\n  color: #333333;\n  display: inline-block;\n  margin-bottom: 0.3rem;\n  margin-right: 0.2rem;\n}\n#writeDeclaration .main .info .form .coupon.active {\n  background: #384158;\n  color: #fff;\n}\n#writeDeclaration .main .info .form .van-cell {\n  border: 0.02rem solid #f0f0f2;\n  border-radius: 0.5rem;\n  margin-bottom: 0.3rem;\n}\n#writeDeclaration .main .info .form .van-cell .van-field__label {\n  border-right: 0.02rem solid #f0f0f2;\n  text-align: center;\n}\n#writeDeclaration .main .info .form .van-cell .van-field__control {\n  padding-left: 0.5rem;\n}\n#writeDeclaration .main .submitBox {\n  text-align: center;\n  /* .addCardVoucher {\n        background: #fff;\n        border: 0.01rem solid #424e69;\n        color: #424e69;\n        border-radius: 0.5rem;\n        margin-bottom: 0.65rem;\n      } */\n}\n#writeDeclaration .main .submitBox p {\n  font-size: 0.24rem;\n  color: #ff5e1c;\n  margin-bottom: 0.32rem;\n}\n",""])},"3d7e":function(t,n,e){var i=e("28d5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("85cb").default;a("2cd0dfa7",i,!0,{})},"6ef0":function(t,n,e){n=t.exports=e("690e")(!1),n.push([t.i,"\n.navbar[data-v-02d543f4] {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 999;\n  background: #fff;\n}\n.navbar .title span[data-v-02d543f4] {\n  font-weight: bold;\n}\n.navbar .left[data-v-02d543f4],\n.navbar .right[data-v-02d543f4] {\n  font-size: 0.4rem;\n}\n.navbar-empty[data-v-02d543f4] {\n  height: 0.92rem;\n}\n.navBarShare[data-v-02d543f4] {\n  height: 0.48rem;\n  line-height: 0.48rem;\n  color: #fff;\n  background: #5c6882;\n  border-radius: 0.5rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 0 0.15rem;\n}\n.navBarShare img[data-v-02d543f4] {\n  width: 0.37rem;\n}\n/* 风格 */\n.nobg[data-v-02d543f4] {\n  background: none;\n}\n.nobg .title[data-v-02d543f4] {\n  color: #fff;\n}\n.nobg .left[data-v-02d543f4] {\n  color: #fff !important;\n}\n",""])},"79dc":function(t,n,e){"use strict";e.r(n);e("cc57"),e("6d57"),e("ff21");var i=e("ff6f"),a={name:"writeDeclaration",components:{navBar:i["a"]},data:function(){return{ticketList:[],fileList:[],form:{product_id:"",redeem_code:"",remark:"",image:"",uid:""}}},mounted:function(){var t=this;this.form.uid=JSON.parse(this.$METHOD.getStore("userInfo")).id;var n=this.$route.query.id;this.$SERVER.getExchangeGoods(n).then((function(n){1==n.code?(n.data.forEach((function(t){t.isCheck=!1})),t.ticketList=n.data):t.ticketList=[]}))},methods:{checkTicket:function(t,n){var e=this;this.ticketList.forEach((function(t,i){n==i?(t.isCheck=!0,e.form.product_id=t.id):t.isCheck=!1}))},afterRead:function(t){var n=this,e=new FormData;e.append("file",t.file),e.append("name",t.file.name),this.$SERVER.upload(e).then((function(t){1==t.code?(n.$toast.success("上传成功"),n.form.image=t.data.url):(n.$toast.fail("上传失败"),n.form.image="")}))},exchange:function(){var t=this;this.form.product_id?this.form.redeem_code?this.$SERVER.baoOrder(this.form).then((function(n){1==n.code&&(t.$toast.success(n.msg),setTimeout((function(){t.$router.push({name:"myOrder",query:{type:0}})}),1e3))})):this.$toast.fail("请填写兑换码"):this.$toast.fail("请选择卡券")}}},r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container",attrs:{id:"writeDeclaration"}},[e("navBar"),t._v(" "),e("div",{staticClass:"main"},[e("div",{staticClass:"info"},[e("div",{staticClass:"infoTit"},[t._v("请提交正确的券码等信息，恶意提交无关券码，一经核实将扣款或封号")]),t._v(" "),e("div",{staticClass:"form"},[t._l(t.ticketList,(function(n,i){return e("div",{key:i,staticClass:"coupon",class:{active:n.isCheck},on:{click:function(e){return t.checkTicket(n,i)}}},[t._v(t._s(n.bank_name))])})),t._v(" "),e("van-field",{attrs:{label:"兑换码",placeholder:"复制卡号和密码"},model:{value:t.form.redeem_code,callback:function(n){t.$set(t.form,"redeem_code",n)},expression:"form.redeem_code"}}),t._v(" "),e("van-uploader",{attrs:{"max-count":1,"after-read":t.afterRead},model:{value:t.fileList,callback:function(n){t.fileList=n},expression:"fileList"}},[e("van-button",{staticClass:"solidBtn",staticStyle:{margin:"0px 0px 0.3rem 0.2rem"},attrs:{icon:"photo",round:"",type:"info"}},[t._v("上传图片")])],1),t._v(" "),e("van-field",{attrs:{label:"备注",placeholder:"无特殊情况请勿填写"},model:{value:t.form.remark,callback:function(n){t.$set(t.form,"remark",n)},expression:"form.remark "}})],2)]),t._v(" "),e("div",{staticClass:"submitBox"},[e("p",[t._v("一次性报单20单以上，可直接联系客服报单")]),t._v(" "),e("van-button",{staticClass:"solidBtn",attrs:{round:"",type:"info",size:"large"},on:{click:t.exchange}},[t._v("立即兑换")])],1)])],1)},o=[],s=e("d082");function c(t){e("3d7e")}var l=!1,d=c,f=null,m=null,u=Object(s["a"])(a,r,o,l,d,f,m);n["default"]=u.exports},"96fc":function(t,n){t.exports="data:image/png;base64,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"},b563:function(t,n,e){t.exports=e.p+"img/detail.png"},b5a3:function(t,n,e){n=t.exports=e("690e")(!1),n.push([t.i,"\n.nobg .van-hairline--bottom::after {\n  border-bottom-width: 0;\n}\n",""])},bc89:function(t,n,e){var i=e("b5a3");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("85cb").default;a("58c6683a",i,!0,{})},f345:function(t,n,e){var i=e("6ef0");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("85cb").default;a("73268fbd",i,!0,{})},fdd2:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYWM5YzVlMS1lNDBmLTdmNDQtYjAwZi02ZTM0NTgxNmQ5MTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RENDRjFCODA4MDhDMTFFQUE4QjZGODlGQUYyMjE1MjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RENDRjFCN0Y4MDhDMTFFQUE4QjZGODlGQUYyMjE1MjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTA1NjYyYzgtMDdiNi1hNzRkLWIyOWItM2VkZjg1NWE5MjI3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJhYzljNWUxLWU0MGYtN2Y0NC1iMDBmLTZlMzQ1ODE2ZDkxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiEOi7sAAAKTSURBVHja7JzPSxZBHIfHFCMtKMgUvIh/gYeIgshT105B0tFE8JSnFISQLuWtQygJdQs65MGjlyCo2xsIrxCdEhEpPARRaj9e3z7DbiD6Jq+zP2adfR74HHx193Uedr8zO7uzLfV63UD2nEABohENiEY0ogHRiAZEIxrRgGhEA6IRjWhANKIB0YguNW0p7adT6Q7IyxflR5FEDyoPlKuBnR27ylvlvvImjR22JHjcYFSZC7z8WOFjyrwv0QNKRWktQXmtKReVZR+d4URJJJu4nRO+Rh2XSzZoSNxe187wXIPPHimvApB6U5lsor1ehneWNeV9AKIvccHClSEgGtGIhgxo8/jdp5THOXzPuLJdZtHtJpovyZp7RRBN6UA0ouGY1ehaTpfstbKL/m6ieV5KByAa0YDo0naGZ4z7DU97Y/gWops/m/odt92gdACiEU1nmCk/lRnHbVcR3Tw75uDzE5QOQDSiAdGIRjQgGtGAaEQjGpLguvztszm4UnbLRBNFzfJN6fvP706baE3MbQ9OTiod+z6zK2l7kuzUdVKp2kB0R4N/0OVsum6iBZR9BTogq75Kx3wGjTmrPFOWCibZ8tSXaLvMbSHFhtxQVpRhW84KJnkhjba6iraFfUh5aJI9e3xeeaEsKr0FE7wTt28obq+XznAvXSZ6u0HXIX8z2KBj+618VS4cst0f5YnyIWfJmyZ6u8Gm71HHUbFvCJh16IBsKakwjs6GX8q0iZ40DUJykuFdVlTio7hqAqMoR/S/G7VXQpRclCP6nXJH+chcRzbYl0PdVa6FLjnPI3p938+vlRHlkykJeQ3v7NXeVDyefqk8T+MiANFwLMbRiAZEIxoQjWhEA6IRDYhGNKLBlb8CDACPEWwPNK/pAgAAAABJRU5ErkJggg=="},ff6f:function(t,n,e){"use strict";var i={name:"navbar",data:function(){return{top:"",value:"",searchEmptyShow:!1}},props:{download:{type:Boolean,default:function(){return!1},required:!1},title:{type:String,default:function(){return this.$route.meta.title},required:!1},skill:{type:Boolean,default:function(){return!1},required:!1},goback:{type:Boolean,default:function(){return!0},required:!1},message:{type:Boolean,default:function(){return!1}},share:{type:Boolean,default:function(){return!1}},filter:{type:Boolean,default:function(){return!1},required:!1},to:{type:String,required:!1}},components:{},mounted:function(){var t=this.$store.state.systemType;"android"==t&&(this.top=25),"ios"==t&&(this.top=30,this.searchEmptyShow=!0)},methods:{onClickLeft:function(){this.goback&&(this.to?this.$router.push(this.to):this.$router.go(-1))},openSearchFn:function(){}}},a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticStyle:{position:"relative"}},[i("div",{staticClass:"navbar",attrs:{id:"navbar"}},[i("div",{staticClass:"top",style:"padding-top:"+t.top+"px"}),t._v(" "),i("van-nav-bar",{staticStyle:{background:"#39435a"},attrs:{"z-index":999},on:{"click-left":function(n){return t.onClickLeft()},"click-right":function(n){return t.openSearchFn()}}},[i("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[i("span",{staticStyle:{color:"#fff"}},[t._v(t._s(t.title))]),t._v(" "),t._t("title")],2),t._v(" "),t.goback?i("van-icon",{staticClass:"left",staticStyle:{color:"#fff"},attrs:{slot:"left",name:"arrow-left"},slot:"left"}):t._e(),t._v(" "),t.message?t._t("right",[i("img",{staticStyle:{width:"0.5rem"},attrs:{src:e("fdd2"),alt:""},on:{click:function(n){return t.$router.push("/messageList")}}})],{slot:"right"}):t._e(),t._v(" "),t.share?t._t("right",[i("div",{staticClass:"navBarShare",on:{click:function(n){return t.$emit("WXShare")}}},[t._v("\n          分享\n          "),i("img",{attrs:{src:e("b563"),alt:""}})])],{slot:"right"}):t._e(),t._v(" "),t.skill?t._t("right",[i("div",{staticClass:"navBarShare",on:{click:function(n){return t.$router.push({name:"danye",query:{type:"skill"}})}}},[t._v("\n          技巧\n          "),i("img",{attrs:{src:e("b563"),alt:""}})])],{slot:"right"}):t._e(),t._v(" "),t.download?t._t("right",[i("img",{staticStyle:{width:"0.45rem"},attrs:{src:e("96fc"),alt:""},on:{click:function(n){return t.$emit("download")}}})],{slot:"right"}):t._e()],2)],1),t._v(" "),i("div",{staticClass:"navbar-empty",style:"padding-top:"+t.top+"px"})])},r=[],o=e("d082");function s(t){e("bc89"),e("f345")}var c=!1,l=s,d="data-v-02d543f4",f=null,m=Object(o["a"])(i,a,r,c,l,d,f);n["a"]=m.exports}}]);