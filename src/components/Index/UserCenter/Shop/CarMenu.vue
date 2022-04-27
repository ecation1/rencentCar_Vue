<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.brandName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*6,currentPage*6)"
                style="width: 100%"
                size="mini">
            <el-table-column
                    width="100px"
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
                    width="120px"
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
                    width="80px"
                    label="汽车型号"
                    prop="verName">
            </el-table-column>

            <el-table-column
                    width="80px"
                    label="汽车名"
                    prop="name">
            </el-table-column>

            <el-table-column
                    width="80px"
                    label="汽车品牌"
                    prop="brandName">
            </el-table-column>

            <el-table-column
                    width="90px"
                    label="日租价格"
                    prop="price">
            </el-table-column>

            <el-table-column
                    width="90px"
                    label="押金"
                    prop="deposit">
            </el-table-column>

            <el-table-column
                    width="90px"
                    label="年检时间"
                    prop="aiTime">
            </el-table-column>

            <el-table-column
                    width="90px"
                    label="保养时间"
                    prop="keepTime">
            </el-table-column>

            <el-table-column
                    width="90px"
                    label="状态"
                    prop="status">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status !== 0 ? 'success' : 'danger'"
                            disable-transitions>{{scope.row.status!== 0?'正常':'暂未过审'}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-button size="mini" type="primary" @click="addCar">新增</el-button>
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

            <el-form :model="editForm" :rules="editFormRules" ref="editForm" size="mini">
                <el-form-item label="汽车牌照" prop="carid" label-width="100px" >
                    <el-input v-model="editForm.carid" autocomplete="off" :disabled="!method"></el-input>
                </el-form-item>

                <el-form-item label="汽车名" prop="name" label-width="100px" >
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="汽车外观" prop="carPic" label-width="100px" v-if="method">
                    <el-upload
                            class="upload-demo"
                            action="' '"
                            :on-change="changeCarPic"
                            list-type="picture-card"
                            :auto-upload="false"
                            :show-file-list="true"
                            :limit="1">
                    </el-upload>
                </el-form-item>
                <el-form-item label="行驶证" prop="lisenPic" label-width="100px" v-if="method">
                    <el-upload
                            class="upload-demo"
                            action="' '"
                            :on-change="changelisenPic"
                            list-type="picture-card"
                            :auto-upload="false"
                            :show-file-list="true"
                            :limit="1">
                    </el-upload>
                </el-form-item>

                <el-form-item label="日租价格" prop="price" label-width="100px" >
                    <el-input type="number" v-model="editForm.price" autocomplete="off" :disable="!method"></el-input>
                </el-form-item>

                <el-form-item label="押金" prop="deposit" label-width="100px" >
                    <el-input type="number" v-model="editForm.deposit" autocomplete="off" :disable="!method"></el-input>
                </el-form-item>
                <el-form-item label="年检时间" prop="aiTime" label-width="100px">
                    <el-date-picker
                            v-model="editForm.aiTime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="保养时间" prop="keepTime" label-width="100px">
                    <el-date-picker
                            v-model="editForm.keepTime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="汽车类型" prop="bid" label-width="100px" >
                    <el-select  v-model="editForm.bid" placeholder="请选择">
                        <el-option
                                v-for="item in brand"
                                :key="item.bid"
                                :label="item.brandName"
                                :value="item.bid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="汽车品牌" prop="vid" label-width="100px" >
                    <el-select v-model="editForm.vid" placeholder="请选择">
                        <el-option
                                v-for="item in carver"
                                :key="item.version"
                                :label="item.verName"
                                :value="item.vid">
                        </el-option>
                    </el-select>
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
        name: "Brand_Admin",
        data() {
            var CheckCarId=(rule,value,callback)=>{
                var CarIdReg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;;
                console.log(value)
                if(CarIdReg.test(value)){
                    return callback();
                }else {
                    callback(new Error("格式错误"))
                }
            }
            return {
                method:true,//用户名输入是否禁用
                dialogVisible:false,//编辑窗口是否显示
                PicVisible:false,
                total:0,
                currentPage:1,
                search:'',
                tableData: [],
                editForm:{},
                method:false,
                imageUrl:'',
                brand:[],
                carver:[],
                editFormRules: {
                    carid: [
                        {required: true, message: '请输入车辆牌照', trigger: 'blur'},
                        {validator:CheckCarId,trigger: 'blur'}
                    ],
                    bid:[
                        {required: true, message: '请选择汽车品牌', trigger: 'blur'},
                    ],
                    vid:[
                        {required: true, message: '请选择汽车版本', trigger: 'blur'},
                    ],
                    price:[
                        {required: true, message: '请输入日租价格', trigger: 'blur'},
                    ],
                    deposit:[
                        {required: true, message: '请输入押金价格', trigger: 'blur'},
                    ],
                    name:[
                        {required: true, message: '请输入汽车名称', trigger: 'blur'},
                    ],
                    aiTime:[
                        {required: true, message: '请选择上一次保养时间', trigger: 'blur'},
                    ],
                    keepTime:[
                        {required: true, message: '请选择上一次年检时间', trigger: 'blur'},
                    ]
                },
            }
        },
        methods: {
            addCar(){
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
                this.axios.post("/car/deleteCar",row).then(resp=>{
                    this.$message({
                        showClose:true,
                        message:resp.data.msg,
                        type:"success",
                        onClose:()=>{
                            this.getMyCar()
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
                    }
                }))
            },
            changeCarPic(file){
                const reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                    const _base64 = reader.result
                    this.editForm.carPic=_base64
                    console.log(this.editForm.carPic)
                }
            },
            changelisenPic(file){
                console.log(file)
                const reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                    const _base64 = reader.result
                    this.editForm.lisenPic=_base64
                    console.log(this.editForm.lisenPic)
                }
            },

            getBrand(){
                this.axios.get("/brand/getBrand").then(resp=>{
                    console.log(resp)
                    this.brand=resp.data.data
                })
            },
            getCarver(){
                this.axios.get("/brand/getCarver").then(resp=>{
                    console.log(resp)
                    this.carver=resp.data.data
                })
            },
            getMyCar(){
                this.axios.get("/car/getMyCar").then(resp=>{
                    console.log(resp)
                    this.tableData=resp.data.data
                    this.total=resp.data.data.length
                })
            },
            //查看图片
            openPic(imageUrl){
                console.log(imageUrl)
                this.imageUrl=imageUrl
                this.PicVisible=true
            },
            getShopInfo(){
                this.axios.get("/shop/getShopInfo").then(resp=>{
                    console.log("address",resp.data.data.address)
                    if(resp.data.data.address===''){
                        this.$message.error("请完善商店信息")
                        this.$router.push("/index/userCenter/shopInfo")
                    }
                })
            },
            //用户更新提交
            submitForm(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        if(this.method===false){
                            this.axios.post("/car/updateCar",this.editForm).then(resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose:true,
                                        message:"更新成功",
                                        type:"success",
                                        onClose:()=>{
                                            this.resetForm('editForm')
                                            this.getMyCar()
                                        }
                                    });
                                    this.dialogVisible=false
                                },
                                () => {},
                                () => {}
                            )
                        }else if(this.method===true){
                            this.axios.post("/car/addToBeCar",this.editForm).then(
                                resp=>{
                                    console.log(resp)
                                    this.$message({
                                        showClose:true,
                                        message:"添加成功",
                                        type:"success",
                                        onClose:()=>{
                                            this.getMyCar()
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
            this.getShopInfo()
            this.getMyCar()
            this.getBrand()
            this.getCarver()
        }
    }
</script>

<style scoped>

</style>
