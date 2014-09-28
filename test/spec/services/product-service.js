'use strict';
describe('Service: ProductService', function () {
  var $httpBackend, productService, productList;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      productService = $injector.get('ProductService');
      $httpBackend = $injector.get('$httpBackend');
    });

    productList = [
      {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'}
    ];
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should return productList', function () {
    $httpBackend.expectGET('/api/items').respond(200, productList);
    productService.getAllProductInfo(function (data) {
      expect(data.length).toBe(3);
    });
    $httpBackend.flush();
  });

  it('should add product info into product list', function () {
    var product = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    productList.push(product);
    $httpBackend.expectPOST('/api/items', {item: product}).respond(200, productList);
    productService.addProductInfo(product, function (data) {
      expect(data.length).toBe(4);
    });
    $httpBackend.flush();
  });

  it('should remove product info into product list', function () {
    var product = {id: 1, 'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    productList.splice(0, 1);
    $httpBackend.expectDELETE('/api/items/1').respond(200, productList);
    productService.removeProductInfo(product, function (data) {
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

});
