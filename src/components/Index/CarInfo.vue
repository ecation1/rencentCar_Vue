<template>
    <div>
        <div>
        <el-steps :active="active" finish-status="success" :space="400" :align-center="true">
            <el-step title="选车"></el-step>
            <el-step title="套餐详情"></el-step>
            <el-step title="订单详情"></el-step>
        </el-steps>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name: "CarInfo",
        data(){
            return{
                active:1,
            }
        },
        created() {
            pubsub.subscribe("index",(msg,data)=>{
                this.active=data
                console.log(data)
            })
        }
    }
</script>

<style scoped>

</style>