Ext.define('app.model.schemas.RoomProp', {
    extend: 'app.model.schemas.Base',
    mapping: 'org.takeback.chat.entity.GcRoomProperty',
    name: '房间属性',
    orderInfo: 'roomId desc',
    items: [
        {id: 'id', type: 'int', name: 'ID', display:0},
        {id: 'roomId', type: 'string', name: '房间编号',allowBlank:false,queryable:true},
        {id: 'alias', type: 'string', name: '属性名',allowBlank:false},
        {id: 'configKey', type: 'string', name: '属性',allowBlank:false},
        {id: 'configValue', type: 'string', name: '属性值',allowBlank:false},
        {id: 'info', type: 'string', name: '描述'},
    ],
    singleton: true
});