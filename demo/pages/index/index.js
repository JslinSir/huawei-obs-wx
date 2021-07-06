 
 import huaweiObsWx from '../../huawei-obs-wx.mini'

Page({

  data: {
 
  },

  onLoad(){
 
  },


  handleUpload(){

  

    // 初始化配置
    huaweiObsWx.setObsConfig({

      accessKeyId:'123', //ak
      secretKey:'123', //sk
      securityToken:'123', //秘钥
      bucket:'123', // 桶名
      endpoint:'123', // 访问路径 小程序 调用 前缀 要加 桶名  返回拼装好的 如 ：`https://${bucket}.${endpoint}`
      expiresAt:'123', //  token 有效期
      fileUploadPath:'dev/2021', // 上传到 云上的 文件夹地址
      domainUrl:'xxxxx', // 图片访问路径

    })

 

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths


        huaweiObsWx.OBSupload(tempFilePaths[0]).then((res)=>{
 
           console.log('res:',res)


        }).catch((e)=>{
 
           console.error(e)

        })
      }
    })

   
 


  },
 
 
})
