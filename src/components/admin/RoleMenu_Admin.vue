<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column

                    label="创建日期"
                    prop="createTime">
            </el-table-column>
            <el-table-column

                    label="用户名"
                    prop="username">
            </el-table-column>

            <el-table-column
                    prop="roles"
                    label="身份"
            >

                    <template slot-scope="scope">
                        <el-tag
                                type="success"
                                disable-transitions>{{scope.row.roles.role}}</el-tag>
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
                            @click="handleEdit(scope.$index, scope.row)">
                        修改
                    </el-button>
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
                    <el-input v-model="editForm.username" autocomplete="off" :disabled="true"></el-input>

                </el-form-item>

                <el-form-item label="身份" prop="rid" label-width="100px">
                    <template>
                        <el-select v-model="editForm.rid" placeholder="请选择">
                            <el-option
                                    v-for="item in roleList"
                                    :key="item.rid"
                                    :label="item.role"
                                    :value="item.rid">
                            </el-option>
                        </el-select>
                    </template>
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
        name: "RoleMenu_Admin",
        data() {
            return {
                isInput:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                total:0,
                tableData: [{

                }],
                roleList:[],
                search: '',
                editForm:{},

                editFormRules: {
                    username: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                    rid:[
                        {required:true}
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
            handleCommand(command){

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
            getRolesList(){
                this.axios.get("/user/getAllRoles").then(resp=>{
                    this.roleList=resp.data.data
                })
            },
            //用户身份更新提交
            submitForm(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        this.axios.post("/user/updateUserRole",this.editForm).then(resp=>{
                                console.log(resp)
                                this.$message({
                                    showClose:true,
                                    message:resp.data.msg,
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
            this.getRolesList()
        }
    }
</script>

<style scoped>

</style>