angular.module('app.services', [])

.factory('_', function() {
  return window._;
})

.factory('Designs', function($http) {

  var getAll = function() {
    return $http({
      method: 'GET',
      url: '/designs'
    }).then(function(resp) {
      return resp;
    });
  };

  var getOne = function(id) {
    return $http({
      method: 'GET',
      url: '/designs/' + id
    }).then(function(resp) {
      return resp;
    });
  };

  var voteOne = function(id, data) {
    return $http({
      method: 'PUT',
      url: '/designs/' + id,
      data: data
    }).then(function(resp) {
      return resp;
    });
  };

  return {
    getAll: getAll,
    getOne: getOne,
    voteOne: voteOne
  };

});
