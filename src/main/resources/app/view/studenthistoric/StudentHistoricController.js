Ext.define('robot.view.studenthistoric.StudentHistoricController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.studenthistoric',

    requires: [
        'robot.view.seefiles.SeeFiles',
        'robot.view.trajectory.Trajectory'
    ],

    init: function(form) {
        var store = Ext.getStore('historicstore');
        store.getProxy().setConfig('extraParams', {
            userName: form.name,
            page: Ext.getCmp('studentHistoricToolbar').getPageData().currentPage,
            size: 100
        });
        store.reload();
    },

    onSeePath: function(button) {
        var data = {
            historicId: button.getWidgetRecord().data.id
        };
        Ext.create(robot.view.trajectory.Trajectory, data).show();
    },

    onSeeFiles: function(button) {
        var data = {
            historicId: button.getWidgetRecord().data.id
        };
        Ext.create(robot.view.seefiles.SeeFiles, data).show();
    }
});