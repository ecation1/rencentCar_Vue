<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*6,currentPage*6)"
                style="width: 100%"
                size="mini">
            <el-table-column
                    width="150px"
                    label="汽车外观"
            >
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.carPic"
                            @click="openPic(scope.row.carPic)"
                    ></el-image>
                </template>
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="创建时间"
                    prop="orderStartTime">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="完成时间"
                    prop="orderEndTime">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="租用日期"
                    prop="days">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="总价"
                    prop="allPrice">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="租用人姓名"
                    prop="name">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="租用人电话号码"
                    prop="telNumber">
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
                    <template>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    slot="reference"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >完成订单</el-button>
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
                width="90%"
        >
            <el-image :src="imageUrl"></el-image>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="dialogFormVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                <el-form-item label="评论"  prop="c_comment" label-width="100px">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="editForm.c_comment">
                    </el-input>
                </el-form-item>

                <el-form-item label="分数"  prop="stars" label-width="100px">
                    <el-rate
                            v-model="editForm.stars"
                            show-text>
                    </el-rate>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ToBeCommOrder",
        data() {
            return {
                dialogFormVisible:false,
                method:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                total:0,
                imageUrl:'',
                currentPage:1,
                search:'',
                orderInfo:{},
                tableData: [],
                editForm:{},
                editFormRules:{
                    c_comment:[
                        {required: true, message: '请输入评论', trigger: 'blur'}
                    ],
                    stars:[
                        {required: true, message: '请给出分数', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false
                this.editForm = {}
            },
            handleClose() {
                this.dialogFormVisible=false
                this.resetForm('editForm')
            },
            handleEdit(index, row) {
                this.dialogFormVisible=true
                this.orderInfo=row
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

            getOrder(){
                this.axios.post("/order/getMyOrder",{
                    status:2
                }).then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total=resp.data.data.length
                })
            },
            //查看图片
            openPic(imageUrl){
                this.imageUrl=imageUrl
                this.dialogVisible=true
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid => {
                    if (valid) {
                        this.editForm.cid=this.orderInfo.cid
                        this.editForm.oid=this.orderInfo.oid
                        console.log("this.editForm",this.editForm)
                        this.axios.post("/comm/addComm",this.editForm).then(resp=>{
                            console.log(resp)
                            if(resp.data.code===200){
                                this.$message({
                                    showClose:true,
                                    message:resp.data.msg,
                                    type:"success",
                                    onClose:()=>{
                                        this.handleClose()
                                        this.getOrder()
                                    }
                                });

                            }
                        })
                    } else {

                    }
                }))
            }
        },
        created() {
            this.getOrder()
        }
    }
</script>

<style scoped>

</style>

