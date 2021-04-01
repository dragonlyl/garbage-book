# 导航守卫

## beforeEach

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach((to, from) => {
  // ...
})

路由独享的守卫
routes: [
  {
    path: '/foo',
    component: Foo,
    beforeEnter: (to, from, next) => {
      // ...
    }
  }
]
```
