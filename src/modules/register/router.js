import Vue from 'vue'

import Router from 'vue-router'
/*药师端*/

import BasicInfor from '../../components/BasicInfor.vue' //填写基本信息

import RegisterProtocol from '../../components/RegisterProtocol.vue'

//2.调用vue-router
Vue.use(Router);

//3.创建vue-router实例
const router=new Router({
    routes: [
        {
          path: '/',component: BasicInfor,name:"home"
        },
        {
          path: '/basicInfor',name:"home",component: BasicInfor,meta: { title: '上传信息',keepAlive:true,isBack:false} 
        },
        //申请融资
        {
          path: '/registerProtocol',name:"registerProtocol",component: RegisterProtocol,meta: { title: '注册协议',keepAlive:true,isBack:false} 
        },
    ]
});

router.beforeEach((to, form, next) => { /*路由变化修改title*/
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});
export default router;