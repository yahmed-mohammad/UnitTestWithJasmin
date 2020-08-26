describe("Testing http service with Jasmine", function() {

    var services;
    var http;

    beforeEach(function() {
        //A angular provided module which provides a mocked module
        module('NarrowItDownApp');

        inject(function($injector) {
            services = $injector.get('MenuSearchService');
            http = $injector.get('$httpBackend');
        });
    });

    it("should return a items list", function() {
        var menu = {"menu_items": [{"id":877,"short_name":"A1","name":"Won Ton Soup with Chicken"}]};
        http.whenGET('https://davids-restaurant.herokuapp.com/menu_items.json').respond(menu);
        var menuItems = services.getMatchedMenuItem();
        menuItems.then(function(resolve) {
            expect(resolve.data).toEqual(menu);
        })
        http.flush();
    })
})