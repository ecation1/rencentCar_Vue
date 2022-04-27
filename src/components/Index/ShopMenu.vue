<template>
    <div>
        <div class="side-Shop">
            <div class="block" style="width:180px;margin-left: 10px">
                <strong>汽车类型</strong>
                <div style="margin-top: 5px">
                    <el-checkbox-group v-model="vid" size="mini"  :max="1" @change="getvid">
                        <el-checkbox-button  style="margin-left: 1px;margin-right: 1px;" v-for="item in carver" :label="item.vid" :key="item.vid" >

                            {{item.verName}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <el-divider></el-divider>
                <strong>价格区间</strong>
                <el-slider
                        v-model="value"
                        range
                        show-stops
                        :min="100"
                        :max="1000"
                        :marks="marks"
                        @change="getPrice">
                </el-slider>
            </div>
        </div>

        <div class="main-Shop">
            <el-row>
                <el-col :span="8" v-for="item in CarList" :key="item.id">
<!--                    <el-card :body-style="{ padding: '0px' }" style="width: 150px;height:180px;margin-left: 15px;margin-right: 15px;margin-top: 5px">-->
<!--                        <img :src=item.carPic class="image" @click="openPic(item.carPic)">-->
<!--                        <div style="padding: 14px;">-->
<!--                            <span>{{item.brandName}}</span><br/>-->
<!--                            <span>日租:{{item.price}}</span>-->
<!--                                <el-button  type="primary" @click="getCarInfo(item)" size="mini">查看详情</el-button>-->

<!--                        </div>-->
<!--                    </el-card>-->
                    <SfProductCard
                            :image="item.carPic"
                            @click="openPic(item.carPic)"
                            :imageWidth="400"
                            :imageHeight="326"
                            badgeLabel=""
                            badgeColor=""
                            :title="item.brandName+'-'+item.name"
                            linkTag=""
                            :reviewsCount="7"
                            :maxRating="5"
                            :badgeLabel="item.price.toString()"
                            showAddToCartButton
                            @click:add-to-cart="getCarInfo(item)"
                            style="width: 850px;height:180px;margin-left: 15px;margin-right: 15px;margin-top: 5px"
                    />
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="PicVisible"
                width="50%"
        >
            <el-image :src="imageUrl"></el-image>
        </el-dialog>
    </div>
</template>

<script>
    import {
        SfBadge,
        SfButton,
        SfProductCard,
        SfIcon,
    } from "@storefront-ui/vue";
    import pubsub from 'pubsub-js'
    export default {
        name: "ShopMenu",
        data() {
            return {
                vid:[null],
                rvid:null,
                minPrice:0,
                maxPrice:1000,
                carver:[
                    {
                        vid:'2b50e929-f280-42d4-aad9-9295be8b188a',
                        verName:'微型汽车'
                    },
                    {
                        vid:'988053af-dad2-4b3a-800f-ace68a752eb8',
                        verName:'小型汽车'
                    },
                    {
                        vid:'fb21a123-865b-4da5-9a37-798fc772d149',
                        verName:'中型汽车'
                    },
                    {
                        vid:'62e1c3d7-e377-4868-b4f9-7eb967e7a02d',
                        verName:'大型汽车'
                    },
                    {
                        vid:null,
                        verName:'空白选项'
                    },
                ],
                value:[100,1000],
                marks: {
                    100: '100',
                    300: '300',
                    500: {
                        style: {
                            color: '#1989FA'
                        },
                        label: this.$createElement('strong', '500')
                    },
                    800: "800"

                },
                CarList:[],
                imageUrl:'',
                PicVisible:false
            };
        },
        components:{
            SfButton,
            SfProductCard,
            SfIcon,
            SfBadge
        },
        methods:{
            getCarList(){
                this.axios.post("/car/getCarMenu",{}).then(resp=>{
                    console.log(resp)
                    this.CarList=resp.data.data
                })
            },
            getCarInfo(item){
                console.log(item)
                this.$store.commit("SetCid",item.cid)
                this.$router.push("/index/carInfo")
            },
            openPic(url){
                this.PicVisible=true
                this.imageUrl=url
            },
            getPrice(val){
                this.minPrice=val[0]
                this.maxPrice=val[1]
                this.axios.post("/car/getCarMenu",{
                    minPrice:val[0],
                    maxPrice:val[1],
                    vid:this.rvid
                }).then(resp=>{
                    console.log(resp)
                    this.CarList=resp.data.data
                })
            },
            getvid(val){
                this.rvid=val[0]
                if(val[0]===undefined){
                    this.rvid=null
                }
                this.axios.post("/car/getCarMenu",{
                    minPrice:this.minPrice,
                    maxPrice:this.maxPrice,
                    vid:this.rvid
                }).then(resp=>{
                    console.log(resp)
                    this.CarList=resp.data.data
                })
            }
        },
        created() {
            this.getCarList()
        },

    }
</script>

<style scoped>
    .side-Shop{
        background-color: white;
        height: 400px;
        width: 200px;
        float: left;
    }
    .main-Shop{
        margin-left: 215px;
        height: 500px;
        width: 950px;
        overflow:scroll
    }
    .image {
        width: 100%;
        display: block;
    }
    .button {
        padding: 0;
        float: right;
    }

</style>