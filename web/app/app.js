var MoviesApp = angular.module('Movies', ['firebase', 'ngRoute', 'validation.match']);

angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
	return function(exception, cause) {
		exception.message += ' (caused by "' + cause + '")';
		throw exception;
	};
});

MoviesApp.directive('integer', function() {
	return {
		'require': 'ngModel',
		'link': function($scope, el, attr, ctrl) {
			ctrl.$parsers.unshift(function(value) {
				return parseInt(value, 10);
			});
		}
	};
});

MoviesApp.config(function($routeProvider) {
	$routeProvider.when('/login', {
		controller: "UserController",
		templateUrl: "app/views/login.tpl"
	})
	.when('/movies', {
		controller: 'ListController',
		templateUrl: 'app/views/list.tpl',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/movies/new', {
		controller: 'AddController',
		templateUrl: 'app/views/add.tpl',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/movies/:id', {
		controller: 'ViewController',
		templateUrl: 'app/views/view.tpl'
	})
	.when('/movies/:id/edit', {
		controller: 'EditController',
		templateUrl: 'app/views/edit.tpl',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/OMDb', {
		controller: 'OMDbListController',
		templateUrl: 'app/views/OMDblist.tpl'
	})
	.otherwise({
		redirectTo: '/movies'
	});
});


MoviesApp.config(['$httpProvider', function($httpProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);
