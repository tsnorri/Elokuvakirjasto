MoviesApp.controller('EditController', function($scope, $location, $routeParams, currentAuth, FirebaseService) {
	if (!currentAuth)
		$location.path('/login');
	
	FirebaseService.getMovie($routeParams.id, function(movie) {
		if (!movie)
			$location.path("/movies");

		_.each(movie, function(value, key, list) {
			$scope[key] = value;
		});

		$scope.finishedEditingAction = function() {
			_.each(['name', 'director', 'released', 'description'], function(key, idx, list) {
				movie[key] = $scope[key];
			});
			
			$scope.saveMovie(movie, function() {
				$location.path("/movies");
			});
		};

		$scope.saveMovie = function(movie, cb) {
			var key = _.findKey(movie, function(val, key, obj) {
				if (0 === key.indexOf("$"))
					return false;
				
				return !val;
			});

			// Only add if all keys had truthy values.
			if (!key)
				FirebaseService.saveMovie(movie, cb);
		};
	});
});
