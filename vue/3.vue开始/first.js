import Vue from 'vue'
import App from './app.vue'
new Vue ({
    el:'#app',
    //render:'dom结构' 
    render:function(creater){
        return creater(App);// App包含template/script/style,最终DOM结构
    }
})