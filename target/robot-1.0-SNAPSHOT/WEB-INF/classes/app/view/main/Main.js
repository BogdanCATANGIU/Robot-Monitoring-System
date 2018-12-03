Ext.define('robot.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'robot.view.main.MainController',
        'robot.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 100,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'displayfield',
                    reference: 'applicationName',
                    bind: 'ROBOT',
                    fieldStyle: 'font-size: 60px',
                    cls: 'application-name'
                },
                {
                    xtype: 'button',
                    text: 'View robot path',
                    width: 120,
                    id: 'viewRobotPathBtn',
                    handler: 'onViewPath',
                    hidden: false
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'displayfield',
                    bind: '<span>Welcome, {userName}</span>'
                },
                {
                    xtype: 'button',
                    text: 'Logout',
                    width: 100,
                    handler: 'onLogout'
                }
            ]
        },
        {
            xtype: 'form-historic',
            flex: 1,
            reference: 'mainCardPanel',
            cls: 'sencha-dash-right-main-container',
            itemId: 'contentPanel',
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }
    ]
});
