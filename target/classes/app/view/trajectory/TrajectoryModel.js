Ext.define('robot.view.trajectory.TrajectoryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.trajectory',

    data: {
        jsonData: [],
        data: []
    },

    setJsonData: function(jsonData) {
        this.set('jsonData', jsonData);
    }
});