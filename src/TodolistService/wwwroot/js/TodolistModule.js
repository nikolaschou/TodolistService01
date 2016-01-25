'use strict';

/**
 * @ngdoc function
 * @name TodolistModule.controller:TodolistCtrl
 * @description
 * # TodolistCtrl
 * Controller of the TodolistModule
 */
var todo = angular.module('TodolistModule', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);
todo.controller('TodolistCtrl',function($scope){
    this.todos=[
        {done:false, title:'Walk the dog'},
        {done:false, title:'Get up early'}
    ];
    this.addTodo = function(td) {
        this.todos.push(td);
    };
});

todo.controller('TodoAdderCtrl',function($scope){
    this.todo = {};
    var that = this;
    this.submit = function(listCtrl) {
        listCtrl.addTodo(that.todo);
        this.todo={};
    };

});
