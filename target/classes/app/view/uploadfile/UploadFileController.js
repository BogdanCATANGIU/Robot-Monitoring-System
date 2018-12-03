Ext.define('robot.view.uploadfile.UploadFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.uploadfile',

    init: function(form) {
        this.getViewModel().set('historicId', form.historicId)
    },

    onUploadFile: function(button) {
        var form = button.up('form').getForm();
        if (!form.isValid()) {
            return;
        }

        var fileField = form.findField('file');
        var domFileItem = fileField.extractFileInput();
        if(domFileItem.files.length != 1) {
            fileField.markInvalid('Please select a file.');
            return;
        }
        
        var file = domFileItem.files[0];
        var formData = new FormData();
        var historicId = this.getViewModel().get('historicId');
        formData.append('historicId', historicId);
        var me = this;
        var callback = function (xhr) {
            if (xhr.status === 200) {
                Ext.MessageBox.show({
                    title: 'Feedback',
                    msg: "File uploaded!",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                me.getView().close();
                var store = Ext.getStore('fileStore');
                store.getProxy().setConfig('extraParams', {
                    historicId: historicId,
                    page: Ext.getCmp('fileToolbar').getPageData().currentPage,
                    size: 100
                });
                store.reload();
            } else {
                fileField.markInvalid('Unhandled status: ' + xhr.status);
            }
        };

        debugger;
        robot.util.FormUtil.performAsyncFileUpload(file, robot.util.RestApiUrlUtil.getGetUploadFileUrl(), formData, callback);
    }
});