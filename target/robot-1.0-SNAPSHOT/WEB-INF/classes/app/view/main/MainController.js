Ext.define('robot.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.util.Cookies'
    ],

    routes: {
        ':node': 'onRouteChange'
    },

    lastView: null,

    init: function (form) {
        this.getViewModel().set('userName', Ext.util.Cookies.get('userNameCookie'));
        var isAdmin = Ext.util.Cookies.get('isAdminCookie');
        if (isAdmin === 'no') {
            Ext.getCmp('viewRobotPathBtn').setHidden(false);
        } else {
            Ext.getCmp('viewRobotPathBtn').setHidden(true);
        }
    },

    onMainViewRender:function() {
        if (window.location.hash === '#robot/' || window.location.href === '#robot/v1/login') {
            this.redirectTo('home');
        }
    },

    onRouteChange:function(id){
        this.setCurrentView(id);
    },

    onLogout: function(){
        Ext.Msg.confirm('Logout?', 'Are you sure you want to logout?', function(answer){
            if (answer === "yes") {
                Ext.util.Cookies.clear('userNameCookie');
                Ext.util.Cookies.clear('isAdminCookie');
                window.location.href = "";
                Ext.create({
                    xtype: 'login'
                }).show();
            }
        });
    },

    onViewPath: function(button) {
        Ext.create({
            xtype: 'robotPath'
        }).show();


    }
});
