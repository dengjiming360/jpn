(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21b62ea6"],{"15ac":function(n,t,e){"use strict";function a(){return a}n.exports=a,a.isPassword=function(n,t,e,a,i){t=void 0==t||t,e=void 0!=e&&e,a=void 0==a?8:a,i=void 0==i?10:i;var o="";t&&(o+="(?=[\\s\\S]*[a-z])(?=[\\s\\S]*[A-Z])(?=[\\s\\S]\\d)"),e||(o+="(?=^\\w+$)"),o+=`[\\s\\S]{${a},${i}}$`;var r=new RegExp(o);return r.test(n)},a.isChinese=function(n){return/^[\u4e00-\u9fa5]+$/.test(n)},a.isEmail=function(n){return/^[\w-_]+@[\w-_]+(?:\.\w+)+$/.test(n)},a.isIDCard=function(n){return/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(?:[0-9]|X)$|^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(n)},a.isMoney=function(n){return/^(?:(?:0)|[^0]\d*)(\.\d+)?$/.test(n)},a.isPhone=function(n){return/^1[3|4|5|7|8][0-9]\d{8}$/.test(n)}},"44ca":function(n,t,e){var a=e("afe6");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=e("85cb").default;i("9cd9a4ac",a,!0,{})},"651d":function(n,t,e){"use strict";function a(){return a}n.exports=a,a.getPictures=function(n){return n.match(/<(?:img|link)[^\n]+?(?:src|href)="([^"]+(?:png|jpg))"/g)}},afe6:function(n,t,e){t=n.exports=e("690e")(!1),t.push([n.i,"\n#login .van-field__control[data-v-5b84a380] {\n  color: #999999;\n}\n#login .top[data-v-5b84a380] {\n  background: rgba(255, 255, 255, 0);\n}\n#login[data-v-5b84a380] {\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n}\n#login .logoImg[data-v-5b84a380] {\n  width: 1.7rem;\n  height: 1.7rem;\n  border-radius: 50%;\n  margin-top: 1.3rem;\n}\n#login .login[data-v-5b84a380] {\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n#login .main[data-v-5b84a380] {\n  background: #fff;\n  border-radius: 0.4rem;\n  margin: 2rem 0.4rem 0 0.4rem;\n  width: 73%;\n  padding: 0 0.64rem;\n}\n#login h1[data-v-5b84a380] {\n  font-size: 0.5rem;\n  font-weight: 800;\n  color: #ffaa29;\n  margin: 0.48rem 0 0.4rem 0;\n  text-align: left;\n}\n#login .van-cell[data-v-5b84a380] {\n  padding: 0.4rem 0;\n}\n#login .cell-group[data-v-5b84a380],\n#login .field[data-v-5b84a380] {\n  background: none;\n  border: 0;\n}\n#login .cell-group[data-v-5b84a380] {\n  margin-bottom: 0.5rem;\n}\n#login .field[data-v-5b84a380] {\n  height: 1.2rem;\n  border-bottom: 0.02rem solid #e6e6e6;\n}\n#login .forget[data-v-5b84a380] {\n  font-size: 0.3rem;\n  font-family: PingFang-SC-Medium;\n  font-weight: 500;\n  color: #999999;\n}\n#login .sigIn[data-v-5b84a380] {\n  font-size: 0.34rem;\n  font-family: PingFang-SC-Bold;\n  font-weight: bold;\n  color: #ffaa29;\n  text-align: center;\n  margin: 0.62rem 0 0.98rem 0;\n}\n#login .loginbtn[data-v-5b84a380] {\n  background: #ffaa29;\n  border-radius: 2rem;\n  margin-top: 0.6rem;\n  font-size: 0.34rem;\n  font-family: PingFang-SC-Bold;\n  color: #ffffff;\n  border: 0;\n}\n#login .loginbtn span[data-v-5b84a380] {\n  font-weight: bold;\n}\n#login p[data-v-5b84a380] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 0.6rem;\n  color: #fff;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 0.28rem;\n  font-weight: 400;\n  color: #e8e8e8;\n}\n",""])},cd4d:function(n,t,e){const a=e("15ac"),i=e("651d");function o(){}for(var r of(n.exports=o,Object.keys(a)))o[r]=a[r];for(var r of Object.keys(i))o[r]=i[r]},dc3f:function(n,t,e){"use strict";e.r(t);var a=e("cd4d"),i=e.n(a),o={name:"login",components:{},data:function(){return{account:"",password:"",loginLoading:!1}},created:function(){this.$METHOD.getStore("token")&&this.$router.push("/")},methods:{loginFn:function(){var n=this;i.a.isPhone(this.account)?0!=this.password.length?(this.loginLoading=!0,this.$SERVER.login(this.account,this.password).then((function(t){n.$toast.success(t.msg),n.$METHOD.setStore("token",t.data.userinfo.token),n.$METHOD.setStore("userInfo",t.data.userinfo),n.$store.commit("setToken",t.data.userinfo.token),n.loginLoading=!1,n.$router.push("/")})).catch((function(t){n.loginLoading=!1}))):this.$toast.fail("请填写密码"):this.$toast.fail("请输入正确的手机号码")}}},r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"login"}},[e("div",{staticClass:"login"},[e("div",{staticClass:"main"},[e("h1",[n._v("登录")]),n._v(" "),e("van-cell-group",{staticClass:"cell-group",attrs:{border:!1}},[e("van-field",{staticClass:"field",attrs:{clearable:"",placeholder:"请输入手机号",type:"number",pattern:"[0-9]*",border:!1},model:{value:n.account,callback:function(t){n.account=t},expression:"account"}},[e("template",{slot:"left-icon"},[e("van-icon",{attrs:{"class-prefix":"icon",name:"shouji"}})],1)],2),n._v(" "),e("van-field",{staticClass:"field",attrs:{type:"password",placeholder:"请输入密码",border:!1},model:{value:n.password,callback:function(t){n.password=t},expression:"password"}},[e("template",{slot:"left-icon"},[e("van-icon",{attrs:{"class-prefix":"icon",name:"mima"}})],1)],2)],1),n._v(" "),e("span",{staticClass:"forget",on:{click:function(t){return n.$router.push({name:"register",query:{templateName:"重置密码"}})}}},[n._v("忘记密码？")]),n._v(" "),e("van-button",{staticClass:"loginbtn solidBtn",attrs:{type:"primary",size:"large",loading:n.loginLoading,"loading-type":"spinner",hairline:!1},on:{click:n.loginFn}},[n._v("立即登录")]),n._v(" "),e("div",{staticClass:"sigIn"},[e("span",{on:{click:function(t){return n.$router.push({name:"register",query:{templateName:"注册"}})}}},[n._v("用户注册")])])],1)])])},s=[],l=e("d082");function c(n){e("44ca")}var d=!1,f=c,u="data-v-5b84a380",g=null,m=Object(l["a"])(o,r,s,d,f,u,g);t["default"]=m.exports}}]);