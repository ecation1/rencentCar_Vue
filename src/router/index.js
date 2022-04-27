import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Index from "../views/Index";
import AdverIndex from "../components/Index/AdverIndex";
import first from "../components/Index/first";
import Login from "../components/Login/Login";
import Admin_Index from "../components/admin/Admin_Index";
import Login_Admin from "../components/admin/Login_Admin";
import UserMenu_Admin from "../components/admin/UserMenu_Admin";
import RoleMenu_Admin from "../components/admin/RoleMenu_Admin";
import Register from "../components/Login/Register";
import UserCenter from "../components/Index/UserCenter/UserCenter";
import PersonInfo from "../components/Index/UserCenter/PersonInfo";
import Lisence from "../components/Index/UserCenter/Lisence";
import test from "../components/Index/UserCenter/test";
import License_Verify from "../components/admin/License_Verify";
import TobeShopMenu_Admin from "../components/admin/TobeShopMenu_Admin";
import ShopInfo from "../components/Index/UserCenter/Shop/ShopInfo";
import Brand_Admin from "../components/admin/Brand_Admin";
import CarMenu from "../components/Index/UserCenter/Shop/CarMenu";
import CarMenu_Admin from "../components/admin/CarMenu_Admin";
import Advert_Admin from "../components/admin/Advert_Admin";
import ShopMenu from "../components/Index/ShopMenu";
import CarInfo from "../components/Index/CarInfo";
import CarInfo_Buy from "../components/Index/OrderInfo/CarInfo_Buy";
import OrderInfo_Buy from "../components/Index/OrderInfo/OrderInfo_Buy";
import ToBeOrder from "../components/Index/UserCenter/Order/UserOrder/ToBeOrder";
import OverOrder from "../components/Index/UserCenter/Order/UserOrder/OverOrder";
import ToBeCommOrder from "../components/Index/UserCenter/Order/UserOrder/ToBeCommOrder";
import Chat_User from "../components/Index/OrderInfo/Chat_User";
import Chat_Admin from "../components/admin/Chat_Admin";
import ShopOrder from "../components/Index/UserCenter/Order/ShopOrder/ShopOrder";
import ChangePass from "../components/Index/UserCenter/ChangePass";
import {Message} from "element-ui";
Vue.use(VueRouter)

const routes = [
  {
    path:'/index',
    name:Index,
    component:Index,
    redirect:"/index/adver",
    children:[
      {
        path:'adver',
        name:AdverIndex,
        component:AdverIndex
      },
      {
        path: 'first',
        component: first
      },
      {
        path:'shopMenu',
        component:ShopMenu
      },
      {
        path:"chat_User",
        component:Chat_User
      },
      {
        path:'carInfo',
        component:CarInfo,
        redirect:"/index/carInfo/carinfo_buy",
        children:[
          {
            path:"carinfo_buy",
            component:CarInfo_Buy
          },
          {
            path: "orderinfo_buy",
            component: OrderInfo_Buy
          }
        ]
      },
      {
        path: 'userCenter',
        name: UserCenter,
        component: UserCenter,
        children:[
          {
            path: 'lisence',
            name: Lisence,
            component: Lisence
          },
          {
            path:'personInfo',
            name:PersonInfo,
            component:PersonInfo
          },
          {
            path:'test',
            name:test,
            component:test
          },
          {
            path:'shopInfo',
            component:ShopInfo
          },
          {
            path:'carInfo',
            name:CarInfo,
            component:CarMenu,
          },
          {
            path: 'myToBeOrder',
            component: ToBeOrder
          },
          {
            path: 'myOverOrder',
            component: OverOrder
          },
          {
            path: 'MyToCommOrder',
            component: ToBeCommOrder
          },
          {
            path: 'shopOrder',
            component: ShopOrder
          },
          {
            path: 'updatePass',
            component: ChangePass
          }
        ]
      }
    ]
  },

  {
    path:'/',
    name:Login,
    component:Login
  },
  {
    path:'/Admin_login',
    name:Login_Admin,
    component:Login_Admin
  },
  {
    path:'/register',
    name:Register,
    component:Register
  },
  {
    path:'/admin',
    name:Admin_Index,
    component:Admin_Index,
    children:[
      {
        path: 'user',
        name: UserMenu_Admin,
        component: UserMenu_Admin
      },
      {
        path: 'roles',
        name: RoleMenu_Admin,
        component: RoleMenu_Admin
      },
      {
        path:'licenrify',
        name: License_Verify,
        component: License_Verify
      },
      {
        path: 'toBeShop',
        name: TobeShopMenu_Admin,
        component: TobeShopMenu_Admin
      },
      {
        path: 'brand',
        component: Brand_Admin
      },
      {
        path: "carList",
        component: CarMenu_Admin
      },
      {
        path: "advertList",
        component: Advert_Admin
      },
      {
        path:'chat_Admin',
        component:Chat_Admin
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  const token=sessionStorage.getItem("satoken_Admin")
  let hasAdminToken
  const utoken=sessionStorage.getItem("satoken_User")
  let hasUToken
  if(token){
    hasAdminToken=true
  }else {
    hasAdminToken=false
  }
  if(utoken){
    hasUToken=true
  }else {
    hasUToken=false
  }

  if(to.path==='/admin'){//管理员没有登录禁止进入后台
    console.log(hasAdminToken)
    if(hasAdminToken!==true){
      alert("请先登录")
      sessionStorage.clear()
      localStorage.clear()
      next('/admin_login')
    }else {
      next()
    }

  }
  if(to.path==='/admin_login'){//进入后台登录如果查询到adminToken直接进入后台
    if(hasAdminToken===true){
      alert("欢迎您："+sessionStorage.getItem("username"))
      next('/admin')
    }else {
      next()
    }
  }
  if(to.path==='/index/carInfo'){
    if(hasUToken!==true){
      Message.error("请先登录")
      sessionStorage.clear()
      localStorage.clear()
      next('/')
    }else {
      next()
    }
  }

next()
})
export default router
