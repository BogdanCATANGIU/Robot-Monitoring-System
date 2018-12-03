Ext.define('robot.view.register.Register', {
    extend: 'Ext.container.Viewport',
    xtype: 'form-register',

    requires: [
        'robot.view.register.RegisterModel',
        'robot.view.register.RegisterController'
    ],

    viewModel: {
        type: 'register'
    },

    controller: 'register',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    bodyPadding: 10,
    width: 500,
    closable: false,

    items: [
        {
            xtype: 'fieldset',
            title: 'Register',
            items: [
        {
            xtype: 'form',
            reference: 'register-form',

            items: [{
                id: 'r_name',
                name: 'userName',
                xtype: 'textfield',
                width: 400,
                margin: '20 0 20 10',
                fieldLabel: 'User name'
            }, {
                id: 'r_password',
                name: 'password',
                xtype: 'textfield',
                fieldLabel: 'Password',
                enableKeyEvents: true,
                width: 400,
                margin: '20 0 20 10',
                inputType: 'password'
            }, {
                id: 'r_confirmPassword',
                xtype: 'textfield',
                name: 'confirmPassword',
                fieldLabel: 'Confirm password',
                width: 400,
                margin: '20 0 20 10',
                enableKeyEvents: true,
                inputType: 'password',
                listeners: {
                    'keypress': function (form, event) {
                        if (event.getKey() == event.ENTER) {
                            var myBtn = Ext.getCmp('r_saveButton');
                            myBtn.fireHandler();
                        }
                    }
                }
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'Is professor',
                id: 'r_isAdmin',
                name: 'isAdmin',
                margin: '20 0 20 10',
                listeners: {
                    change: 'onIsProfessor'
                }
            }, {
                xtype: 'combo',
                id: 'r_professor',
                name: 'professor',
                queryMode: 'local',
                fieldLabel: 'Professor',
                displayField: 'name',
                valueField: 'id',
                margin: '20 0 20 10',
                editable: false,
                store: 'professorstore',
                hidden: false,
                allowBlank: true
            }],

            buttons: [{
                xtype: 'button',
                text: 'Back to Login',
                formBind: true,
                handler: 'onBackToLogin'
            }, {
                xtype: 'button',
                text: 'Reset',
                formBind: true,
                handler: 'onRReset'
            }, {
                id: 'r_saveButton',
                xtype: 'button',
                text: 'Save',
                formBind: true,
                handler: 'onRSave'
            }
            ]
        }
        ]
}]
});
