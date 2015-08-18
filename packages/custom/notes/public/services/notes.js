'use strict';

angular.module('mean.notes').factory('Notes', ['$resource',
  function($resource) {
    return $resource('api/notes/:noteId', {
      noteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
