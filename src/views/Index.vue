<template>
    <el-container>
        <el-container>
           <IndexHeader/>
            <el-main style="height: 500px"><router-view></router-view></el-main>
            <el-footer class="myFooter" style="height: 150px">
                <div>
                    <div style="margin-left: 330px;margin-top: 20px">
                        <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >邮箱: 2903573860@qq.com</div>
                        <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >邮编: 410000</div>
                        <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >地址: 湖南省长沙市</div>
                        <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));float: left" >网站标识码: hncs785415</div>
                    </div><br/>
                    <div style="margin-left: 320px;margin-top: 20px;float: left">
                        <div style="color: white;font-size: 12px;  transform: scale(calc(10 / 12));" >Copyright © 2022 web_cnblogs<br/>
                            Powered by .NET 6 on Kubernetes</div>
                    </div>
                    <div>
                        <div>
                        <el-image :src="qq" style="width: 5%"></el-image>&emsp;
                            <el-image :src="wechat" style="width: 5.4%"></el-image>
                        </div>
                    </div>
                </div>
            </el-footer>
        </el-container>

    </el-container>
</template>

<script>
    import qq from '../assets/qq.jpg';
    import wechat from '../assets/wechat.jpg';
    import IndexHeader from "../components/Index/IndexHeader";
    export default {
        name: "Index",
        data(){
            return{
                qq:qq,
                wechat:wechat,
            }
        },
        components:{
            IndexHeader
        }
    }
</script>

<style scoped>
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;

    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .myFooter{
        margin: 0px;
        padding: 0px;
        background-color: #121C27;
    }
</style>