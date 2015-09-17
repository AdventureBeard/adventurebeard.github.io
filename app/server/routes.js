function Routes(app, database, auth) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        next()
    })

    // PUBLIC API
    app.get('/posts/published', database.getPublishedPosts);

    // PRIVATE API
    app.get('/posts', auth.authenticate, database.getAllPosts);
    app.post('/posts/toggle', auth.authenticate, database.togglePublished);
    app.get('/posts/new', auth.authenticate, database.newPost);
    app.post('/posts/select', database.getPost);
    app.put('/posts/update', auth.authenticate, database.updatePost);
    app.post('/posts/delete', auth.authenticate, database.deletePost);

    app.post('/login', auth.login);
}

module.exports = Routes;