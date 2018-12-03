Ext.define('robot.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'robot.view.login.LoginModel',
		'robot.view.login.LoginController'
    ],

    viewModel: {
        type: 'login'
    },

    controller: 'login',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    width: 450,
    resizable: false,

    bodyPadding: 10,
    title: 'Login',
    closable: false,
    autoShow: true,

    items: [
        {
            xtype: 'form',
            reference: 'login-form',

            items: [{
                xtype: 'displayfield',
                hideEmptyLabel: false,
                value: 'Please sign in.'
            }, {
                xtype: 'textfield',
                name: 'userName',
                fieldLabel: 'User name',
                width: 410,
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Parola',
                allowBlank: false,
                width: 410,
                enableKeyEvents: true,
                listeners: {
                    'keypress': function (form, event) {
                        if (event.getKey() == event.ENTER) {
                            var myBtn = Ext.getCmp('loginButton');
                            myBtn.fireHandler();
                        }
                    }
                }
            }],

            buttons: [
                {
                    id: 'register',
                    text: 'Register',
                    listeners: {
                        click: 'onRegisterClick'
                    }
                },
                {
                    id: 'loginButton',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginClick'
                    }
                }]
        }
    ]
});