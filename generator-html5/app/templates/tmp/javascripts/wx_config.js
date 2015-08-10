//  微信分享

//  分享链接
var wx_URL= 'http://weixin.wepiao.com/huodong/wx/20150731/yuesha';

//  分享图保存为share.jpg
var share_img_url = wx_URL+"/images/share.jpg";
WxBridge.share({
    'imgUrl' : share_img_url, // 图片地址
    'link'   : window.location.href, // 链接地址
    'title'  : '分享标题', // 分享标题
    'desc'   : '分享内容' // 分享内容(出现在朋友圈分享的文字中)
});