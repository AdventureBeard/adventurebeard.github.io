angular.module('app.controllers')
    .controller('PostEditorController', ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {

        $scope.editorposts = undefined;
        var selectedId = 0;
        $scope.postTitle = "";
        $scope.postDate = "";
        var editor = undefined;

        function loadEditor(startingContent) {
            var opts = {
                container: 'epiceditor',
                textarea: null,
                basePath: 'bower_components/EpicEditor/epiceditor',
                clientSideStorage: false,
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

        var loadPosts = function() {  // Fix or get rid of this. Doesn't fit with the paradigm.
            console.log("Loading posts...");
            $http.get('http://localhost:3000/').success(function (data) {
                $scope.editorposts = data;
                $scope.selectedPost = $scope.editorposts[0];
                loadEditor($scope.selectedPost.content);
            });
        };

        var refreshPostList = function() {
            $http.get('http://localhost:3000/').success(function (data) {
                $scope.editorposts = data;
            });
        };

        $scope.selectPost = function( x ) {
            console.log($scope.editorposts[0].title);
            var content;
            selectedId = x;
            var obj = {id: x};
            $http.post('http://localhost:3000/select', obj).success(function (data) {
                content = data[0].content;
                editor.importFile('', content);
            })
        };

        $scope.newPost = function() {
            console.log("Attempting to make a new post...");
            $http.get('http://localhost:3000/new').success(function (data) {
                refreshPostList();
            })
        };

        $scope.savePost = function ( x ) {
            var content = editor.getElement('editor').body.innerHTML;
            console.log("Tryna update content w/ :" + content);
            var obj = {id: selectedId, content: content};
            $http.put('http://localhost:3000/update', obj).success(function (data) {
                refreshPostList();
            })
        };

        $rootScope.showNavbar = false;
        loadPosts();

    }]);