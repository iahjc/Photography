'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	}).state('login',{
		url:'/login/:userid',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	}).state('profile',{
		url:'/profile/:userid',
		templateUrl:'view/profile.html',
		controller:'profileCtrl'
	});

	$urlRouterProvider.otherwise('main');
}]);