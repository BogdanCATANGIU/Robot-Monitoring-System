Ext.define('robot.store.ProfessorStore', {
    extend: 'Ext.data.Store',

    alias: 'store.professor',
    storeId: 'professorstore',

    model: 'robot.model.ProfessorModel',
    autoLoad: false,

    proxy: {
        type: 'rest',
        url: robot.util.RestApiUrlUtil.getGetProfessorsUrl(),
        headers: {
            'Content-Type': 'application/json'
        },
        reader: {
            type: 'json',
            rootProperty: 'content',
            totalProperty: 'totalElement',
            model: 'robot.model.ProfessorModel'
        }
    }
});