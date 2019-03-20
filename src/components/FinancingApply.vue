<template>
    <div>
        <div class="main">
            <div class="noHave" v-show="financingList.length==0">
                <img src="../assets/imgs/nohave.jpg" alt="暂无记录">
            </div>
            <!-- 融资列表 -->
            <div class="record_list clearFloat" 
                @click="selectRecord(index)" 
                v-for="(item,index) in financingList" 
                v-bind:key="item[0]"
                :class="{'acList':acIndex===index}"
                >
                <h4>反向保理融资</h4>
                <div class="top_infor clearFloat"> 
                    <div class="top_infor_left" style="float:left;">
                        <p><span class="special_font">{{item[3]}}</span></p>
                        <p class="gray_font">融资金额(元)</p>
                    </div>
                    <div class="top_infor_right" style="float:right;">
                        <p><span class="item_key">债款期数(月)</span><span  style="margin-left:6px;" class="special_font">{{item[4]}}</span></p>
                        <p><span class="item_key">平台服务费率</span><span  style="margin-left:6px;" class="special_font">{{item[17]*1000}}‰</span></p>
                    </div>
                </div>
                <div class="bottom_infor"> 
                    <p><span class="item_key">分公司名称：</span><span :style="{'width':width+'px'}" class="compute_width">{{item[1]}}</span></p>
                    <p><span class="item_key">供应商名称：</span><span :style="{'width':width+'px'}" class="compute_width">{{item[2]}}</span></p>
                    <p><span class="item_key" style="letter-spacing:4px;">银行名称：</span><span :style="{'width':width+'px'}" class="compute_width">{{item[16]}}</span></p>
                </div>
                <div class="rb_corner" v-show="acIndex===index">
                    <span class="triangle"></span>
                    <i class="iconfont icon-duigou"></i>
                </div>
            </div>
        </div>
        <div class="footer" v-show="financingList.length>0">
            <div class="protocal_text" @click="checkstate=!checkstate">
                <span class="checkBox" :class="{'accheckBox':checkstate}" >
                    <img src="../assets/imgs/duigou.png" alt="勾选" v-show="checkstate">
                </span>
                我已阅读并同意<span class="book" @click.stop="lookprotocol">《融e汇供应链金融平台服务协议》</span></div>
            <button @click="applyMoney" class="activeBtn">融资</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'indexHome',
    data:function(){
        return {
            //申请记录
            financingList:[],
            acIndex:"",//被选中
            checkstate:true,
            width:"",
        }        
    },
    props: {

    },
    methods:{
        selectRecord(index){
            this.acIndex=index;
        },
        //申请融资
        applyMoney(){
            if(this.acIndex===""){
                this.$layer.closeAll();
                this.$layer.msg("请选择融资纪录")
                return false;
            }
            if(!this.checkstate){
                this.$layer.closeAll();
                this.$layer.msg("请勾选服务协议")
                return false;
            }
            this.$axios({
                method:'post',
                url:this.URLS.financingToRongYing,
                params:{"planDetailId":this.financingList[this.acIndex][0]},
                headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
            }).then(
                (res)=> {//0融资成功 1融资失败 2参数为空 3未登陆
                    this.$layer.closeAll();
                    if(res.data.flag==0){
                        this.$layer.msg("融资成功")
                        this.financingList.splice(this.acIndex,1)
                        this.acIndex=""
                    }else if(res.data.flag==1){
                        this.$layer.msg("融资失败")
                    }else if(res.data.flag==2){
                        this.$layer.msg("请选择融资纪录")
                    }else if(res.data.flag==3){
                        this.$layer.msg("请登录")
                    }
                }
            ).catch(
                ()=>{
                    this.$layer.closeAll();
                }
            )   
        },
        //查看服务协议
        lookprotocol(){
            this.$router.push({
                path:"/protocol"
            })
        },
        getList(){
            this.$axios({
                method:'post',
                url:this.URLS.unFinancingListRongYingPage,
                data:{"PageIndex":1,"PageSize":500},
            }).then(
                (res)=> {
                    this.$layer.closeAll();
                    this.financingList=res.data.datas;
                    //this.financingList=[];
                }
            ).catch(
                ()=>{
                    this.$layer.closeAll();
                }
            )
        }
    },
    created(){
        this.getList();
    },
    beforeRouteEnter(to,from,next){
        if(from.name=="protocol"){
            to.meta.isBack=true;
        }
        next();
    },
    activated(){
        document.querySelector('body').setAttribute('style', 'background-color:#f0f0f0;');
        var width=document.documentElement.clientWidth*0.92-24-100;
        this.width=width;
        if(!this.$route.meta.isBack){
            this.getList();
        }
        this.$route.meta.isBack=false
    },
    filters:{
        filterMoney(value){
            return parseInt(value)/10000
        }
    }
}
</script>
<style scoped>
    .noHave{
        padding-top: 100px;
        text-align: center;
    }
    .compute_width{
        display: inline-block;
    }
    .noHave img{
        width: 60vw;
    }
    .main{
        height: 100vh;
        box-sizing: border-box;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 100px;
    }
    .record_list{
        width: 92vw;
        box-sizing: border-box;
        padding:6px 12px 10px;
        background-color: #fff;
        border-radius: 6px;
        margin:12px auto;
        font-size: 15px;
        border:1px solid #fff;
        position: relative;
        box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.15);
    }
    .rb_corner{
        position: absolute;
        color: #fff;
        text-align: center;
        height: 40px;
        width: 40px;
        background-color: #ff6666;
        bottom: -1px;
        right: -1px;
        border-bottom-right-radius: 6px;
    }
    .rb_corner .triangle{
        position: absolute;
        transform:rotate(135deg);
        top: -28px;
        left:-28px; 
        height:0;
        width:0;
        overflow: hidden;
        font-size: 0;
        line-height: 0;
        border-color:#fff transparent transparent transparent;
        border-style:solid;
        border-width:28px;
    }
    .rb_corner .iconfont{
        line-height: 50px;
        margin-top: 30px;
        margin-left: 20px;
    }
    .main .acList{
        border-color: rgba(255,102,102,0.47);
        box-shadow: 2px 2px 6px 1px rgba(255,102,102,0.3);
    }
    .record_list h4{
        line-height: 30px;
        font-size: 18px;
        color: #F4A460;
        font-weight: 550;
    }
    .top_infor{
        padding: 8px 0 10px;
        border-bottom: 1px dashed #dfdfdf;
    }
    .top_infor_left{
        float: left;
        text-align: center;
    }
    .top_infor_right{
        
    }
    .bottom_infor{
        padding-top: 8px;
    }
    .item_key{
        color: #999;
    }
    .bottom_infor .item_key{
        display: inline-block;
        width: 95px;
        vertical-align: top;
    }
    .bottom_infor p{
        line-height: 32px;
        color: #333;
    }
    .special_font{
        font-size: 20px;
        color: #ff6666;
    }
    .gray_font{
        color: #b6b6b6;
        line-height: 22px;
        font-size: 15px;
    }
    .footer{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding:0px 0 18px;
        background-color: #fff;
        text-align: center;
        border-top:1px solid #dfdfdf;
    }
    .checkBox{
        display: inline-block;
        height: 13px;
        width: 13px;
        border:1px solid #999;
        border-radius: 3px;
        margin-right: 6px;
        vertical-align: middle;
        margin-bottom: 4px;
        text-align: center;
        position: relative;
    }
    .checkBox img{
        width: 10px;
        position: absolute;
        left: 1px;
        top: 1px;
    }
    .accheckBox{
        border-color:#ff6666;
    }

    .protocal_text{
        font-size: 13px;
        line-height: 48px;
        color: #999999;
    }
    .book{
        color: #ff6666;
    }
    .book:active{
        color: #333;
    }
    .footer button{
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        background-color: #ff6666;
        color: #fff;
        text-align: center;
        width: 92vw;
    }
    .activeBtn:active{
        background-color: #dfdfdf;
    }
</style>
