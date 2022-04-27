<template>
    <el-container>
        <el-aside width="200px"><SideMenu_UserCenter/></el-aside>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<script>
    import SideMenu_UserCenter from "./SideMenu_UserCenter";
    export default {
        name: "UserCenter",
        components:{
            SideMenu_UserCenter
        },
    }
</script>

<style scoped>

</style>