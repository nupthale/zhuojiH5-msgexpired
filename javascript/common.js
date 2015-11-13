
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