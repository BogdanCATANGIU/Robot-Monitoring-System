Ext.application({
    extend: 'robot.Application',

    name: 'robot',

    requires: [
        // This will automatically load all classes in the robot namespace
        // so that application classes do not need to require each other.
        'robot.util.RestApiUrlUtil',
        'robot.*'
    ]

    // The name of the initial view to create.
    // mainView: 'robot.view.main.Main'
});
