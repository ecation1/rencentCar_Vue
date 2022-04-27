<template>
    <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">后台登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
                <el-button type="primary" v-on:click="reset('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                title="温馨提示"
                :visible.sync="dialogVisible"
                width="30%">
            <!--                :before-close="handleClose">-->
            <span>请输入账号和密码</span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import qs from "qs"
    export default {
        name: "Login_Admin",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },

                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },

                // 对话框显示和隐藏
                dialogVisible: false
            }
        },
        methods: {
            test(){
                console.log(this.form)
            },
            onSubmit(formName) {
                let hasToken
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.axios.post('/user/login?'+qs.stringify(this.form)).then(resp=>{
                            console.log("login")
                            console.log(resp)
                            if(resp.data.code===200){
                                if(resp.data.data.role.indexOf("admin")!==-1){
                                    this.$message.success("欢迎登录")
                                    this.$store.commit("SetToken_Admin",resp.data.data.tokenInfo.tokenValue)
                                    this.$store.commit("SetUsername",resp.data.data.userInfo)
                                    this.$router.push("/admin")
                                }else {
                                    this.$message.error("当前账户无权限")
                                }
                            }else {
                                this.$message.error("账户或密码错误")
                            }

                            console.log(resp.data.data.tokenInfo.tokenValue)
                        },
                        () => {},
                        () => {}
                        )
                    }else {
                        alert("格式错误")
                        return false;
                    }
                })
            },
            reset(formName){
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="css"  scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }

    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }

</style>