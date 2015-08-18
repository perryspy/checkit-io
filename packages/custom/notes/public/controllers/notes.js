'use strict';

/* jshint -W098 */
angular.module('mean.notes').controller('NotesController', [
  '$scope', 'Global', 'Notes',
  function($scope, Global, Notes) {
    $scope.global = Global;
    $scope.package = {
      name: 'notes'
    };

    // NOTE OPERATIONS
    $scope.create = function() {
      var note = new Notes({
        message: $scope.msg,
        checked: false
      });

      note.$save(function(response) {
        $scope.notes.push(note);

        // clear the form object
        $scope.msg = '';
      });
    };

    $scope.remove = function(note) {
      if (note) {
        note.$remove(function(response) {
          // remove it from our the notes we're tracking
          if ($scope.notes [i] === note) {
            $scope.notes.splice(i, 1);
          }
        });
      }
    };

    $scope.update = function(note) {
      note.$update(function(response) {

      }, function(errorResponse) {

      });
    };

    $scope.find = function() {
      Notes.query(function(notes) {
        $scope.notes = notes;
      });

      //$scope.notes = Note.query();
    };

    $scope.findOne = function() {
      Notes.get({
        noteId: $stateParams.noteId
      }, function(note) {
        $scope.note = note;
      });
    };
  }
]);
