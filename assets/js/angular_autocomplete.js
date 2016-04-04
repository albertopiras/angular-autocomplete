angular.module('autocompleteComponent',[])
.directive('autocomplete',function(){
    return{
        restrict : 'E',
        scope : {
            autocompletelist: "=",
            callback: "&"
        },
        link: function(scope, element,attr){
            // selects current 'directive Element to ensure a custom search scope'
            scope.componentAutocomplete = element[0];
            console.log(scope.componentAutocomplete);
        },
        controller: function($scope,$rootScope,$timeout){

            $scope.displayBoxIndex = -1;
            /***AUTOCOMPLETER***/
            /*Autocompleter start*/

            $scope.addSelectItem = function(object){
                $scope.searchElement =  $scope.getServiceName(object.id);
                $timeout(function(){
                    angular.element($scope.componentAutocomplete).find(".autocomplete-list").addClass("hideElement");
                    /*callback call*/
                    $scope.callback({param: object});
                },100);
            };

            $scope.$watch('searchElement', function(newValue, oldValue, scope) {
                if(newValue !== oldValue){
                    //console.debug("watch: changing input" );
                    // console.info($scope.componentAutocomplete);
                    angular.element($scope.componentAutocomplete).find(".autocomplete-list").removeClass("hideElement");
                }
            });

            angular.element('body').click(function() {
                angular.element($scope.componentAutocomplete).find(".autocomplete-list").addClass("hideElement");
            });

            // $("#searchElement").keyup(function(e) 
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
                    //console.debug("selecting item");
                    var oBoxCollection = angular.element($scope.componentAutocomplete).find(".display_box");
                    var cssClass = "display_box_hover";
                    var temp = oBoxCollection.removeClass(cssClass).eq($scope.displayBoxIndex).click();
                },150); 
            };

            /*Autocompleter End*/

            $scope.getServiceName = function(objId){
                var obj = _.find($scope.autocompletelist, function(obj){ return obj.id === objId;});
                var response = (obj !== undefined)? obj.value: objId;
                return response;
            };
        },  
        template : '<input type="text" ng-keyup="navigate($event)" id="searchElement" name="searchElement" ng-model="searchElement" class="autocomplete-input" maxlength="50"/><div class="autocomplete-list hideElement"><div class="autocomplete-item display_box" ng-repeat="item in autocompletelist | filter : searchElement" ng-click="addSelectItem(item)">{{item.value}}-{{item.id}}</div></div>'
    }
});
