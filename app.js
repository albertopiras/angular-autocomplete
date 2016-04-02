var app = angular.module('autocomplete',['autocompleteComponent']);

// app.config(function ($httpProvider) {
//   delete $httpProvider.defaults.headers.common['X-Requested-With'];
// });

app.controller("exampleController",["$scope",function($scope){

$scope.test = "test autocomplete";

}]);
