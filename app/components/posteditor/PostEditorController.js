angular.module('app.controllers')
    .controller('PostEditorController', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {

        $scope.editorposts = undefined;
        $scope.selectedId = 0;
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
            reloadPosts();
            $scope.selectedId = id;
            console.log("Got id: " + id);
            editor.importFile(null, $scope.editorposts[$scope.selectedId-1].content);
            editor.load()
        };

        $scope.savePosts = function() {
            console.log("Saving posts...");
            var body = editor.getElement('editor').body;
            var content = ( body.innerText || body.textContent );
            $scope.editorposts[$scope.selectedId-1].content = content;
            $http.post('http://localhost:3000/save', $scope.editorposts);
            reloadPosts();
        };

        var reloadPosts = function() {
            console.log("Reloading posts...");
            $http.get('http://localhost:3000/posts').success(function (data) {
                $scope.editorposts = data;
            });
        };

        var loadPosts = function() {
            console.log("Loading posts...");
            $http.get('http://localhost:3000/posts').success(function (data) {
                $scope.editorposts = data;
                $scope.selectedPost = $scope.editorposts[0];
                loadEditor($scope.selectedPost.content);
            });
        }

        $rootScope.showNavbar = false;
        loadPosts();

    }]);