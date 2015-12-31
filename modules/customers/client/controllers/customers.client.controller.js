'use strict';

// customers controller
var customersApp = angular.module('customers');

//
customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$modal', '$log',
  function ($scope, $stateParams, Authentication, Customers, $modal, $log) {
    this.authentication = Authentication;

    this.customers = Customers.query();

    // Open a uibModal window to update a single customer record
    this.modalCreate = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'modules/customers/client/views/create-customer.client.view.html',
        controller: function ($scope, $modalInstance) {

          $scope.ok = function () {
            if(createCustomerForm.$valid){
              $modalInstance.close();
            }
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            // location.reload(true);
          };

        },
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
        $modalInstance.dismiss('cancel');
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };

    // Open a uibModal window to update a single customer record
    this.modalUpdate = function (size, selectedCustomer) {

      var modalInstance = $modal.open({
        templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
        controller: function ($scope, $modalInstance, customer) {
          $scope.customer = customer;

          $scope.ok = function () {
            if(updateCustomerForm.$valid){
              $modalInstance.close($scope.customer);
            }
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            // location.reload(true);
          };

        },
        size: size,
        resolve: {
          customer: function () {
            return selectedCustomer;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };

    // Remove existing customer
    this.remove = function (customer) {
      if (customer) {
        customer.$remove();

        for (var i in this.customers) {
          if (this.customers[i] === customer) {
            this.customers.splice(i, 1);
          }
        }
      } else {
        this.customer.$remove(function () {
          
        });
      }
    };

  }
]);

customersApp.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
  function ($scope, Customers, Notify) {
    
    // Create new customer
    this.create = function () {
      // Create new customer object
      var customer = new Customers({
        firstName: this.firstName,
        surname: this.surname,
        suburb: this.suburb,
        country: this.country,
        industry: this.industry,
        email: this.email,
        phone: this.phone,
        referred: this.referred,
        channel: this.channel
      });

      // Redirect after save
      customer.$save(function (response) {

        // Clear form fields
        // $scope.firstName = '';
        // $scope.surname = '';
        // $scope.suburb = '';
        // $scope.country = '';
        // $scope.industry = '';
        // $scope.email = '';
        // $scope.phone = '';
        // $scope.referred = '';
        // $scope.channel = '';

        Notify.sendMsg('NewCustomer', {'id': response._id});


      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }
]);

customersApp.controller('CustomersUpdateController', ['$scope', 'Customers',
  function ($scope, Customers) {
    
    $scope.channelOptions = [
      {id: 1, item:'Facebook'},
      {id: 2, item:'Twitter'},
      {id: 3, item:'Email'},
    ];

    // Update existing customer
    this.update = function (updatedCustomer) {
      var customer = updatedCustomer;

      customer.$update(function () {
        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }
]);


customersApp.directive('customerList', ['Customers', 'Notify', function(Customers, Notify) {
  return {
    restrict: 'E', //element
    transclude: true, //scoping
    templateUrl: 'modules/customers/client/views/view-customer.client.view.html',
    link: function(scope, element, attrs){
      //when a new customer is added, update the customer list

      Notify.getMsg('NewCustomer', function(event, data){

        scope.customersCtrl.customers = Customers.query();

      });
    }
  };
}]);
    // // Create new customer
    // $scope.create = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'customerForm');

    //     return false;
    //   }

    //   // Create new customer object
    //   var customer = new Customers({
    //     firstName: this.firstName,
    //     surname: this.surname,
    //     suburb: this.suburb,
    //     country: this.country,
    //     industry: this.industry,
    //     email: this.email,
    //     phone: this.phone,
    //     referred: this.referred,
    //     channel: this.channel
    //   });

    //   // Redirect after save
    //   customer.$save(function (response) {
    //     $location.path('customers/' + response._id);

    //     // Clear form fields
    //     $scope.firstName = '';
    //     $scope.surname = '';
    //     $scope.suburb = '';
    //     $scope.country = '';
    //     $scope.industry = '';
    //     $scope.email = '';
    //     $scope.phone = '';
    //     $scope.referred = '';
    //     $scope.channel = '';

    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // // Remove existing customer
    // $scope.remove = function (customer) {
    //   if (customer) {
    //     customer.$remove();

    //     for (var i in $scope.customers) {
    //       if ($scope.customers[i] === customer) {
    //         $scope.customers.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.customer.$remove(function () {
    //       $location.path('customers');
    //     });
    //   }
    // };

    // // Update existing customer
    // $scope.update = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'customerForm');

    //     return false;
    //   }

    //   var customer = $scope.customer;

    //   customer.$update(function () {
    //     $location.path('customers/' + customer._id);
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // // Find a list of customers
    // $scope.find = function () {
    //   $scope.customers = Customers.query();
    // };

    // // Find existing customer
    // $scope.findOne = function () {
    //   $scope.customer = Customers.get({
    //     customer: $stateParams.customerId
    //   });
    // };

