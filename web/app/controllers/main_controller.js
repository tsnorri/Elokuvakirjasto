MoviesApp.controller('MainController', function($scope, AuthenticationService) {
	$scope.userLoggedIn = AuthenticationService.getUserLoggedIn();

	$scope.logout = function() {
		AuthenticationService.logUserOut();
		$scope.userLoggedIn = null;
	};
});
