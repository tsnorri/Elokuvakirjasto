MoviesApp.controller('ListController', function($scope, currentAuth, FirebaseService) {
	
	FirebaseService.fetchMovies(function(movies) {
		$scope.movies = movies;
	});
	
	$scope.currentAuth = currentAuth;
	
	$scope.removeAction = function(movie, $event) {
		$scope.removeMovie(movie);
		$event.preventDefault();
	};
	
	$scope.removeMovie = function(movie) {
		if (currentAuth)
			FirebaseService.removeMovie(movie);
	};
});
