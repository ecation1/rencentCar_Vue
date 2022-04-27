<template>
    <div>
        <el-container>
            <el-header>
                <strong>后台管理系统</strong>
                <div class="header-avatar">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    {{username}}
                    <el-dropdown>
                            <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/userCenter"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px"><SideMenu_Admin/></el-aside>
                <el-container>
                    <el-main class="el-main"><router-view>
                    </router-view></el-main>
                </el-container>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import SideMenu_Admin from "./SideMenu_Admin";
    export default {
        name: "Admin_Index",
        components:{
            SideMenu_Admin
        },
        data() {
            return {
                username:''
            };
        },
        methods: {
            logout(){
                this.axios.post("/user/logout").then(resp=>{
                    console.log(resp.data.code)
                    if(resp.data.code===200){
                        console.log(".......")
                        this.$message.success("退出成功")
                        this.$store.commit("ResetToken")
                        localStorage.setItem("satoken",'')
                        sessionStorage.setItem("satoken_Admin",'')
                        sessionStorage.setItem("username",'')
                        this.$router.push('/admin_login')
                    }
                })
            },
            getUserInfo(){

            }
        },

        created() {
            this.username=sessionStorage.getItem("username")
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }



    .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: 680px;
        text-align: center;
        padding: 0px;
        margin: 0px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .header-avatar{
        float: right;
        width: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>