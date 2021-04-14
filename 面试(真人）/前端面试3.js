function parseUrl(url) {
    let obj = {};
    let aForProtocol = url.split('://');
    obj.protocol = aForProtocol[0];
    if (aForProtocol.length > 1) {
        let aHost = aForProtocol[1].match(/www\.\w*\.com/);
        if (aHost) {
            obj.host = aHost[0];
        }
        let aHash = aForProtocol[1].split('#');
        let aQuery = aHash[0].split('?');
        let aPath = aQuery[0].split('.com');
        if (aPath.length > 1) {
            obj.path = aPath[1];
        }
        if (aQuery.length > 1) {
            let oParams = {};
            aQuery[1].split('&').forEach(val => {
                let aParams = val.split('=')
                oParams[aParams[0]] = aParams[1]
            })
            obj.params = oParams;
        }
        if (aHash.length > 1) {
            obj.hash = aHash[1]
        }
    }
    return obj; 
}
parseUrl("http://www.xiyanghui.com/product/list?id=123456&sort=discount#title");




var obj = [
    { id:3, parent:2 },
    { id:1, parent:null },
    { id:2, parent:1 },
]
function arrToTree(arr) {
    let o  = {};
    let obj = {}
    if (arr.length === 0) {
        return {obj}
    }
    arr.forEach((val,index) => {
        if (val.parent) {
            let parent = arr.find(inner => inner.id === val.parent)
            parent.child = val
        }
    })
    obj = arr.find(val => val.parent === null);
    return {obj}
}
arrToTree([
    { id:3, parent:2 },
    { id:1, parent:null },
    { id:2, parent:1 },
])






class AllPlayer {
    constructor (user) {
        let arr = []
        user.forEach(val => {
            arr.push([val, 1])
        })
        this.user = new Map(arr);
    }
    get(val) {
        let num = this.user.get(val);
        if (num) {
            // this.user.set(val, num+1);
            return num
        }
        return 0
    }
    add (arr) {
        arr.forEach(val => {
            let num = this.get(val)
            if (num) {
                this.user.set(val, num+1);
            } else {
                this.user.set(val, 1);
            }
        })
        return true;
    }
}
let arr = new AllPlayer(['张三','李四','王五','赵六','Tom','Jack','Jerry']);