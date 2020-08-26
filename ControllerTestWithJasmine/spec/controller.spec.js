describe("Test the Controller", function() {
    beforeEach(function() {
        module('LimitShoppingList');
    });
    var $controller;
    var mockShoppingService;
    var myCtrl;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
        mockShoppingService = {};
        mockShoppingService.addToList = function() {
            return null;
        };
        mockShoppingService.getList = function() {
            var items= [];
            var obj = {
                name: 'Chocolate',
                quantity: '2'
            };
            items.push(obj);
            return items;
        };
        myCtrl = $controller('LimitShoppingListController', {ShoppingService: mockShoppingService});
    }));

    it("should check the items name in itemList", function() {
        myCtrl.addItems();
        expect(myCtrl.itemList[0].name).toBe("Chocolate");
    });
    it("should check the items quantity in itemList", function() {
        myCtrl.addItems();
        expect(myCtrl.itemList[0].quantity).toBe("2");
    })
})