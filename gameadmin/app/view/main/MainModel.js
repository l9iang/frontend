Ext.define('app.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'iMax娱乐管理系统',
        leftName: '系统菜单',
        // 系统信息
        system : {
            name : 'iMax娱乐管理系统',
            version : 'V20',
            iconUrl : '/img/system.png'
        },

        // 用户单位信息和用户信息
        user : {
            company : 'iMaxClub',
            organname : 'iMaxClub',
            username : 'iMaxClub'
        },

        // 服务单位和服务人员信息
        service : {
            company : 'ImaxClub',
            name : 'iMaxClub',
            phonenumber : '',
            email : 'smallcat0122@qq.com',
            copyright : '@iMaxClub'
        }
    }
});