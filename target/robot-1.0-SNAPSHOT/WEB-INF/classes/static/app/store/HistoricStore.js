Ext.define('robot.store.HistoricStore', {
    extend: 'Ext.data.Store',

    alias: 'store.historic',
    storeId: 'historicstore',

    model: 'robot.model.HistoricModel',
    autoLoad: false

});