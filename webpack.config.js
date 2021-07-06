module.exports = {
    entry: "./OBS/index.js",
    output: {
        path: __dirname,
        filename: "huawei-obs-wx.mini.js",
        library: {
            name: 'huaweiObsWx',
            type: 'umd',
       
          },
    },
    module: {
       
    }
};