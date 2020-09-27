let numbers = [1,2,4,3];
// es5为Array类添加iterator属性，需要通过Symbol.iterator来访问
let iterator = numbers[Symbol.iterator]();
console.log(iterator, 'iterator');
// 不断迭代器的next方法，依次得到数组里的值，全部迭代完返回undefined
console.log(iterator.next().value);
// 也可以通过for...of 迭代  这里从2开始，而不是1，原因是前面next了一个了
for (const n of iterator) {
    console.log(n);
}