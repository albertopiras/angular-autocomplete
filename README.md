# Angular Autocomplete

A simple AngularJS module that allows you to create fast and very simple autocomplete Components to use in your application.


## Installation

```
$ git clone https://github.com/Alberto-/angular-autocomplete.git
```

###Required libraries:

jquery 

angular 1.x

underscore


Include both angular_autocomplete.js and angular_autocomplete.css files.

then inject the "autocompleteComponent" in your app


```
var myApp = angular.module('autocompleteExample',['autocompleteComponent']);
```

The autocomplete accepts to special attributes :
"autocompletelist" and "callback".

autocompletelist must contain a JSON array with your own elements list. Every JSON object must have "id" and "value" properties, like: {"id": "itemID", "value" : "item description ..."}

callback will contain the function you want call when you select an element in the list.


so here an example:



```
myApp.controller("exampleController",["$scope" ,function($scope){

	$scope.myfunction = function(param){
		alert("Your element: "+ JSON.stringify(param));
    }

 	$scope.UScountries = [
	    {
	        "value": "Arizona",
	        "id": "AZ"
	    },
	    {
	        "value": "California",
	        "id": "CA"
	    },
	    {
	        "value": "Colorado",
	        "id": "CO"
    	}
    ];

}]);

```



you can find an example in the indext.html file.




### Run

To run it locally you can use http-server


so 

```
nmp install -g http-server

```

and then, from the project root 

```
http -server -a 0.0.0.0 -p 8000
```


your demo will run under

http://localhost:8000/indext.html


##ONLINE DEMO

Coming soon


### Version
1.0 

## License

MIT 

[view demo]: <http://angularautocomplete-enta.rhcloud.com/app/>