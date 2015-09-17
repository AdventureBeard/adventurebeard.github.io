function Routes (app, database) {

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
		next()
	})
	
	app.get('/posts', database.getAllPosts);
	app.get('/posts/published', database.getPublishedPosts);
	app.post('/posts/toggle', database.togglePublished);
	app.get('/posts/new', database.newPost);
	app.post('/posts/select', database.getPost);
	app.put('/posts/update', database.updatePost);
	app.post('/posts/delete', database.deletePost);
}

module.exports = Routes;