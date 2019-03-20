import Vue from 'vue'

import Router from 'vue-router'
/*药师端*/

import IndexHome from '../../components/IndexHome.vue' //登录模块

import FinancingApply from '../../components/FinancingApply.vue' //申请融资模块

import FinancingRcord from '../../components/FinancingRcord.vue' // 融资纪录列表

import Protocol from '../../components/Protocol.vue' //查看服务协议


//2.调用vue-router
Vue.use(Router);

//3.创建vue-router实例
const router=new Router({
    routes: [
        {
          path: '/',component: IndexHome,name:"home"
        },
        {
          path: '/home',name:"home",component: IndexHome,meta: { title: '首页',keepAlive:true,isBack:false} 
        },
        //申请融资
        {
          path: '/financingApply',name:"financingApply",component: FinancingApply,meta: { title: '申请融资',keepAlive:true,isBack:false} 
        },
        //查看服务协议
        {
          path: '/financingRcord',name:"financingRcord",component: FinancingRcord,meta: { title: '融资记录',keepAlive:false,isBack:false} 
        },
        //查看服务协议
        {
          path: '/protocol',name:"protocol",component: Protocol,meta: { title: '服务协议',keepAlive:true,isBack:false} 
        }

    ]
});

router.beforeEach((to, form, next) => { /*路由变化修改title*/
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});
export default router;