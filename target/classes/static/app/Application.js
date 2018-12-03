Ext.define('robot.Application', {
    extend: 'Ext.app.Application',

    name: 'robot',

    models: [
        'UserModel',
        'HistoricModel',
        'ProfessorModel',
        'CoordinatesModel',
        'FileModel'
    ],

    stores: [
        'UserStore',
        'HistoricStore',
        'ProfessorStore',
        'CoordinatesStore',
        'FileStore'
    ],

    routes: {
        'robot/v1/login': 'launch'
    },

    requires: [
        'Ext.direct.Manager'
    ],

    launch: function() {
        var loggedIn = Ext.util.Cookies.get('userNameCookie');

        Ext.create({
            xtype: loggedIn ? 'app-main' : 'login'
        });

        loggedIn ? this.redirectTo('home') : this.redirectTo('robot/v1/login');
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
