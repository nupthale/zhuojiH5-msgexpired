
///////////////////////////////////////
///  util函数_util and _anim
///////////////////////////////////////
var _util = {
    getAndroidVersion: function(ua) {
        if (isAndroid) {
            var match = ua.match(/Android\s([0-9\.]*)/);
            return match ? match[1] : false;
        }
        return false;
    },
    makeArray:function(arrayLike){
        return Array.prototype.slice.apply(arrayLike,[0]);
    },
    zeroPad: function(value) {
        var max    = 1, 
            i      = 0,
            zeros  = '', 
            output = value;
        for(; i < 2; i++) {
            max *= 10;
            zeros += 0;
        }

        output = zeros + value;
        return output.substring(output.length - 2);
    },
    toHMS: function(time) {
        var date = new Date(time),
            z    = this.zeroPad,
            hour = z(date.getHours()),
            min  = z(date.getMinutes()),
            sec  = z(date.getSeconds());

        return hour + ':' + min + ':' +sec;
    },
    getLag:function(time) {
        var now   = new Date(),
            delta = now - time,
            hmsec = 60 * 60 * 1000;
        if ( delta < hmsec ) {
            return Math.ceil(delta / (60 * 1000)) + '分钟前';
        }

        var create     = new Date(time),
            nowDate    = now.getDate(),
            createDate = create.getDate();
        if (nowDate - createDate) {
            return '昨天' + this.toHMS(time);
        }
        return this.toHMS(time);
    },
    hasClass: function(ele,cls) {
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    },
    addClass: function(ele,cls) {
        if ( !this.hasClass( ele, cls) ) 
            ele.className += " " + cls;
    },
    removeClass: function(ele,cls) {
        if (this.hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }
}   

var _anim = {
    Tween: {
        Quint : { // 五次方缓动
            easeIn : function(start, alter, curTime, dur) {
                return start + Math.pow(curTime / dur, 5) * alter;
            }
        }
    },
    fadeOut: function(obj, start, alter ,curTime, dur, callback) {
        var easeIn = this.Tween.Quint.easeIn;
        function Run(){
            var opacity = easeIn(start, alter, curTime, dur);
            obj.style.opacity = opacity;
            if (curTime < dur) { 
                curTime++; setTimeout(Run, 10); 
            } else {
                callback && callback();
            }
        }
        Run();
    }, 
    fadeIn: function(obj, start, alter ,curTime, dur, callback) {
        this.fadeOut(obj, start, alter ,curTime, dur, callback);
    }
};

var evt = {
    delegate: function(root, evtType, className, handle) {
        root.addEventListener(evtType, function(e) {
            var target = e.target;
            while ( target !== root ) {
                if ( !target ) { break; }
                if ( target.className.indexOf(className) !== -1 ) {
                    handle(e);
                    break;
                } else {
                    target = target.parentNode;
                    if ( target === document.body ) { break; }
                }
            }
        }, true);
    }
};

///////////////////////////////////////
/// 全局变量
///////////////////////////////////////
var ua           = navigator.userAgent,
    isIPhone     = ua.indexOf('iPhone') !== -1,
    isAndroid    = ua.indexOf('Android') !== -1 || ua.indexOf('Adr') !== -1,
    isAndroid404 = _util.getAndroidVersion(ua) === '4.0.4';
/////////////////////////////////////////////////////
/// 信息打点， 依赖evt， 必须引入common.js。
/////////////////////////////////////////////////////
(function() {
    // 改为相对路径
    // var base       = 'http://10.189.229.39/stamp.htm?msg=';
    var base = '/stamp.htm?msg=';

    // 进入页面就打点
    var img    = new Image(1, 1),
        params = 'type=click_message_url_expired';
    img.src = base + encodeURIComponent(params) + '&stamp=' + new Date().getTime();

    evt.delegate(document.body, 'click', 'ut', function(e) {
        var target = e.target,
            stamp  = '&stamp=' + new Date().getTime();
            params = target.getAttribute('data-params') + stamp;

        if ( params ) {
            var img = new Image(1, 1);
            img.src = base + encodeURIComponent(params);
        }
    });
})();
(function() {
    var aop = {
        before: function( target,method,advice ) {
            var old = target[method];
            target[method] = function() {
                var originArgs = util.makeArray(arguments);
                var next = function(){
                    old.apply(target,originArgs);
                }
                var args = originArgs.concat(next);
                advice && advice.apply(target,args);
            };
        },
        after: function( target,method,advice ) {
            var old = target[method];
            target[method] = function() {
                old.apply(target,arguments);
                advice && advice.apply(target,arguments);
            }; 
        }
    };

    var util = {
        getIOSVersion: function() {
            var v = ( navigator.appVersion ).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return isIPhone && parseInt(v[1], 10);
        },
        getAndroidVersion: function(ua) {
            var match = ua.match(/Android\s([0-9\.]*)/);
            return isAndroid && match && match[1];
        },
        makeArray:function(arrayLike) {
            return Array.prototype.slice.apply(arrayLike,[0]);
        },
        hasClass: function(ele,cls) {
            return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
        },
        addClass: function(ele,cls) {
            if (!this.hasClass(ele,cls)) ele.className += " "+cls;
        },
        removeClass: function(ele,cls) {
            if (this.hasClass(ele,cls)) {
                var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                ele.className=ele.className.replace(reg,' ');
            }
        }
    }

    var _anim = {
        adapter: function(name) {
            return name.replace(/\b(\w)|\s(\w)/g, function(m) { return m.toUpperCase(); });
        },
        state: function(domStyle, aniAttri, aniVal) {
            var aniAttrX = this.adapter(aniAttri);
            domStyle[ ''       + aniAttri ]  = aniVal;
            domStyle[ 'o'      + aniAttrX ]  = aniVal;
            domStyle[ 'moz'    + aniAttrX ]  = aniVal;
            domStyle[ 'webkit' + aniAttrX ]  = aniVal;
        },
        Tween: {
            Quint : { // 五次方缓动
                easeIn : function(start, alter, curTime, dur) {
                    return start + Math.pow(curTime / dur, 5) * alter;
                },
                easeOut: function(start, alter, curTime, dur) {
                    var progress = curTime / dur;
                    return start - (Math.pow(progress, 2) - 2 * progress) * alter;
                },
                easeInOut : function(start, alter, curTime, dur) {
                    return start - (Math.cos(curTime / dur * Math.PI / 2) - 1) * alter/ 2;
                }
            }
        }
    };

    var ua              = navigator.userAgent,
        isIPhone        = ua.indexOf('iPhone') !== -1,
        isAndroid       = ua.indexOf('Android') !== -1 || ua.indexOf('Adr') !== -1, /* 酷派机型的ua里使用的是Adr缩写 */
        isChrome        = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        androidVersion  = util.getAndroidVersion(ua),
        iOSVersion      = util.getIOSVersion();

    // 捉急不支持的系统版本：ios7和android4.0以下；
    var applicable = ( isIPhone && iOSVersion >= 7 ) || ( isAndroid && parseInt(androidVersion) >= 4 );

    ///////////////////////////////////////////
    /// 与UI处理相关的逻辑；
    ///////////////////////////////////////////
    var view = {
        mask: null,
        call: null,
        cancel: null,
        ignore: null,
        dialog: null,
        download: null,
        confirmWrapper:null,
        ignoreWrapper: null,
        txtIgnore:null,
        txtDownload:null,
        init: function() {
            this.mask     = document.getElementById('mask');
            this.dialog   = document.getElementById('download-dialog');
                 
            this.call     = document.getElementById('call');
            this.cancel   = document.getElementById('cancel');
            this.ignore   = document.getElementById('ignore');
            this.download = document.getElementById('download');

            this.txtIgnore   = document.getElementById('txt-ignore');
            this.txtDownload = document.getElementById('txt-download');

            this.ignoreWrapper  = document.getElementById('ignore-wrapper');
            this.confirmWrapper = document.getElementById('confirm-wrapper');
            
            this.initEvt();
        },
        initEvt: function() {
            var showCallDialog = this.showCallDialog,
                hideCallDialog = this.hideCallDialog;
            if (applicable) {
                this.cancel.addEventListener('click', showCallDialog, true);
            } else {
                this.cancel.addEventListener('click', hideCallDialog, true);
            }
            this.ignore.addEventListener('click', hideCallDialog, true);
            // 给mask绑定click事件， 防止它将click事件传递；
            this.mask.addEventListener('click', function() {}, true);
        },
        showDownloadDialog: function() {
            this.download.setAttribute('href', router.getDownloadUrl());

            this.confirmWrapper.style.display = 'block';
            util.addClass(this.dialog, 'show');
            this.showMask();
        },
        hideDownloadDialog: function() {
            util.removeClass(this.dialog, 'show');
            util.removeClass(this.dialog, 'animated');
            util.removeClass(this.dialog, 'flipInY');

            var _this = this;
            setTimeout(function() {
                _this.ignoreWrapper.style.display = 'none';
                _this.txtDownload.style.display   = 'block';
                _this.txtIgnore.style.display     = 'none';
            }, 300);

            this.hideMask();
        },
        showUnapplicableDialog: function() {
            var param = this.dialog.children[0];
            isIPhone && ( param.textContent = '暂不支持iOS6及以下的系统...' );
            isAndroid && ( param.textContent = '暂不支持Android4.0以下的系统...' );

            util.addClass(this.download, 'u-btn-disabled');

            this.confirmWrapper.style.display = 'block';
            util.addClass(this.dialog, 'show');
            this.showMask();
        },
        hideUnapplicableDialog: function() {

        },
        showCallDialog: function() {
            util.addClass(view.dialog, 'animated');
            util.addClass(view.dialog, 'flipInY');

            view.confirmWrapper.style.display = 'none';
            view.ignoreWrapper.style.display  = 'block';
            view.txtIgnore.style.display      = 'block';
            view.txtDownload.style.display    = 'none';
        },
        hideCallDialog: function(e) {
            e.stopPropagation();
            view.hideDownloadDialog();
        },
        showMask: function() {
            mask.style.display = 'block';
            var t = 0,
                b = 0.8,
                c = 0,
                d = 44;
            function Run(){
                var anim    = _anim.Tween.Quint,
                    opacity = anim.easeIn(t,b,c,d);
                mask.style.opacity = opacity;
                if (c < d){ c++; setTimeout(Run, 10); }
            }
            Run();
        },
        hideMask: function() {
            var t = 0.8,
                b = -0.8,
                c = 0,
                d = 50;
            function Run(){
                var anim    = _anim.Tween.Quint,
                    opacity = anim.easeIn(t,b,c,d);
                mask.style.opacity = opacity;
                if (c < d ) { c++; setTimeout(Run, 10); }
                if (c == d) { 
                    mask.style.display = 'none'; 
                }
            }
            Run(); 
        }
    }

    var evt = {
        delegate: function(root, evtType, className, handle) {
            root.addEventListener(evtType, function(e) {
                var target = e.target;
                while ( target !== root ) {
                    if ( !target ) { break; }
                    if ( target.className.indexOf(className) !== -1 ) {
                        handle(e);
                        break;
                    } else {
                        target = target.parentNode;
                        if ( target === document.body ) { break; }
                    }
                }
            }, true);
        },
        init: function() {
            // 先用touchend替代click， 如果有问题; 考虑使用fastclick解决；
            this.delegate(document.body, 'click', 'x-url-zhuoji', function(e) {
                e.preventDefault();
                var target = e.target;
                view.noview = ( target.getAttribute('data-noview') === 'true' );
                core.awakeApp();
            });
        }
    }

    //////////////////////////////////////////
    /// url的管理, 参数处理，管理页面跳转url
    //////////////////////////////////////////
    var router = {
        android: 'zhuoji://',
        iphone: 'zhuoji://',
        chrome:'intent://#Intent;scheme=zhuoji;package=com.ding;end',
        homepage:'/',
        appstore:'https://itunes.apple.com/app/id923841820?mt=8',
        getDownloadUrl: function() {
            return isIPhone ? this.appstore : this.homepage;
        },
        toDownloadPage: function() {
            var url = this.getDownloadUrl();
            if (isIPhone) {
                window.location.href = url;
            } else {
                window.open(url, '_blank');
            }
            
        }
    }


    var adapter = {
        applicable: false, 
        init: function() {
            // 捉急不支持的系统版本：ios7和android4.0以下；
            this.applicable = ( isIPhone && iOSVersion >= 7 ) || ( isAndroid && parseInt(androidVersion) >= 4 );

            if ( this.applicable ) {
                this.normalHandle();
            } else {
                // 如果是app不支持的系统版本；
                this.inapplicableHandle();
            }

        },
        normalHandle: function() {
            this._injectSchemeHandle(null, null, function() {
                view.noview ? ( router.toDownloadPage() ) : view.showDownloadDialog();
            });
        },
        inapplicableHandle: function() {
            this._injectSchemeHandle(null, null, function() {
                view.showUnapplicableDialog();
            });
        },
        _injectSchemeHandle: function(beforeHandle, afterHandle, failureHandle) {
            var startTime = 0;

            aop.after(core, 'awakeApp', function() {
                setTimeout(function() {
                    afterHandle && afterHandle();

                    /* 必须getTime再运算， 因为android2下直接new Date计算会出问题； */
                    var now      = new Date().getTime(),
                        interval = now - startTime;

                    if ( interval < 600 ) {
                        failureHandle && failureHandle();
                    }
                }, 500);
            });

            aop.before(core, 'awakeApp', function() {
                var next = util.makeArray(arguments).pop();

                beforeHandle && beforeHandle();
                startTime = new Date().getTime();
                next();
            });
        }
    };

    //////////////////////////////////////////
    /// 页面跳转逻辑
    //////////////////////////////////////////
    var core = {
        init: function() {
            adapter.init();
            evt.init();
            view.init();
        },
        awakeApp: function() {
            var doc    = document,
                body   = doc.body,
                iframe = doc.createElement('iframe');

            if ( isAndroid && isChrome ) {
                window.location = router.chrome;
            } else {
                iframe.src = isIPhone ? router.iphone : router.android;
                iframe.style.display = 'none';

                body.appendChild(iframe);
            
                setTimeout(function() {
                    body.removeChild(iframe);
                    iframe = null;
                }, 200);
            }
        }
    }

    core.init();

})();