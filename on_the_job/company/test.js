// setinterval第一次执行  延迟
var a = function () {
    setTimeout(()=> {
        console.log(111);
        
    });
    return a;
}
setInterval(a(), 5000);

window.addEventListener('resize',function(){
    var szType = $scope.oParams.szBtnSelect;
    // 节流
    if (!_timer) {
        _timer = true;
        setTimeout(()=> {
            service.setZoneTableValue(szType);
            _timer = false;
        },1000)
    }
    // 防抖
    if (_timer !== null) clearTimeout(_timer);
    _timer = setTimeout(()=> {
        service.setZoneTableValue(szType);
        _timer = null;
    },400)
})