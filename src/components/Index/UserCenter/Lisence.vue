<template>
    <div>
        <div v-if="isShow">
            <el-form label-position="left"   label-width="80px" size="mini">
                <el-form-item label="驾照号" style="width: 400px" prop="telNumber">
                    <el-input v-model="LicenseId"></el-input>
                </el-form-item>
                <el-form-item label="地址" style="width: 400px">
                    <el-upload
                            class="upload-demo"
                            action="' '"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-change="change"
                            list-type="picture-card"
                            :auto-upload="false"
                            :show-file-list="true"
                            :limit="1">
                    </el-upload>
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="!isShow">
            <el-form label-position="left"   label-width="80px" size="mini">
                <el-form-item label="驾照号" style="width: 400px" prop="telNumber">
                    <el-badge :value="status!==1? '审核暂未通过':'审核已通过'" class="item" :type="status===1? 'primary':'warning'">
                        <el-input v-model="LicenseId" :disabled="true"></el-input>
                    </el-badge>
                </el-form-item>
                <el-form-item label="驾照" style="width: 400px">
                    <el-image
                            style="width: 400px; height: 300px"
                            :src="imageUrl"
                           ></el-image>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Lisence",
        inject:['reload'],
        data() {
            return {
                status:0,
                isShow:true,
                LicenseId:'',
                fileList: [],
                picBase:'',
                imageUrl:''
            };
        },
        methods: {
            submit() {
                const that=this
                this.axios.post("/user/addLicense",{
                    LicenseId:that.LicenseId,
                    licensePic:that.picBase
                }).then(
                    resp=>{
                        console.log(resp)
                        this.reload()
                    }
                )
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            change(file){
                console.log(file)
                const image={
                    name:file.name,
                    url:file.url
                }
                this.fileList.unshift(image)
                console.log(this.fileList)
                console.log('base64')
                const reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                    const _base64 = reader.result
                    this.picBase=_base64
                    console.log(this.picBase)
                }
            },
            getLisence(){
                this.axios.get("/user/getLicense").then(
                    resp=>{
                        console.log(resp)
                        this.isShow=(resp.data.data.lid===null)
                        this.LicenseId=resp.data.data.licenseId
                        this.status=resp.data.data.status
                        this.imageUrl=resp.data.data.licensePic
                    }
                )
            }
        },
        created() {
            this.getLisence()
        }
    }
</script>

<style scoped>

</style>