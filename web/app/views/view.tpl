<h1>Movie</h1>
<ul ng-if="userLoggedIn">
	<li><a ng-href="#/movies/{{movieId}}/edit">Edit</a></li>
</ul>
<section>
	<table>
		<tbody>
			<tr>
				<th>Name</th><td>{{name}}</td>
			</tr>
			<tr>
				<th>Director</th><td>{{director}}</td>
			</tr>
			<tr>
				<th>Released</th><td>{{released}}</td>
			</tr>
			<tr>
				<th>Description</th><td>{{description}}</td>
			</tr>
		</tbody>
	</table>
</section>