MoviesApp.controller('AddController', function($scope, $location, FirebaseService) {

	$scope.finishedEditingAction = function() {
		var movie = new Movie(
			$scope.name,
			$scope.director,
			$scope.released,
			$scope.description
		);

		$scope.addMovie(movie, function() {
			$location.path("/movies");
		});
	};

	$scope.addMovie = function(movie, cb) {
		var key = _.findKey(movie, function(val, key, obj) {
			return !val;
		});
		
		// Only add if all keys had truthy values.
		if (!key)
			FirebaseService.addMovie(movie, cb);
	};
});
