'use strict';

/**
 * @ngdoc overview
 * @name supercatApp
 * @description
 * # supercatApp
 *
 * Main module of the application.
 */
angular
  .module('supercatApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'geolocation',
    'ngMaterial',
    'restangular',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/discover', {
        templateUrl: 'views/discover.html',
        controller: 'DiscoverCtrl'
      })
      .when('/create-room', {
        templateUrl: 'views/create-room.html',
        controller: 'CreateRoomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(RestangularProvider){
    RestangularProvider.setBaseUrl('http://localhost:3000');
    RestangularProvider.setRequestSuffix('.json');
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('_supercat');
  })
  .run(function(localStorageService, Restangular){
    if(localStorageService.get('user')){
      Restangular.configuration.defaultHeaders['X-CSRF-Token'] = localStorageService.get('user')['auth_token'];
    }
  });