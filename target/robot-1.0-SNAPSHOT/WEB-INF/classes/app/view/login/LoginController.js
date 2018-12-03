Ext.define('robot.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'Ext.util.Cookies',
        'robot.util.RestApiUrlUtil',
        'robot.view.main.Main',
        'robot.view.register.Register'
    ],

    routes: {
        'robot/v1/register': 'onRegisterClick',
        'robot/v1/home': 'onLoginClick'
    },

    init: function() {

    },

    onLoginClick: function(button) {
        var form = button.up('form').getForm();
        var formValues = form.getFieldValues();
        var userName = formValues.userName;
        var password = formValues.password;

        Ext.Ajax.request({
            url: robot.util.RestApiUrlUtil.getLoginUrl() + "?userName=" + userName + "&password=" + password,
            timeout: 60000,
            method: 'GET',
            scope: this,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response, opts) {
                var now = new Date();
                var expiry = new Date(now.getTime() + 24*60*60*1000*300);
                Ext.util.Cookies.set('userNameCookie', userName, expiry);
                Ext.util.Cookies.set('isAdminCookie', Ext.JSON.decode(response.responseText).isAdmin, expiry);
                this.getView().destroy();

                Ext.create('robot.view.main.Main', {userName: userName}).show();
                this.redirectTo('home');
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.MessageBox.show({
                    title: 'Error!',
                    msg: Ext.decode(response.responseText).message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
         })
    },

    onRegisterClick: function() {
        this.getView().destroy();
        Ext.create({
            xtype: 'form-register'
        }).show();
        this.redirectTo('robot/v1/register');
    }
});