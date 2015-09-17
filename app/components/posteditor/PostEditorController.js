angular.module('app.controllers')
    .controller('PostEditorController', ['$scope', '$rootScope', '$timeout', '$http', 'DataService', function ($scope, $rootScope, $timeout, $http, DataService) {

        $scope.editorposts = undefined;
        var selectedId = 0;
        $scope.postTitle = "";
        $scope.postDate = "";
        $scope.numberOfPosts = 0;
        $scope.postOffset = 0;
        $scope.isPublished = false;
        var editor = undefined;

        function loadEditor(startingContent) {
            var opts = {
                container: 'epiceditor',
                textarea: null,
                basePath: 'bower_components/EpicEditor/epiceditor',
                clientSideStorage: false,
                localStorageName: '',
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

        $scope.isSelected = function ( x ) {
            return (x == selectedId);
        };

        $scope.incPostOffset = function() {
            $scope.postOffset++;
        };

        $scope.decPostOffset = function() {
            $scope.postOffset--;
        };

        var refreshPostList = function () {
            var data = DataService.refreshPostList(function(callback) {
                $scope.editorposts = callback.reverse();
                $scope.numberOfPosts = $scope.editorposts.length;
            });
        };

        $scope.selectPost = function (post) {
            selectedId = post.id;
            $scope.postTitle = post.title;
            $scope.postDate = post.date.substring(0, 10);
            DataService.selectPost({id: selectedId}, function(callback) {
                var content = callback[0].content;
                editor.importFile('', content);
                editor.edit();
            });

        };

        $scope.newPost = function () {
           DataService.newPost(function(response){
               refreshPostList();
           });
        };

        $scope.savePost = function (x) {
            var content = editor.getElement('editor').body.innerText;
            var obj = {id: selectedId, content: content, title: $scope.postTitle, date: $scope.postDate};
            DataService.savePost(obj, function(callback) {
                refreshPostList();
            });
        };

        $scope.deletePost = function () {
            var obj = {id: selectedId};
            console.log(selectedId);
            DataService.deletePost(obj, function(callback) {
                selectedId++;
                refreshPostList();
            });

        };

        $scope.togglePublished = function() {
            var obj = {id: selectedId};
            DataService.togglePublished(obj, function(callback) {
                refreshPostList();
            })
        };

        $rootScope.showNavbar = false;
        loadEditor();
        refreshPostList();

    }]);