angular.module('autocompleteComponent',[])
.directive('autocomplete',function(){
    return{
        restrict : 'E',
        scope : {
            services: '=',
        },
        link: function($scope, element){
            // selects current 'directive Element to ensure a custom search scope'
            $scope.componentAutocomplete = element[0];
            console.log($scope.componentAutocomplete);
        },
        controller: function($scope,$rootScope,$timeout){

            $scope.displayBoxIndex = -1;
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
                    //console.debug("watch: changing input" );
                    // console.info($scope.componentAutocomplete);
                    angular.element($scope.componentAutocomplete).find(".autocomplete_select").removeClass("hideElement");
                }
            });

            angular.element('body').click(function() {
               angular.element($scope.componentAutocomplete).find(".autocomplete_select").addClass("hideElement");
               $scope.cleanAddService();
            });

            // $("#searchService").keyup(function(e) 
            $scope.navigate =function(e){
                //console.debug("navigating..");
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
                    selectListItem(e);
                }
            };

            var Navigate = function(diff) {
                $scope.displayBoxIndex += diff;
                var oBoxCollection = angular.element($scope.componentAutocomplete).find(".display_box");
                if ($scope.displayBoxIndex >= oBoxCollection.length)
                    $scope.displayBoxIndex = 0;
                if ($scope.displayBoxIndex < 0)
                    $scope.displayBoxIndex = oBoxCollection.length - 1;
                var cssClass = "display_box_hover";
                oBoxCollection.removeClass(cssClass).eq($scope.displayBoxIndex).addClass(cssClass);
            };

            var selectListItem = function() {
                /*timeout used to allow Angular digest cycle close itself */
                setTimeout(function(){
                    //console.debug($scope.displayBoxIndex);
                    console.warn("trying to select item");
                    var oBoxCollection = angular.element($scope.componentAutocomplete).find(".display_box");
                    var cssClass = "display_box_hover";
                    var temp = oBoxCollection.removeClass(cssClass).eq($scope.displayBoxIndex).click();
                },150); 
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

