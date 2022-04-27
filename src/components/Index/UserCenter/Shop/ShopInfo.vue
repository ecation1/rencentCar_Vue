<template>
    <div style="width: 700px;margin-left: 100px">
        <el-form label-position="left" :model="shopInfoForm" status-icon :rules="FormRules" ref="shopInfoForm" label-width="80px" size="mini">

            <el-form-item label="商店名称" style="width: 400px" prop="shopName">
                <el-input v-model="shopInfoForm.shopName"></el-input>
            </el-form-item>
            <el-form-item label="商店地址" style="width: 400px" prop="address">
                <el-input v-model="shopInfoForm.address" :disabled="!isShow"></el-input>
            </el-form-item>
            <el-form-item label="地址" style="width: 400px" prop="address" v-if="isShow">
                <template >
                    <el-cascader
                            v-model="value"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChange"></el-cascader>
                </template>
            </el-form-item>

            <el-form-item label="详细名称" style="width: 400px" prop="detail">
                <el-input v-model="shopInfoForm.detail"></el-input>
            </el-form-item>
            <el-form-item label="横坐标" style="width: 400px" prop="lat" v-if="isShow">
                <el-input v-model="shopInfoForm.lat" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="纵坐标" style="width: 400px" prop="lng" v-if="isShow">
                <el-input v-model="shopInfoForm.lng" :disabled="true"></el-input>
            </el-form-item>
                <div style="width: 500px;height: 300px" v-if="isShow">
                    <l-map style="width: 100%;" :zoom="zoom" :center="center" @click="getMap">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-marker :lat-lng="marker">
                            <l-popup :content="text"></l-popup>
                        </l-marker>
                    </l-map>
                </div>

        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="onSubmit('shopInfoForm')">保存</el-button>
            <el-button type="primary" size="mini" @click="test('shopInfoForm')">测试</el-button>
        </div>

    </div>
</template>

<script>
    import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
    export default {
        name: "ShopInfo",
        components:{
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        },
        data(){
            var CheckShopName=(rule,value,callback)=>{
                var nameReg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                console.log(value)
                if(nameReg.test(value)){
                    return callback();
                }else {
                    callback(new Error("格式错误"))
                }
            }
            return{
                zoom: 14,
                center: L.latLng(28.19, 112.98),
                url:'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
                attribution: "长沙市",
                marker: L.latLng(28.19, 112.98),
                text: 'this is a marker',

                isShow:true,
                shopInfoForm:{},
                value: [],
                FormRules:{
                    shopName:[
                        {required:true,message:"请输入商店名称",trigger:'blur'},
                        {validator:CheckShopName,trigger: 'blur'}
                    ],
                    address:[
                        {required:true,message:"请输入商店名称",trigger:'blur'}
                    ],
                    detail:[
                        {required:true,message:"请输入商店名称",trigger:'blur'},
                        {validator:CheckShopName,trigger: 'blur'}
                    ],
                    lat:[
                        {required:true,message:"请点击坐标",trigger:'blur'},
                    ],
                    lng:[
                        {required:true,message:"请点击坐标",trigger:'blur'},
                    ]
                },
                options: [{
                    value: '芙蓉区',
                    label: '芙蓉区',
                    children: [{
                        value: '望月湖街道',
                        label: '望月湖街道',
                    }, {
                        value: '岳麓街道',
                        label: '岳麓街道',
                    },{
                        value: "桔子洲街道",
                        label: "桔子洲街道"
                    },{
                        value: "银盆岭街道",
                        label: "银盆岭街道"
                    },]
                },
                    {
                    value: '开福区',
                    label: '开福区',
                    children: [{
                        value: '芙蓉北路街道',
                        label: '芙蓉北路街道',
                    }, {
                        value: '东风路街道',
                        label: '东风路街道',
                    }, {
                        value: '清水塘街道',
                        label: '清水塘街道',
                    }, {
                        value: '洪山街道',
                        label: '洪山街道',
                    }, {
                        value: '浏阳河街道',
                        label: '浏阳河街道',
                    }, {
                        value: '月湖街道',
                        label: '月湖街道',
                    }]
                },
                    {
                        value: '雨花区',
                        label: '雨花区',
                        children: [
                            {
                                value: '侯家塘街道',
                                label: '侯家塘街道',
                            },
                            {
                                value: '左家塘街道',
                                label: '左家塘街道',
                            },
                            {
                                value: '圭塘街道',
                                label: '圭塘街道',
                            },
                            {
                                value: '砂子塘街道',
                                label: '砂子塘街道',
                            },
                            {
                                value: '东塘街道',
                                label: '东塘街道',
                            },
                        ]
                    },

                    {
                        value: '长沙县',
                        label: '长沙县',
                        children: [
                            {
                                value: '星沙街道',
                                label: '星沙街道',
                            },
                            {
                                value: '泉塘街道',
                                label: '泉塘街道',
                            },
                            {
                                value: '湘龙街道',
                                label: '湘龙街道',
                            },
                            {
                                value: '榔梨街道',
                                label: '榔梨街道',
                            },
                            {
                                value: '长龙街道',
                                label: '长龙街道',
                            },
                        ]
                    },
                ]
            }
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid=> {
                    if (valid) {
                        console.log(this.shopInfoForm)
                        this.axios.post("/shop/setShopInfo",this.shopInfoForm).then(resp=>{
                            this.$message({
                                showClose:true,
                                message:resp.data.msg,
                                type:"success",
                                onClose:()=>{
                                    this.getShopInfo()
                                }
                            });
                        })
                    } else {
                        console.log("提交错误");
                        return false;
                    }
                }))
                },
            handleChange(value) {
                console.log(value.toString());
                var i,str=''
                for (i=0;i<value.length;i++){
                    str=str.concat(value[i])
                }
               this.shopInfoForm.address=str
            },
            getShopInfo(){
                this.axios.get("/shop/getShopInfo").then(resp=>{
                    console.log(resp)
                    this.shopInfoForm=resp.data.data
                    this.isShow=(resp.data.data.address==="")
                })
            },
            getMap(val){
                console.log(val.latlng)
                this.shopInfoForm.lat=val.latlng.lat
                this.shopInfoForm.lng=val.latlng.lng
            },
            test(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        console.log(this.shopInfoForm)
                    }else {
                        console.log("提交错误");
                        return false;
                    }
                }))
            },
            change(){
                var marker=this.coordtransform.gcj02towgs84(28.228424670718326, 112.9368966252899);
                this.marker=marker
                this.center=marker
            }
        },
        created() {
            this.change()
            this.getShopInfo()
        }
    }
</script>

<style scoped>

</style>