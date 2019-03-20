<template>
    <div>
        <header>
            首页
            <span class="logout" @click="logout">退出</span>
        </header>
        <div class="banner">
            <img src="../assets/imgs/banner.jpg" alt="">
        </div>
        <div class="modules_list">
            <div class="financing financing_apply" @click="financingApply">
                <i class="iconfont icon-rongzi"></i>申请融资
            </div>
            <div class="financing financing_record"  @click="financingRecord">
                <i class="iconfont icon-financing-record"></i>融资记录
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'indexHome',
    data:function(){
        return {
            mobile:"13716242600"
        }        
    },
    props: {

    },
    methods:{
        financingRecord(){
            this.$router.push({
                path:"/financingRcord",
            }); 
        },
        financingApply(){
            this.$router.push({
                path:"/financingApply",
            }); 
        },
        logout(){
            //退出登录
            var _this=this;
            this.$layer.open({
                content: '确定要退出登录吗?',
                className:"popuo-login",
                btn: ['确认', '取消'],
                shade:true,
                yes(){
                    _this.$layer.open({type:2,content:"退出登录中...",shadeClose:false,});
                    _this.$axios({
                        method:'post',
                        url:_this.URLS.appLoginOut,
                    }).then(
                        (res)=> {
                            if(res.data.flag==0){
                                _this.$layer.closeAll();
                                _this.$layer.msg("退出成功",()=>{
                                     window.location.href="./login.html"
                                })
                            }else if(res.data.flag==1){
                                _this.$layer.msg("退出系统错误")
                            }
                        }
                    ).catch(
                        ()=> {
                            _this.$layer.msg("退出系统错误")
                        }
                    )
                },
            })
        }
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#f0f0f0;')
    },
}
</script>
<style scoped>
    header{
        padding:0 4vw; 
        height:45px;
        line-height:45px;
        text-align: center;
        background-color: #fff;
        color: #333;
        font-size: 18px;
        position: relative;
    }
    .logout{
        float: right;
        position: absolute;
        right: 4vw;
        font-size: 15px;
    }
    .banner img {
        width: 100vw
    }
    .modules_list {
        background-color: #fff;
        padding: 10px 0 50px;
        margin-top: 12px
    }

    .financing {
        width: 92vw;
        height: 80px;
        line-height: 80px;
        color: #fff;
        border-radius: 8px;
        text-align: center;
        margin: 0 auto;
        -webkit-box-shadow: 2px 2px 10px 1px rgba(0,0,0,.25);
        box-shadow: 2px 2px 10px 1px rgba(0,0,0,.25)
    }

    .financing .iconfont {
        font-size: 20px;
        margin-right: 6px
    }

    .financing_apply {
        background-color: #09f;
        background-size: cover
    }

    .financing_apply:active {
        background-color: #dfdfdf
    }

    .financing_record {
        background-color: #f66;
        background-size: cover;
        margin-top: 30px
    }

    .financing_record:active {
        background-color: #dfdfdf
    }
</style>
