<template>
    <div style="height: 700px">

        <div class="left_div">
            <div style="margin-right: 550px;margin-top: 50px;">
                <el-image :src="carinfo.carPic" style="width: 90%"/><br/>
                <span>sss</span>
            </div>
            <div style="float: right;width: 500px;margin-right: 50px;margin-top: -100px;" >
                <el-descriptions :column="2">
                    <el-descriptions-item label="车名">{{carinfo.brandName}}  {{carinfo.verName}}</el-descriptions-item>
                    <el-descriptions-item label="商店"><el-tag size="small">{{carinfo.shopName}}</el-tag></el-descriptions-item>
                    <el-descriptions-item label="取车地点">{{carinfo.address}}{{carinfo.detail}}</el-descriptions-item>
                    <el-descriptions-item label="还车地点">{{carinfo.address}}{{carinfo.detail}}</el-descriptions-item>
                    <el-descriptions-item label="联系电话">{{carinfo.telNumber}}</el-descriptions-item>
                    <el-descriptions-item label="联系邮箱">{{carinfo.email}}</el-descriptions-item>
                    <el-descriptions-item label="保养时间">{{carinfo.keepTime}}</el-descriptions-item>
                    <el-descriptions-item label="年检时间">{{carinfo.aiTime}}</el-descriptions-item>
                </el-descriptions>
            </div>
            <div style="width: 400px;height: 200px;margin-top: 20px;margin-left: 149px">
                <strong>地图</strong>
                <l-map style="width: 100%;margin-top: 2px" :zoom="zoom" :center="center">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker :lat-lng="marker">
                        <l-popup :content="text"></l-popup>
                    </l-marker>
                </l-map>
            </div>
        <div style="margin-top: 60px">
             <el-divider content-position="left">评论区</el-divider>
            <div
                    v-for="item in comments"
                    :key="item.cmid"

            >
                <div style="margin-left: -700px">
                    <div ><el-avatar  :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
                    <div >
                        <span style="font-size: 10px">{{ item.username }}</span><br/>
                        <span style="font-size: 5px">{{ item.createTime}}</span>
                    </div>
                </div>
                <div style="margin-left: -365px;margin-top: -15px">
                    <el-rate
                            v-model="item.stars"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
                </div>
                <div style="margin-top: -25px">

                    <span>{{item.c_comment}}</span>
                </div>
                <el-divider></el-divider>
            </div>
        </div>
        </div>
        <div class="right_div">
            <el-descriptions title="费用明细" size="mini" :column="1" border>
                <el-descriptions-item label="日租">{{carinfo.price}}</el-descriptions-item>
                <el-descriptions-item label="押金(可退)">{{carinfo.deposit}}</el-descriptions-item>
                <el-descriptions-item label="租用日期"> <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number></el-descriptions-item>
                <el-descriptions-item label="其他服务费">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="20" name="1">
                            <div style="font-size: 5px"><el-input :disabled="true" size="mini" v-model="text"></el-input> </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-descriptions-item>
            </el-descriptions>
            <el-divider></el-divider>
            <div>
                <div>
                    <span style="font-size: 20px">总计:</span>
                    <span>{{allPrice}}</span>
                </div>
                <div>
                    <el-button type="primary" @click="addOrder">确认订单</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
    import pubsub from "pubsub-js";
    export default {
        name: "CarInfo_Buy",
        data(){
            return{
                zoom: 16,
                center: L.latLng(28.19, 112.98),
                url:'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
                attribution: "",
                marker: L.latLng(28.19, 112.98),
                text: '',

                carinfo:{},
                num:0,
                activeNames: ['1'],
                text:"手续费:20",
                allPrice:0,
                comments: [],
            }
        },
        components:{
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        },
        methods:{
            test(){
                this.axios.post("/user/userless").then(resp=>{

                })
            },
            handleChange(value){
                console.log(value)
            },
            addOrder(){
                pubsub.publish("days",this.num)
                pubsub.publish("allPrice",this.allPrice)
                pubsub.publish('index',3)
                this.$router.push("/index/carInfo/orderinfo_buy")
            },
            getCarInfo(){
                this.axios.post("/car/getCarMenu",{
                    cid:sessionStorage.getItem("cid")
                }).then(resp=>{
                    console.log(resp)
                    this.carinfo=resp.data.data[0]
                    this.getComm(this.carinfo.cid)
                    this.change(this.carinfo.lat,this.carinfo.lng)
                    this.text=this.carinfo.shopName
                    this.attribution=this.carinfo.shopName
                })
            },
            getComm(val){
                console.log(val)
                this.axios.post("/comm/getComm",{
                    cid:val
                }).then(resp=>{
                    console.log(resp)
                    this.comments=resp.data.data
                })
            },
            change(lat,lng){
                var marker=this.coordtransform.gcj02towgs84(lat, lng);
                this.marker=marker
                this.center=marker
            }
        },
        watch:{
            num:function (val) {
                this.allPrice=this.carinfo.price*this.num+this.carinfo.deposit
            },
            deep:true,
            immediate: false,
        },
        created() {
            this.test()
            this.getCarInfo()
        }
    }
</script>

<style  scoped>
    .left_div{

        margin-top: 50px;
        margin-left: 60px;
        height: 350px;
        width: 700px;
        float: left;
    }
    .right_div{
        margin-top: 50px;
        margin-right: 60px;

        height: 420px;
        width: 250px;
        float: right;
    }


</style>