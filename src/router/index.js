import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import DepartmentEdit from '../views/DepartmentEdit.vue'
import DepartmentList from '../views/DepartmentList.vue'
import DoctorEdit from '../views/DoctorEdit.vue'
import DoctorList from '../views/DoctorList.vue'
import DoctorDetail from '../views/DoctorDetail.vue'
import DutyList from '../views/DutyList.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/main',
        component: Main,
        children: [{
                path: '/depart/create',
                component: DepartmentEdit
            },
            {
                path: '/depart/edit/:id',
                component: DepartmentEdit,
                // 跳转到同一个页面，把id注入到同一个页面
                props: true
            },
            {
                path: '/depart/list',
                component: DepartmentList
            },

            {

                path: '/doctor/create',
                component: DoctorEdit
            },
            {
                path: '/doctor/edit/:id',
                component: DoctorEdit,
                // 跳转到同一个页面，把id注入到同一个页面
                props: true
            },
            {
                path: '/doctor/list',
                component: DoctorList
            },
            {
                path: '/doctor/detail',
                component: DoctorDetail
            },
            {
                path: '/duty/list',
                component: DutyList
            }
        ]
    },
    {

        path: '/login',
        component: Login
    }

]
const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    if (!window.sessionStorage.getItem('token'))
        return next('/login')
    next()
})
export default router