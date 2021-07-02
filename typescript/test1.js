function test2(animal) {
    console.log(animal.name);
    if (typeof animal.run === 'function') {
        console.log(animal);
    }
}
var dog1 = {
    name: 'jack',
    say: function () {
        console.log('222');
    }
};
test2(dog1);
var arr1 = [1, 2, 4];
// let arr2: [number, string] = [1,'2',3, '4']
var Days;
(function (Days) {
    Days[Days["a"] = 2] = "a";
    Days[Days["b"] = 3] = "b";
    Days[Days["c"] = 4] = "c";
    Days[Days["d"] = 5] = "d";
})(Days || (Days = {}));
;
Days['a'];
var Point = /** @class */ (function () {
    /** 构造函数 */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    /** 静态方法，计算与原点距离 */
    Point.distanceToOrigin = function (p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    };
    /** 实例方法，打印此点 */
    Point.prototype.printPoint = function () {
        console.log(this.x, this.y);
    };
    /** 静态属性，坐标系原点 */
    Point.origin = new Point(0, 0);
    return Point;
}());
var p1;
var p2;
var Animal = /** @class */ (function () {
    // public name: string;
    function Animal(name) {
        this.name = name;
        // this.name = name;
    }
    return Animal;
}());
