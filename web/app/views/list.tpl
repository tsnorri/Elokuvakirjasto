<h1>Movies</h1>
<section ng-controller="ListController">
	<ul>
		<li ng-repeat="m in movies | orderBy: 'name'"><a ng-href="#/movies/{{m.$id}}">{{m.name}}</a> <a ng-click="removeAction(m, $event);" href="#">Poista</a></li>
	</ul>
</section>