MoviesApp.controller('OMDbListController', function($scope, OMDbService) {
	$scope.movies = [];
	$scope.searched = false;

	$scope.searchAction = function() {
		$scope.searched = false;
		OMDbService.findMovie($scope.name, $scope.released, function(success, data, response) {
			$scope.movies = [];
			if (success)
			{
				$scope.searched = true;
				_.each(data.Search, function(movie, idx, list) {
					var movie = {
						name: movie.Title,
						year: movie.Year,
						url: "http://www.imdb.com/title/" + movie.imdbID
					};
					$scope.movies.push(movie);
				});
			}
			else
			{
				alert(":( " + response);
			}
		});
	};
});

