# 组件render

## 三个页面

<https://juejin.im/post/6865451649817640968>

```vue
Home page 引入config.vue 文件
<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <HelloWorld :configJsonArr="configJson"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Config.vue'
export default {
    name: 'Home',
    components: {
        HelloWorld
    },
    data () {
        return {
            configJson: [{
                type: 'Input',
                props: {
                placeholder: '我是默认值',
                clearable: true
                }
            }, {
                type: 'Select',
                props: {
                placeholder: '我是默认值'
                }
            }, {
                type: 'Input',
                props: {
                placeholder: '我是默认值',
                suffixIcon: 'el-icon-delete'
                }
            }]
        }
    }
}
</script>

Config page 引入 Input Select文件
<template>
  <div class="hello">
    <div v-for="(config, index) in configJsonArr" :key="config.type + index">
      <!-- <component :is="config.type" :configProps="config.props"></component> -->
      <comp-form-item :configJson="config"></comp-form-item>
    </div>
  </div>
</template>

<script>
import Input from './Input'
import Select from './Select'
const CompFormItem = {
  components: {
    Input, Select
  },
  name: 'FormItem',
  props: {
    configJson: {
      required: true
    }
  },
  // h 实际上就是 createElement 参数
  render (h) {
    return h(`${this.configJson.type}`, {
      props: {
        ...this.configJson.props || {}
      },
      attrs: {
        ...this.configJson.props || {}
      }
    })
  }
}
export default {
  name: 'Config',
  components: {
    // Input,
    // Select,
    CompFormItem
  },
  props: {
    configJsonArr: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
Input 文件
<template>
  <div class="hello input-con">
    <label>输入框：</label>
    <el-input v-bind="$attrs"></el-input>
  </div>
</template>

<script>
export default {
  name: 'Input'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-con {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    width: 200px;
  }
}
</style>
Select 文件
<template>
  <div class="hello select-con">
    <label>选择框：</label>
    <el-select v-bind="$attrs" v-model="value"></el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-con {
  margin: 20px;
  display: flex;
  align-items: center;
  label {
    width: 170px;
  }
}
</style>
```
