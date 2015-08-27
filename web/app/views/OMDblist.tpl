<h1>Movies from OMDb</h1>
<section ng-controller="OMDbListController">
	<form name="searchForm">
		<p><label>Name: <input type="text" name="name" ng-model="name" required></label></p>
		<p><label>Released: <input type="number" integer name="released" ng-model="released"></label></p>
		<p><button type="submit" ng-click="searchAction()" ng-disabled="searchForm.$invalid">Submit</button></p>
	</form>
	<p ng-show="searched">Haulla <ng-pluralize count="movies.length"
							when="{
								  '0': 'ei löytynyt yhtään elokuvaa.',
								  'one': 'löytyi yksi elokuva.',
								  'other': 'löytyi {{movies.length}} elokuvaa.'
								  }"></ng-pluralize>
	</p>
	<ul ng-show="searched">
		<li ng-repeat="m in movies | orderBy: 'name'"><a ng-href="{{m.url}}">{{m.name}} ({{m.year}})</a></li>
	</ul>
</section>