<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*6,currentPage*6)"
                style="width: 100%">

            <el-table-column
                    width="150px"
                    label="商家"
                    prop="username">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="汽车牌照"
                    prop="carid">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="行驶证"
            >
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.lisenPic"
                            @click="openPic(scope.row.lisenPic)"
                    ></el-image>
                </template>
            </el-table-column>


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
                    label="汽车型号"
                    prop="verName">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="汽车品牌"
                    prop="brandName">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="日租价格"
                    prop="price">
            </el-table-column>

            <el-table-column
                    width="150px"
                    label="押金"
                    prop="deposit">
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
                                    slot="reference"
                            >通过</el-button>
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
        name: "CarMenu_Admin",
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
                this.axios.post("/car/accessCar",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getCar()
                        }
                    });
                })
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.axios.post("/car/deleteCar",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getCar()
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

            getCar(){
                this.axios.get("/car/getToBeCar").then(resp=>{
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
            this.getCar()
        }
    }
</script>

<style scoped>

</style>

