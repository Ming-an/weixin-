// pages/home/home.js
import {request} from '../../request/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //存放轮播图
    bannerList:[],
    // 存放九宫格图片列表
    girdList: [],
    //存放轮播图下面的分类导航栏
    navList:[],
    //存放楼层信息
    floorList:[]
  },
  /**
   * 向后端发送请求获取楼层信息
   */
  async initFloorList(){
    await request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      method:"GET",
    })
    .then(resp=>{
      console.log("floorList=>", resp);
      this.setData({
        floorList:resp.data.message
      })
    })
    .catch(err=>{
      console.log("err=>", err)
    })
  },
  /**
   * 向后端发起请求获取分类导航栏
   */
  async initNavList(){
    await request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      method:'GET',
    })
    .then(resp=>{
      console.log("navList==>", resp);
      this.setData({
        navList:resp.data.message
      })
    })
    .catch(err=>{
      console.log("err==>", err);
    })
  },
   /**
   * 向后端发起请求，获取九宫格图片地址列表
   */
 async initGridList(){
   await request({
     url:"http://localhost:80/listGoodsType",
     method:"GET"
   })
   .then(resp=>{
     console.log("GridList", resp);
     this.setData({
       girdList: resp.data.respData
     })
   })
   .catch(err=>{
     console.log("err", err);
   })
  },
//请求轮播图后端接口
async initListBanner(){
  await request({
    url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    method:"GET"
  })
  .then(resp=>{
    console.log("bannerList==>", resp);
    this.setData({
      bannerList:resp.data.message
    })
  })
  .catch(err=>{
    console.log("err==>", err);
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initListBanner();
    this.initNavList();
    this.initFloorList();
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