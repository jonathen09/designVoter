angular.module('app', ['app.services'])

.controller('AppController', function($scope, Designs, _) {
  var designs = [];
  var currentPosition = 0;
  var total;

  $scope.error = false;
  $scope.more = false;
  $scope.end = true;

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
      $scope.more = false;
      $scope.error = true;
    });

  $scope.vote = function(vote) {
    Designs.voteOne(designs[currentPosition], {vote: vote})
      .then(function() {
        currentPosition++;
        if (currentPosition < total) {
          Designs.getOne(designs[currentPosition])
            .then(function(resp) {
              $scope.currentDesign = resp.data;
            });
        }
        $scope.more = false;
        $scope.end = true;
      })
      .catch(function(err) {
        console.log(err);
        $scope.more = false;
        $scope.error = true;
      });
  };
});
