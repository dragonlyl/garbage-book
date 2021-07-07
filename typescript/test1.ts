interface Cat {
    name: string,
    say(): void
}
interface Dog {
    name: string,
    run(): void
}

function test2 (animal: Cat | Dog): void {
    console.log(animal.name)
    if (typeof (animal as Dog).run === 'function') {
        console.log(animal)
    }
}
const dog1: Cat = {
    name: 'jack',
    say () {
        console.log('222')
    }
}
test2(dog1)

let arr1: number[] = [1,2,4]
// let arr2: [number, string] = [1,'2',3, '4']

enum Days {a=2,b,c,d};
Days['a']

class Point {
    /** 静态属性，坐标系原点 */
    static origin = new Point(0, 0);
    /** 静态方法，计算与原点距离 */
    static distanceToOrigin(p: Point) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }
    /** 实例属性，x 轴的值 */
    x: number;
    /** 实例属性，y 轴的值 */
    y: number;
    /** 构造函数 */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /** 实例方法，打印此点 */
    printPoint() {
        console.log(this.x, this.y);
    }
}

interface PointInstanceType {
    x: number;
    y: number;
    printPoint(): void;
}

let p1: Point;
let p2: PointInstanceType;

class Animal {
    // public name: string;
    constructor(public name) {
      // this.name = name;
    }
  }

interface Alarm {
    alert(): void
}
class Door {

}
class MyDoor extends Door implements Alarm {
    alert() {
        console.log('My door alarm');
    }
}
class Car implements Alarm {
    alert() {
        console.log('car alarm');
    }
}

const greet = (name: string): string => `Hello ${name}`