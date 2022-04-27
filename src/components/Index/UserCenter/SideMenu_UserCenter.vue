<template>
    <div>
        <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
            <el-submenu index="1">
                <template slot="title">
                    <span>个人信息</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/index/userCenter/personInfo" class="router-link"><el-menu-item index="1-1">个人信息</el-menu-item></router-link>
                    <router-link to="/index/userCenter/lisence" class="router-link" v-if="role==='user'"><el-menu-item index="1-2">驾照上传</el-menu-item></router-link>
                    <router-link to="/index/userCenter/updatePass" class="router-link"><el-menu-item index="1-3">修改密码</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2" v-if="role==='shop'">
                <template slot="title">
                    <span>商店管理</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/index/userCenter/shopInfo" class="router-link"><el-menu-item index="2-1">商店信息</el-menu-item></router-link>
                    <router-link to="/index/userCenter/carInfo" class="router-link"><el-menu-item index="2-2">汽车管理</el-menu-item></router-link>
                    <router-link to="/index/userCenter/shopOrder" class="router-link"><el-menu-item index="2-3">订单管理</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4" v-if="role==='user'">
                <template slot="title">
                    <span>我的订单</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/index/userCenter/myToBeOrder" class="router-link"><el-menu-item index="4-1">待完成订单</el-menu-item></router-link>
                    <router-link to="/index/userCenter/MyToCommOrder" class="router-link"><el-menu-item index="4-2">待评价订单</el-menu-item></router-link>
                    <router-link to="/index/userCenter/myOverOrder" class="router-link"><el-menu-item index="4-3">已完成订单</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "SideMenu_UserCenter",
        data(){
            return{
                role:''
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            getrole(){
                this.role=sessionStorage.getItem("role")
            }
        },
        created() {
            this.getrole()
        }
    }
</script>

<style scoped>
    .router-link{
        text-decoration: none;
    }
</style>