
// 指定OBS服务相关信息：AK，SK，EndPoint
class Configuration{

  constructor(){

    this.AccessKeyId = '' //AK

    this.SecretKey = ''  //SK

    this.SecurityToken = ''  // securitytoken

    this.EndPoint = ''  // 访问路径 小程序 调用 前缀 要加 桶名

    this.bucket = ''   //桶名

    this.Expiration = ''  // token 有效期

    this.FileUploadPath = ''  // 上传到 云上的 文件夹地址

    this.DomainUrl = ''  //图片访问路径



  }

  setConfig({ accessKeyId,secretKey,securityToken,bucket,endpoint, expiresAt, fileUploadPath,domainUrl}){


    this.AccessKeyId = accessKeyId

    this.SecretKey = secretKey

    this.SecurityToken = securityToken

    this.bucket = bucket

    const _endpoint = `https://${bucket}.${endpoint}`

    this.EndPoint = _endpoint

    this.Expiration = expiresAt

    this.FileUploadPath = fileUploadPath

    this.DomainUrl = domainUrl


  }

}


module.exports = new Configuration();