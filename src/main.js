// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {
	Container,
	Header,
	Footer,
	Aside,
	Main,
	Form,
	FormItem,
	Input,
	Button
} from 'element-ui';
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})