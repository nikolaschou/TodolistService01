'use strict';

/**
 * @ngdoc overview
 * @name todoAngular1CApp
 * @description
 * # todoAngular1CApp
 *
 * Main module of the application.
 */
angular
  .module('AppMain', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/todolist.html',
        controller: 'TodolistCtrl',
        controllerAs: 'todolist'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
