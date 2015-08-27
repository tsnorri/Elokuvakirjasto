describe('Edit movie', function(){
	var controller, scope, movie;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function() {
  		// Lisää moduulisi nimi tähän
    	module('Movies');

		movie = new Movie("name", "director", 1900, "description")
		movie.$id = "k1";

    	FirebaseServiceMock = (function(){
			return {
				getMovie: function(id, cb) {
					if (movie.$id === id)
						cb(movie);
					else
						cb(undefined);
				},
				saveMovie: function(movie, cb) {
					if (cb)
						cb();
				}
			}
		})();

		RouteParamsMock = (function(){
			return {
				"id": movie.$id
			}
		})();

		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
		spyOn(FirebaseServiceMock, 'saveMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('EditController', {
	        $scope: scope,
			$location: undefined,
	        FirebaseService: FirebaseServiceMock,
	        $routeParams: RouteParamsMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
		expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
		_.each(movie, function(value, key, list) {
			expect(scope[key]).toBe(value);
		});
  	})

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to edit a movie by its name, director, release date and description', function(){
		movie.name = "test";
		scope.saveMovie(movie, undefined);
		expect(FirebaseServiceMock.saveMovie).toHaveBeenCalled();
	});

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
	*/
	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
		movie.name = undefined;
		scope.saveMovie(movie, undefined);
		expect(FirebaseServiceMock.saveMovie).not.toHaveBeenCalled();
	});
});