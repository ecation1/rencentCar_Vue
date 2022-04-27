<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    width="150px"
                    label="创建日期"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    width="100px"
                    label="用户名"
                    prop="username">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="电话号码"
                    prop="telNumber">
            </el-table-column>
            <el-table-column
                    width="100px"
                    label="姓名"
                    prop="name">
            </el-table-column>
            <el-table-column
                    width="80px"
                    label="实名"
                    prop="ID">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.id === null ? 'danger' : 'success'"
                            disable-transitions>{{scope.row.id!== null?'已实名':'未实名'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    width="200px"
                    label="邮箱"
                    prop="email">
            </el-table-column>

            <el-table-column
                    width="80px"
                    prop="status"
                    label="状态"
                    >
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 1 ? 'danger' : 'success'"
                            disable-transitions>{{scope.row.status== 1?'封禁':'正常'}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <template>
                        <el-popconfirm title="确定删除" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    slot="reference"
                                    >Delete</el-button>
                        </el-popconfirm>
                    </template>

                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="5"
                :total=total
                @current-change="handleCurrentChange"
        >
        </el-pagination>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                <el-form-item label="用户名" prop="username" label-width="100px" >
                    <el-input v-model="editForm.username" autocomplete="off" :disabled="isInput"></el-input>
                    <el-alert
                            title="初始密码为888888"
                            :closable="false"
                            type="info"
                            style="line-height: 12px;"
                    ></el-alert>
                </el-form-item>
                <el-form-item label="电话号码"  prop="telNumber" label-width="100px">
                    <el-input type="number" v-model="editForm.telNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  prop="email" label-width="100px">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="状态"  prop="status" label-width="100px">
                    <el-radio-group v-model="editForm.status">
                        <el-radio :label="1">禁用</el-radio>
                        <el-radio :label="0">正常</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
                <el-button type="primary" @click="test('editForm')">测试</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Menu_Admin",
        data() {
            return {
                isInput:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                total:0,
                tableData: [{

                }],
                search: '',
                editForm:{},

                editFormRules: {
                    username: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false
                this.editForm = {}
            },
            handleClose() {
                this.dialogVisible=false
                this.resetForm('editForm')
            },
            handleEdit(index, row) {
                this.editForm.username=row.username
                this.editForm=Object.assign({},row)
                this.dialogVisible=true
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.axios.post("/user/deleteUser",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getUser()
                        }
                    });
                })
                console.log(index, row);
            },
            handleCurrentChange(currentPage){
                this.axios.get("/user/getUserList/"+currentPage+"/6").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data.list
                    this.total=resp.data.data.total
                })
            },
            getUser(){
                this.axios.get("/user/getUserList/1/6").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data.list
                    this.total=resp.data.data.total
                })
            },
            test(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        console.log("this.editForm")
                        console.log(this.editForm)
                        console.log("this.operation")
                        console.log(this.operation)
                    }
                }))
            },
            //用户更新提交
            submitForm(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        this.axios.post("/user/updateUser",this.editForm).then(resp=>{
                                console.log(resp)
                                this.$message({
                                    showClose:true,
                                    message:"添加成功",
                                    type:"success",
                                    onClose:()=>{
                                        this.getUser()
                                    }
                                });
                                this.dialogVisible=false
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
        },
        created() {
            this.getUser()
        }
    }
</script>

<style scoped>

</style>