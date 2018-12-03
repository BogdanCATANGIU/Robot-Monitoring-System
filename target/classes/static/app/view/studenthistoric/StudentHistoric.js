Ext.define('robot.view.studenthistoric.StudentHistoric', {
    extend: 'Ext.window.Window',
    xtype: 'studentHistoric',

    requires: [
        'robot.view.studenthistoric.StudentHistoricModel',
		'robot.view.studenthistoric.StudentHistoricController'
    ],

    viewModel: {
        type: 'studenthistoric'
    },

    controller: 'studenthistoric',

    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: '0 0 0',

    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side'
    },

    fieldDefaults: {
        labelWidth: 70
    },

    width: 1200,
    height: 800,

    items: [
        {
            xtype: 'grid',

            tbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                id: 'studentHistoricToolbar',
                displayMsg: 'Display data set {0} - {1} of {2}',
                emptyMsg: 'No data to display'
            },

            columnLines: true,

            store: 'historicstore',
            columns: [{
                text: 'Details',
                dataIndex: 'details',
                flex: 8
            }, {
                text: 'Date',
                dataIndex: 'date',
                renderer: function(value) {
                    return Ext.Date.format(new Date(value), 'd.m.Y');
                },
                flex: 2
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                sortable: false,
                widget: {
                    xtype: 'button',
                    text: 'See trajectory',
                    handler: 'onSeePath'
                },
                flex: 2
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'button',
                    text: 'See uploaded files',
                    handler: 'onSeeFiles'
                },
                flex: 2
            }]
        }
    ]
});