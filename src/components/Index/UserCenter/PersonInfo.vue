<template>
    <div style="width: 700px;margin-left: 100px">
        <el-form label-position="left" :model="userInfoForm" status-icon :rules="FormRules" ref="userInfoForm" label-width="80px" size="mini">
            <el-form-item label="用户名:" style="width: 300px">
                {{userInfoForm.username}}
            </el-form-item>
            <el-form-item label="电话号码" style="width: 400px" prop="telNumber">
                <el-input v-model="userInfoForm.telNumber"></el-input>
            </el-form-item>
            <el-form-item label="地址" style="width: 400px">
                <el-input v-model="userInfoForm.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" style="width: 400px">
                <el-input v-model="userInfoForm.email"></el-input>
            </el-form-item>
            <el-form-item label="姓名" style="width: 400px" prop="name" v-show="!isEdit">
                <el-input v-model="userInfoForm.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名" style="width: 400px" prop="name" v-show="isEdit">
                <el-input v-model="userInfoForm.name" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" style="width: 400px" prop="id" v-show="!isEdit">
                <el-input v-model="userInfoForm.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" style="width: 450px"  v-show="isEdit">
                <el-input v-model="userInfoForm.id" :disabled="false"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer" >
            <el-button type="primary" size="mini" @click="onSubmit('userInfoForm')">修改</el-button>
            <el-button type="primary" size="mini" @click="test('userInfoForm')">测试</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "PersonInfo",
        data(){
            var CheckName=(rule,value,callback)=>{
                var nameReg = /^[\u4e00-\u9fa5]{2,4}$/;
                console.log(value)
                if(nameReg.test(value)){
                    return callback();
                }else {
                    callback(new Error("姓名错误"))
                }
            }
            var CheckTel= (rule, value, callback) =>{
                console.log(value)
                const regTel=/^1[3456789]\d{9}$/;
                if(regTel.test(value)||value===''){
                   return callback();
                }else {
                    callback(new Error("电话号码格式错误"))
                }
            }
            var CheckID=(rule,value,callback)=>{
                var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                console.log(value)
                if(idcardReg.test(value)||value===undefined){
                    return callback();
                }else {
                    callback(new Error("身份证格式错误"))
                }
            }
            return{

                isEdit:'',
                userInfoForm: {
                    uid:'',
                    username: '',
                    telNumber:'',
                    address:'',
                    id:'',
                    email:'',
                },
                FormRules:{
                    telNumber:[
                        {validator:CheckTel, trigger:'blur'}
                    ],
                    id:[
                        {validator:CheckID, trigger:'blur'}
                    ],
                    name:[
                        {required: true, message: '请填写身份证', trigger: 'blur' },
                        {validator:CheckName,trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        this.axios.post("/user/updateUser",this.userInfoForm).then(resp=>{
                                console.log(resp)
                                this.$message({
                                    showClose:true,
                                    message:resp.data.msg,
                                    type:"success",
                                    onClose:()=>{
                                        this.getUserInfo()
                                    }
                                });
                            },
                            () => {},
                            () => {}
                        )
                    }else {
                        console.log("提交错误");
                        return false;
                    }
                }))
            },
            getUserInfo(){
                this.axios.get("/user/userInfo").then(resp=>{
                    console.log(resp)
                    this.userInfoForm=resp.data.data
                    console.log(this.userInfoForm.id)
                    console.log(this.userInfoForm.id===null)
                    this.isEdit=(this.userInfoForm.id===null)
                })
            },
            test(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        console.log(this.userInfoForm)
                    }else {
                        console.log("提交错误");
                        return false;
                    }
                }))




            }
        },
        created() {
            this.getUserInfo()
        }
    }
</script>

<style scoped>

</style>