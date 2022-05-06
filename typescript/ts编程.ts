/**
 * [获取变量类型](https://juejin.cn/post/6844904169925509127)
 */
const obj:{name: string, age: number} = {
    name: "name",
    age: 12,
  };
// 获取已经存在的变量类型 通过 typeof
type Person = typeof obj;
type PersonTest = keyof obj;
type PersonTest1 = keyof Person; // 取 interface 键
// 等价于
type Person1 = {
    name: string;
    age: number;
};
type key = Person[keyof Person]


/**
 * 
 * 获取函数类型：
 */
function foo(name: string): void {}
type Foo = typeof foo;

// 等价于
type Foo1 = (name: string) => void；


/**
 * 获取类的构造器和静态成员类型
 */

 class Person {
    name = "st";
    age = 12;
    static lifetime = 100;
    static staticMethod() {}
    method() {}
  }
  
  type PersonConstructor = typeof Person;
  
  // 等价于
  type PersonConstructor1 = {
    new (): Person;
    lifetime: number;
    staticMethod(): void;
  };
  


/**
 * [重用现有类型](https://juejin.cn/post/6844904169925525511)
 */

 type APIResponse = {
    user: {
      userId: string;
      friendList: {
        count: number;
        friends: {
          firstName: string;
          lastName: string;
        }[];
      };
    };
  };

// 需要重用 friendList
type friendList = APIResponse['user']['friendList']
// 需要重用 friend
type friend = friendList['friends'][number] // [number] 加上就是某一项

// keyof 获取对象属性名

type ResponseKeys = keyof APIResponse;  // 'user'


// 获取 对象里面的属性   extends 左边是右边的子集
function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k];
}

const a1 = get(obj, 'age')



/**
 * [映射类型](https://juejin.cn/post/6844904169929703437)
 * 用于重用和修改已存在的类型
 */

 interface Person {
    name: string;
    age: number;
  }
const Person1 = {
    name: 'tst',
    age: 12
}
  interface OptionalPerson1 {
    name?: string;
    age?: number;
  }
// 多了一个 in
type OptionalPerson = { [K in keyof Person]?: Person[K] };
type OptionalPerson2 = { [K in keyof Person1]?: Person[K] };
type OptionalPerson3 = { [K in keyof typeof Person1]?: Person[K] };


// + - 操作符

// 通过 - 号来去除 ? ; 同样  -readonly 也能减掉 readonly
type Person2 = { [K in keyof OptionalPerson1]-?: Person[K] };


// 深层映射 (多级嵌套)

interface DeepObj {
    name: string;
    age: number;
    deepAttributes: {
      prop1: string;
      prop2: string;
      obj: {
        other: number;
      };
    };
  }
  
  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };
  
  type PartialDeepOjb = DeepPartial<DeepObj>;
 