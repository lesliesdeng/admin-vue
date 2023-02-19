module.exports = {
  presets: ["@vue/app", ["@babel/preset-env", { modules: false }]],
  //   element按需引入配置
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
