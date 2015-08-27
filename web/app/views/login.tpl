<h1>Login / Register</h1>
<p ng-if="message">{{message}}</p>
<form name="loginForm">
	<p><label>E-mail: <input type="text" name="email" ng-model="email" required></label></p>
	<p><label>Password: <input type="password" name="password" ng-model="password" required></label></p>
	<p><button type="submit" ng-click="login()" ng-disabled="loginForm.$invalid">Login</button> <button type="submit" ng-click="register()" ng-disabled="loginForm.$invalid">Register</button></p>
</form>