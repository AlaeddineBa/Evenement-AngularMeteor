(function () {
    'use strict';

    angular
        .module('event')
        .config(themeIcons);

    themeIcons.$inject = ['$mdIconProvider'];

    function themeIcons ($mdIconProvider) {

        $mdIconProvider
            .iconSet("action", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
            .iconSet("alerte", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg")
            .iconSet("av", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg")
            .iconSet("communication", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
            .iconSet("content", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
            .iconSet("device", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-device.svg")
            .iconSet("editor", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg")
            .iconSet("file", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg")
            .iconSet("hardware", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-hardware.svg")
            .iconSet("image", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg")
            .iconSet("maps", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg")
            .iconSet("navigation", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
            .iconSet("notification", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-notification.svg")
            .iconSet("places", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-places.svg")
            .iconSet("social", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
            .iconSet("toggle", "/packages/thoms_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg");

    };

})();