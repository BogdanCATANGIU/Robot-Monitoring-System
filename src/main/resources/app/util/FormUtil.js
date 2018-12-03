Ext.define('robot.util.FormUtil', {

    statics: {
        performAsyncFileUpload: function (file, postUrl, formData, callback) {
            // assemble form data
            var data = formData || new FormData();
            data.append('file', file, file.name);
            // formData.append(formData);

            // send form data with ajax request to the target url
            var xhr = new XMLHttpRequest();
            xhr.open('POST', postUrl, true);

            xhr.onload = function(){
                callback(xhr);
            };
            // send
            xhr.send(data);
        },

        performAsyncSave: function(postUrl, formData, callback) {
            var data = formData || new FormData();

            var xhr = new XMLHttpRequest();
            xhr.open('POST', postUrl, true);

            xhr.onload = function () {
                callback(xhr);
            };

            xhr.send(data);
        }

        // performAsyncUpdate: function(putUrl, formData, callback) {
        //     var data = formData || new FormData();
        //
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('PUT', putUrl + "?iban=" + data.get("iban") + "&newAlias=" + data.get("newAlias"), true); //why is newAlias null?
        //
        //     xhr.onload = function () {
        //         callback(xhr);
        //     };
        //
        //     xhr.send(data);
        // }
    }
});