		<p><label>Name: <input type="text" name="name" ng-model="$parent.name" required></label></p>
		<div ng-show="editForm.name.$invalid && editForm.name.$touched">Required.</div>
		<p><label>Director: <input type="text" name="director" ng-model="$parent.director" required></label></p>
		<div ng-show="editForm.director.$invalid && editForm.director.$touched">Required.</div>
		<p><label>Year Released: <input type="number" integer name="released" ng-model="$parent.released" required min="1800" max="2500"></label></p>
		<div ng-show="editForm.released.$invalid && editForm.released.$touched">Required, must be between 1800 and 2500.</div>
		<p><label>Description: <textarea name="description" ng-model="$parent.description" required ng-minlength="1"></textarea></label></p>
		<div ng-show="editForm.description.$invalid && editForm.description.$touched">Required.</div>
		<p><button type="submit" ng-click="finishedEditingAction()" ng-disabled="editForm.$invalid">Submit</button></p>
