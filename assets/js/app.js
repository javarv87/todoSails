var app = angular.module('todoApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      url: '/',
      templateUrl: 'templates/todo.html',
      controller: 'TodoCtrl'
    })
});
app.controller('TodoCtrl', ['$scope', 'TodoService', function($scope, TodoService) {
  $scope.todoList = [];
  $scope.todo = {};
  TodoService.getTodos()
  .then(function(data) {
    $scope.todoList = data;
  });
  $scope.addTodo = function(todo) {
    TodoService.addTodo(todo)
    .then(function(data) {
      $scope.todoList.push(todo);
      $scope.todo = {};
    })
  };
  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo)
    .then(function(data) {
      $scope.todoList.splice($scope.todoList.indexOf(todo), 1);
    })
  }
}]);
app.service('TodoService', ['$http', '$q', function($http, $q) {
  this.getTodos = function() {
    var defer = $q.defer();
    $http.get('todo/getTodos')
    .success(function(res) {
      defer.resolve(res);
    })
    .error(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  },
  this.addTodo = function(todo) {
    var defer = $q.defer();
    $http.post('todo/addTodo', todo)
    .success(function(res) {
      defer.resolve(res);
    })
    .error(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  },
  this.removeTodo = function(todo) {
    var defer = $q.defer();
    $http.post('todo/removeTodo', todo)
    .success(function(res) {
      defer.resolve(res);
    })
    .error(function(err) {
      defer.reject(err);
    })
    return defer.promise;
  }
}]);
