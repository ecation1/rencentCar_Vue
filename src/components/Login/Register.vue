<template>
    <div>
        <el-form ref="RegisterForm" :model="RegisterForm" :rules="rules" label-width="80px" class="login-box">
            <h3 class="register-title">欢迎注册</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="RegisterForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="RegisterForm.password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="CheckPass">
                <el-input type="password" placeholder="请输入密码" v-model="RegisterForm.CheckPass"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" placeholder="请输入邮箱" v-model="RegisterForm.email"/>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input type="text" placeholder="请输入地址" v-model="RegisterForm.address"/>
            </el-form-item>
            <el-form-item label="身份"  prop="status" label-width="100px">
                <el-radio-group v-model="RegisterForm.status">
                    <el-radio :label="2">普通用户</el-radio>
                    <el-radio :label="3">商家</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="onSubmit('RegisterForm')">注册</el-button>
                <el-button type="primary" v-on:click="reset('RegisterForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            var checkEmail = (rule, value, callback) => {
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if (regEmail.test(value)) {
                    return callback();
                }
                callback(new Error("邮箱格式错误"));
            };
            var checkPass = (rule, value, callback) => {
                var a=this.RegisterForm.password
               console.log(a===value)
                if (value === this.RegisterForm.password) {
                    return callback();
                } else {
                    callback(new Error('两次输入密码不一致!'));
                }
            };
            return{
                editForm:{},
                RegisterForm:{},
                rules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ],
                    CheckPass:[
                        {required:true, message:'与第一次密码不一致',trigger:'blur'},
                        { validator: checkPass, trigger: "blur" },
                    ],
                    status:[
                        {required: true, message: '请选择身份', trigger: 'blur' }
                    ],
                    email:[
                        { required: true, message: "请输入邮箱", trigger: "blur" },
                        { validator: checkEmail, trigger: "blur" },
                    ]
                }
            }
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        if(this.RegisterForm.status===2){
                            this.axios.post("/user/register",this.RegisterForm).then(resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose: true,
                                        message: resp.data.msg,
                                        type: "success",
                                        onClose: () => {
                                            this.$router.push('/')
                                        }
                                    })
                                },
                                () => {},
                                () => {}
                            )
                        }else if(this.RegisterForm.status===3){
                            console.log(this.RegisterForm)
                        }

                    }else {
                        this.$message.error("数据格式错误");
                    }
                })
            },
            reset(formName){
                this.$refs[formName].resetFields();
            },
            test(formName){
                console.log(this.RegisterForm)
            }
        }
    }
</script>

<style scoped>
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