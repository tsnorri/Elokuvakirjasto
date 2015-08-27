describe('Add movie', function(){
	var controller, scope, movies;

	var FirebaseServiceMock;

  	beforeEach(function() {
  		// Lisää moduulisi nimi tähän
    	module('Movies');

		movies = [];
    	FirebaseServiceMock = (function(){
			return {
				fetchMovies: function(cb) {
					cb(movies);
				},
				addMovie: function(movie, cb) {
					movies.push(movie);
					cb(movies);
				}
			};
		})();

		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'fetchMovies').and.callThrough();
		spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
		inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			controller = $controller('AddController', {
				$scope: scope,
				$location: undefined,
				FirebaseService: FirebaseServiceMock
			});
		});
	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
		var test = false;
		var movie = new Movie("Name", "Driver", 1900, "Description");
		
		scope.addMovie(movie, function() {
			test = true;
		});
		
		expect(movies.length).toBe(1);
		expect(movies[0]).toBe(movie);
		expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
		expect(test).toBe(true);
	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
		var test = false;
		var movie = new Movie(null, null, null, null);
		
		scope.addMovie(movie, function() {
			test = true;
		});
		
		expect(movies.length).toBe(0);
		expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
		expect(test).toBe(false);
	});
});
