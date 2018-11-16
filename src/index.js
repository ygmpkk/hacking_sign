import hmacsha1 from 'hmacsha1'

export default class HackingSign {
  constructor(options = {}) {
    const { accessKeyId, accessKeySecret, ...rest } = options

    if (!(accessKeyId || accessKeySecret)) {
      throw new Error('accessKeyId and accessKeySecret is required')
    }

    this.options = {
      accessKeyId,
      accessKeySecret,
      // 3分钟
      expire: 3 * 60 * 1000,
      ...rest,
    }
  }

  sign(filename, options = {}) {
    const opts = {
      ...this.options,
      ...options,
    }

    // 过期时间
    // opts.expireAt 仅在测试时使用
    const expireAt = opts.expireAt || new Date().getTime() + opts.expire
    // 过期秒数
    const expire = parseInt(String(expireAt / 1000), 10)

    // 策略对象
    const policy = {
      expiration: new Date(expireAt).toISOString(),
      // 上传文件的最小和最大允许大小。 该condition支持contion-length-range匹配方式。
      // content-length-range
      // HTTP请求头。 该condition支持精确匹配和starts-with匹配方式。
      // Cache-Control, Content-Type, Content-Disposition, Content-Encoding, Expires
      // 上传文件的object名称。 该condition支持精确匹配和starts-with匹配方式。
      // key
      // 上传成功后的跳转URL地址。 该condition支持精确匹配和starts-with匹配方式。
      // success_action_redirect
      // 未指定success_action_redirect时，上传成功后的返回状态码。 该condition支持精确匹配和starts-with匹配方式。
      // success_action_status
      // 用户指定的user meta。 该condition支持精确匹配和starts-with匹配方式。
      // x-oss-meta-*
      conditions: [
        ...(opts.bucket && { bucket: opts.bucket }),
        ...opts.conditions,
      ].filter(p => p),
    }

    // 文件最大长度
    if (opts.maxSize) {
      policy.conditions.push(["content-length-range", 0, opts.maxSize])
    }

    // 文件Key
    const prefix = opts.directory
    // 授权目录上传，或者文件上传
    if (filename) {
      // 存在文件名使用严格相等判断
      const key = prefix ? `${prefix}${filename}` : filename
      policy.conditions.push(["eq", "$key", key])
    } else if (prefix) {
      // 存在目录使用key前缀限制
      policy.conditions.push(["starts-with", "$key", prefix])
    }

    // 签名
    const base64Policy = this.base64(JSON.stringify(policy))
    const signature = this.hmac(base64Policy)

    return {
      expire,
      signature,
      policy: base64Policy,
      directory: prefix,
      key: `${prefix || ''}${filename || ''}`,
      accessKeyId: opts.accessKeyId,
      ...(opts.bucket && {bucket: opts.bucket}),
      ...(opts.securityToken && {securityToken: opts.securityToken}),
    }
  }

  hmac(stringify) {
    return hmacsha1(this.options.accessKeySecret, stringify)
  }

  base64(stringify) {
    try {
      return btoa(stringify)
    } catch(_) {
      return Buffer.from(stringify).toString('base64')
    }
  }
}
