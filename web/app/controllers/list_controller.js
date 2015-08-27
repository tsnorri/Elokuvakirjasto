MoviesApp.controller('ListController', function($scope, FirebaseService) {
	
	FirebaseService.fetchMovies(function(movies) {
		$scope.movies = movies;
	});
});
