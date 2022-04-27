<template>
    <div  style="height: 430px;background-color:wheat;width: 800px;margin-left: 200px">
        <div style="width: 800px;height: 50px;vertical-align:middle">
            <el-icon class="el-icon-phone" style="height: 150%;"/><strong style="line-height: 50px">在线客服</strong>
            <div style="margin-top: -60px;background-color: black" ><el-divider></el-divider></div>
        </div>
        <div>
            <el-input
                    id="content"
                    type="textarea"
                    v-model="content"
                    readonly="readonly"
                    :rows="15"
                   style="
                    background-color: white">
            </el-input>
        </div>
        <div style="margin-top: 5px;width: 600px;margin-left:5px;float: left">
            <el-input v-model="message" placeholder="请输入消息" ></el-input>
        </div>
        <div style="margin-top: 5px">
            <el-button type="button" @click="sendMsg()">发送消息</el-button>
        </div>


<!--        <button type="button" @click="sendMsg()">发送消息</button>-->

    </div>
</template>
<script>
    export default {
        name: 'Comm',
        data() {
            return {
                url: 'ws://'+ window.location.host + '/Room/',
                ws: null,
                user: '',
                message: '',
                content: '',
            }
        },
        created(){
        },
        methods: {
            async joinRoom(){
                if(this.ws) {
                    alert("你已经再聊天室");
                    return;
                }
                let url = this.url;
                let username = this.user;
                this.ws = new WebSocket('ws://127.0.0.1:8081/chatWebSocket/Room/' + sessionStorage.getItem("username"));  // 后端的启动端口
                this.ws.onopen = this.webscoketonopen;
                this.ws.onmessage =  this.webscoketonmessage;
                //发生错误触发
                this.ws.onerror = function () {
                    console.log("连接错误")
                };
                //正常关闭触发
                this.ws.onclose = function () {
                    console.log("连接关闭");
                };
            },
            webscoketonopen(){
                console.log("与服务器成功建立连接");
            },
            webscoketonmessage(value){
                console.log(value);
                this.content += (value.data + '\r\n') ;
            },
            exitRoom(){
                this.closeWebSocket();
            },
            sendMsg(){
                if(!this.ws) {
                    alert('你已经掉线，请重新加入');
                    return;
                }
                if(this.ws.readyState === 1){
                    this.ws.send(this.message);
                    this.message = '';
                } else {
                    alert('发送失败');
                }
            },
            closeWebSocket(){
                if(this.ws) {
                    this.ws.close();
                    this.ws = null;
                }
            },
            talking(content) {
                console.log(content);
            },
            test(){
                this.axios.post("/user/userless").then(resp=>{

                })
            },
        },
        created(){
            this.test()
            this.joinRoom()
        },
        beforeDestroy() {
            this.exitRoom()
        }
    }
</script>
<style>
    .roomStyle{
        text-align: center;
        background-color: rgba(15, 161, 230, 0.35);
        margin: 0 auto;
        border: 1px solid #000;
        width: 600px;
        height: 200px
    }
</style>