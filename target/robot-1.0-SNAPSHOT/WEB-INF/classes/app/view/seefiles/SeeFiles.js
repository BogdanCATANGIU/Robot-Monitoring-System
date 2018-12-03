Ext.define('robot.view.seefiles.SeeFiles', {
    extend: 'Ext.window.Window',

    requires: [
        'robot.view.seefiles.SeeFilesModel',
		'robot.view.seefiles.SeeFilesController'
    ],

    viewModel: {
        type: 'seefiles'
    },

    controller: 'seefiles',
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
                id: 'fileToolbar',
                displayMsg: 'Display data set {0} - {1} of {2}',
                emptyMsg: 'No data to display'
            },

            columnLines: true,

            store: 'fileStore',

            columns: [{
                text: 'File name',
                dataIndex: 'name',
                flex: 8
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                sortable: false,
                widget: {
                    xtype: 'button',
                    text: 'Download file',
                    handler: 'onDownloadFile'
                },
                flex: 1
            }, {
                align: 'center',
                xtype: 'widgetcolumn',
                sortable: false,
                widget: {
                    xtype: 'button',
                    text: 'Delete file',
                    handler: 'onDeleteFile'
                },
                flex: 1
            }]
        }
    ]
});