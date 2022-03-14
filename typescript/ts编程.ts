/**
 * [获取变量类型](https://juejin.cn/post/6844904169925509127)
 */
const obj = {
    name: "name",
    age: 12,
  };
// 获取已经存在的变量类型 通过 typeof
type Person = typeof obj;
type PersonTest = keyof obj; // 
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
 */

 interface Person {
    name: string;
    age: number;
  }
  
  interface OptionalPerson1 {
    name?: string;
    age?: number;
  }
  
type OptionalPerson = { [K in keyof Person]?: Person[K] };