<script type="text/javascript">
    let basePath = "/WebProject/app/";
    //let basePath = "/apis/WebProject/app/";

    const Login_in_url = basePath + 'appLogin'; //登录几口

    const unFinancingListRongYingPage = basePath + 'unFinancingListRongYingPage'; //获得可以融资列表

    const financingToRongYing = basePath + 'financingToRongYing'; //融资几口调用

    const myFinancingRecordRongWin = basePath + 'myFinancingRecordRongWin'; //获得可以融资列表

    const checkRegister = basePath + 'checkRegister'; //验证手机号吗是否注册

    const uploadImg= basePath + 'uploadImg'; //上传图片接口

    const uploadImgBase64= basePath + 'uploadImgBase64'; //上传图片接口base64

    const findAllBranchsByLevel=basePath + 'findAllBranchsByLevel'; //根据系统level获取所有核心企业二级单位

    const userRegister= basePath+ "userRegister";//4.用户注册保存

    const appLoginOut= basePath+ "appLoginOut"//6.退出登陆

    export default {
        Login_in_url,
        unFinancingListRongYingPage,
        financingToRongYing,
        myFinancingRecordRongWin,
        checkRegister,
        uploadImg,
        uploadImgBase64,
        findAllBranchsByLevel,
        userRegister,
        appLoginOut
    }   
</script>
