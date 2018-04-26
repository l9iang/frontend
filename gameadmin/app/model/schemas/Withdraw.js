Ext.define('app.model.schemas.Withdraw', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.PubWithdraw',
    name: '金币流转记录',
    orderInfo:'status , id desc',
    items: [
        {id: 'id', type: 'int', name: 'ID', hidden:true},
        {id: 'status', type: 'string', name: '订单状态',dic:'dic.chat.withdrawStatus'},
        {id: 'userIdText', type: 'string', name: '账号',width:140, allowBlank:false, queryable:true,readOnly:"true"},
        {id: 'uid', type: 'string', name: '用户ID',width:140, allowBlank:false,display:1,queryable:true},
        {id: 'fee', type: 'double', name: '金币流转金额',allowBlank:false},

        {id: 'bankName', type: 'string', name: '银行名称',readOnly:"true"},
        {id: 'account', type: 'string', name: '账号',readOnly:"true"},
        {id: 'branch', type: 'string', name: '分支',readOnly:"true"},
        {id: 'ownerName', type: 'string', name: '姓名',readOnly:"true"},
        {id: 'mobile', type: 'string', name: '手机号码',readOnly:"true"},

        {id: 'tradetime', type: 'datetime', name: '申请金币流转时间',width:160,queryable:true,readOnly:"true"},
        {id: 'finishtime', type: 'datetime', name: '金币流转成功时间',width:160,queryable:true,value:new Date()},
        {id: 'payno', type: 'string', name: '金币流转流水号',hidden:true},
       
        {id: 'imgsrc', type: 'image', name: '二维码',width:"150",height:"150",colspan:"1",readOnly:"true"},
        {id: 'descpt', type: 'string', name: '说明'}
    ],
    singleton: true
});