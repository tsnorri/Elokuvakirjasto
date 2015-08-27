MoviesApp.controller('ViewController', function($scope, $location, $routeParams, FirebaseService) {
	FirebaseService.getMovie($routeParams.id, function(movie) {
		if (!movie)
			$location.path("/movies");
		
		_.each(movie, function(value, key, list) {
			$scope[key] = value;
		});
		$scope.movieId = movie.$id;
	});
});
