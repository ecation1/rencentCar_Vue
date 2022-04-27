<template>
    <div>
        <el-backtop :target="null" :visibility-height="0" @click="chat">
            <div
                    style="{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >
                <el-icon class="el-icon-phone"/>
            </div>
        </el-backtop>
        <el-carousel trigger="click" height="500px">
            <el-carousel-item v-for="item in advertList" :key="item.aid" >
                <el-image
                        :src="item.advertPic"
                        @click="jump(item.url)"
                ></el-image>
            </el-carousel-item>
        </el-carousel>

    </div>
</template>

<script>
    export default {
        name: "AdverIndex",
        data(){
            return{
                advertList:[]
            }
        },
        methods:{
            getAdvert(){
                this.axios.get("/advert/getAdvert").then(resp=>{
                    console.log(resp)
                    this.advertList=resp.data.data
                })
            },
            jump(url){
                console.log("jump")
                window.location.href="https://"+url
            },
            chat(){
                this.$router.push("/index/chat_User")
            }
        },
        created() {
            this.getAdvert()
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>