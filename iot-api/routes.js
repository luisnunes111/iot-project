var routes = require('./lib/routes/index');

module.exports = function(app) {
    app.get('/', routes.home.info);
    app.post('/login', routes.user.login);
    app.post('/register', routes.user.create);
    app.post('/board', routes.board.create);
    app.get('/boards', routes.board.list);
    app.get('/board/:id', routes.board.detail);
};