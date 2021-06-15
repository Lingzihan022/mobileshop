import { createRouter, createWebHistory } from 'vue-router'
// 导入路由 懒加载

const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')



// 3.创建路由对象,最好在[]里定义路由映射关系，然后在new Router里只放这个变量
const routes = [
    // 默认跳转到home首页
    {
        path: '/',
        redirect: '/home',

    }, {
        path: '/home',
        component: Home
        // component必须是组件 不能是字符串！
        , meta: {
            keepAlive: true,
        }
    }, {
        path: '/cart',
        component: Cart,
        meta: {
            keepAlive: true,
        }
    }, {
        path: '/profile',
        component: Profile,
        meta: {
            keepAlive: true,
        }
    }, {
        path: '/category',
        component: Category,
        meta: {
            keepAlive: true,
        }
    }
]
const router = new createRouter({
    routes,
    // mode: 'history'
    // 将哈希模式转为history模式
    history: createWebHistory(),//history为必填项
})
// 4.导出路由
export default router