// 问题一：将数组中的 false值去除
const arrContainsEmptyVal = [3, 4, 5, 2, 3, undefined, null, 0, ""];
const f1 = arr => arr.filter(Boolean);
// let v1 = arrContainsEmptyVal.filter(f1);
let v1 = f1(arrContainsEmptyVal);

console.log(v1,'1');
//问题二： 将数组中的 VIP 用户余额加 10
const users = [
    { username: "Kelly", isVIP: true, balance: 20 },
    { username: "Tom", isVIP: false, balance: 19 },
    { username: "Stephanie", isVIP: true, balance: 30 }
];
// users.map( user => { user.isVIP ? user.balance + 10 : user.balance});
// 要返回user 所以上面这样写是没有返回值的
users.map(user => ( user.isVIP ? {...user,balance:user.balance + 10} : user ));
//上面的式子可以给user加其他成员属性
// 这个答案存在浅拷贝的问题;
console.log(users,'2');
// 问题三：判断字符串中是否含有元音字母
const randomStr = "hdjrwqpi";
const f3 = char => ['a','e','i','o','u'].includes(char);
let v3 = '';
let f33 = str => [...str].some(f3);
v3 = f33(randomStr);
//下面这个式子就是上面两行代码的合并(这里面写死了,不利于其他数组);
v3 = [...randomStr].some(f3);
console.log(v3, "3");
// 问题四：判断用户是否全部是成年人
const users2 = [
    { name: "Jim", age: 23 },
    { name: "Lily", age: 17 },
    { name: "Will", age: 25 }
];
let v4 = users2.every(user => user.age >=18);
console.log(v4,'4');
// 问题五： 找出上面用户中的第一个未成年人
const findTeen = user => user.find(user => user.age <18 );
let v5 = '';
v5 = findTeen(users2);
v5 = users2.find(user => user.age < 18 );
console.log(v5,'5');
// 问题六：将数组中重复项清除
const dupArr = [1, 2, 3, 3, 3, 3, 6, 7];
const uniq = arr => [...new Set(arr)];
let v6 = uniq(dupArr);
const f6 =  arr => Array.from(new Set(arr));
v6 = f6(dupArr);
console.log(v6,'6');
// 问题七： 生成由随机整数组成的数组，数组长度和元素大小可自定义
const genNumArr = (length, limit) =>
    Array.from({ length }, _ => Math.floor(Math.random() * limit));
let v7 = genNumArr(10, 100);
console.log(v7,'7');
// 二，理解和熟练使用 reduce

// 问题八： 不借助原生高阶函数，定义 reduce
const reduce = (f, acc, arr) => {
    if (arr.length === 0) return acc;
    const [head, ...tail] = arr;
    return reduce(f, f(head, acc), tail);
};
// console.log(v1);
// console.log(v1);
// console.log(v1);
// console.log(v1);
// console.log(v1);
// console.log(v1);
// console.log(v1);
