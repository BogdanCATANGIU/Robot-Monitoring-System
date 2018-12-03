Ext.define('robot.view.historic.Historic', {
    extend: 'Ext.panel.Panel',
    xtype: 'form-historic',

    requires: [
        'robot.view.historic.HistoricModel',
		'robot.view.historic.HistoricController'
    ],

    viewModel: {
        type: 'historic'
    },

    controller: 'historic',

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

    items: [
        {
            xtype: 'grid',

            reference: 'recordGrid',

            columnWidth: 1,
            flex: 1,

            tbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                id: 'toolbar',
                displayMsg: 'Display data set {0} - {1} of {2}',
                emptyMsg: 'No data to display'
            },

            columnLines: true,

            columns: [],

            viewConfig: {
                enableTextSelection: true
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Text here',
            name: 'testfield'
        },
        {
            xtype: 'button',
            text: 'chick here',
            handler: 'onClickHereClick'
        }
    ],

    etc: {
        Students: {
            store: 'userstore',
            columns: [{
                text: 'Student name',
                dataIndex: 'name',
                flex: 8
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                sortable: false,
                flex: 1,
                widget: {
                    xtype: 'button',
                    text: 'See historic',
                    handler: 'onSeeHistoric'
                }
            }]
        },
        Historic: {
            store: 'historicstore',
            columns: [{
                text: 'Details',
                dataIndex: 'details',
                flex: 7
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
                flex: 1
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'button',
                    text: 'See uploaded files',
                    handler: 'onSeeFiles'
                },
                flex: 1
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'button',
                    text: 'Upload file',
                    handler: 'onUploadFile'
                },
                flex: 1
            }]
        }
    }
});