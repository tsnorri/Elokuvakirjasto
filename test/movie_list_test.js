describe('Movie list', function(){
	var controller, scope, movies;

	var FirebaseServiceMock, EventMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('Movies');

		movies = [
			new Movie("name1", "director1", 1900, "description1"),
			new Movie("name2", "director2", 1900, "description2")
		];
    	FirebaseServiceMock = (function() {
			return {
				fetchMovies: function(cb) {
					cb(movies);
				},
				removeMovie: function(movie, cb) {
					movies = _.without(movies, movie);
					if (cb)
						cb(movies);
				}
			};
		})();
		
		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'fetchMovies').and.callThrough();
		spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      controller = $controller('ListController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function() {
		expect(scope.movies).toBe(movies);
		expect(FirebaseServiceMock.fetchMovies).toHaveBeenCalled();
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function() {
		var m1 = movies[0];
		var m2 = movies[1];
		expect(scope.movies).toBe(movies);
		scope.removeMovie(m1);
		expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
		expect(movies).toEqual([m2]);
	});
});