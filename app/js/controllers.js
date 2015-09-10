var taskControllers = angular.module("tasksAppControllers", []);

taskControllers.controller("newListController", ['$scope', '$location', 'taskListService', function($scope, $location, taskListService){
    $scope.taskListName = "";
    $scope.tasklist = [];
    $scope.taskName = "";
    
    var taskListObj = {};
    
    $scope.addTask = function(event){
            $scope.tasklist.push({
                "name" : $scope.taskName,
                "completed" : false
            });
            $scope.taskName = "";
    }
    
    $scope.deleteTask = function(index) {
        $scope.tasklist.splice(index, 1);
    }
    
    $scope.save = function(){
        taskListObj[$scope.taskListName] = $scope.tasklist;
        taskListService.setTaskListInLocalStorage( $scope.taskListName, taskListObj);
        taskListObj = {};
        $location.path("");
        
    }
    
    $scope.cancel = function(){
        $location.path("");
        
    }
    
}]);

taskControllers.controller("taskListController", ['$scope', '$routeParams', '$location', 'taskListService', function($scope, $routeParams, $location, taskListService){
    
    $scope.taskName = "";
    $scope.taskListName = $routeParams.taskId;
    
    var taskListObj = {};
    taskListObj = taskListService.getTaskListFromLocalStorage($routeParams.taskId);
    $scope.currentListObj = taskListObj[$routeParams.taskId];
    
    $scope.addTask = function(event){
        if (event.keyCode === 13) {
            $scope.currentListObj.push({
                "name" : $scope.taskName,
                "completed" : false
            });
            $scope.taskName = "";
        }
    }
    
    $scope.cancel = function(){
        $location.path("");
        
    }
     
    $scope.deleteTask = function(index) {
        $scope.currentListObj.splice(index, 1);
    }
    
     $scope.update = function(){
        taskListObj[$routeParams.taskId] = $scope.currentListObj;
        taskListService.setTaskListInLocalStorage( $routeParams.taskId, taskListObj);
        taskListObj = {};
        $location.path("");
        
    }
    
}]);

taskControllers.controller("displayTasksController", ['$scope', '$location', 'taskListService', function($scope, $location, taskListService){

    $scope.items = taskListService.getAllTaskListsFromLocalStorage();
        
    $scope.viewTaskList = function(path){
        $location.path(path);
        
    }
    
    $scope.deleteTaskList = function(key){
        var taskListObj = $scope.items;
        delete taskListObj[key];
        taskListService.updateTaskListInLocalStorage(taskListObj);
        $location.path("");
    }
    
    $scope.launchList = function(path){
        $location.path(path);
    }
    
}]);
    