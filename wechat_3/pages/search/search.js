// pages/search/search.js
import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:"",
    goodsGetByKey:[],
    goodId:0
  },

  gotoGoodDetail(e){
    //console.log("事件函数",e);
    //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id=' + e.currentTarget.dataset.id
    })
  },

  getGoodsDetails(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      method:'GET',
      data:{
        query:this.data.key
      }
    })
    .then(res=>{
      console.log("获取成功",res);
      this.setData({
        goodsGetByKey:res.data.message.goods
      })
    })
    .catch(err=>{
      console.log("获取失败",err);
    })
  },

  getKey(e){
    this.setData({
      key:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      key:options.key
    })
    if(this.data.key)
    {
      this.getGoodsDetails();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})