<h1>Movies</h1>
<section ng-controller="ListController">
	<ul>
		<li ng-repeat="m in movies | orderBy: 'name'"><a ng-href="#/movies/{{m.$id}}">{{m.name}}</a></li>
	</ul>
</section>