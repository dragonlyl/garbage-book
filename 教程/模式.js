let jobList = ['a', 'b']
var strategies = {
    checkRole: function (value) {
        // 参数
        return arguments[0] === 'juejin'
    },
    checkGrade: function(value) {
        return value >= 1;
    },
    checkJob: function(value) {
        return jobList.indexOf(value) > 1;
    },
    checkEatType: function(value) {
        return value === 'eat melons';
    }
}

var Validator = function () {
    this.cache = []

    // 添加策略事件
    this.add = function (method, val) {
        this.cache.push(() => strategies[method](val))
    }

    this.check = function () {
        for (let i = 0; i < this.cache.length; i++) {
            let valFn = this.cache[i];
            var data = valFn();
            if (!data) {
                return false;
            }
        }
        return true;
    }
}

var compose1 = function() {
    var validator = new Validator();
    const data1 = {
        role: 'juejin',
        grade: -1
    };
    validator.add('checkRole', data1.role);
    validator.add('checkGrade', data1.grade);
    const result = validator.check();
    return result;
};
console.log(compose1());