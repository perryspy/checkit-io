'use strict';

/* jshint -W098 */
angular.module('mean.notes').controller('NotesController', ['$scope', 'Global', 'Notes',
  function($scope, Global, Notes) {
    $scope.global = Global;
    $scope.package = {
      name: 'notes'
    };
  }
]);
