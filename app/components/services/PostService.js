angular.module('app.services')
    .service ('PostService', [function () {

    var posts;
    this.setPosts = function (posts) {
        this.posts = posts;
    };

    this.getPosts = function () {
        return posts;
    };

}]);
