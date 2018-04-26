Ext.define('app.model.schemas.WebsiteUser', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.PubUser',
    name: '网站用户',
    orderInfo: 'id desc',
    items: [
        {id: 'id', type: 'int', name: 'ID', display:"1",queryable:true},
        {id: 'userId', type: 'string', name: '帐号',width:120,allowBlank:false,queryable:true},
        {id: 'pwd', type: 'string', name: '密码',allowBlank:false,display:"2"},
        {id: 'moneyCode', type: 'string', name: '支付密码',display:"0"},
        {id: 'nickName', type: 'string', name: '昵称'},
        {id: 'mobile', type: 'string', name: '手机号码',width:120,queryable:true},
        {id: 'signture', type: 'string', name: '签名'},
        {id: 'headImg', type: 'string', name: '头像'},
        {id: 'money', type: 'double', name: '余额(不要超过8位数)' },
        {id: 'point', type: 'double', name: '返点数'},
        {id: 'subPoint', type: 'double', name: '默认下级点数'},
        {id: 'alipay', type: 'string', name: '支付宝账户'},
        {id: 'wx', type: 'string', name: '微信号'},
        {id: 'score', type: 'int', name: '积分',readOnly:true,},
        {id: 'chargeAmount', type: 'double', name: '最高金币流转金额'},
        {id: 'email', type: 'string', name: '电子邮件',width:140},
        {id: 'qq', type: 'string', name: 'QQ'},
        {id: 'parent', type: 'string', name: '邀请人Id'},
        {id: 'registIp', type: 'string', name: '注册IP',display:"1"},
        {id: 'registDate', type: 'datetime', name: '注册时间',width:160,queryable:true,display:"1"},
        {id: 'lastLoginIp', type: 'string', name: '最后登录IP',display:"1"},
        {id: 'lastLoginDate', type: 'datetime', name: '最后登录时间',width:160,display:"1"},
        {id: 'userType', type: 'string', name: '用户类型',dic:'dic.chat.userType'},
        {id: 'status', type: 'string', name: '是否可用',dic:'dic.accountStatus'},
        
        {id: 'rechargepoint', type: 'double', name: '累计充值提成',readOnly:true},
        
        {id: 'gamepoint', type: 'double', name: '累计游戏提成',readOnly:true},
        
        {id: 'servicepoint', type: 'double', name: '累计服务费提成',readOnly:true},
        {id: 'winvalue', type: 'double', name: '累计赢值',readOnly:true},
        {id: 'losevalue', type: 'double', name: '输值总额',readOnly:true},
        {id: 'rechagevalue', type: 'double', name: '累计充值金额',readOnly:true},
        {id: 'withdrawvalue', type: 'double', name: '金币流转',readOnly:true},
        {id: 'sendnum', type: 'int', name: '发包数',readOnly:true},
        {id: 'sendmoney', type: 'double', name: '累计发包金额',readOnly:true},
        {id: 'opennum', type: 'int', name: '抢包数',readOnly:true},
        {id: 'openmoney', type: 'double', name: '累计抢包金额',readOnly:true}
        
    ],
    singleton: true
});