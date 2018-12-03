Ext.define('robot.view.historic.HistoricController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.historic',

    requires: [
        'Ext.util.Cookies',
        'robot.view.seefiles.SeeFiles',
        'robot.view.studenthistoric.StudentHistoric',
        'robot.view.trajectory.Trajectory',
        'robot.view.uploadfile.UploadFile'
    ],

    init: function() {
        var me = this,
            viewModel = me.getViewModel(),
            view = me.view,
            grid = me.lookup('recordGrid');
        var etc;
        var store;
        if (Ext.util.Cookies.get('isAdminCookie') === 'yes') {
            etc = view.etc['Students'];
            store = Ext.getStore('userstore');
            store.getProxy().setConfig('extraParams', {
                userName: Ext.util.Cookies.get('userNameCookie'),
                page: Ext.getCmp('toolbar').getPageData().currentPage,
                size: 100
            });
            store.reload();
        } else {
            etc = view.etc['Historic'];
            store = Ext.getStore('historicstore');
            store.getProxy().setConfig('extraParams', {
                userName: Ext.util.Cookies.get('userNameCookie'),
                page: Ext.getCmp('toolbar').getPageData().currentPage,
                size: 100
            });
            store.reload();
        }

        grid.reconfigure(store, etc.columns);
    },

    onSeeHistoric: function(button) {
        var data = {
            name: button.getWidgetRecord().data.name
        };
        Ext.create(robot.view.studenthistoric.StudentHistoric, data).show();
    },

    onSeePath: function(button) {
        var data = {
            historicId: button.getWidgetRecord().data.id
        };
        Ext.create(robot.view.trajectory.Trajectory, data).show();
    },

    onUploadFile: function(button) {
        var data = {
            historicId: button.getWidgetRecord().data.id
        };
        Ext.create(robot.view.uploadfile.UploadFile, data).show();
    },

    onSeeFiles: function(button) {
        var data = {
            historicId: button.getWidgetRecord().data.id
        };
        Ext.create(robot.view.seefiles.SeeFiles, data).show();
    }
});