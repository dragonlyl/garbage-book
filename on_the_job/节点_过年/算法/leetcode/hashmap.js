// hashmap

function HasMap() {
    this.map = {};
}
HasMap.prototype = {
    put: function (key, value) {
        this.map[key] = value
    },
    get: function (key) {
        if (this.map.hasOwnProperty(key)) {
            return this.map[key]
        }
        return null
    },
    remove: function (key) {
        if (this.map.hasOwnPropery(key)) {
            return delete this.map[key];
        }
        return false
    },
    removeAll: function() {
        this.map = {}
    },
    keySet: function () {
        let arr = [];
        for (const key in this.map) {
            if (this.map.hasOwnProperty(key)) {
                arr.push(this.map[key])
            }
        }
        return arr;
    }
}
HashMap.prototype.constructor = HasMap;