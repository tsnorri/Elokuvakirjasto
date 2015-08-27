MoviesApp.controller('MainController', function($scope, $rootScope, AuthenticationService) {
	$scope.userLoggedIn = AuthenticationService.getUserLoggedIn();

	$scope.logout = function() {
		AuthenticationService.logUserOut();
		$scope.userLoggedIn = null;
	};
});
