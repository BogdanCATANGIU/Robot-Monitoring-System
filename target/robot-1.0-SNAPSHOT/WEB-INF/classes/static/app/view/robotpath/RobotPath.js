Ext.define('robot.view.robotpath.RobotPath', {
    extend: 'Ext.window.Window',
    xtype: 'robotPath',

    requires: [
        'Ext.draw.Component',
        'robot.view.robotpath.RobotPathController',
        'robot.view.robotpath.RobotPathModel'
    ],

    viewModel: {
        type: 'robotpath'
    },

    controller: 'robotpath',

    width: 1350,
    height: 850,
    resizable: false,

    bodyPadding: 10,
    title: 'Robot monitor',
    closable: true,
    autoShow: false,
    modal: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    listeners: {
        close: function() {
            this.getViewModel().set('jsonData', []);
        }
    },

    items: [
        {
            xtype: 'draw',
            renderTo: document.body,
            name: 'draw',
            id: 'draw',
            width: 1200,
            height: 1000,
            layout: 'fit',
            resetFocusPosition: true,
            sprites: [{
                id: 'circleSprite',
                name: 'circleSprite',
                type: 'circle',
                fillStyle: '#000000',
                r: 20,
                cx: 320,
                cy: 320,
                strokeOpacity: 0.5,
                translationX: -300,
                translationY: -300
            }],
            flex: 35
        },
        {
            layout: {
                type: 'vbox'
            },
            flex: 12,
            items: [
                {xtype: 'fieldset',
                title: 'dz',
                    flex: 8,
                items:[
                {
                    xtype: 'draw',
                    renderTo: document.body,
                    name: 'secondDraw',
                    id: 'secondDraw',
                    width: 290,
                    height: 1200,
                    layout: 'fit',
                    resetFocusPosition: true,
                    plugins: {
                        spriteevents: true
                    },
                    sprites: [{
                        id: 'secondCircleSprite',
                        name: 'secondCircleSprite',
                        type: 'circle',
                        fillStyle: '#000000',
                        strokeOpacity: 0.5,
                        r: 20,
                        cx: 230,
                        cy: 550,
                        translationX: -100,
                        translationY: -500
                    }]
                }]},
        {
            xtype: 'fieldset',
            title: 'Session',
            layout: {
                type: 'vbox'
            },
            flex: 2,
            items: [
                {
                    xtype: 'form',
                    items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Session details',
                    allowBlank: true,
                    id: 'sessionDetails',
                    name: 'sessionDetails'
                },
                {
                    xtype: 'button',
                    text: 'Save session',
                    handler: 'onSaveSession',
                    margin: '10 10 10 180'
                }]
        }
        ]
        }
        ]
}

    ]
});