MoviesApp.service('FirebaseService', function($firebase){
	var baseURI = 'https://dazzling-inferno-8642.firebaseIO.com';
	var ref = new Firebase(baseURI + '/movies');
	var sync = $firebase(ref);
	var movies = sync.$asArray();
	
	this.fetchMovies = function(cb) {
		movies.$loaded().then(cb(movies));
	};
	
	this.addMovie = function(movie, cb) {
		movies.$add(movie).then(cb(movies));
	};
});