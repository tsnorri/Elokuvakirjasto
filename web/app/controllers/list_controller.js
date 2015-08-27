MoviesApp.controller('ListController', function($scope, FirebaseService) {
	
	FirebaseService.fetchMovies(function(movies) {
		$scope.movies = movies;
	});
	
	$scope.removeAction = function(movie, $event) {
		$scope.removeMovie(movie);
		$event.preventDefault();
	};
	
	$scope.removeMovie = function(movie) {
		FirebaseService.removeMovie(movie);
	};
});
