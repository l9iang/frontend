Ext.define('app.model.schemas.MassMessage', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.MassMessage',
    name: '群发消息',
    orderInfo: 'id desc',
    items: [
        {id: 'id', type: 'int', name: 'ID', display:"1"},
        {id: 'roomid', type: 'string', name: '群发消息房间ID,不填群发所有房间',colspan:"4"},
        {id: 'operatorId', type: 'string', name: '操作人', display:"1"},
        {id: 'createDate', type: 'datetime', name: '时间', width: 160, value: new Date(),display:"1"},
        {id: 'content', type: 'string', name: '内容', allowBlank: false,  colspan:"4",  xType: 'htmleditor'}
        
    ],
    singleton: true
});