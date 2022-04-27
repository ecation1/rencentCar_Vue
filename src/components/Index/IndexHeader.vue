<template>
    <div class="header-div">
        <el-row :gutter="20">
            <el-col :span="5"><div style="font-size: 20px;font-family: Lucida Calligraphy"><img src="../../assets/toy-car.png">C 租车<span v-if="role==='shop'">商家版</span></div></el-col>
            <el-col :span="6"><router-link to="/index/adver" active-class="active" class="router-link"><div style="color:white;">首页</div></router-link></el-col>
            <el-col :span="6" v-if="role!=='shop'"><router-link to="/index/shopMenu" class="router-link"><div style="color:white;">租车</div></router-link></el-col>
            <div id="buttunCenter" v-if="!userInfo.username"><el-button size="mini" @click="jumpLogin">登录/注册</el-button></div>
            <div class="header-avatar" v-if="userInfo.username">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            {{userInfo.username}}
            <el-dropdown>
                            <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/index/userCenter" class="router-link"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        </el-row>

    </div>
</template>

<script>
    export default {
        name: "IndexHeader",
        data() {
            return {
                role:'',
                userInfo:{},
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            jumpLogin(){
                this.$router.push("/")
            },
            getUserInfo(){
                console.log(sessionStorage.getItem("username"))
                console.log(sessionStorage.getItem("satoken_User"))
                this.userInfo.username=sessionStorage.getItem("username")
                this.userInfo.token=sessionStorage.getItem("satoken_User")
            },
            logout(){
                this.axios.post("/user/logout").then(resp=>{
                    console.log(resp.data.code)
                    if(resp.data.code===200){
                        console.log(".......")
                        this.$message.success("退出成功")
                        this.$store.commit("ResetToken1")
                        this.$router.push('/')
                    }
                })
            },
            getrole(){
                this.role=sessionStorage.getItem("role")
            }
        },
        created() {
            this.getUserInfo()
            this.getrole()
        }
    }
</script>

<style scoped>
    .header-div{
        background-color: #162D46;
        text-align: center;
        line-height: 60px;
        height: 70px;
        color: #E9EEF3;
    }
    #buttunCenter{
        line-height: 60px;
    }
    .header-avatar{
        float: right;
        width: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .router-link{
        text-decoration: none;
    }
</style>