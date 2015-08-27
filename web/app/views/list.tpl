<h1>Movies</h1>
<section>
	<ul>
		<li ng-repeat="m in movies | orderBy: 'name'"><a ng-href="#/movies/{{m.$id}}">{{m.name}}</a><span ng-if="userLoggedIn"> <a ng-click="removeAction(m, $event);" href="#">Poista</a></span></li>
	</ul>
</section>