Ext.define('app.lottery.InoutReportListView', {
    extend: 'app.ux.MyListView',

    beforeStoreLoad: function (st, op) {
        for(var i=0;i<this.dicColumns.length;i++){
            this.getDicStore(this.dicColumns[i])
        }

        var p = st.proxy;
        var parameters = {};
        var cfg = op.getConfig();
        parameters[p.pageParam] = cfg[p.pageParam];
        parameters[p.startParam] = cfg[p.startParam];
        parameters[p.limitParam] = cfg[p.limitParam];
        parameters['entityName'] = this.schema.mapping || this.schema.id;
        if (this.cnd) {
            parameters['cnd'] = this.cnd;
        }
        if(this.schema.orderInfo){
            parameters['orderInfo'] = this.schema.orderInfo;
        }
        if(this.orderInfo){
            parameters['orderInfo'] = this.orderInfo;
        }
        var myCnds ={};
        var cnds = this.down('toolbar').items.items;
        for(var i = 0 ; i < cnds.length ; i++) {
            var cndItem = cnds[i];
            if (cndItem.name == "startDate") {
                myCnds["startDate"] = Ext.util.Format.date(cnds[i].value, 'Y-m-d');
            } else if (cndItem.name == "endDate") {
                myCnds["endDate"] = Ext.util.Format.date(cnds[i].value, 'Y-m-d');
            } else if (cndItem.name == "userId") {
                myCnds["userId"] = cnds[i].value;
            }
        }

        parameters['myCnds']=myCnds;

        p.setExtraParam('parameters', parameters);
    }
})