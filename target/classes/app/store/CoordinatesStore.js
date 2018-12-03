Ext.define('robot.store.CoordinatesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.coordinates',
    storeId: 'coordinatesstore',

    model: 'robot.model.CoordinatesModel',
    autoLoad: false,

    proxy: {
        type: 'rest',
        url: robot.util.RestApiUrlUtil.getGetCoordinatesUrl(),
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'content',
            totalProperty: 'totalElement',
            model: 'robot.model.CoordinatesModel'
        }
    }

});