<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*6,currentPage*6)"
                style="width: 100%">
            <el-table-column
                    width="100px"
                    label="用户名"
                    prop="username">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="驾照号码"
                    prop="licenseId">
            </el-table-column>


            <el-table-column
                    prop="licensePic"
                    label="驾照"
            >
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.licensePic"
                            @click="openPic(scope.row)"
                    ></el-image>
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
                    <template>
                    <el-popconfirm title="确定通过" @confirm="handleEdit(scope.$index, scope.row)">
                        <el-button
                            size="mini"
                            type="primary"
                            slot="reference">通过</el-button>
                    </el-popconfirm>
                    </template>
                    <template>
                        <el-popconfirm title="确定删除" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    slot="reference"
                            >退回</el-button>
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
        name: "License_Verify",
        data(){
            return{
                total:0,
                search:'',
                tableData: [],
                currentPage:1,
                dialogVisible: false,
                imageUrl:''
            }
        },
        methods:{
            handleCurrentChange(val){
                this.currentPage = val;
            },
            handleDelete(index,row){
                this.axios.post("/user/deleteLicen",{
                    lid:row.lid
                }).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getLicense()
                        }
                    });
                })
            },
            handleEdit(index,row){
                this.axios.post("/user/accessLicen",{
                    lid:row.lid
                }).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getLicense()
                        }
                    });
                })
            },
            getLicense(){
                this.axios.get("/user/allLicense").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total= this.tableData.length
                })
            },
            //查看图片
            openPic(row){
                console.log(row)
                this.imageUrl=row.licensePic
                this.dialogVisible=true
            },

        },
        created() {
            this.getLicense()
        }
    }
</script>

<style scoped>

</style>