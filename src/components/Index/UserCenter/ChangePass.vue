<template>
    <div style="text-align: center;">
        <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px">
            <el-form-item label="旧密码" prop="currentPass">
                <el-input type="password" v-model="passForm.currentPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="passForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('passForm')">提交</el-button>
                <el-button @click="resetForm('passForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ChangePass",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passForm: {
                    username:'',
                    password: '',
                    checkPass: '',
                    currentPass: ''
                },
                rules: {
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    currentPass: [
                        { required: true, message: '请输入当前密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.passForm)
                        this.axios.post('/user/updatePass',this.passForm).then(res => {
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$refs[formName].resetFields();
                                }
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .el-form {
        width: 420px;
        margin: 50px auto;
    }
</style>