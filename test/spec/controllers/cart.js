'use strict';

describe('Controller: CartCtrl', function () {

  var $scope, cartService, createController, cartItems;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      cartService = $injector.get('CartService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CartCtrl', {
          $scope: $scope,
          CartService: cartService
        });
      };
    });

    cartItems = [
      {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1},
      {item: {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 3},
      {item: {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'}, num: 2}
    ];

  });

  it('should emit to parent controller when come in cart', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-incart');
  });

  it('should call getCartItem in cartService', function () {
    spyOn(cartService, 'getCartItems').and.returnValue(cartItems);
    createController();
    expect(cartService.getCartItems).toHaveBeenCalled();
  });

  it('should call categoryCartItem in cartService', function () {
    var cartItemsGroup = [
      [
        {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1},
        {item: {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 3}
      ],
      [
        {item: {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'}, num: 2}
      ]
    ];
    spyOn(cartService, 'categoryCartItem');
    createController(function () {
      expect(cartService.categoryCartItem).toHaveBeenCalled();
      expect($scope.cartItemGroup).toEqual(cartItemsGroup)
    });
  });

  it('should call totalPrice in cartService', function () {
    spyOn(cartService, 'totalPrice');
    createController(function () {
      expect(cartService.totalPrice).toHaveBeenCalled();
      expect($scope.total).toEqual(42);
    });
  });

  describe('when click add cart item', function () {

    it('should call addCartItem in cartService', function () {
      spyOn(cartService, 'addCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem);
      expect(cartService.addCartItem).toHaveBeenCalled();
    });

    it('should call categoryCartItem in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'addCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem, function () {
        expect(cartService.categoryCartItem).toHaveBeenCalled();
      });
    });

    it('should call totalPrice in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'addCartItem');
      spyOn(cartService, 'totalPrice');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem, function () {
        expect(cartService.totalPrice).toHaveBeenCalled();
      });
    });

    it('should emit to parent controller when add cart item', function () {
      spyOn($scope, '$emit');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem, function () {
        expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
      });
    });

  });

  describe('when click reduce cart item', function () {

    it('should call reduceCartItem in cartService', function () {
      spyOn(cartService, 'reduceCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem, function () {
        expect(cartService.reduceCartItem).toHaveBeenCalled();
      });
    });

    it('should call categoryCartItem in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'reduceCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem, function () {
        expect(cartService.categoryCartItem).toHaveBeenCalled();
      });
    });

    it('should call totalPrice in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'reduceCartItem');
      spyOn(cartService, 'totalPrice');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem, function () {
        expect(cartService.totalPrice).toHaveBeenCalled();
      });
    });

    it('should emit to parent controller when add cart item', function () {
      spyOn($scope, '$emit');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem, function () {
        expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
      });
    });

  });

  describe('which button display', function () {

    it('should return true when have cart items', function () {
      spyOn(cartService, 'getCartItems').and.returnValue(cartItems);
      createController(function () {
        expect($scope.isShow()).toBe(true);
        expect(cartService.getCartItems).toHaveBeenCalled();
      });
    });

    it('should return false when have not cart items', function () {
      var cartItemList = [];
      spyOn(cartService, 'getCartItems').and.returnValue(cartItemList);
      createController(function () {
        expect($scope.isShow()).toBe(false);
        expect(cartService.getCartItems).toHaveBeenCalled();
      });
    });

    it('should return false when have not cart items', function () {
      var cartItemList = null;
      spyOn(cartService, 'getCartItems').and.returnValue(cartItemList);
      createController(function () {
        expect($scope.isShow()).toBe(false);
        expect(cartService.getCartItems).toHaveBeenCalled();
      });
    });

    it('should return false when have not cart items reduce', function () {
      var cartItemList = [];
      spyOn(cartService, 'reduceCartItem').and.returnValue(cartItemList);
      createController(function () {
        expect($scope.isShow()).toBe(false);
        expect(cartService.getCartItem).toHaveBeenCalled();
      });
    });

    it('should return false when have not cart items reduce', function () {
      var cartItemList = null;
      spyOn(cartService, 'reduceCartItem').and.returnValue(cartItemList);
      createController(function () {
        expect($scope.isShow()).toBe(false);
        expect(cartService.getCartItem).toHaveBeenCalled();
      });
    });

  });

});
