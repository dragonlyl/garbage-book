function Single() {
    let instantiated;
    function init() {
        return {

        }
    }
    return {
        create() {
            // 有表示存在 ,return
            if (!instantiated) {
                instantiated = init()
            }
            return instantiated;
        }
    }
}

class Logger {
    constructor() {
        
    }
}