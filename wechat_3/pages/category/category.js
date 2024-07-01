import { request } from "../../request/request"

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
//获取左侧菜单栏
leftMenuList:[],
//获取右侧菜单栏
rightContent:[],
//被点击的左侧菜单
currentIndex:0,
//右侧内容滚动条距离
scrollTop:0
  },
  //存放返回的所有数据
  Cates:[],
  /**
   * 向后端接口获取分类数据
   *
   */
 async initCates(){
   await request({
     url:'https://api-hmugo-web.itheima.net/api/public/v1/categories',
     method:"GET",
   })
   .then(resp=>{
     console.log("Cates=>", resp);
     this.Cates = resp.data.message;
     //把接口数据存入到本地存储中
     wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});
     //构造左侧的大菜单数据
     let leftMenuList = this.Cates.map(v=>v.cat_name);
     //构造右侧的商品数据
     let rightContent = this.Cates[0].children;
     this.setData({
      leftMenuList,
      rightContent,
     });


   })
   .catch(err=>{
     console.log("err=>", err)
   })
  },
//点击左侧菜单栏事件
handleItemTap(e){
  const {index}=e.currentTarget.dataset;
  let rightContent = this.Cates[index].children;
  this.setData({
    currentIndex:index,
    rightContent,
    //重新设置scroll-Top
    scrollTop:0
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //本地缓存
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      //不存在缓存数据
      //获取分类数据
      this.initCates();
    }else{
      //有旧的的数据 暂时定义一个过期时间
      if(Date.now()-Cates.time > 1000*600){
        this.initCates();
      }else{
        //可以使用旧的数据
        this.Cates=Cates.data;     
        //构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        //构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
         leftMenuList,
         rightContent,
        });
      }
    }
  },

})