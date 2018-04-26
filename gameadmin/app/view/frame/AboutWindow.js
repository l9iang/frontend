Ext.define('app.view.frame.AboutWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.aboutwindow',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.form.field.Checkbox'
    ],
    closeAction: 'destroy',
    width: 400,
    title: '关于我们',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                margin: '5 5 5 5'
            },
            items: [
                {
                    xtype: 'fieldset',
                    fieldDefaults: {
                        margin: '0 0 0 0'
                    },
                    title: '产品信息',
                    items: [
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '产品名称',
                            value: $user.system
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            fieldLabel: '版本信息',
                            value: $user.version+"(全网独家唯一赢率智能控制和三级分销,8套游戏)"
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '版权',
                    items: [
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            labelWidth: 120,
                            value: '<b>版权所有 :</b> <a href="">iMaxClub(禁止非法用途，无关联责任)</a>'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            value: '<b>联系方式 :</b> <a href="meng201809@foxmail.com">'+$user.telephone+'</a>'
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }

});
