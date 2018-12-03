Ext.define('robot.view.robotpath.RobotPathController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.robotpath',

    requires: [
        'Ext.util.Cookies',
        'robot.util.RestApiUrlUtil'
    ],


    init: function(view) {
        // console.log(WebSocket);
        var me = this,
            vm = me.getViewModel(),
            websocket = new WebSocket('ws://localhost:8090/name');

        websocket.onopen = me.onOpen;
        websocket.onclose = me.onClose;
        websocket.onmessage = me.onMessage;
        websocket.onerror = me.onError;

        vm.set('websocket', websocket);
        // Ext.AnimationQueue.start(me.onRender, me);

        // setTimeout( function() {
        //     doSend('hello world');
        // }, 3000);

    },

    onOpen: function(evt) {
        console.log("CONNECTED");
        // doSend("WebSocket rocks");
    },

    onClose: function(evt) {
        // var websocket = this.getViewModel().get('websocket');
        // websocket.close();
        console.log("DISCONNECTED");
    },

    onMessage: function(evt) {
        if(!evt) {
            return;
        }

        var sprite = Ext.getCmp('draw').sprites[0];
        var secondSprite = Ext.getCmp('secondDraw').sprites[0];
        var data = evt.data;
        if (data !== null && data !== "data=") {
            var splitedData = data.split("%3A+");
            var cx = splitedData[1].split("%")[0];
            var cy = splitedData[2].split("%")[0];
            var r = splitedData[3].split("%")[0];
            cx = Number(cx);
            cy = Number(cy);
            r = Number(r);

            sprite.setAnimation({
                duration: 90,
                easing: 'linear'
            });
            sprite.setAttributes({
                cx: cx * 3,
                cy: cy * 3
            });
            sprite.getSurface().renderFrame();

            secondSprite.setAnimation({
                duration: 90,
                easing: 'linear'
            });
            secondSprite.setAttributes({
                cy: r * 2
            });
            secondSprite.getSurface().renderFrame();

            var viewModel = Ext.getCmp('draw').up().viewModel;
            var jsonData = viewModel.get('jsonData');
            jsonData.push({
                'dx': cx,
                'dy': cy,
                'dz': r
            });

            viewModel.set('jsonData', jsonData);
        }
    },

    // onRender: function() {
    //     var viewModel = Ext.getCmp('draw').up().viewModel,
    //         jsonData = viewModel.get('jsonData'),
    //         sprite = Ext.getCmp('draw').sprites[0],
    //         secondSprite = Ext.getCmp('secondDraw').sprites[0];
    //
    //         if (!jsonData && jsonData.length === 0 && !jsonData[0]) {
    //         return;
    //         }
    //         var data = jsonData[0];
    //         if (!data) {
    //             return;
    //         }
    //
    //         console.log('+++++++++++++++++++++');
    //         console.log(data);
    //         var cx = data['dx'],
    //             cy = data['dy'],
    //             r = data['dz'];
    //
    //         sprite.setAnimation({
    //             duration: 100,
    //             easing: 'linear'
    //         });
    //         sprite.setAttributes({
    //             cx: cx,
    //             cy: cy
    //         });
    //         sprite.getSurface().renderFrame();
    //
    //         secondSprite.setAnimation({
    //             duration: 100,
    //             easing: 'linear'
    //         });
    //         secondSprite.setAttributes({
    //             cy: r
    //         });
    //         secondSprite.getSurface().renderFrame();
    //
    //         jsonData.shift();
    // },

    onError: function(evt) {
        console.log(evt.data);
    },

    doSend: function(message) {
        var websocket = this.getViewModel('websocket');
        console.log("SENT: " + message);
        websocket.send(message);
    },

    onSaveSession: function(button) {
        var me = this;
        var details = button.up('form').getForm().findField('sessionDetails').value ? button.up('form').getForm().findField('sessionDetails').value : null;
        var jsonData = me.getViewModel().get('jsonData');

        Ext.Ajax.request({
            url: robot.util.RestApiUrlUtil.getCreateHistoricEntryUrl() + "?userName=" + Ext.util.Cookies.get('userNameCookie') + "&details=" + details,
            method: 'POST',
            scope: this,
            jsonData: jsonData,
            success: function (response, opts, form) {
                Ext.toast({
                    html: 'All went well',
                    closable: false,
                    align: 't',
                    slideDuration: 400,
                    maxWidth: 400
                });
                me.getViewModel().set('jsonData', null);
                var store = Ext.getStore('historicstore');
                store.getProxy().setConfig('extraParams', {
                    userName: form.name,
                    page: Ext.getCmp('studentHistoricToolbar').getPageData().currentPage,
                    size: 100
                });
                store.reload();
            },
            failure: function (response, opts) {
                Ext.MessageBox.show({
                    title: 'Feedback',
                    msg: Ext.JSON.decode(response.responseText),
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        })
    },

    destroy: function () {
        Ext.AnimationQueue.stop(this.onRender, this);
        this.callParent();
    }

});