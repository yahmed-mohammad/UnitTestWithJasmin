(function() {
    'use strict';
    let module = angular.module('NarrowItDownApp',[]);

    module.controller('NarrowItDownController', NarrowItDownController);
    module.service('MenuSearchService', MenuSearchService);
    module.directive('menuList', MenuListDirective);

    function MenuListDirective() {
        var ddo = {
            templateUrl: "menu-list.html"
        }
        return ddo;
    }

    //Inject service into Controller
    NarrowItDownController.$inject = ['MenuSearchService', '$timeout'];
    //Defining Controller
    function NarrowItDownController(MenuSearchService, $timeout) {
        let narrowCtrl = this;
        narrowCtrl.item = '';

        narrowCtrl.searchMenu = function() {
            if(narrowCtrl.item === '') {
                narrowCtrl.empty = true;
                narrowCtrl.isFound = false;
                narrowCtrl.nothingFound = false;
            } else {
                narrowCtrl.empty = false;
                narrowCtrl.found = MenuSearchService.getMatchedMenuItems(narrowCtrl.item);

                $timeout(function() {
                    if(narrowCtrl.found.length != 0) {
                        narrowCtrl.isFound = true;
                        narrowCtrl.nothingFound = false;
                    } else {
                        narrowCtrl.isFound = false;
                        narrowCtrl.nothingFound = true;
                    }
                }, 2000);
            }
            
            // console.log(narrowCtrl.found.length);
            // if(narrowCtrl.found.length != 0) {
            //     narrowCtrl.notEmpty = true;
            // } else {
            //     narrowCtrl.notEmpty = false;
            // }
        }
        narrowCtrl.remove = function(index) {
            MenuSearchService.removeItem(index);
        }
    }

    //Inject http service in our service function
    MenuSearchService.$inject = ['$http'];

    //Defining Service
    function MenuSearchService($http) {
        let narrowService = this;
        let found = [];

        narrowService.getMatchedMenuItems = function(stringVal) {
            found = [];
            let responsePromise = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            responsePromise.then(function(response) {
                let menuItems = response.data.menu_items;
                for(let i=0; i<menuItems.length; i++) {
                    found.push(menuItems[i]);
                }
            }).catch(function(errorResponse) {
                console.log('Error');
            });
            return found;
        }
        narrowService.removeItem = function(index) {
            found.splice(index, 1);
        }

        //Added to test http service using Jasmine
        narrowService.getMatchedMenuItem = function() {
            let responsePromise = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            return responsePromise;
        }
    }
})();