import Vue from 'vue'
import Router from 'vue-router'
import PayList from '../components/PayList'
import ExamList from "../components/ExamList";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PayList',
      component: PayList
    },
    {
      path: '/examList',
      name: 'ExamList',
      component: ExamList
    }
  ]
})
