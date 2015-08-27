describe('Show movie', function(){
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
				}
			};
		})();

		RouteParamsMock = (function() {
			return {
				"id": movie.$id
			};
		})();

		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('ViewController', {
	        $scope: scope,
			$location: undefined,
	       	$routeParams: RouteParamsMock,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/* 
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
		expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
		expect(scope.movieId).toBe(movie.$id);
		_.each(movie, function(value, key, list) {
			expect(scope[key]).toBe(value);
		});
	});
});