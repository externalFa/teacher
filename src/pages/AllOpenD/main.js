import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()

export default {
  config:{
    navigationBarBackgroundColor: '#ffab02',
    navigationBarTitleText:'开放日列表',
  }
}