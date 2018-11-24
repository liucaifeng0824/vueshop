var path=require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin.js');
module.exports={
    mode: "development",
    //入口文件
    entry:path.join(__dirname,'src/main.js'),
    //出口文件
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                //匹配css结尾
                test:/\.css$/,
                use:['style-loader','css-loader'],
            },{
                //匹配图片
                test:/\.(jpg|jpeg|png|gif|bmp)$/,
                loader:'url-loader',
                options:{
                    limit:20000,
                    name:'[hash:8]-[name].[ext]'
                }
            },
            {
                //匹配字体
                test: /\.(ttf|svg|woff|woff2|eot)$/,
                use: ['url-loader']
            },
            {
                //匹配js文件
                test:/\.js$/,
                use:['babel-loader'],
                //打包除这个文件之外的文件
                exclude:/node_modules/
            },
            {
                //匹配组件
                test:/\.vue$/,
                use:['vue-loader']
            },
            { 
                test: /\.scss$/, 
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve:{
        //修正导入vue路径时候的问题
        alias:{
          "vue$":"vue/dist/vue.js"
        }
      },
    plugins:[
        new VueLoaderPlugin()
    ]
    
}