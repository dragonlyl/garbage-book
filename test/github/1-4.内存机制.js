// https://github.com/yygmind/blog/issues/15

// JS内存空间分为栈(stack)、堆(heap)、池(一般也会归类为栈中)。 
//     其中栈存放变量，堆存放复杂对象，池存放常量，所以也叫常量池。

// 基本类型：--> 栈内存（不包含闭包中的变量）
// 引用类型：--> 堆内存

// 闭包中的变量并不保存中栈内存中，而是保存在堆内存中，
//     这也就解释了函数之后之后为什么闭包还能引用到函数内的变量。\

// 闭包的简单定义是：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包