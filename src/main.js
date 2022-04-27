import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "@storefront-ui/vue/styles.scss"
import axios from "./axios"
import VueAxios from "vue-axios";
Vue.use(VueAxios,axios)
Vue.config.productionTip = false
import 'leaflet/dist/leaflet.css';
import coordtransform from 'coordtransform'
Vue.prototype.coordtransform = coordtransform

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
