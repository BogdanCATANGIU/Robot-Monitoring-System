Ext.define('robot.view.uploadfile.UploadFile', {
    extend: 'Ext.window.Window',

    requires: [
        'robot.view.uploadfile.UploadFileModel',
		'robot.view.uploadfile.UploadFileController'
    ],

    viewModel: {
        type: 'uploadfile'
    },

    controller: 'uploadfile',

    layout: {
        type: 'vbox',
        align: 'fit'
    },

    bodyPadding: '10 10 0',
    modal: true,

    items: [
        {
            width: 400,
            xtype: 'form',
            reference: 'uploadfile',

            items: [
                {
                    xtype: 'filefield',
                    emptyText: 'Select a file',
                    fieldLabel: 'Upload File',
                    name: 'file',
                    itemId: 'fileupload-field',
                    buttonText: 'Browse...',
                    regexp: /^.*\.(csv|CSV)$/,
                    allowBlank: false,
                    width: 400,
                    regexText: 'Only CSV files are allowed.'
                }
            ],
            buttons: [
                {
                    xtype: 'button',
                    text: 'Upload',
                    handler: 'onUploadFile'
                }
            ]
        }

    ]
});