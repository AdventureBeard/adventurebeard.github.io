angular.module('app.services')
    .service ('DataService', ['$http', function ($http) {

    this.refreshPostList = function (callback) {
        $http.get('http://localhost:3000/').success(function (data) {
            callback(data);
        });
    };

    this.selectPost = function (obj, callback) {
        $http.post('http://localhost:3000/select', obj).success(function (data) {
            callback(data);
        })
    };

    this.newPost = function (callback) {
        $http.get('http://localhost:3000/new').success(function (data) {
           callback(data);
        })
    };

    this.savePost = function (obj,callback) {
        $http.put('http://localhost:3000/update', obj).success(function (data) {
            callback(data);
        })
    };

    this.deletePost = function (obj,callback) {
        $http.put("http://localhost:3000/delete", obj).success(function (data) {
            callback(data);
        })
    };
}]);
