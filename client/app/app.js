angular.module('app', ['app.services'])

.controller('AppController', function($scope, Designs, _) {
  var designs = [];
  var currentPosition = 0;
  var total;

  $scope.error = false;
  $scope.available = true;
  $scope.end = false;

  Designs.getAll()
    .then(function(resp) {
      total = resp.data;
      designs = _.shuffle(_.range(total));
      return Designs.getOne(designs[0]);
    })
    .then(function(resp) {
      $scope.currentDesign = resp.data;
    })
    .catch(function(err) {
      console.log(err);
      $scope.available = false;
      $scope.error = true;
    });

  $scope.vote = function(vote) {
    Designs.voteOne(designs[currentPosition], {vote: vote})
      .then(function() {
        currentPosition++;
        if (currentPosition < total) {
          return Designs.getOne(designs[currentPosition])
            .then(function(resp) {
              $scope.currentDesign = resp.data;
            });
        }
        $scope.available = false;
        $scope.end = true;
      })
      .catch(function(err) {
        console.log(err);
        $scope.available = false;
        $scope.error = true;
      });
  };
});
