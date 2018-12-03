Ext.define('robot.view.robotpath.RobotPathModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.robotpath',

    data: {
        'jsonData': [],
        'websocket': undefined,
        'userName': undefined
    },

    setJsonData: function(jsonData) {
        this.set('jsonData', jsonData);
    }
});