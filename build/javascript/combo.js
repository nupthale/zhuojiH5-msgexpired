!function(){function a(){for(var a=document.getElementById("leafContainer"),b=0;g>b;b++)a.appendChild(f())}function b(a,b){return a+Math.floor(Math.random()*(b-a))}function c(a,b){return a+Math.random()*(b-a)}function d(a){return a+"px"}function e(a){return a+"s"}function f(){var a=document.createElement("div"),f=document.createElement("img"),g=i["leaf"+b(1,5)];f.src=g.src,f.style.width=g.width,f.style.height=g.height,f.style.opacity=Math.random(),a.style.top="-6px",a.style.left=d(b(0,window.innerWidth));var h=Math.random()<.5?"clockwiseSpin":"counterclockwiseSpinAndFlip";a.style.webkitAnimationName="fade, drop",f.style.webkitAnimationName=h;var j=e(c(10,14)),k=e(c(4,8));a.style.webkitAnimationDuration=j+", "+j;var l=e(c(0,1));return a.style.webkitAnimationDelay=l+", "+l,f.style.webkitAnimationDuration=k,a.appendChild(f),a}var g=10,h="http://m.zhuojiapp.com/s/msg_expired2/styles/",i={leaf1:{src:h+"leaf1.png",width:"6px",height:"16px"},leaf2:{src:h+"leaf2.png",width:"4px",height:"10px"},leaf3:{src:h+"leaf3.png",width:"15px",height:"8px"},leaf4:{src:h+"leaf4.png",width:"6px",height:"14px"},leaf5:{src:h+"leaf5.png",width:"24px",height:"13px"}};a()}();var _util={getAndroidVersion:function(a){if(isAndroid){var b=a.match(/Android\s([0-9\.]*)/);return b?b[1]:!1}return!1},makeArray:function(a){return Array.prototype.slice.apply(a,[0])},zeroPad:function(a){for(var b=1,c=0,d="",e=a;2>c;c++)b*=10,d+=0;return e=d+a,e.substring(e.length-2)},toHMS:function(a){var b=new Date(a),c=this.zeroPad,d=c(b.getHours()),e=c(b.getMinutes()),f=c(b.getSeconds());return d+":"+e+":"+f},getLag:function(a){var b=new Date,c=b-a,d=36e5;if(d>c)return Math.ceil(c/6e4)+"分钟前";var e=new Date(a),f=b.getDate(),g=e.getDate();return f-g?"昨天"+this.toHMS(a):this.toHMS(a)},hasClass:function(a,b){return a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))},addClass:function(a,b){this.hasClass(a,b)||(a.className+=" "+b)},removeClass:function(a,b){if(this.hasClass(a,b)){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ")}}},_anim={Tween:{Quint:{easeIn:function(a,b,c,d){return a+Math.pow(c/d,5)*b}}},fadeOut:function(a,b,c,d,e,f){function g(){var i=h(b,c,d,e);a.style.opacity=i,e>d?(d++,setTimeout(g,10)):f&&f()}var h=this.Tween.Quint.easeIn;g()},fadeIn:function(a,b,c,d,e,f){this.fadeOut(a,b,c,d,e,f)}},evt={delegate:function(a,b,c,d){a.addEventListener(b,function(b){for(var e=b.target;e!==a&&e;){if(-1!==e.className.indexOf(c)){d(b);break}if(e=e.parentNode,e===document.body)break}},!0)}},ua=navigator.userAgent,isIPhone=-1!==ua.indexOf("iPhone"),isAndroid=-1!==ua.indexOf("Android")||-1!==ua.indexOf("Adr"),isAndroid404="4.0.4"===_util.getAndroidVersion(ua);!function(){var a="/stamp.htm?msg=",b=new Image(1,1),c="type=click_message_url_expired";b.src=a+encodeURIComponent(c)+"&stamp="+(new Date).getTime(),evt.delegate(document.body,"click","ut",function(b){var d=b.target,e="&stamp="+(new Date).getTime();if(c=d.getAttribute("data-params")+e){var f=new Image(1,1);f.src=a+encodeURIComponent(c)}})}(),function(){var a={before:function(a,c,d){var e=a[c];a[c]=function(){var c=b.makeArray(arguments),f=function(){e.apply(a,c)},g=c.concat(f);d&&d.apply(a,g)}},after:function(a,b,c){var d=a[b];a[b]=function(){d.apply(a,arguments),c&&c.apply(a,arguments)}}},b={getIOSVersion:function(){var a=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);return e&&parseInt(a[1],10)},getAndroidVersion:function(a){var b=a.match(/Android[\s\/]([0-9\.]*)/);return f&&b&&b[1]},makeArray:function(a){return Array.prototype.slice.apply(a,[0])},hasClass:function(a,b){return a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))},addClass:function(a,b){this.hasClass(a,b)||(a.className+=" "+b)},removeClass:function(a,b){if(this.hasClass(a,b)){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ")}}},c={adapter:function(a){return a.replace(/\b(\w)|\s(\w)/g,function(a){return a.toUpperCase()})},state:function(a,b,c){var d=this.adapter(b);a[""+b]=c,a["o"+d]=c,a["moz"+d]=c,a["webkit"+d]=c},Tween:{Quint:{easeIn:function(a,b,c,d){return a+Math.pow(c/d,5)*b},easeOut:function(a,b,c,d){var e=c/d;return a-(Math.pow(e,2)-2*e)*b},easeInOut:function(a,b,c,d){return a-(Math.cos(c/d*Math.PI/2)-1)*b/2}}}},d=navigator.userAgent,e=-1!==d.indexOf("iPhone"),f=-1!==d.indexOf("Android")||-1!==d.indexOf("Adr"),g=d.match(/Chrome\/([\d.]+)/)||d.match(/CriOS\/([\d.]+)/),h=b.getAndroidVersion(d),i=b.getIOSVersion(),j=e&&i>=7||f&&parseInt(h)>=4,k={mask:null,call:null,cancel:null,ignore:null,dialog:null,download:null,confirmWrapper:null,ignoreWrapper:null,txtIgnore:null,txtDownload:null,init:function(){this.mask=document.getElementById("mask"),this.dialog=document.getElementById("download-dialog"),this.call=document.getElementById("call"),this.cancel=document.getElementById("cancel"),this.ignore=document.getElementById("ignore"),this.download=document.getElementById("download"),this.txtIgnore=document.getElementById("txt-ignore"),this.txtDownload=document.getElementById("txt-download"),this.ignoreWrapper=document.getElementById("ignore-wrapper"),this.confirmWrapper=document.getElementById("confirm-wrapper"),this.initEvt()},initEvt:function(){var a=this.showCallDialog,b=this.hideCallDialog;j?this.cancel.addEventListener("click",a,!0):this.cancel.addEventListener("click",b,!0),this.ignore.addEventListener("click",b,!0),this.mask.addEventListener("click",function(){},!0)},showDownloadDialog:function(){this.download.setAttribute("href",m.getDownloadUrl()),this.confirmWrapper.style.display="block",b.addClass(this.dialog,"show"),this.showMask()},hideDownloadDialog:function(){b.removeClass(this.dialog,"show"),b.removeClass(this.dialog,"animated"),b.removeClass(this.dialog,"flipInY");var a=this;setTimeout(function(){a.ignoreWrapper.style.display="none",a.txtDownload.style.display="block",a.txtIgnore.style.display="none"},300),this.hideMask()},showUnapplicableDialog:function(){var a=this.dialog.children[0];e&&(a.textContent="暂不支持iOS6及以下的系统..."),f&&(a.textContent="暂不支持Android4.0以下的系统..."),b.addClass(this.download,"u-btn-disabled"),this.confirmWrapper.style.display="block",b.addClass(this.dialog,"show"),this.showMask()},hideUnapplicableDialog:function(){},showCallDialog:function(){b.addClass(k.dialog,"animated"),b.addClass(k.dialog,"flipInY"),k.confirmWrapper.style.display="none",k.ignoreWrapper.style.display="block",k.txtIgnore.style.display="block",k.txtDownload.style.display="none"},hideCallDialog:function(a){a.stopPropagation(),k.hideDownloadDialog()},showMask:function(){function a(){var g=c.Tween.Quint,h=g.easeIn(b,d,e,f);mask.style.opacity=h,f>e&&(e++,setTimeout(a,10))}mask.style.display="block";var b=0,d=.8,e=0,f=44;a()},hideMask:function(){function a(){var g=c.Tween.Quint,h=g.easeIn(b,d,e,f);mask.style.opacity=h,f>e&&(e++,setTimeout(a,10)),e==f&&(mask.style.display="none")}var b=.8,d=-.8,e=0,f=50;a()}},l={delegate:function(a,b,c,d){a.addEventListener(b,function(b){for(var e=b.target;e!==a&&e;){if(-1!==e.className.indexOf(c)){d(b);break}if(e=e.parentNode,e===document.body)break}},!0)},init:function(){this.delegate(document.body,"click","x-url-zhuoji",function(a){a.preventDefault();var b=a.target;k.noview="true"===b.getAttribute("data-noview"),o.awakeApp()})}},m={android:"zhuoji://",iphone:"zhuoji://",chrome:"intent://app/#Intent;scheme=zhuoji;package=com.zhuojiapp;end",homepage:"http://m.zhuojiapp.com/res/zhuoji-v1.2.0-20150211.apk",appstore:"https://itunes.apple.com/cn/app/zhuo-ji/id948517915?ls=1&mt=8",getDownloadUrl:function(){return e?this.appstore:this.homepage},toDownloadPage:function(){var a=this.getDownloadUrl();e?window.location.href=a:window.open(a,"_blank")}},n={applicable:!1,init:function(){this.applicable=e&&i>=7||f&&parseInt(h)>=4,this.applicable?this.normalHandle():this.inapplicableHandle()},normalHandle:function(){this._injectSchemeHandle(null,null,function(){k.noview?m.toDownloadPage():k.showDownloadDialog()})},inapplicableHandle:function(){this._injectSchemeHandle(null,null,function(){k.showUnapplicableDialog()})},_injectSchemeHandle:function(c,d,e){var f=0;a.after(o,"awakeApp",function(){setTimeout(function(){d&&d();var a=(new Date).getTime(),b=a-f;600>b&&e&&e()},500)}),a.before(o,"awakeApp",function(){var a=b.makeArray(arguments).pop();c&&c(),f=(new Date).getTime(),a()})}},o={init:function(){n.init(),l.init(),k.init()},awakeApp:function(){var a=document,b=a.body,c=a.createElement("iframe");f&&g?window.location=m.chrome:n.applicable&&(c.src=e?m.iphone:m.android,c.style.display="none",b.appendChild(c),setTimeout(function(){b.removeChild(c),c=null},200))}};o.init()}();