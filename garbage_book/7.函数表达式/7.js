function test () {
    var result = new Array();
    for (var i = 0 ; i < 10 ; i++) {
        result[i] = function() {
            return i;
        }
    }
    return result;
}
test();
function test2 () {
    var result = new Array();
    for (var i = 0 ; i < 10 ; i++) {
        result[i] = function(t) {
            return function() {
                return t
            }
        }(i)
    }
    return result;
}
test2();