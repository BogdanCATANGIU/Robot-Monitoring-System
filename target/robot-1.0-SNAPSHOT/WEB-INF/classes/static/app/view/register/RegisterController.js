Ext.define('robot.view.register.RegisterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.register',

    init: function() {
        var professorStore = Ext.getStore('professorstore');
        professorStore.load();
    },

    onRReset: function() {
        this.lookupReference('register-form').getForm().reset();
    },

    onBackToLogin: function() {
        this.getView().destroy();
        Ext.create({
            xtype: 'login'
        }).show();
        this.redirectTo('robot/v1/login');
    },

    onRSave: function(button) {
        var form = button.up('form').getForm();
        var userName = form.findField('userName').value,
            password = form.findField('password').value,
            confirmPassword = form.findField('confirmPassword').value,
            isAdmin = form.findField('isAdmin').value === true ? 'yes' : 'no',
            professorId = form.findField('professor').value;
        var me = this;
        Ext.Ajax.request({
            url: robot.util.RestApiUrlUtil.getRegisterUrl() +
                "?userName=" + userName +
                "&password=" + password +
                "&confirmPassword=" + confirmPassword +
                "&isAdmin=" + isAdmin +
                "&professorId=" + professorId,
            method: 'POST',
            scope: me,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Feedback',
                    msg: "You are now registered",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.onBackToLogin();
            },
            failure: function (response, otps) {
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

    onIsProfessor: function(checkbox, checked) {
        var form = checkbox.up('form').getForm();
        if (checked) {
            Ext.getCmp('r_professor').setHidden(true);
        } else {
            Ext.getCmp('r_professor').setHidden(false);
        }
    }
});