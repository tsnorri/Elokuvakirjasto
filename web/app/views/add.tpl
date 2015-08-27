<h1>Add Movie</h1>
<section ng-controller="AddController">
	<form name="addForm">
		<p><label>Name: <input type="text" name="name" ng-model="name" required></label></p>
		<div ng-show="addForm.name.$invalid && addForm.name.$touched">Required.</div>
		<p><label>Director: <input type="text" name="director" ng-model="director" required></label></p>
		<div ng-show="addForm.director.$invalid && addForm.director.$touched">Required.</div>
		<p><label>Year Released: <input type="number" integer name="released" ng-model="released" required min="1800" max="2500"></label></p>
		<div ng-show="addForm.released.$invalid && addForm.released.$touched">Required, must be between 1800 and 2500.</div>
		<p><label>Description: <textarea name="description" ng-model="description" required ng-minlength="1"></textarea></label></p>
		<div ng-show="addForm.description.$invalid && addForm.description.$touched">Required.</div>
		<p><button type="submit" ng-click="addMovieAction()" ng-disabled="addForm.$invalid">Submit</button></p>
	</form>
</section>