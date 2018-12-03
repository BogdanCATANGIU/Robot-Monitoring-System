Ext.define('robot.store.UserStore', {
    extend: 'Ext.data.Store',

    alias: 'store.user',
    storeId: 'userstore',

    model: 'robot.model.UserModel',
    autoLoad: false,

    proxy: {
        type: 'rest',
        url: robot.util.RestApiUrlUtil.getGetStudentsUrl(),
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'content',
            totalProperty: 'totalElement',
            model: 'robot.model.UserModel'
        }
    }
});