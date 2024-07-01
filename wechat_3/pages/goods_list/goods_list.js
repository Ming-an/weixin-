// pages/goods_list/goods_list.js
import { request } from "../../request/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },

    ],
    goodsList:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,
  //子组件传递过来的点击事件
  handletabsItemChange(e){
    console.log("e==>", e)
    const {index} =e.detail;
    let {tabs}=this.data;
    tabs.forEach((v, i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //上一个页面传递过来的cid
console.log("options==>", options);
this.QueryParams.cid=options.cid;
this.getGoodsList();
  },
//获取商品列表数据
async getGoodsList(){
  await request({
    url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
    data:this.QueryParams
  })
  .then(resp=>{
    console.log("resp=>", resp);
    //获取总条数
    const total =resp.data.message.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList, ...resp.data.message.goods]
    })
    console.log("goodsList==>", this.data.goodsList)
  })
  .catch(err=>{
    console.log("err=>", err)
  })
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
    //判断还有没有下一页
    if(this.QueryParams.pagenum >= this.totalPages){
      //没有下一页数据了
      wx.showToast({
        title:"到底了~",
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})