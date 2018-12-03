Ext.define('robot.util.RestApiUrlUtil', {
    statics: {
        getEnv: function() {
            return (Ext.manifest['ENV']) ? Ext.manifest['ENV'] : "";
        },
        getBasePath: function() {
            var basePath = window.location.protocol + "//" + window.location.host + "/" + this.getEnv()['remoteBaseUrl'];
            if(window.location.host.indexOf("localhost") !== -1) {
                basePath = "http://localhost:8090/" + this.getEnv()['remoteBaseUrl'];
            }
            return basePath + 'robot/v1';
        },

        getLoginUrl: function () {
            return this.getBasePath() + "/login";
        },

        getRegisterUrl: function () {
            return this.getBasePath() + "/register";
        },

        getGetStudentsUrl: function() {
            return this.getBasePath() + "/get_students";
        },

        getGetHistoricUrl: function() {
            return this.getBasePath() + "/get_historic";
        },

        getCreateHistoricEntryUrl: function() {
            return this.getBasePath() +"/create_historic_entry";
        },

        getGetProfessorsUrl: function() {
            return this.getBasePath() + "/get_professors";
        },

        getGetCoordinatesUrl: function() {
            return this.getBasePath() + "/get_session_coordinates";
        },

        getGetUploadFileUrl: function() {
            return this.getBasePath() + "/upload_file";
        },

        getGetFilesUrl: function() {
            return this.getBasePath() + "/get_files";
        },

        getDownloadFileUrl: function() {
            return this.getBasePath() + "/download_file";
        },

        getDeleteFileUrl: function() {
            return this.getBasePath() + "/delete_file";
        }
    }
});