(function() {
    'use strict';

    let itemsList=[];

    angular.module('LimitShoppingList', [])
    .controller('LimitShoppingListController', LimitShoppingListController)
    .service('ShoppingService', ShoppingService)
    .service('LimitService', LimitService);

    /*
    ** Shopping List Controller
    */
    LimitShoppingListController.$inject = ['$q','ShoppingService'];
    function LimitShoppingListController($q, ShoppingService) {
        this.itemName= "";
        this.itemQuantity= "";
        this.addItems = function() {
            ShoppingService.addToList(this.itemName, this.itemQuantity);
        }
        this.itemList = ShoppingService.getList();
    }

    ShoppingService.$inject = ['$q','LimitService'];
    function ShoppingService($q, LimitService) {
        var items = [];
        this.getList = function() {
            return items;
        }
        /*
        ** The below implementation is time consuming as after checkName is completed, then checkQuantiy is called
        */
        /*
        this.addToList = function(name, quantity) {
            var promise = LimitService.checkName(name);

            promise.then(function(response) {
                return LimitService.checkQuantity(quantity);
            })
            .then(function(response) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                items.push(item);
            })
            .catch(function(errorResponse) {
                console.log(errorResponse.message);
            })
        }
        */
       this.addToList = function(name, quantity) {
           let namePromise = LimitService.checkName(name);
           let quantityPromise = LimitService.checkQuantity(quantity);

           $q.all([namePromise, quantityPromise])
           .then(function(response) {
            var item = {
                name: name,
                quantity: quantity
            };
            items.push(item);
           })
           .catch(function(error) {
            console.log(error.message);
           })
       }


    }

    LimitService.$inject = ['$q', '$timeout'];
    function LimitService($q, $timeout) {

        this.checkName = function(name) {
            var deffered = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function() {
                if(name.toLowerCase().indexOf('cookie') === -1 && name.toLowerCase().indexOf('cookies') === -1) {
                    deffered.resolve(result);
                } else {
                    result.message = "Cookies cannot be added to your shopping cart";
                    deffered.reject(result);
                }
            }, 3000);
            return deffered.promise;
        }
        
        this.checkQuantity = function(quantity) {
            var deffered = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function() {
                if(quantity<6) {
                    deffered.resolve(result);
                } else {
                    result.message = "This much quanity cannot be added to your shopping cart";
                    deffered.reject(result);
                }
            }, 1000);
            return deffered.promise;
        }
    }

})();