# Mpvue 问题修复

## 在父页面引入子组件的onLoad  和 onShow的调用先后

问题描述: 在父页面触发 根据时间来搜索点位内容的接口 ;子页面里显示的是搜索时间,子页面点击确认时间将emit事件,父页面可以拿到子页面提供的时间然后调用接口获取数据

```js
    // 父页面
    onShow(o) {
        console.log('历史轨迹 onShow')
        // this.initData();
    },
    onLoad(o) {
        // let day = dayjs().set('year',2017).set('month', 3).set('date', 1);
        console.log('历史轨迹 onLoad')
        this.initData1();
    }
    initData1() {
        let newDay = dayjs().subtract(3, 'day');
        let newTime = [ newDay.year(), newDay.month() + 1, newDay.date() ];
        this.searchDay.before = newTime.slice();
        this.searchDay.after = dayTime.slice();
        this.initList(this.arrayToTime(this.searchDay.before),this.arrayToTime(this.searchDay.after));
    }
    // 子页面
    onLoad(o) {
        console.log('component ==> onLoad');
        setTimeout(()=> {
            this.initData2();
            // 选择时间的窗口也在子页面中
            this.pickerViewShow = false;
        },500)
    },
    onShow() {
        console.log('component ==> onShow');
        setTimeout(()=> {
            this.initData2();
            this.pickerViewShow = false;
        },500)
    },
    initData2() {
        [this.year1,this.month1,this.day1] = [...this.beforeDay];
        [this.year2,this.month2,this.day2] = [...this.afterDay];
        this.tempYear1 = this.year1;
        this.tempMonth1 = this.month1;
        this.tempDay1 = this.day1;
        this.tempYear2 = this.year2;
        this.tempMonth2 = this.month2;
        this.tempDay2 = this.day2;
        this.initYears();
        this.initMonths();
        this.initDays();
    },
```

因为上面有好几种情况 分为: 第一次进入父页面  ; 返回上级再进入父页面 ; 进入下级返回父页面
下面用 A表示父  B表示子
>**第一次进入父页面**
A:onLoad A:onShow B:onLoad
___
>**返回上级再进入父页面**
A:onLoad B:onLoad A:onShow B:onShow
___
>**返回上级再进入父页面**
A:onShow B:onShow

***A:onshow 不写代码是因为 这里的代码对于第三种情况造成每次进入父页面都重新给选择时间的值初始化***
***B页面都采用延迟 0.5s加载数据  不这样写会导致每次显示的时间和调用接口传入的时间参数是不同的,延迟后这两个时间就是一致的了***

## map组件的circle 里面的radius参数

这里是我想复杂了 ,这里的radius直接就是真正的值就行了,不用再调用 ```this.mapCtx.getScale()``` 方法去获取此时的放缩比例了. 唯一要处理的就是 在你用滑动栏滑动半径值的时候给动态改变 radius的值就行了
