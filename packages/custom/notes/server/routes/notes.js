'use strict';

var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.note.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Notes, app, auth, database) {
  var notes = require('../controllers/notes')(Notes);

  app.route('/api/notes')
    .get(auth.requiresLogin, notes.all)
    .post(auth.requiresLogin, notes.create);

  app.route('/api/notes/:noteId')
    .get(auth.isMongoId, auth.requiresLogin, hasAuthorization, notes.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, notes.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, notes.destroy);

  app.param('noteId', notes.note);
};
