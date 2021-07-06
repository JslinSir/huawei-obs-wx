const config = require('./Configuration.js');
const getPolicyEncode = require('./getPolicy.js');
const getSignature = require('./GetSignature.js');

const setObsConfig = params => {

  config.setConfig(params)

}

const OBSupload = function (filePath,fileName){

  if(!filePath){
    wx.showToast({
      title: '文件路径不能为空',
      icon: 'none',
    });
    return false
  }


 return wxUpload(filePath,fileName)
 
}



const wxUpload = (filePath,fileName)=>{

  const pathSplit =  filePath.split('.')
 
  const photoType = pathSplit[pathSplit.length-1]

  const contentType = `image/${photoType}`
 

  let _fileName = fileName ? fileName : `picture-mini`

  //重名会被覆盖，这里加下 时间戳
  _fileName = `${_fileName}-${Date.now()}.${photoType}`

     //设定policy内容
  const OBSPolicy = {                
    "expiration": config.Expiration, //token有效期
    "conditions": [
      {"bucket": config.bucket},        //Bucket name
      {"x-obs-security-token": config.SecurityToken },
      {'content-type':contentType},
      {"x-obs-acl": "public-read"},
      { 'key': `${config.FileUploadPath}${_fileName}`},
    ]
  }

  const policyEncoded = getPolicyEncode(OBSPolicy);                    //计算policy编码值
  const signature = getSignature(policyEncoded, config.SecretKey);     //计算signature
 
  return new Promise((revose,reject)=>{

    wx.uploadFile({
      url: config.EndPoint,
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data; boundary=-9431149156168',
      },
      formData: {
        'AccessKeyID': config.AccessKeyId,
        'policy': policyEncoded,
        'signature': signature,
        "x-obs-security-token": config.SecurityToken,
        'content-type':contentType,
        'x-obs-acl': 'public-read',
        'key': `${config.FileUploadPath}${_fileName}`,
      },
      success: function(res){

        if(res.statusCode=='204'){
          // http图片地址 如："https://img/20210630/picture-mini-1625018844736.png"

          const domainUrl = config.DomainUrl
          const _chart = domainUrl.endsWith('/') ?  '' : '/'
          const url = `${config.DomainUrl}${_chart}${config.FileUploadPath}${_fileName}`
          //相对路径 如:'/dev/zj-mall/img/20210624/321321-1624539083010.png'
          const path = `${config.FileUploadPath}${_fileName}`

          revose({
            url , 
            path, 
            domainUrl,
          })

          console.log('上传图片成功: url:',url,"path:",path )
        }
        else{
          console.log('上传图片失败', res)
          reject(res)
        }
      },
      fail: function(e){
        console.log('上传图片失败', e)
        reject(e)
      }
    })


  })

}


 

module.exports = {

  OBSupload,

  setObsConfig


}