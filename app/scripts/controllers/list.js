'use strict';

angular.module('letusgoApp')
  .controller('ListCtrl', function ($scope, ItemService, CartService) {

    $scope.$emit('to-parent-inlist');

    ItemService.loadAllItems(function(data){
      $scope.items = data;
    });

    $scope.addCartItem = function (item) {
      CartService.addCartItem(item, function(data){
        if(data==='OK'){
          $scope.$emit('to-parent-changeamounts');
        }
      });
    };
  });
