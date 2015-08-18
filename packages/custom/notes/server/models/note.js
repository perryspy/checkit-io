var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  message: String,
  checked: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

NoteSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

module.exports = mongoose.model('Note', NoteSchema);
