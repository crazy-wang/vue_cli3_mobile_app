const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js配置项
const PORT = '9099' // 定义后默认是这个，vue2.0后面的版本都会更智能。检查到端口占用后，自动分配其他的复写
module.exports = {
  // publicPath: '/',
  // publicPath: '/vuecli3_app/',
  // publicPath: './',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/vuecli3_app/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  // webpack-dev-server配置
  devServer: {
    port: PORT, // 端口号
    open: true // 自动打开浏览器
    // 反向代理的配置
    // proxy: {
    //   '/api': {
    //     target: 'http://m.maoyan.com',// 目标地址url
    //     ws: true, // 是否启用websockets
    //     changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: { '^/api': '/' } // 这里重写路径
    //   }
    //
    // }
  },
  // css相关
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      sass: {
        // 这里的选项会传递给 sass-loader
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // data: `@import "@/variables.scss";`  可以这样向所有 Sass 样式传入共享的全局变量
      },
      postcss: {
        // 用以下三种插件都可以实现；不过推荐第一种，因为可以避免把ui库的样式也给转换了rem
        // 主要是设置基准值；rootValue的值和rem.js中设置的baseSize值一样，则就是750px满屏
        // 这里的选项会传递给 postcss-loader
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 16, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了[16最佳值；然后html根元素也设置16px;这样的话，设计稿iphone6 2dpr 375px满屏]。
            exclude: /(node_module)/ // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          })
        ]
      }

      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      //   plugins: [
      //     require('postcss-px2rem')({remUnit: 16}), // 换算的基数
      //   ]
      // }

      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      //   plugins: [
      //     require('postcss-pxtorem')({
      //       // rootValue : 32, // 换算的基数(设计图750的根字体为32)
      //       rootValue : 16, // 换算的基数(设计图750的根字体为32)
      //       selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
      //       propList   : ['*'],
      //     }),
      //   ]
      // }
    }
  },
  // webpack配置，可以是一个对象也可以是一个函数 [一般不需要另外配置什么，顶多就是配置个别名]
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'src': path.resolve(__dirname, './src'),
        'assets': path.resolve(__dirname, './src/assets'),
        'components': path.resolve(__dirname, './src/components'),
        'views': path.resolve(__dirname, './src/views'),
        'styles': path.resolve(__dirname, './src/styles'),
        'utils': path.resolve(__dirname, './src/utils'),
        'store': path.resolve(__dirname, './src/store'),
        'router': path.resolve(__dirname, './src/router'),
        'public': path.resolve(__dirname, './public')
      }
    }
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // }

  // webpack插件相关配置
  chainWebpack: config => {

  }
}
