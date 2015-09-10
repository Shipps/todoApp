var todoServices = angular.module("todoAppServices", []);

todoServices.factory('taskListService', [function() {
    
    var unique_key = "todoList";
    var taskLists = {};
    
    var factory = {
        setTaskListInLocalStorage: function (taskListName, taskListObj) {
            localStorage.setItem(taskListName,  JSON.stringify(taskListObj));
            
            if (localStorage.getItem(unique_key) !== null) {
                taskLists = JSON.parse(localStorage.getItem(unique_key));
            }
            taskLists[taskListName] = taskListObj;
            localStorage.setItem(unique_key,  JSON.stringify(taskLists));
        },
        updateTaskListInLocalStorage: function(taskListObj){
            localStorage.removeItem(unique_key);
            localStorage.setItem(unique_key,  JSON.stringify(taskListObj));
            
        },
        getTaskListFromLocalStorage: function(taskListKey){
            var list = localStorage.getItem(taskListKey);
            return JSON.parse(list);
        },
        getAllTaskListsFromLocalStorage: function(){
            var list = localStorage.getItem(unique_key);
            return JSON.parse(list);
        }
    };
    
    return factory;
 
}]);