/**
 * 系统主页的顶部区域，主要放置系统名称，菜单，和一些快捷按钮
 */
Ext.define('app.view.main.region.Top', {

    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.maintop', // 定义了这个组件的xtype类型为maintop

    requires: [
        'app.view.frame.AboutWindow'
    ],

    style: 'background-color:#99bbe8;',
    height: 80,
    initComponent: function () {
        this.callParent();
        //if(-1 != navigator.userAgent.indexOf("MSIE"))
        //{
        //    //不是微软IE浏览器，则调用Flash来播放音乐
        //    document.write(' <OBJECT id="Player"');
        //    document.write(' classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"');
        //    document.write(' width=0 height=0 > <param name="URL" value="ding.wav" /> <param name="AutoStart" value="false" /> </OBJECT>');
        //}
        //else
        //{
        //    //是微软IE浏览器，则调用微软的Player对象来直接播放音乐
        //    document.write(' <OBJECT id="Player"');
        //    document.write(' type="application/x-ms-wmp"');
        //    document.write(' autostart="false" src= "ding.wav" width=0 height=0> </OBJECT>');
        //}
        setInterval(function(){
            Ext.Ajax.request({
                url: '/lottery/adminInfo',
                success: function (res) {
                    var respText = Ext.util.JSON.decode(res.responseText);
                    var num_withdraw = this.document.getElementById("num_with_draw");
                    num_withdraw.innerHTML =respText.body.withdraw;
                    var num_online   = this.document.getElementById("num_online");
                    num_online.innerHTML =respText.body.online;
                    
                   // var num_recharge   = this.document.getElementById("num_recharge");
                   // num_recharge.innerHTML =respText.body.recharge;
                    
                    var num_totalmoney   = this.document.getElementById("num_totalmoney");
                    num_totalmoney.innerHTML =respText.body.totalmoney;
                    
                    if(respText.body.withdraw > 0 || respText.body.recharge > 0){
                        Player.controls.play();
                    }
                }
            })
        },40000);
    },
    items: [{
        xtype: 'image',
        bind: { // 数据绑定到MainModel中data的ystem.iconUrl
            hidden: '{!system.iconUrl}', // 如果system.iconUrl未设置，则此image不显示
            src: '{system.iconUrl}' // 根据system.iconUrl的设置来加载图片
        }
    }, {
        xtype: 'label',
        bind: {
            text: '{system.name}' // text值绑定到system.name
        },
        style: 'font-size : 20px; color : blue;'
    }, {
        xtype: 'label',
        bind: {
            text: ''
        }
    },{
        xtype: 'label',
     
        
        html:'<div style="margin-top:-10px"><ul><li style="float:left;list-style:none;"><img src="/img/system.png" height="68"></li><li style="float:left;list-style:none; margin:5px">共有<span id="num_with_draw" style="color:green;font-size: 18px;">-</span>笔金币流转请求<br>当前玩家总余额：<span id="num_totalmoney" style="color:green;font-size: 18px;">-</span> 元<br>当前在线人数：<span id="num_online" style="color:green;font-size: 18px;">--</span> 人</li></ul></div>'
    },
        '->', {
            text: '关于',
            handler: function (button) {
                Ext.create('app.view.frame.AboutWindow').show();
            }
        }, {
            text: '注销',
            handler: function () {
                Ext.Ajax.request({
                    url: '/logout',
                    callback: function () {
                        window.location.reload();
                    }
                })
            }
        }]

});