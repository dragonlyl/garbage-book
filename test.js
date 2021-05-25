function addFun(cur, i) {
    if (cur[i] == 9) {
        cur[i] = '0'
    } else {
        let t = (Number(cur[i]) + 1).toString();
        console.log(t, 'ttt');
        cur[i] = t;
        console.log(cur[i], 'tt')
    }
    console.log(cur, ' currr')
    return cur;
}
addFun('0000', 1);