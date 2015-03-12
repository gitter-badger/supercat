"use strict";angular.module("supercatApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","geolocation","ngMaterial","restangular","LocalStorageModule"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/dashboard.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/signin",{templateUrl:"views/signin.html",controller:"SigninCtrl"}).when("/discover",{templateUrl:"views/discover.html",controller:"DiscoverCtrl"}).when("/create-room",{templateUrl:"views/create-room.html",controller:"CreateRoomCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/login"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("http://localhost:3000"),a.setRequestSuffix(".json")}]).config(["localStorageServiceProvider",function(a){a.setPrefix("_supercat")}]).run(["localStorageService","Restangular",function(a,b){a.get("user")&&(b.configuration.defaultHeaders["X-CSRF-Token"]=a.get("user").auth_token)}]),angular.module("supercatApp").controller("MainCtrl",["Restangular","$scope","localStorageService","$location","geolocation",function(a,b,c,d,e){e.getLocation().then(function(a){b.coords={lat:a.coords.latitude,"long":a.coords.longitude},c.set("local",b.coords)}),c.isSupported&&(!c.get("local"),c.get("user")?(b.user=c.get("user"),b.user.gravatar=b.user.email_md5):d.url("/signin"))}]),angular.module("supercatApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("supercatApp").controller("SignupCtrl",["$scope","$location","geolocation","Restangular",function(a,b,c,d){c.getLocation().then(function(b){a.coords={lat:b.coords.latitude,"long":b.coords.longitude}}),a.submit=function(){var c=d.all("users"),e=c.post({user:a.user});console.log(e),b.path("/main")}}]),angular.module("supercatApp").controller("SigninCtrl",["$scope","$location","geolocation","Restangular","localStorageService",function(a,b,c,d,e){c.getLocation().then(function(b){a.coords={lat:b.coords.latitude,"long":b.coords.longitude}}),a.displayPassword=!0,a.togglePassword=function(){a.displayPassword=!a.displayPassword},a.submit=function(){var c=d.all("users");a.displayPassword?c.customPOST({user:a.user},"sign_in").then(function(a){console.log(a);var c="user",d=a;e.isSupported&&e.set(c,d),b.path("/main")}):c.customPOST({user:a.user},"password").then(function(a){console.log(a),b.path("/main")})}}]),angular.module("supercatApp").controller("DiscoverCtrl",["Restangular","$scope",function(a,b){var c=a.all("channels");b.list=[],b.users=[],b.getUsers=function(c){a.one("channels",c).all("users").getList().then(function(a){b.users[c]=a})},c.getList().then(function(a){b.list=a;for(var c=0;c<a.length;c++)b.getUsers(a[c].id)})}]),angular.module("supercatApp").controller("CreateRoomCtrl",["Restangular","$scope","localStorageService",function(a,b,c){b.createroom=function(){var d=a.all("channels");b.geo=c.get("local"),b.user=c.get("user"),a.configuration.defaultHeaders={"X-CSRF-Token":b.user.auth_token},b.channel={},b.channel.longitude=b.geo["long"],b.channel.latitude=b.geo.lat,b.channel.title=b.room.title,d.post({channel:b.channel}).then(function(a){console.log(a)})}}]),angular.module("supercatApp").controller("LoginCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);