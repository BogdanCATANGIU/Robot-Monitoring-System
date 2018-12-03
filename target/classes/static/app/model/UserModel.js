Ext.define('robot.model.UserModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name', type: 'string'},
        { name: 'professorName', type: 'string'},
        { name: 'isAdmin', type: 'string'}
    ]
});