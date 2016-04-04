'use strict';

var app = angular.module('autocompleteExample',['autocompleteComponent']);

app.controller("exampleController",["$scope", "$http" ,function($scope, $http){

	$scope.myfunction = function(param){
		alert("JSON object: "+ JSON.stringify(param));
		console.info("You selected " + param);
    }

    // Reads JSON file
    $http.get('countries.json').success(function(data) {
        $scope.UScountries = data;
    });


}]);
