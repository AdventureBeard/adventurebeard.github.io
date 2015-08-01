angular.module('app.controllers')
    .controller('PostEditorController', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {

        $scope.editorposts = undefined;
        var editor = undefined;

        function loadEditor(startingContent) {
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
                    defaultContent: 'TEST TEST TEST',
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
            editor = new EpicEditor(opts).load();
            editor.reflow('Height')
        }

        $scope.loadPost = function(id) {
            console.log("Got id: " + id);
            $scope.selectedPost = $scope.editorposts[id-1];
            editor.importFile(null, $scope.selectedPost.content);
            editor.load();

        }

        $http.get('data/posts.json').success(function (data) {
            $scope.editorposts = data.reverse();
            $scope.selectedPost = $scope.editorposts[0];
            loadEditor($scope.selectedPost.content);

        });

        $rootScope.showNavbar = false;

    }]);