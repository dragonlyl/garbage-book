let obj = {
    // [Symbol.toPrimitive](hint) {
    //     if (hint === 'number') {
    //         return 42;
    //     }
    //     return null;
    // },
    toString: function() { 
        return 4
    },
    valueOf: function() { 
        return 5
    },
};
console.log(+obj);