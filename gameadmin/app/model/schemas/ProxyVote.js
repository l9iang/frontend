Ext.define('app.model.schemas.ProxyVote', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.ProxyVote',
    name: '代理赚金币',
    orderInfo: 'id desc',
    items: [
        {id: 'id', type: 'string', name: 'ID', display:0},
        {id: 'uid', type: 'int', name: '用户ID',queryable:true},
        {id: 'nickName', type: 'string', name: '账号',queryable:true},
        {id: 'lose', type: 'double', name: '输分'},
        {id: 'vote', type: 'double', name: '贡献'},
        {id: 'parentId', type: 'int', name: '邀请人ID',queryable:true},
        {id: 'parentNickName', type: 'string', name: '邀请人账号'},
        {id: 'relation', type: 'string', name: '分销级别',dic:'dic.chat.saleType'},
        {id: 'cacuDate', type: 'date', name: '统计日期'}
    ],
    singleton: true
});