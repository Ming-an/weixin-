export const request = (params) =>{
  return new Promise((resovlet, reject) =>{
    wx.request({
      ...params,
      success:response =>{
        resovlet(response)
      },
      fail:err=>{
        reject(reject)
      }
    })
  })
}
