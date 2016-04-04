# Angular Autocomplete

A simple AngularJS module that allows you to create fast and very simple autocomplete Components to use in your application.

## Required libraries

* jquery 
* angular 1.x
* underscore

## Installation

Clone the repository

```sh
$ git clone https://github.com/Alberto-/angular-autocomplete.git
```
#### Include files in your app

Include both `angular_autocomplete.js` and `angular_autocomplete.css` files.

Then inject the **autocompleteComponent** module in your app.

```
var myApp = angular.module('autocompleteExample',['autocompleteComponent']);
```
Now you can use the directive `<autocomplete>`

### How to use

The autocomplete directive accepts two special attributes,
`autocompletelist` and `callback`:
- **autocompletelist** must contain a JSON array with your own elements list. Every JSON object must have an "id" and a "value" properties, like: {"id": "itemID", "value" : "item description"}

- **callback** will contain a custom function you want call when you select an element in the list.


so here an example of your JS file:
```
myApp.controller("exampleController",["$scope" ,function($scope){

	$scope.mycallback = function(param){
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

Here the corresponding HTML code:

```
<autocomplete autocompletelist='UScountries' callback="mycallback(param)"></autocomplete>
```

This is a very simple autocomplete, in 3 or 4 steps you have a simple autocomplete working!

It's so easy as Renato Pozzetto does the dishes (in "Le Comiche" film).

![Alt text](https://github.com/Alberto-/angular-autocomplete/blob/master/assets/img/Pozzetto.gif?raw=true "One two three four...TAAC  (Pozzetto - Le comiche)")


You can find the real example within the indext.html and example.js files.

### Run the demo

To run it locally you can use http-server

```sh
nmp install -g http-server
```

and then, from the project root 

```sh
http-server -a 0.0.0.0 -p 8000
```


your demo will run under

http://localhost:8000/indext.html




## ONLINE DEMO

Coming soon ..


### Version
1.0 

## License

MIT 

[view demo]: <http://angularautocomplete-enta.rhcloud.com/app/>