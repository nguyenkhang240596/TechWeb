(function () {
  'use strict';

  // Brands controller
  angular
    .module('brands')
    .controller('BrandsController', BrandsController);

  BrandsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'brandResolve', 'ProductsService'];

  function BrandsController ($scope, $state, $window, Authentication, brand, ProductsService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.brand = brand;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;


    // Remove existing Brand
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.brand.$remove($state.go('brands.list'));
      }
    }

    // Save Brand
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.brandForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.brand._id) {
        vm.brand.$update(successCallback, errorCallback);
      } else {
        vm.brand.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('brands.view', {
          brandId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
