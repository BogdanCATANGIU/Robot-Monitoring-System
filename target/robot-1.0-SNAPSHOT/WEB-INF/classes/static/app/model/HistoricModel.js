Ext.define('robot.model.HistoricModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'userName', type: 'string'},
        { name: 'date', type: 'auto'},
        { name: 'details', type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url: robot.util.RestApiUrlUtil.getGetHistoricUrl(),
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'content',
            totalProperty: 'totalElement',
            // model: 'robot.model.HistoricModel',
            transform: {
                fn: function (data) {
                    Ext.each(data.content, function(obj) {
                        obj.date = new Date(obj.date);
                    });
                    return data;
                }
            }
        }
    }
});