MoviesApp.controller('UserController', function($scope, $location, AuthenticationService) {
	$scope.message = null;
	
	$scope.login = function() {
		$scope.message = null;
		AuthenticationService.logUserIn($scope.email, $scope.password, function(result) {
			if (result)
			{
				$scope.$parent.userLoggedIn = AuthenticationService.getUserLoggedIn();
				$location.path('/movies');
			}
			else
			{
				$scope.message = 'Väärä sähköpostiosoite tai salasana!'
			}
		});
	};

	$scope.register = function() {
		$scope.message = null;
		AuthenticationService.createUser($scope.email, $scope.password, function(result) {
			if (result)
			{
				AuthenticationService.logUserIn($scope.email, $scope.password, function(loginResult) {
					if (loginResult)
					{
						$scope.$parent.userLoggedIn = AuthenticationService.getUserLoggedIn();
						$location.path('/movies');
					}
					else
					{
						$scope.message = 'Tapahtui virhe! Yritä uudestaan';
					}
				})
			}
			else
			{
				$scope.message = 'Tapahtui virhe! Yritä uudestaan';
			}
		});
	};
});
