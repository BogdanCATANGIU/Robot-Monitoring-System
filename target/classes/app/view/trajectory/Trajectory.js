Ext.define('robot.view.trajectory.Trajectory', {
    extend: 'Ext.window.Window',
    xtype: 'trajectory',

    requires: [
        'robot.view.trajectory.TrajectoryModel',
		'robot.view.trajectory.TrajectoryController'
    ],

    viewModel: {
        type: 'trajectory'
    },

    controller: 'trajectory',

    width: 1550,
    height: 950,
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

    items: [
        {
            xtype: 'draw',
            renderTo: document.body,
            name: 'draw',
            id: 'trajectoryDraw',
            width: 1200,
            height: 1000,
            layout: 'fit',
            resetFocusPosition: true,
            sprites: [{
                id: 'trajectoryCircleSprite',
                name: 'circleSprite',
                type: 'circle',
                fillStyle: '#000000',
                r: 20,
                cx: 550,
                cy: 450,
                strokeOpacity: 0.5,
                // translationX: -300,
                // translationY: -300
            }, {
                type: 'image',
                src: Ext.getResourcePath('axa-x-y.PNG'),
                x: 970,
                y: 660
            }]
            // flex: 35
        },
        {
            layout: {
                type: 'vbox'
            },
            flex: 12,
            items: [
                {xtype: 'fieldset',
                    title: 'dz',
                    flex: 80,
                    items:[
                        {
                            xtype: 'draw',
                            renderTo: document.body,
                            name: 'secondDraw',
                            id: 'trajectorySecondDraw',
                            width: 290,
                            height: 1200,
                            layout: 'fit',
                            resetFocusPosition: true,
                            plugins: {
                                spriteevents: true
                            },
                            sprites: [{
                                id: 'trajectorySecondCircleSprite',
                                name: 'secondCircleSprite',
                                type: 'circle',
                                fillStyle: '#000000',
                                strokeOpacity: 0.5,
                                r: 20,
                                cx: 60,
                                cy: 200,
                                // translationX: -100,
                                translationY: 200
                            }, {
                                type: 'image',
                                src: Ext.getResourcePath('axa-z.PNG'),
                                x: 250,
                                y: 450
                            }]
                        }]},
                {
                    xtype: 'fieldset',
                    title: 'Session',
                    layout: {
                        type: 'vbox'
                    },
                    width: 325,
                    flex: 15,
                    items: [
                        {
                            xtype: 'form',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Watch robot trajectory',
                                    handler: 'onRewatch'
                                }]
                        }
                    ]
                }
            ]
        }
    ]
});