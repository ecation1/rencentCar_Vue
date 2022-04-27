import axios from "axios";
import router from "./router";
import store from './store/index'
import Element from "element-ui"

axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

request.interceptors.request.use(config => {
    config.headers['satoken'] = localStorage.getItem("satoken")
    return config
})

request.interceptors.response.use(
    response => {

        console.log("response ->" + response)

        let res = response.data

        if (res.code === 200) {
            return response
        }else if(res.code===401){
            Element.Message.error(!res.msg ? '系统异常' : res.msg)
            store.commit("ResetToken")
            console.log(router.Location)
            router.push("/")
        }
        else {
            console.log(res)
            Element.Message.error(!res.msg ? '系统异常' : res.msg)
            return Promise.reject(response.data.msg)
        }
    },
    error => {

        console.log(error)

        if (error.response.data) {
            error.massage = error.response.data.msg
        }

        if (error.response.status === 401) {
            router.push("/")
        }

        Element.Message.error(error.massage, {duration: 3000})
        return Promise.reject(error)
    }
)

export default request