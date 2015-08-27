MoviesApp.service('FirebaseService', function($firebaseArray){
	var baseURI = 'https://dazzling-inferno-8642.firebaseIO.com';
	var ref = new Firebase(baseURI + '/movies');
	var movies = $firebaseArray(ref);
	
	this.fetchMovies = function(cb) {
		movies.$loaded(cb(movies));
	};
	
	this.addMovie = function(movie, cb) {
		movies.$add(movie).then(cb(movies));
	};
	
	this.getMovie = function(key, cb) {
		movies.$loaded(cb(movies.$getRecord(key)));
	};
	
	this.removeMovie = function(movie, cb) {
		movies.$remove(movie).then(function() { if (cb) cb(); });
	};
	
	this.saveMovie = function(movie, cb) {
		movies.$save(movie).then(function() { if (cb) cb(); });
	};
});
