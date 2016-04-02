angular.module('autocompleteComponent',[])
.directive('autocomplete',function(){
    return{
        restrict : 'E',
        scope : {
            services: '=',
        },
        link: function($scope,element){
            // selects current 'directive Element to ensure a custom search scope'
            $scope.componentAutocomplete = element[0];
            console.log($scope.componentAutocomplete);
        },
        controller: function($scope,$timeout){

            /***AUTOCOMPLETER***/
            /*Autocompleter start*/
            $scope.cleanAddService = function(){
                $scope.enableAddService = false;
                $scope.serviceSelected = "";
            };

            $scope.enableAddService = false;
            $scope.serviceSelected;

            $scope.addSelectItem = function(serviceId){
                $scope.searchService =  $scope.getServiceName(serviceId);
                $timeout(function(){
                    $scope.serviceSelected=serviceId;
                    angular.element($scope.componentAutocomplete).find(".autocomplete_select").addClass("hideElement");
                    $scope.enableAddService = true;
                },100);
            };

            $scope.$watch('searchService', function(newValue, oldValue, scope) {
                if(newValue !== oldValue){
                    $scope.cleanAddService();
                    // console.log("watch " );
                    // console.log($scope.componentAutocomplete);
                    angular.element($scope.componentAutocomplete).find(".autocomplete_select").removeClass("hideElement");
                }
            });

            angular.element('body').click(function() {
               angular.element($scope.componentAutocomplete).find(".autocomplete_select").addClass("hideElement");
               $scope.cleanAddService();
           });

            window.displayBoxIndex = -1;

 // $("#searchService").keyup(function(e) 
        $scope.navigate =function(e){
        console.log("naviga..");
          if (e.keyCode == 40) 
            {  
                Navigate(1);
            }
            if(e.keyCode==38)
            {
                Navigate(-1);
            }
            if(e.keyCode==13)
            {
                selectListItem();
            }
        }
            $($scope.componentAutocomplete).find("#searchService").keyup(function(e) 
            {

                if (e.keyCode == 40) 
                {  
                    console.info("aaa");
                    Navigate(1);
                }
                if(e.keyCode==38)
                {
                    console.info("aaa");
                    Navigate(-1);
                }
                if(e.keyCode==13)
                {
                    selectListItem();
                }
            });

            var Navigate = function(diff) {
                displayBoxIndex += diff;
                var oBoxCollection = angular.element($scope.componentAutocomplete).find(".display_box");
                if (displayBoxIndex >= oBoxCollection.length)
                    displayBoxIndex = 0;
                if (displayBoxIndex < 0)
                    displayBoxIndex = oBoxCollection.length - 1;
                var cssClass = "display_box_hover";
                oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
            };

            var selectListItem = function(diff) {
                var oBoxCollection = angular.element($scope.componentAutocomplete).find(".display_box");
                var cssClass = "display_box_hover";
                var temp = oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).click();

            };

            /*Autocompleter End*/

            $scope.getServiceName = function(serviceId){
                var service = _.find($scope.services, function(service){ return service.id === serviceId;});
                var response = (service !== undefined)? service.id: serviceId;
                return response;
            };
        },  
    templateUrl : 'autocomplete.html'

    }
});


var app = angular.module('autocomplete',['ngRoute','autocompleteComponent']);


app.config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

