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