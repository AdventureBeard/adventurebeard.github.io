angular.module('app.controllers')
    .controller('PostEditorController', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {

        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDay();
        var yyyy = today.getFullYear();

        $scope.date = mm + "/" + dd + "/" + yyyy;

        var opts = {
            container: 'epiceditor',
            textarea: null,
            basePath: 'bower_components/EpicEditor/epiceditor',
            clientSideStorage: true,
            localStorageName: 'epiceditor',
            useNativeFullscreen: true,
            parser: marked,
            file: {
                name: 'epiceditor',
                defaultContent: '',
                autoSave: 100
            },
            theme: {
                base: '/themes/base/epiceditor.css',
                preview: '/themes/preview/github.css',
                editor: '/themes/editor/epic-light.css'
            },
            button: {
                preview: true,
                fullscreen: true,
                bar: "show"
            },
            focusOnLoad: false,
            shortcut: {
                modifier: 18,
                fullscreen: 70,
                preview: 80
            },
            string: {
                togglePreview: 'Toggle Preview Mode',
                toggleEdit: 'Toggle Edit Mode',
                toggleFullscreen: 'Enter Fullscreen'
            },
            autogrow: false
        }
        var editor = new EpicEditor(opts).load();
        editor.reflow('Height')


        $scope.items = [
            {id: 1, title: 'Scooby Doo'},
            {id: 2, title: 'Shaggy Rodgers'},
            {id: 3, title: 'Fred Jones'},
            {id: 4, title: 'Daphne Blake'},
            {id: 5, title: 'Velma Dinkley'},
        ];


        $rootScope.showNavbar = false;

    }]);