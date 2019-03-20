<template>
    <div>
        <div class="main">
            <div class="noHave" v-show="financingList.length==0">
                <img src="../assets/imgs/nohave.jpg" alt="暂无记录">
            </div>
            <!-- 融资列表 -->
            <div class="record_list clearFloat"  v-for="item in financingList" v-bind:key="item[0]">
                <h4>反向保理融资</h4>
                <div class="top_infor clearFloat"> 
                    <div style="float:left;">
                        <p><span class="special_font">{{item[4]}}</span></p>
                        <p class="gray_font">融资金额(元)</p>
                    </div>
                    <div style="float:right;">
                        <p><span class="special_font">{{item[6]*1000}}‰</span></p>
                        <p class="gray_font">平台服务费率</p>
                    </div>
                </div>
                <div class="bottom_infor"> 
                    <p><span>核心企业名称：</span>{{item[1]}}</p>
                    <p><span style="letter-spacing:3px;">分公司名称：</span>{{item[2]}}</p>
                    <p><span style="letter-spacing:3px;">供应商名称：</span>{{item[3]}}</p>
                    <p><span>放款银行名称：</span>{{item[12]}}</p>
                    <!-- <p>平台服务率（‰）：{{item[6]*1000}}</p> -->
                </div>
            </div>
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
        }        
    },
    props: {

    },
    methods:{
          
    },
    mounted(){
        this.$axios({
            method:'post',
            url:this.URLS.myFinancingRecordRongWin,
            data:{"PageIndex":1,"PageSize":500},
            //headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
        }).then(
            (res)=> {
                this.$layer.closeAll();
                this.financingList=res.data.datas;
            }
        ).catch(
            ()=>{
                this.$layer.closeAll();
            }
        )
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#f0f0f0;')
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
        padding:8px 12px 8px;
        background-color: #fff;
        border-radius: 6px;
        margin:12px auto;
        font-size: 15px;
        border:1px solid #fff;
        box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.15);
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
    .bottom_infor{
        padding-top: 8px;
    }
    .bottom_infor p{
        line-height: 32px;
        color: #333;
    }
    .bottom_infor p span{
        color: #999;
    }
    .top_infor{
        padding: 8px 0 10px;
        border-bottom: 1px dashed #dfdfdf;
    }
    .top_infor p{
        text-align: center;
    }
    .special_font{
        font-size: 22px;
        color: #ff6666;
    }
    .gray_font{
        color: #b6b6b6;
        line-height: 24px;
    }
</style>
