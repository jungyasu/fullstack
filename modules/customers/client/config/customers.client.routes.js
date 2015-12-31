'use strict';

// Setting up route
angular.module('customers').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('customers', {
        abstract: true,
        url: '',
        template: '<ui-view/>'
      })
      .state('customers.list', {
        url: '/customers',
        templateUrl: 'modules/customers/client/views/list-customers.client.view.html'
      });
      // .state('customers.create', {
      //   url: '/customers/create',
      //   templateUrl: 'modules/customers/client/views/create-customer.client.view.html',
      //   data: {
      //     roles: ['user', 'admin']
      //   },
      //   css: 'modules/customers/css/customers.css'

      // })
      // .state('customers.view', {
      //   url: '/customers/:customerId',
      //   templateUrl: 'modules/customers/client/views/view-customer.client.view.html'
      // })
      // .state('customers.edit', {
      //   url: '/customers/:customerId/edit',
      //   templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
      //   data: {
      //     roles: ['user', 'admin']
      //   }
      // });
  }
]);
