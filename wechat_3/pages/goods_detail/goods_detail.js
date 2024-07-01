import {request} from '../../request/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    goods_id:"",
    //商品对象
  GoodsInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const goodsId = parseInt(options.goods_id);
    console.log("goods_id==>", options.goods_id);
    this.setData({
      goods_id:goodsId,
    })
    this.getGoodsDetail(this.data.goods_id);
  },
  //获取商品的详情数据
  async getGoodsDetail(goods_id){
   await request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      method:"GET",
      data:{
        goods_id
      },
    })
    .then(resp=>{
      console.log("商品详情页goodsObj",resp)
      this.setData({
        goodsObj:resp.data.message,
        GoodsInfo:resp.data.message
      });
      const c0 = wx.getStorageSync('cart1');  
      const c1 = c0 || []; // 初始化为空数组，如果c0为undefined或null    
      if (c1.length === 0) {  
        // 如果cart1为空，则执行set操作  
        wx.setStorageSync('cart1', [this.data.GoodsInfo]); 
      }      
      c1.push(this.data.GoodsInfo);  
      wx.setStorageSync('cart1', c1);  
    })
    .catch(err=>{
    })
  },
  //点击加入购物车
handleCartAdd() {  
  const cart = wx.getStorageSync('cart') || [];  
  const newGoodsInfo = this.data.GoodsInfo; 
  const cart0 = cart || [];
  if(cart0.length === 0) {
    //如果cart为空则存入cart中
    wx.setStorageSync('cart',[newGoodsInfo]);
    wx.showToast({
      title: '添加成功',
    })
  }else{
    cart0.unshift(newGoodsInfo);
    wx.setStorageSync('cart', cart0);
    console.log("cart==>", cart);
    wx.showToast({
      title: '添加成功',
    })                     
  }
}
})