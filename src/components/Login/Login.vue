<template>
    <div>
    <el-container>
        <el-container>
            <el-header style="background-color: deepskyblue">
                <div style="font-size: 20px;font-family: Lucida Calligraphy"><img src="../../assets/toy-car.png">C 租车</div>
            </el-header>
            <el-main id="building">
                <div >
                    <div id="login">
                        <el-form :model="ruleForm" status-icon :rules="LoginRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="toRegister">注册</el-button>

                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-main>
            <el-footer class="myFooter" style="height: 150px">
                <div>
                <div style="margin-left: 330px;margin-top: 20px">
                    <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >邮箱: 2903573860@qq.com</div>
                    <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >邮编: 410000</div>
                    <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >地址: 湖南省长沙市</div>
                    <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >网站标识码: hncs785415</div>
                </div><br/>
                <div style="margin-left: 320px;margin-top: 20px;float: left">
                    <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));" >Copyright © 2022 web_cnblogs<br/>
                        Powered by .NET 6 on Kubernetes</div>
                </div>
                <div>
                    <div>
                        <el-image :src="qq" style="width: 5%"></el-image>&emsp;
                        <el-image :src="wechat" style="width: 5.4%"></el-image>
                    </div>
                </div>
            </div>
            </el-footer>
        </el-container>
    </el-container>

        <el-dialog
                title="注册"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">
            <el-form ref="RegisterForm" :model="RegisterForm" :rules="RgisterRules" label-width="80px" class="login-box" size="mini">
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
                <el-form-item label="身份证号码"  prop="id" v-if="RegisterForm.status===3">
                    <el-input v-model="RegisterForm.id" placeholder="请输入身份证" type="text"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="name" v-if="RegisterForm.status===3">
                    <el-input type="text" placeholder="请输入真实姓名" v-model="RegisterForm.name"/>
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
                    <el-button type="primary" v-on:click="test('RegisterForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import qq from '../../assets/qq.jpg';
    import wechat from '../../assets/wechat.jpg';
    import qs from 'qs'
    export default {
        name: "Login",
        components:{
        },
        data() {
                var CheckID=(rule,value,callback)=>{
                    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                    console.log(value)
                    if(idcardReg.test(value)){
                        return callback();
                    }else {
                        callback(new Error("身份证格式错误"))
                    }
                }
                var CheckName=(rule,value,callback)=>{
                    var nameReg = /^[\u4e00-\u9fa5]{2,4}$/;
                    console.log(value)
                    if(nameReg.test(value)){
                        return callback();
                    }else {
                        callback(new Error("姓名错误"))
                    }
                }
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
                var validateUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }else {
                    callback();
                }
                };

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else {
                    callback();
                }
            };
            return {
                qq:qq,
                wechat:wechat,
                dialogVisible:false,
                ruleForm: {
                    username:'',
                    password: '',
                },
                LoginRules: {
                    username:[
                        {validator:validateUser, trigger:'blur'}
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                },
                RegisterForm:{},
                RgisterRules: {
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
                        {required: true, message: '请选择状态', trigger: 'blur' }
                    ],
                    email:[
                        { required: true, message: "请输入邮箱", trigger: "blur" },
                        { validator: checkEmail, trigger: "blur" },
                    ],
                    status:[
                        {required: true, message: '请选择身份', trigger: 'blur' }
                    ],
                    id:[
                        {required: true, message: '请填写身份证', trigger: 'blur' },
                        {validator:CheckID, trigger:'blur'}
                    ],
                    name:[
                        {required: true, message: '请填写身份证', trigger: 'blur' },
                        {validator:CheckName,trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    this.axios.post("/user/login?"+qs.stringify(_this.ruleForm)
                    ).then(resp=>{
                        console.log(resp.data)
                        if(resp.data.code===200){
                            this.$store.commit("SetRole",resp.data.data.role[0])
                            this.$store.commit("SetToken_User",resp.data.data.tokenInfo.tokenValue)
                            this.$store.commit("SetUsername",resp.data.data.userInfo)
                            this.$message.success(resp.data.msg)
                            this.$router.push('/index')
                        }else {
                            this.$message.error(resp.data.msg)
                        }
                    },
                    () => {}, () => {}
                        )

                    } else {
                        this.$message.error('格式错误');
                        return false;
                    }
                });
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                            this.axios.post("/user/register",this.RegisterForm).then(resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose: true,
                                        message: resp.data.msg,
                                        type: "success",
                                        onClose: () => {
                                            this.handleClose()
                                        }
                                    })
                                },
                                () => {},
                                () => {}
                            )
                    }else {
                        this.$message.error("数据格式错误");
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            test(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        console.log(this.RegisterForm)
                    }else {
                        console.log("格式错误")
                    }
                })
            },
            handleClose() {
                this.dialogVisible=false
                this.resetForm('RegisterForm')
            },
            toRegister(){
                this.dialogVisible=true
            },
            reset(formName){
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>
    .header-avatar{
        float: right;
        width: 150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    #login{
        background-color: #E9EEF3;
        margin-top: 50px;
        margin-left: 50px;
        width: 300px;
        height: 400px;
        border: 1px solid #DCDFE6;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }
     #building{
        height: 600px;
         width: 100%;
         padding: 0px;
         background-image:url("../../assets/L.png");
         background-size: 130% 110%
     }
    .myFooter{
        margin: 0px;
        padding: 0px;
        background-color: #121C27;
    }
</style>