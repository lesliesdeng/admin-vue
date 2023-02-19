module.exports = {
  productionSourceMap: false,
  publicPath:'./',
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px", // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
            viewportHeight: 1080, // 视窗的高度
            unitPrecision: 2, // 单位转换后保留的精度
            propList: [
              // 能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            selectorBlackList: [".ignore"]
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      };
    }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    if (process.env.NODE_ENV === "development") {
      config.devtool("module-eval-source-map");
    } else {
      config.devtool("none");
    }
    // config.output.filename("js/[name].js");
    // config.output.chunkFilename("js/[name].js");
    // config.plugin("extract-css").tap(args => {
    //   args[0].filename = "css/[name].css";
    //   args[0].chunkFilename = "css/[name].css";
    //   return args;
    // });
  },
  devServer: {
    port: 8005,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      //    调试更改
      "/api": {
        target: "http://127.0.0.1:8089"
      }
    },
    hot: true
  }
};
