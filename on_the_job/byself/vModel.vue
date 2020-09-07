<template>
    <div class="vue-model">
        vue-model组件实现 https://www.jianshu.com/p/e908cc6719c8
        <input type="text" v-model="value1">
        <!--语法糖 编译后的写法-->
        <input type="text"
            :value="value1"
            @input="value1 = $event.target.value"
        >
        <input type="text" :value="value1" @input="test">
        <!-- input-component触发input事件 -->
        <!-- 子节点内容 -->
        <input type="text"
            :value="value"
            @input="$emit('input', $event.target.value);"
        >
        <!-- 父节点写上 -->
        <!-- <input-component v-model="value"> -->

        .sync 相当于对一个props进行双向绑定，也是一个语法糖
        <!--语法糖.sync-->
        <!-- <my-component :value.sync="msg" /> -->
        <!--编译后的写法-->
        <!-- <my-component
        :value="msg"
        @update:value="(val) => msg = val"
        > -->
        https://blog.csdn.net/qq_29582173/article/details/102155220
        两者区别, v-model和sync
    </div>
</template>
<script>
export default {
    data () {
        return {
            value1: 1
        }
    },
    props: {
        // 分数，默认0，保留一位小数
        value: {
            type: Number,
            default: 0
        }
    },
    mounted () {
    },
    methods: {
        test (val) {
            this.value1 = Number(val.target.value)
        }
    }
}
</script>
<style scoped lang='scss'>

</style>
