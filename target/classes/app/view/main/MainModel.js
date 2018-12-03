Ext.define('robot.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'Ext.util.Cookies'
    ],

    data: {
        name: 'robot',
        userName: undefined
    }

});
