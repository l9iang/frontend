Ext.define('app.chat.PcParamForJndListView', {
    extend: 'app.ux.MyListView',
    export:false,


    doReset: function () {
        Ext.MessageBox.confirm('确认重置启动器对象', '确认重置启动器对象？', function (txt) {
            if ('yes' == txt) {
                jsonRequest.execute({
                    service:this.listService,
                    method:'reset',
                    parameters:{
                    }
                },function(code,msg,json){
                    if(code ==200) {
                        Ext.MessageBox.alert("提示","重置启动器对象成功！");
                      //  this.store.reload();
                    }
                },this);
            }
        }, this);
    },

    doClear10: function () {
        Ext.MessageBox.confirm('确认清除缓存', '确认要清楚10分钟前的数据？', function (txt) {
            if ('yes' == txt) {
                jsonRequest.execute({
                    service:this.listService,
                    method:'clear10',
                    parameters:{
                    }
                },function(code,msg,json){
                    if(code ==200) {
                        Ext.MessageBox.alert("提示","数据清理成功！");
                        this.store.reload();
                    }
                },this);
            }
        }, this);
    }
})