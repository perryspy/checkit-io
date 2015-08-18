'use strict';

angular.module('mean.notes').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('notes', {
      url: '/notes',
      templateUrl: 'notes/views/index.html'
    });
  }
]);
