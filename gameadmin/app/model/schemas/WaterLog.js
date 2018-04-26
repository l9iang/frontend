Ext.define('app.model.schemas.WaterLog', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.GcProxyWaterLog',
    name: '房间服务费日志',
    orderInfo: 'id desc',
    items: [
        {id: 'id', type: 'string', name: 'ID', display:0},
        {id: 'uid', type: 'int', name: '用户ID',queryable:true},
        {id: 'userId', type: 'string', name: '账号',queryable:true},
        {id: 'nickName', type: 'string', name: '昵称'},
        {id: 'roomId', type: 'string', name: '房间代码',queryable:true},
        {id: 'lotteryId', type: 'string', name: '红包ID'},
        {id: 'gameType', type: 'string', name: '游戏类型',dic:'dic.chat.gameType'},
        {id: 'fullWater', type: 'double', name: '服务费'},
        {id: 'water', type: 'double', name: '返水'},
        {id: 'parentId', type: 'int', name: '邀请人ID',queryable:true},
        {id: 'parentUserId', type: 'string', name: '邀请人账号'},
        {id: 'relation', type: 'string', name: '分销级别',dic:'dic.chat.saleType'},
        {id: 'createDate', type: 'date', name: '计算日期'}
    ],
    singleton: true
});