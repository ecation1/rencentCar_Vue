<template>
    <div style="height: 600px">
        <el-dialog
                title="支付宝扫码支付"
                :visible.sync="dialogVisible"
                width="252px"
                center>
            <!--二维码生成-->
            <vueQr :text="text" :size="200" :margin="10" :correctLevel="0" :whiteMargin="false" ></vueQr>
            <span id="dialogSpan" v-show="paySucc == true"></span>
            <span id="dialogSpan2" v-show="paySucc == true">
        <i class="el-icon-success" style="background-color: #FFFFFF; color:#67C23A; font-size: 60px;border-radius: 30px;"/>
        <br/>
        支付成功
      </span>
        </el-dialog>
        <div class="left_div">
            <div style="text-align: left;margin-top: 5px">&emsp;<span style="color: #2B9FFF;font-size: 18px;font-family: 黑体">驾驶人信息</span><span style="font-size: 10px;color: #93939E">驾驶员姓名须与驾照、护照拼音/英文一致</span></div>
            <div style="margin-top: -15px"><el-divider></el-divider></div>
            <div style="margin-left: 30px">
                <el-form ref="userInfoForm" :model="userInfoForm" :rules="userInfoRules" label-width="80px" class="login-box" size="mini">
                    <el-form-item label="真实姓名" prop="name" style="width: 400px">
                        <el-input type="text" placeholder="请输入真实姓名" v-model="userInfoForm.name"/>
                    </el-form-item>
                    <el-form-item label="身份证号码"  prop="id" style="width: 400px">
                        <el-input v-model="userInfoForm.id" placeholder="请输入身份证" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码"  prop="telNumber" style="width: 400px">
                        <el-input v-model="userInfoForm.telNumber" placeholder="请输入身份证" type="text"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="onSubmit('userInfoForm')">下单</el-button>
<!--                        <el-button type="primary" v-on:click="test('userInfoForm')">测试</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="right_div">
            <el-descriptions title="套餐信息" :column="1" border size="mini">
                <el-descriptions-item label=""  :label-style="{
                    // 'font-size': '20px'
                }">
                    <img :src="carinfo.carPic" style="width: 40%">

                </el-descriptions-item>
                <el-descriptions-item label="取车地点">{{carinfo.address}}{{carinfo.detail}}</el-descriptions-item>
                <el-descriptions-item label="换车地点">{{carinfo.address}}{{carinfo.detail}}</el-descriptions-item>
                <el-descriptions-item label="联系电话">
                    {{carinfo.telNumber}}
                </el-descriptions-item>
                <el-descriptions-item label="总价"><span style="font-size: 20px;color: orange">{{allPrice}}</span></el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
    import pubsub from "pubsub-js";
    import vueQr from "vue-qr";

    export default {
        name: "OrderInfo_Buy",
        data(){

            var CheckID=(rule,value,callback)=>{
                var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                console.log(value)
                if(idcardReg.test(value)){
                    return callback();
                }else {
                    callback(new Error("身份证格式错误"))
                }
            }
            var CheckName=(rule,value,callback)=>{
                var nameReg = /^[\u4e00-\u9fa5]{2,4}$/;
                console.log(value)
                if(nameReg.test(value)){
                    return callback();
                }else {
                    callback(new Error("姓名错误"))
                }
            }
            var CheckTel= (rule, value, callback) =>{
                console.log(value)
                const regTel=/^1[3456789]\d{9}$/;
                if(regTel.test(value)||value===''){
                    return callback();
                }else {
                    callback(new Error("电话号码格式错误"))
                }
            }
            return{
                userinfo:{},
                lisence:{},
                dialogVisible: false,
                text: "",
                paySucc: false,
                allPrice:0,
                carinfo:{},
                userInfoForm:{},
                userInfoRules:{
                    telNumber:[
                        {required: true, message: '请填写身份证', trigger: 'blur' },
                        {validator:CheckTel, trigger:'blur'}
                    ],
                    id:[
                        {required: true, message: '请填写身份证', trigger: 'blur' },
                        {validator:CheckID, trigger:'blur'}
                    ],
                    name:[
                        {required: true, message: '请填写真实姓名', trigger: 'blur' },
                        {validator:CheckName,trigger: 'blur'}
                    ]
                },
            }
        },
        components: {
            vueQr
        },
        methods:{
            pay(object) {
                let _this = this;
                _this.paySucc = false;
                _this.dialogVisible = true;
                this.axios.post("/sandboxPay",object)
                    .then((response) => {
                        _this.text = response.data.data;
                        _this.dialogVisible = true;
                        //使用webSocket发送请求，下面会简单介绍websocket使用
                        if ("WebSocket" in window) {
                            // 打开一个 web socket
                            var ws = new WebSocket("ws://localhost:8081/bindingRecord");

                            ws.onopen = function() {
                                // Web Socket 已连接上，使用 send() 方法发送数据
                                // ws.send("data");
                                // alert("数据发送中...");
                            };

                            ws.onmessage = function(evt) {
                                var received_msg = evt.data;
                                // alert("数据已接收..." + evt.data);
                                if (Boolean(evt.data)) {
                                    _this.paySucc = true;
                                    setTimeout(() => {
                                        _this.dialogVisible = false;
                                        _this.$router.push('/index/shopMenu')
                                    }, 5 * 1000);
                                }
                                ws.close();
                                //
                            };

                            ws.onclose = function() {
                                // // 关闭 websocket
                                console.log("连接已关闭...");
                            };
                        } else {
                            // 浏览器不支持 WebSocket
                            alert("您的浏览器不支持 WebSocket!");
                        }
                    }).catch((err) => {
                    console.log(err)
                })
            },
            back(dataUrl, id) {
                console.log(dataUrl, id)
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.userInfoForm.cid=this.carinfo.cid
                        this.userInfoForm.allPrice=this.allPrice
                        console.log(this.userInfoForm)
                        this.pay(this.userInfoForm)
                        // this.axios.post("/order/addOrder",this.userInfoForm).then(resp=>{
                        //     console.log(resp)
                        //     if(resp.data.code===200){
                        //         this.$message({
                        //             showClose:true,
                        //             message:resp.data.msg,
                        //             type:"success",
                        //             onClose:()=>{
                        //                 this.$router.push('/index/shopMenu')
                        //             }
                        //         });
                        //     }
                        //
                        //
                        // })

                    }else {
                        this.$message.error("数据格式错误");
                    }
                })
            },
            test(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        console.log(this.userInfoForm)
                    }else {
                        this.$message.error("数据格式错误");
                    }
                })
            },
            getCarInfo(){
                this.axios.post("/car/getCarMenu",{
                    cid:sessionStorage.getItem("cid")
                }).then(resp=>{
                    console.log(resp)
                    this.carinfo=resp.data.data[0]
                })
            },
            getUserInfo(){
                this.axios.get("/user/userInfo").then(resp=>{
                     this.userinfo=resp.data.data
                    console.log( this.userinfo)
                    if(this.userinfo.id===null){
                        this.$message.error("您暂未实名")
                        this.$router.push("/index/userCenter/personInfo")
                    }
                })
            },
            getLisence(){
                this.axios.get("/user/getLicense").then(
                    resp=>{
                        console.log(resp)
                        if(resp.data.data===null){
                            this.$message.error("您暂未验证驾照")
                            this.$router.push("/index/userCenter/lisence")
                        }else if (resp.data.data.lisenceId){
                            this.$message.error("您的驾照暂未通过验证")
                            this.$router.push("/index/userCenter/lisence")
                        }
                    }
                )
            }
        },
        created() {
            this.getUserInfo()
            this.getLisence()
            this.getCarInfo()
            pubsub.subscribe("days",(msg,data)=>{
                this.userInfoForm.days=data
            })
            pubsub.subscribe("allPrice",(msg,data)=>{
                console.log(data)
                this.allPrice=data
            })
        },
    }
</script>

<style scoped>
    .left_div{
        background-color: white;
        margin-top: 50px;
        margin-left: 60px;
        height: 350px;
        width: 700px;
        float: left;
    }
    .right_div{
        background-color: white;
        border-color: orange;
        margin-top: 50px;
        margin-right: 60px;
        border-style:solid; border-width:1px;
        height: 420px;
        width: 250px;
        float: right;
    }
    .my-label{
        font-size: 20px;
        background: #E1F3D8;
    }
    #dialogSpan{
        display: inline-block;
        width: 200px;
        height: 200px;
        position: absolute;
        top: 80px;
        right: 27px;
        opacity:0.9;
        background-color: #FFFFFF;
    }
    #dialogSpan2{
        display: inline-block;
        width: 100px;
        height: 100px;
        position: absolute;
        top: 124px;
        right: 80px;
        font-size: 20px;
        text-align: center;
    }
</style>