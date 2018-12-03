Ext.define('robot.view.seefiles.SeeFilesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.seefiles',

    init: function(form) {
        var store = Ext.getStore('fileStore');
        store.getProxy().setConfig('extraParams', {
            historicId: form.historicId,
            page: Ext.getCmp('fileToolbar').getPageData().currentPage,
            size: 100
        });
        this.getViewModel().set('historicId', form.historicId);
        store.reload();
    },

    onDownloadFile: function(button) {
        var fileId = button.getWidgetRecord().data.id;

        Ext.Ajax.request({
            url: robot.util.RestApiUrlUtil.getDownloadFileUrl() + '?documentId=' + fileId,
            method: 'GET',
            scope: this,
            success: function (response, opts, form) {
                var link = document.createElement('a');
                link.href = robot.util.RestApiUrlUtil.getDownloadFileUrl() + '?documentId=' + fileId;
                document.body.appendChild(link);
                link.click();
            },
            failure: function (response, opts) {
                Ext.MessageBox.show({
                    title: 'Feedback',
                    msg: Ext.JSON.decode(response.responseText),
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        })
    },

    onDeleteFile: function(button) {
        var fileId = button.getWidgetRecord().data.id;

        Ext.Ajax.request({
            url: robot.util.RestApiUrlUtil.getDeleteFileUrl() + '?documentId=' + fileId,
            method: 'DELETE',
            scope: this,
            success: function (response, opts, form) {
                var store = Ext.getStore('fileStore');
                store.getProxy().setConfig('extraParams', {
                    historicId: this.getViewModel().get('historicId'),
                    page: Ext.getCmp('fileToolbar').getPageData().currentPage,
                    size: 100
                });
                store.reload();
            },
            failure: function (response, opts) {
                Ext.MessageBox.show({
                    title: 'Feedback',
                    msg: Ext.JSON.decode(response.responseText),
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        })
    }
});