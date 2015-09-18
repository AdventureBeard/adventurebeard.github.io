angular.module('app.services')
    .service ('DataService', ['$http', function ($http) {

    var db = 'http://107.170.217.120:3000';

    this.refreshPostList = function (callback) {
        $http.get(db + '/posts').success(function (data) {
            callback(data);
        });
    };

    this.selectPost = function (obj, callback) {
        $http.post(db + '/posts/select', obj).success(function (data) {
            callback(data);
        })
    };

    this.newPost = function (callback) {
        $http.get(db + '/posts/new').success(function (data) {
           callback(data);
        })
    };

    this.savePost = function (obj,callback) {
        $http.put(db + '/posts/update', obj).success(function (data) {
            callback(data);
        })
    };

    this.deletePost = function (obj,callback) {
        console.log("In the DATASERVICE");
        $http.post(db + '/posts/delete', obj).success(function (data) {
            callback(data);
        })
    };

    this.getPublished = function(callback) {
        $http.get(db + '/posts/published').success(function (data) {
            callback(data);
        })
    };

    this.getPublishedContent = function(callback) {
        $http.get(db + '/posts/publishedcontent').success(function(data) {
            callback(data);
        })
    };

    this.togglePublished = function (obj, callback) {
        $http.post(db + '/posts/toggle', obj).success(function (data) {
            callback(data);
        })
    }

    this.validateUser = function (obj, callback) {
        $http.post(db + '/login', obj).success(function (data) {
            callback(data);
        });
    }
}]);
