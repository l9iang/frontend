Ext.define('app.model.schemas.LotteryMain', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.GcLottery',
    name: '开奖记录',
    orderInfo: 'id desc',
    items: [
            {id: 'id', type: 'string', name: '红包ID', allowBlank:false},
        {id: 'sender', type: 'int', name: '发包玩家',allowBlank:false,queryable:true},
    
        {id: 'money', type: 'string', name: '金额(服务费扣除)', allowBlank:false},
        {id: 'number', type: 'string', name: '包数', allowBlank:false},
        {id: 'roomId', type: 'string', name: '房间号', allowBlank:false,queryable:true},
        {id: 'type', type: 'string', name: '类型', allowBlank:false},       
        {id: 'inoutNum', type: 'string', name: '输赢', allowBlank:false},
        {id: 'title', type: 'string', name: '主题', allowBlank:false},
        {id: 'description', type: 'string', name: '备注', allowBlank:false},
        {id: 'expiredSeconds', type: 'string', name: '时长', allowBlank:false},
        {id: 'createTime', type: 'datetime', name: '发包时间',display:"1",width:200}
        

    ],
    singleton: true
});