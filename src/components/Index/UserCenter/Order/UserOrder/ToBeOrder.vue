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
                        <el-popconfirm title="确定完成" @confirm="handleEdit(scope.$index, scope.row)">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    slot="reference"
                            >完成订单</el-button>
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
                width="90%"
        >
            <el-image :src="imageUrl"></el-image>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ToBeOrder",
        data() {
            return {
                method:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                total:0,
                imageUrl:'',
                currentPage:1,
                search:'',
                tableData: [],
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
                row.status=2
                this.axios.post("/order/overOrder",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getOrder()
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

            getOrder(){
                this.axios.post("/order/getMyOrder",{
                    status:1
                }).then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total=resp.data.data.length
                })
            },
            //查看图片
            openPic(imageUrl){
                console.log(imageUrl)
                this.imageUrl=imageUrl
                this.dialogVisible=true
            },
        },
        created() {
            this.getOrder()
        }
    }
</script>

<style scoped>

</style>

