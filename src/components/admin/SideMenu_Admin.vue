<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/admin/user" class="router-link"><el-menu-item index="1-1">用户展示</el-menu-item></router-link>
                    <router-link to="/admin/roles" class="router-link"><el-menu-item index="1-2">用户身份管理</el-menu-item></router-link>
                    <router-link to="/admin/licenrify" class="router-link"><el-menu-item index="1-3">用户驾照审核</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-shop"></i>
                    <span slot="title">商家管理</span>
                </template>

                <el-menu-item-group>
                    <router-link class="router-link" to="/admin/toBeShop"><el-menu-item index="2-1">商家审核</el-menu-item></router-link>
                    <router-link class="router-link" to="/admin/carList"><el-menu-item index="2-2">汽车审核</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span slot="title">其他</span>
                </template>

                <el-menu-item-group>
                    <router-link class="router-link" to="/admin/advertList"><el-menu-item index="3-1">更改封面</el-menu-item></router-link>
                    <router-link class="router-link" to="/admin/brand"><el-menu-item index="3-2">品牌管理</el-menu-item></router-link>
                    <router-link class="router-link" to="/admin/chat_Admin"><el-menu-item index="3-3">客户咨询</el-menu-item></router-link>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "SideMenu_Admin",
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>