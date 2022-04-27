<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.brandName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*6,currentPage*6)"
                style="width: 100%">
            <el-table-column
                    width="150px"
                    label="品牌名"
                    prop="brandName">
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button size="mini" type="primary" @click="addBrand">新增</el-button>
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
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="6"
                layout="total, prev, pager, next, jumper"
                :total=parseInt(total)>
        </el-pagination>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                <el-form-item label="品牌名" prop="brandName" label-width="100px" >
                    <el-input v-model="editForm.brandName" autocomplete="off"></el-input>
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
        name: "Brand_Admin",
        data() {
            return {
                method:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                total:0,
                currentPage:1,
                search:'',
                tableData: [],
                editForm:{},
                editFormRules: {
                    brandName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            addBrand(){
                this.method=true
                this.dialogVisible=true
            },
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
                this.method=false
                this.editForm.username=row.username
                this.editForm=Object.assign({},row)
                this.dialogVisible=true
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.axios.post("/brand/deleteBrand",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getBrand()
                        }
                    });
                })
                console.log(index, row);
            },
            handleCurrentChange(val){
                this.currentPage = val;
            },
            getBrand(){
                this.axios.get("/brand/getBrand").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total=resp.data.data.length
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
                        if(this.method===false){
                            this.axios.post("/brand/updateBrand",this.editForm).then(resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose:true,
                                        message:"添加成功",
                                        type:"success",
                                        onClose:()=>{
                                            this.getBrand()
                                        }
                                    });
                                    this.dialogVisible=false
                                },
                                () => {},
                                () => {}
                            )
                        }else if(this.method===true){
                            this.axios.post("/brand/addBrand",this.editForm).then(
                                resp=>{
                                    this.$message({
                                        showClose:true,
                                        message:"添加成功",
                                        type:"success",
                                        onClose:()=>{
                                            this.getBrand()
                                        }
                                    });
                                    this.dialogVisible=false
                                })
                        }

                    }else {
                        console.log("提交错误");
                        return false;
                    }
                }))
            },
        },
        created() {
            this.getBrand()
        }
    }
</script>

<style scoped>

</style>
