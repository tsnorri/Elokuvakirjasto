var MoviesApp = angular.module('Movies', ['firebase', 'ngRoute', 'validation.match']);

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
	$routeProvider.when('/movies', {
		controller: 'ListController',
		templateUrl: 'app/views/list.tpl'
	})
	.when('/movies/new', {
		controller: 'AddController',
		templateUrl: 'app/views/add.tpl'
	})
	.when('/movies/:id', {
		controller: 'ViewController',
		templateUrl: 'app/views/view.tpl'
	})
	.when('/movies/:id/edit', {
		controller: 'EditController',
		templateUrl: 'app/views/edit.tpl'
	})
	.otherwise({
		redirectTo: '/movies'
	});
});
