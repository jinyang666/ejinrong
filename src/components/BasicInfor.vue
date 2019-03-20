<template>
    <div class="main">
        <!-- 信息录入 1-->
        <div class="basicInfor" v-show="state==1">
            <div class="infor_item">
                <span><i>*</i>手机号码</span>
                <input type="tel" v-model.trim="registerData.phone" placeholder="请输入法人手机号码">
            </div>
            <div class="infor_item">
                <span><i>*</i>设置密码</span>
                <input type="password" v-model.trim="registerData.password" placeholder="请输入密码">
            </div>
            <div class="infor_item"> 
                <span><i>*</i>确认密码</span>
                <input type="password" v-model.trim="registerData.truepassword" placeholder="请再次输入密码">
            </div>
            <div class="infor_item">
                <span><i>*</i>法人姓名</span>
                <input type="text" v-model.trim="signData.headerName" placeholder="请输入法人姓名">
            </div>
            <div class="infor_item">
                <span style="padding-left:14px;">身份证号</span>
                <input type="text" v-model.trim="signData.headerId" placeholder="请输入法人身份证号">
            </div>
            <div class="infor_item">
                <span><i>*</i>企业名称</span>
                <input type="text" v-model.trim="signData.enterpriseName" placeholder="请输入企业名称">
            </div>
            <div class="infor_item">
                <span><i>*</i>营业执照号码</span>
                <input type="text" style="width:60vw; margin-left:10px;" v-model.trim="signData.licenseNumber" placeholder="请输入营业执照号码">
            </div>
            <div class="infor_item" @click="selectState=true"> 
                <span><i>*</i>所属分公司</span>
                <div class="select_company" :class="{'select_company_ac':signData.proDepartCode}">{{signData.proDepartName}}</div>
                <i class="iconfont icon-right"></i>
            </div>
            <div class="protocal_text" @click="checkstate=!checkstate">
                <span class="checkBox" :class="{'accheckBox':checkstate}" >
                    <img src="../assets/imgs/duigou.png" alt="勾选" v-show="checkstate">
                </span>
                我已阅读并同意<span class="book" @click.stop="lookprotocol">《用户注册协议》</span>
            </div>
            <button class="nex_tip" @click="nexTipFirst">下一步</button>
        </div>
        <!-- 上传资料2 -->
        <div class="upload_files" v-show="state==2">
            <!-- 营业执照正本 -->
            <div class="files_item">
                <div class="files_box">
                    <img v-show="!signData.licensePath" src="../assets/imgs/yyzz.png" alt="营业执照">
                    <img v-show="signData.licensePath" 
                        :src='"http://www.rongwin-fintech.com/WebProject/app/getUploadedImg?imgPath="+signData.licensePath' 
                        alt="营业执照"
                    >
                    <div class="file_btn" v-show="!signData.licensePath">
                        <input type="file" @change="uploadFiles($event,1)" accept="image/*" id="licensePath">
                        <span><i class="iconfont icon-weibiaoti1"></i></span>
                    </div>
                </div>
                <div class="item_bottom">
                    <h3>请上传营业执照正本</h3>
                    <p><span style="color:#fe1111;margin-right:6px;">*</span>
                        请上传营业执照正本清晰彩色原件扫描件或数码照。
                    </p>
                </div>
            </div>
            <!-- 请上传法人身份证 -->
            <div class="files_item">
                <div class="files_box">
                    <img v-show="!signData.headerIdPath" src="../assets/imgs/sfz.png" alt="身份证">
                    <img v-show="signData.headerIdPath" 
                        :src='"http://www.rongwin-fintech.com/WebProject/app/getUploadedImg?imgPath="+signData.headerIdPath' 
                        alt="法人身份证"
                    >
                    <div class="file_btn" v-show="!signData.headerIdPath">
                        <input type="file" @change="uploadFiles($event,2)" accept="image/*" id="headerIdPath">
                        <span><i class="iconfont icon-weibiaoti1"></i></span>
                    </div>
                </div>
                <div class="item_bottom">
                    <h3>请上传法人身份证</h3>
                    <p><span style="color:#fe1111;margin-right:6px;">*</span>请上传法人身份证清晰彩色原件扫描件或数码照。</p>
                </div>
            </div>
            <button class="nex_tip" @click="nexTipSecond">下一步</button>
        </div>
        <!-- 上传资料3 -->
        <div class="upload_files" v-show="state==3">
            <!-- z征信照片 -->
            <div class="files_item">
                <div class="files_box">
                    <img v-show="!signData.personalAccreditPath" src="../assets/imgs/sqs.png" alt="授权书">
                    <img v-show="signData.personalAccreditPath" 
                        :src='"http://www.rongwin-fintech.com/WebProject/app/getUploadedImg?imgPath="+signData.personalAccreditPath' 
                        alt="授权书"
                    >
                    <div class="file_btn" v-show="!signData.personalAccreditPath">
                        <input type="file" @change="uploadFiles($event,3)" accept="image/*" id="personalAccreditPath">
                        <span><i class="iconfont icon-weibiaoti1"></i></span>
                    </div>
                </div>
                <div class="item_bottom">
                    <h3>请上传企业征信查询授权书</h3>
                    <p><span style="color:#fe1111;margin-right:6px;">*</span>请上传征信查询授权书清晰彩色原件图片，证件文件完整清晰可辨认。</p>
                </div>
            </div>
            <!-- 其他照片 -->
            <div class="files_item">
                <div class="files_box">
                    <img v-show="!signData.otherPath" src="../assets/imgs/other.png" alt="其他">
                    <img v-show="signData.otherPath" 
                        :src='"http://www.rongwin-fintech.com/WebProject/app/getUploadedImg?imgPath="+signData.otherPath' 
                        alt="其他"
                    >
                    <div class="file_btn" v-show="!signData.otherPath">
                        <input type="file" @change="uploadFiles($event,4)" accept="image/*" id="otherPath">
                        <span><i class="iconfont icon-weibiaoti1"></i></span>
                    </div>
                </div>
                <div class="item_bottom">
                    <h3>请上传其他文件（选填）</h3>
                    <p>其他需要上传资料，可选择在此处上传，资料完整清晰可辨认。</p>
                </div>
            </div>
            <button class="nex_tip" style="margin-top:20px;" @click="summit">提交</button>
        </div>
        <!-- 注册成功界面 4-->
        <div class="register_success" v-show="state==4">
            <div class="success_header">
                <div class="success_header_icon">
                    <i class="iconfont icon-duigou"></i>
                    <p>注册成功</p>
                </div>
            </div>
            <div class="success_text">
                <h3>恭喜您注册成功</h3>
                <p>{{signData.headerName}}您好，恭喜您已经成功注册融e汇。点击下方按钮立即体验。</p>
            </div>
            <button class="nex_tip" style="margin-top:20px;" @click="login">立即登录</button>
        </div>
        <!-- 选择分公司 -->
        <SelectBottom 
            v-show="selectState"
            @selectRadio="selectRadio"
            @offBottom="offBottom"
            :proDepartCode="signData.proDepartCode" 
            :companyList="companyList">     
        </SelectBottom>
        <div class="progress_bar" v-show="progress_bar_state">
            <div class="bar_box">{{precent}}%</div>
        </div>
    </div>
</template>
<script>
import SelectBottom from "./BottomSelect.vue";
export default {
    name: 'Register',
    data:function(){
        return {
            registerData:{
                phone:"",
                password:"",
                truepassword:"",
            },
            signData:{
                headerName:'',//法人名称
                headerId:'',//身份证号
                enterpriseName:'',//企业名称
                licenseNumber:'',//营业执照号  
                proDepartName:'点击选择分公司',//分公司名称
                proDepartCode:'',//分公司编号
                //buApa1wZ9E.png
                licensePath:'',//营业执照路径    
                headerIdPath:'',//身份证路径
                personalAccreditPath:'',//企业征信授权书路径    
                otherPath:'',//其他路径
            },
            state:"1",//下一步状态
            checkstate:true,//是否勾选注册列表
            companyList:[],//分公司列表
            selectState:false,//底部下拉菜单是否显示;
            progress_bar_state:false,
            precent:0,
        }        
    },
    components:{
       SelectBottom
    },
    methods:{
        //跳转注册信息
        lookprotocol(){
            this.$router.push({
                path:"/registerProtocol"
            })
        },
        //第一页下一步
        nexTipFirst(){
            if(!this.registerData.phone){
                this.$layer.closeAll();
                this.$layer.msg("请输入手机号");
                return false;
            }
            if(!(/^1[34578]\d{9}$/.test(this.registerData.phone))){ 
                this.$layer.closeAll();
                this.$layer.msg("手机号码有误，请重填");
                return false; 
            } 
            if(!this.registerData.password){
                this.$layer.closeAll();
                this.$layer.msg("请输入密码");
                return false;
            }
            if(!(/^\w{6,16}$/.test(this.registerData.password))){ 
                this.$layer.closeAll();
                this.$layer.msg("密码有6至16数字或字母组成");
                return false; 
            }
            if(!this.registerData.truepassword){
                this.$layer.closeAll();
                this.$layer.msg("请输入确认密码");
                return false;
            }
            if(this.registerData.truepassword!==this.registerData.password){
                this.$layer.closeAll();
                this.$layer.msg("两次密码不一致");
                return false;
            }
            if(!this.signData.headerName){
                this.$layer.closeAll();
                this.$layer.msg("请输入法人姓名");
                return false;
            }
            if(!this.signData.enterpriseName){
                this.$layer.closeAll();
                this.$layer.msg("请输入企业名称");
                return false;
            }
            if(!this.signData.licenseNumber){
                this.$layer.closeAll();
                this.$layer.msg("请输入营业执照号码");
                return false;
            }
            if(!this.signData.proDepartCode){
                this.$layer.closeAll();
                this.$layer.msg("请选择所属分公司");
                return false;
            }
            if(!this.checkstate){
                this.$layer.closeAll();
                this.$layer.msg("请阅读并勾选用户注册服务协议");
                return false;
            }
            this.$layer.open({type:2,content:"验证中...",shadeClose:false,});
            this.$axios({
                method:'post',
                url:this.URLS.checkRegister,
                params:{
                    phone:this.registerData.phone,
                    enterpriseName:this.signData.enterpriseName,
                    headerName:this.signData.headerName,
                    licenseNumber:this.signData.licenseNumber,
                    proDepartCode:this.signData.proDepartCode,
                },
                headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
            }).then(
                (res)=> {
                    this.$layer.closeAll();
                    if(res.data.flag==0){
                        this.state=2;
                    }else if(res.data.flag==1){
                        this.$layer.msg("手机号已注册");
                    }else if(res.data.flag==2){
                        this.$layer.msg("公司已注册");
                    }else if(res.data.flag==3){
                        this.$layer.msg("网络异常");
                    }else if(res.data.flag==4){
                        this.$layer.msg("参数错误");
                    }else{
                        this.$layer.msg("网络异常,请重新登录!");
                    }
                }
            ).catch(
                ()=>{
                    this.$layer.closeAll();
                    this.$layer.msg("系统错误,请重新登录");
                }
            )
        },
        //第二页下一步
        nexTipSecond(){
            if(!this.signData.licensePath){
                this.$layer.closeAll();
                this.$layer.msg("请上传营业执照");
                return false;
            }
            if(!this.signData.headerIdPath){
                this.$layer.closeAll();
                this.$layer.msg("请上传法人身份证");
                return false;
            }
            this.state=3;
            //var that=this;
            // setTimeout(function(){
            //     that.signData.licensePath="buApa1wZ9E.png"
            // },2000);           
        },
        //提交接口
        summit(){
            if(!this.signData.personalAccreditPath){
                this.$layer.closeAll();
                this.$layer.msg("请上传征信授权书");
                return false;
            }
            var appData={
                registerData:this.registerData,
                signData:this.signData,
            }
            this.$layer.open({type:2,content:"注册中请稍等...",shadeClose:false,});
            this.$axios({
                method:'post',
                url:this.URLS.userRegister,
                data:JSON.stringify(appData),
                headers:{'Content-Type':'application/json;charset=UTF-8;'}
                //headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                (res)=> {
                    this.$layer.closeAll();
                    if(res.data.flag==0){
                       this.$layer.msg("注册成功!");
                       this.state=4; 
                    }else if(res.data.flag==1){
                       this.$layer.msg("网络异常!");
                    }else if(res.data.flag==2){
                        this.$layer.msg("账号已注册,请核对信息!");
                    }else if(res.data.flag==3){
                        this.$layer.msg("参数错误!");
                    }else{
                        this.$layer.msg("系统错误,请重新填写!");
                    }
                }
            ).catch(
                ()=>{
                    this.$layer.closeAll();
                    this.$layer.msg("注册失败");
                }
            )
        },
        //立即登录
        login(){
            window.location.href="./login.html"
        },
        //选择事件
        selectRadio(index){
            this.signData.proDepartName=this.companyList[index].sysRoleName;
            this.signData.proDepartCode=this.companyList[index].sysRoleCode;
            this.selectState=false;
        },
        offBottom(){
            this.selectState=false;
        },
        photoCompress(file,w,objDiv){
            var self=this;
            var ready=new FileReader();
            /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
            ready.readAsDataURL(file);
            ready.onload=function(){
                self.precent=2;
                var re=this.result;
                self.canvasDataURL(re,w,objDiv)
            }
        },
        //图片上传
        canvasDataURL(path, obj, callback){
            var  self=this;
            var img = new Image();
            img.src = path;
            img.onload = function(){
                self.precent=10;
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                var quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);
            }
        },
        //压缩上传 
        convertBase64UrlToBlob(urlData){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
        //上传图片
        uploadFiles(e,index){
            var self=this;
            self.progress_bar_state=true;
            var file=e.target.files[0];  
            var formdata = new FormData(); // FormData 对象
            if(file.size/1024 > 1025) { //大于1M，进行压缩上传
                self.photoCompress(file, {
                    quality: 0.2
                }, function(base64Codes){
                    //console.log("压缩后：" + base.length / 1024 + " " + base);
                    var bl = self.convertBase64UrlToBlob(base64Codes);
                    formdata.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
                    self.upimg(formdata,index);
                });
            }else{ //小于等于1M 原图上传
                formdata.append("file", file, "file_"+Date.parse(new Date())+".jpg"); // 文件对象    
                self.upimg(formdata,index);
            }
        },
        upimg(formdata,index){
            var self=this;
            self.$axios({
                method:'post',
                url:self.URLS.uploadImg,
                data:formdata,
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                onUploadProgress:function(progressEvent){
                    if(progressEvent.lengthComputable){
                        self.changeNumber(progressEvent)
                    }
                }
            }).then(
                (res)=> {
                    self.progress_bar_state=false;
                    self.precent=0;
                    self.$layer.msg("图片上传成功!");
                    if(index==1){//营业执照
                        self.signData.licensePath=res.data;
                    }else if(index==2){//身份证正面
                        self.signData.headerIdPath=res.data;
                    }else if(index==3){//企业征信授权书路径  
                        self.signData.personalAccreditPath=res.data;
                    }else if(index==4){//其他路径
                        self.signData.otherPath=res.data;
                    }
                }
            ).catch(
                ()=>{
                    self.progress_bar_state=false;
                    self.precent=0;
                    self.$layer.closeAll();
                    self.$layer.msg("图片上传失败");
                }
            )
        },
        changeNumber(data){
            this.precent=Math.floor(100 * data.loaded/data.total)-2;
        }
    },
    mounted(){

    },
    created(){
        this.$axios({
            method:'post',
            url:this.URLS.findAllBranchsByLevel,
        }).then(
            (res)=> {
                this.companyList=res.data;
            }
        ).catch(
            ()=>{
                this.$layer.closeAll();
                this.$layer.msg("请求分公司列表失败");
            }
        )
    },
}
</script>
<style scoped>
    /*进度条*/
    .progress_bar{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.4);
        z-index: 999;
    }
    .bar_box{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -50px;
        color: #fff;
        text-align: center;
        line-height: 100px;
        font-size: 26px;
        font-weight: 600;
        border:5px solid #ff6666;
        border-radius: 50%;
    }
    /*主页面*/
    .main{
        background-color: #fff;
    }
    .nex_tip{
        display: block;
        width: 92vw;
        height: 45px;
        text-align: center;
        line-height: 45px;
        color: #fff;
        margin:0 auto;
        background-color: #ff6666;
        margin-top: 60px;
        border-radius: 6px;
    }
    .nex_tip:active{
        background-color: #dfdfdf;
    }
    /*基本信息*/
    .basicInfor{
        padding:0 4vw;
    }
    .basicInfor .infor_item{
        border-bottom: 1px solid #e5e5e5;
        line-height:50px;
    }
    .basicInfor .infor_item span{
        color: #333333;
        font-size: 15px;
        font-weight: 550;
    }
    .basicInfor .infor_item input{
        width: 64vw;
        padding:12px 0;
        margin-left: 26px;
        color: #333333;
        font-size: 15px;
    }
    .basicInfor .infor_item span i{
        margin-right: 6px;
        color: #ff6666;
    }
    .basicInfor .infor_item .iconfont{
        float: right;
        color: #999;
    }
    .select_company{
        display: inline-block;
        margin-left: 14px;
        font-size: 15px;
        color: #999;
        width: 56vw;
    }
    .select_company_ac{
        color: #333;
    }

    .protocal_text{
        font-size: 13px;
        line-height: 50px;
        color: #999;
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
    .book{
        color: #ff6666;
    }
    .book:active{
        color: #333;
    }
    /*上传文件样式*/
    .files_item{
        width: 76vw;
        margin:18px auto;
        text-align: center;
    }
    .item_bottom h3{
        color: #333;
        line-height: 40px;
        font-size: 16px;
        font-weight: 500;
    }
    .item_bottom p{
        color: #999;
        line-height: 20px;
        font-size: 15px;
    }
    .files_box{
        position: relative;
    }
    .files_box img{
        width: 100%;
    }
    .file_btn{
        position: absolute;
        width: 60px;
        height: 60px;
        left: 38vw;
        margin-left: -30px;
        top: 60px;
    }
    .file_btn input{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index:199;
    }
    .file_btn span{
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(252,175,175,0.6);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 198;
    }
    .file_btn .iconfont{
        color: #fff;
        font-size: 30px;
        line-height: 60px;
    }   
    /*成功页面*/
    .success_header{
        background-color: #ff6666;
        padding:50px 0;
    }
    .success_header_icon{
        display: block;
        box-sizing: border-box;
        padding-top: 10px;
        width: 100px;
        height: 100px;
        border:2px solid #fff;
        text-align: center;
        border-radius: 50px;
        margin:0 auto;
        color: #fff;
    }
    .success_header_icon i{
        font-size: 40px;
        line-height: 50px;
    }
    .success_header_icon p{
        font-size: 15px;
        line-height: 20px;
    }
    .success_text{
        margin-top: 50px;
        text-align: center;
        padding:0 8vw;
    }
    .success_text h3{
        font-size: 28px;
        line-height: 45px;
    }
    .success_text p{
        color:#999;
        font-size: 14px;
        line-height: 25px;
    }
</style>

