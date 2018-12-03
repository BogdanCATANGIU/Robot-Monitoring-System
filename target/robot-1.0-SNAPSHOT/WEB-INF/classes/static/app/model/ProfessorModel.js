Ext.define('robot.model.ProfessorModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'auto'},
        { name: 'name', type: 'string'},
        { name: 'professorName', type: 'string'},
        { name: 'isAdmin', type: 'string'}
    ]
});