const Mock = require('mockjs'); // 导入依赖模块

// 返回一个函数
module.exports = function(app){
    // 监听 http 请求
    app.get('/user/page', function(rep, res){
        // 设置要返回的数据
        let json = {
            id: "@id()",                    // 得到随机的id
            name: "@cname()",           // 随机生成中文名字
            sex:"@sex()",
            "age|1-100": 100,
            "tel|1-10":"xx",            
            // avatar: "@image('200x200','red','#fff','avatar')",  // 生成图片                  
            // description: "@paragraph()",    // 描述
            // ip: "@ip()",                    // ip地址
            // email: "@email()",              // email
            "sta|1-3":"*",
            "dep|3-4":"-",
            "addr|3-4":"栋"
        }
        res.json(Mock.mock(json));
    });
}
