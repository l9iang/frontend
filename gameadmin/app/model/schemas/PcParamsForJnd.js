Ext.define('app.model.schemas.PcParamsForJnd', {
    extend: 'app.model.schemas.Base',
    mapping: 'com.imaxgame.gift.jnd.PcConfigForJnd',
    name: '加拿大28',
    orderInfo:'id',
    items: [
        {id: 'id', type: 'int', name: 'ID', hidden:true},
        {id: 'param', type: 'string', name: '参数',width:140, allowBlank:false,update:false,queryable:true,hidden:true},
        {id: 'alias', type: 'string', name: '参数名称',width:180,allowBlank:false,queryable:true,readOnly:true},
        {id: 'val', type: 'string', name: '参数值',width:200,flex:'1',colspan:2,allowBlank:false},
        {id: 'info', type: 'string', name: '说明',width:500,colspan:3}
    ],
    singleton: true
});