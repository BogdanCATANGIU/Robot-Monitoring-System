Ext.define('robot.view.trajectory.TrajectoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trajectory',

    init: function(form) {
        var jsonData = [];

        var coordinatesStore = Ext.getStore('coordinatesstore');
        coordinatesStore.getProxy().setConfig('extraParams', {
            historicId: form.historicId
        });
        jsonData = coordinatesStore.load();

        this.getViewModel().set('jsonData', jsonData);
    },

    onRewatch: function() {

        var coordinates = this.getViewModel().get('jsonData').data.items;

        var data = this.getViewModel().get('data');
        var cx, cy, r;
        for (i = 0; i < coordinates.length; i++) {
            cx = coordinates[i].data.dx;
            cy = coordinates[i].data.dy;
            r = coordinates[i].data.dz;
            data.push({
                'dx': cx,
                'dy': cy,
                'dz': r
            })
        }

        this.getViewModel().set('data', data);

        Ext.AnimationQueue.start(this.onRender, this);
    },

    onRender: function() {

        var sprite = Ext.getCmp('trajectoryDraw').sprites[0],
            secondSprite = Ext.getCmp('trajectorySecondDraw').sprites[0];

        var viewModel = Ext.getCmp('trajectoryDraw').up().viewModel,
                    jsonData = viewModel.get('data');
        if (!jsonData || jsonData.length === 0 || !jsonData[0]) {
            return;
        }
        // var data = jsonData[0];
        var cx = jsonData[0]['dx'],
                        cy = jsonData[0]['dy'],
                        r = jsonData[0]['dz'];

                    sprite.setAnimation({
                        duration: 90,
                        easing: 'linear'
                    });
                    sprite.setAttributes({
                        cx: 550 + cy * (-1),
                        cy: 450 + cx * (-1)
                    });
                    sprite.getSurface().renderFrame();

                    secondSprite.setAnimation({
                        duration: 90,
                        easing: 'linear'
                    });
                    secondSprite.setAttributes({
                        cy: 350 + (r * (-1))
                    });
                    secondSprite.getSurface().renderFrame();

                    jsonData.shift();
    },

    destroy: function () {
        Ext.AnimationQueue.stop(this.onRender, this);
        this.callParent();
    }
});