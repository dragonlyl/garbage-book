const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entery:{//main是默认入口,也可以是多入口
        main:'./src/main.js'
    },
    //出口
    output:{
        filename:'./build.js',//指定js文件
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:'',
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader|css-loader'//顺序小的在前
            },
            {
                test:/\.(jsp|svg|png|gif)$/,
                //loader  或者option两种选一种配置
                loader:'url-loader?limit=4096&name=[name].[ext]',
                // [name].[ext]内置提供,
                options:{
                    limit:4096,
                    name:'[name].[ext]'
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                //但是要排除node_modules下的所有
                exclude:/node_modules/,
                options:{
                    presets:['es2015'],//关键字
                    plugins:['transform-runtime'],//函数
                }
            },
            //解析.vue文件
            {
                test:/\.vue$/,
                loader:'vue-loader',//vue-template-compiler是代码上的依赖
            }
        ]
    },
    plugins:[
        //插件执行顺序是一次执行的
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
        //将src下的template属性描述的文件根据当前配置的output.path

    ]
}