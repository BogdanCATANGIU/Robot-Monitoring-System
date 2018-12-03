Ext.define('robot.store.FileStore', {
    extend: 'Ext.data.Store',

    alias: 'store.file',
    storeId: 'fileStore',

    model: 'robot.model.FileModel',
    autoLoad: false,

    proxy: {
        type: 'rest',
        url: robot.util.RestApiUrlUtil.getGetFilesUrl(),
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'content',
            totalProperty: 'totalElement',
            model: 'robot.model.FileModel'
        }
    }
});