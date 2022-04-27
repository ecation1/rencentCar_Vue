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
        name: "OverOrder",
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
            handleCurrentChange(val){
                this.currentPage = val;
            },
            getOrder(){
                this.axios.post("/order/getMyOrder",{
                    status:3
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

