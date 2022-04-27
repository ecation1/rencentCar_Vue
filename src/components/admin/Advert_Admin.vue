<template>
    <div>
        <el-table
                :data="tableData.slice((currentPage-1)*6,currentPage*6)"
                style="width: 100%">
            <el-table-column
                    width="150px"
                    label="广告图片"
            >
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.advertPic"
                            @click="openPic(scope.row.advertPic)"
                    ></el-image>
                </template>
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="广告链接"
                    prop="url">
            </el-table-column>

            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button size="mini" type="primary" @click="addAdvert">新增</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    align="right">
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

            <el-form :model="editForm" ref="editForm" size="mini">
                <el-form-item label="广告链接" prop="url" label-width="100px" >
                    <el-input v-model="editForm.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告图片" prop="carPic" label-width="100px" >
                    <el-upload
                            class="upload-demo"
                            action="' '"
                            :on-change="changeAdvertPic"
                            list-type="picture-card"
                            :auto-upload="false"
                            :show-file-list="true"
                            :limit="1">
                    </el-upload>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
                <el-button type="primary" @click="test('editForm')">测试</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="PicVisible"
                width="90%"
        >
            <el-image :src="imageUrl"></el-image>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Advert_Admin",
        data() {
            return {
                method:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                PicVisible:false,
                total:0,
                currentPage:1,
                imageUrl:'',
                tableData: [],
                editForm:{},
                method:false,


            }
        },
        methods: {
            addAdvert(){
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
                this.axios.post("/advert/deleteAdvert",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getAdvert()
                        }
                    });
                })
                console.log(index, row);
            },
            handleCurrentChange(val){
                this.currentPage = val;
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
            changeAdvertPic(file){
                const reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                    const _base64 = reader.result
                    this.editForm.advertPic=_base64
                    console.log(this.editForm.carPic)
                }
            },
            //查看图片
            openPic(imageUrl){
                console.log(imageUrl)
                this.imageUrl=imageUrl
                this.PicVisible=true
            },
            getAdvert(){
                this.axios.get("/advert/getAdvert").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total=resp.data.data.length
                })
            },
            //用户更新提交
            submitForm(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        if(this.method===false){
                            this.axios.post("/advert/updateAdvert",this.editForm).then(resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose:true,
                                        message:"更新成功",
                                        type:"success",
                                        onClose:()=>{
                                            this.getAdvert()
                                        }
                                    });
                                    this.resetForm("editForm")
                                    this.dialogVisible=false
                                },
                                () => {},
                                () => {}
                            )
                        }else if(this.method===true){
                            this.axios.post("/advert/addAdvert",this.editForm).then(
                                resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose:true,
                                        message:"添加成功",
                                        type:"success",
                                        onClose:()=>{
                                            this.resetForm("editForm")
                                            this.getAdvert()
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
            this.getAdvert()

        }
    }
</script>

<style scoped>

</style>

