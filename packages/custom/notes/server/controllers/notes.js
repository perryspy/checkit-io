var Note = require('../models/note'),
  config = require('meanio').loadConfig(),
  _ = require('lodash');

module.exports = function(Notes) {
  var noteController = {};

  noteController.note = function(req, res, next, id) {
    Note.load(id, function(err, note) {
      if (err) return next(err);
      if (!note) return next(new Error('Failed to load note ' + id));

      req.note = note;
      next();
    });
  };

  noteController.create = function(req, res) {
    var note = new Note(req.body);
    note.user = req.user;

    note.save(function(err) {
      if (err) {
        console.log('save error');
        return res.status(500).json({
          error: 'Cannont save the note'
        });
      }

      //Notes.events.publish({
      //  action: 'created',
      //  user: {
      //    name: req.user.name
      //  },
      //  url: config.hostname + '/notes/'+ note._id,
      //  name: note.message
      //});

      res.json(note);
    });
  };

  noteController.update = function(req, res) {
    var note = req.note;

    note = _.extend(note, req.body);

    note.save(function(err) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot update the note'
        });
      }

      //Notes.events.publish({
      //  action: 'updated',
      //  user: {
      //    name: req.user.name
      //  },
      //  name: note.message,
      //  url: config.hostname + '/notes/' + note._id
      //});

      res.json(note);
    });
  };

  noteController.destroy = function(req, res) {
    var note = req.note;

    note.remove(function(err) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot delete the note'
        });
      }

      //Notes.events.publish({
      //  action: 'deleted',
      //  user: {
      //    name: req.user.name
      //  },
      //  name: note.message
      //});

      res.json(note);
    });
  };

  noteController.show = function(req, res) {

    //Notes.events.publish({
    //  action: 'view',
    //  user: {
    //    name: req.user.name
    //  },
    //  name: req.note.message,
    //  url: config.hostname + '/notes/' + req.note._id
    //});

    res.json(req.note);
  };

  noteController.all = function(req, res) {
    Note.find({ user: req.user }).populate('user', 'name username').exec(function (err, notes) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the notes'
        });
      }

      res.json(notes)
    });
  };

  return noteController;
};