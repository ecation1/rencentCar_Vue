import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    satoken_User:'',
    satoken_Admin:'',
    username:'',
    role:'',
    cid:'',
    userRoomId:'',
    adminRoomId:'',
  },
  mutations: {
    SetRole(state,value){
      state.role=value
      sessionStorage.setItem("role",value)
    },
    SetToken_User(state,value){
      state.satoken_User=value
      sessionStorage.setItem("satoken_User",value)
      localStorage.setItem("satoken",value)
    },
    SetToken_Admin(state,value){//存储token
      state.satoken_Admin=value
      sessionStorage.setItem("satoken_Admin",value)
      localStorage.setItem("satoken",value)
    },
    SetUsername(state,value){//存储用户名
      state.username=value
      sessionStorage.setItem("username",value)
    },
    ResetToken1(state){
      state.satoken_Admin=''
      sessionStorage.clear()
    },
    ResetToken(state){
      state.satoken_Admin=''
      localStorage.setItem("satoken",'')
      sessionStorage.setItem("satoken_Admin",'')
      sessionStorage.setItem("username",'')
    },
    SetCid(state,value){
      state.cid=value
      sessionStorage.setItem("cid",value)
    },
    SetUMid(state,value){
      state.userRoomId=value
      sessionStorage.setItem("userRoomId",value)
    },
    SetAMid(state,value){
      state.adminRoomId=value
      sessionStorage.setItem("adminRoomId",value)
    }
  },
  actions: {
  },
  modules: {
  }
})
