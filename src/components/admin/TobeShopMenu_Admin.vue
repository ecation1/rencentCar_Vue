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
                    width="200px"
                    label="邮箱"
                    prop="email">
            </el-table-column>
            <el-table-column
                    width="200px"
                    label="身份证"
                    prop="id">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="姓名"
                    prop="name">
            </el-table-column>
            <el-table-column
                    width="150px"
                    prop="address"
                    label="地址"
            >
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

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "TobeShopMenu_Admin",
        data(){
            return{
                total:0,
                search:'',
                tableData: [],
                currentPage:1,
                dialogVisible: false,

            }
        },
        methods:{
            handleCurrentChange(val){
                this.currentPage = val;
            },
            handleDelete(index,row){
                this.axios.post("/user/deleteToBe",row).then(resp=>{
                    console.log(resp)
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getToBeShop()
                        }
                    });
                })
            },
            handleEdit(index,row){
                this.axios.post("/user/agreeToBe",row).then(resp=>{
                    console.log(resp)
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getToBeShop()
                        }
                    });
                })
            },

            getToBeShop(){
                this.axios.get("/user/getToBeShop").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total=resp.data.data.length
                })
            }


        },
        created() {
            this.getToBeShop()
        }
    }
</script>

<style scoped>

</style>