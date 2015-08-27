var FIREBASE_BASE_URI = 'https://dazzling-inferno-8642.firebaseIO.com';

MoviesApp.service('FirebaseService', function($firebaseArray){
	var ref = new Firebase(FIREBASE_BASE_URI + '/movies');
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

MoviesApp.service('AuthenticationService', function($firebase, $firebaseAuth) {
	var firebaseRef = new Firebase(FIREBASE_BASE_URI);
	var firebaseAuth = $firebaseAuth(firebaseRef);

	this.logUserIn = function(email, password, cb) {
		firebaseAuth.$authWithPassword({
			email: email,
			password: password
		}).then(function(authData) {
			cb(true); 
		}).catch(function(error) {
			cb(false);
		});
	};

	this.createUser = function(email, password, cb) {
		return firebaseAuth.$createUser({
			email: email,
			password: password
		}).then(function(authData) {
			cb(true); 
		}).catch(function(error) {
			cb(false);
		});
	};
	
	this.checkLoggedIn = function() {
		return firebaseAuth.$waitForAuth();
	};

	this.logUserOut = function() {
		firebaseAuth.$unauth();
	};

	this.getUserLoggedIn = function() {
		return firebaseAuth.$getAuth();
	};
});
