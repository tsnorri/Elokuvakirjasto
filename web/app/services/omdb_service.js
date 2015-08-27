MoviesApp.service('OMDbService', function($http) {
	this.findMovie = function(name, released, cb) {
		var query = {};
		if (name)
			query.s = name;
		if (released)
			query.y = released;
		
		$http.get('http://www.omdbapi.com', { params: query })
			.success(function(data) { cb(true, data); })
			.error(function(data, status) { cb(false, data, status); });
	}
});
