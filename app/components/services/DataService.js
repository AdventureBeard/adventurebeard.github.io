angular.module('app.services')
    .service ('DataService', ['$http', function ($http) {

    this.refreshPostList = function (callback) {
        $http.get('http://localhost:3000/posts').success(function (data) {
            callback(data);
        });
    };

    this.selectPost = function (obj, callback) {
        $http.post('http://localhost:3000/posts/select', obj).success(function (data) {
            callback(data);
        })
    };

    this.newPost = function (callback) {
        $http.get('http://localhost:3000/posts/new').success(function (data) {
           callback(data);
        })
    };

    this.savePost = function (obj,callback) {
        $http.put('http://localhost:3000/posts/update', obj).success(function (data) {
            callback(data);
        })
    };

    this.deletePost = function (obj,callback) {
        $http.put("http://localhost:3000/posts/delete", obj).success(function (data) {
            callback(data);
        })
    };

    this.getPublished = function(callback) {
        $http.get("http://localhost:3000/posts/published").success(function (data) {
            callback(data);
        })
    };

    this.getPublishedContent = function(callback) {
        $http.get("http://localhost:3000/posts/publishedcontent").success(function(data) {
            callback(data);
        })
    };

    this.togglePublished = function (obj, callback) {
        $http.post("http://localhost:3000/posts/publishedtoggle", obj).success(function (data) {
            callback(data);
        })
    }
}]);
