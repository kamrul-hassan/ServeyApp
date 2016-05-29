angular.module('starter.services', [])

.factory('Login', function($http,config){  
    return {
        login: function(model) {
            return $http.post(`${config.serviceUrl}/Login/Index`, model);
        }
    }
})
.factory('SurveyList', function($http,config){  
    return {
        get: function(model) {
            return $http.get(`${config.serviceUrl}/SurveyApp/GetSurveyList`);
        }
    }
})
.factory('Questions', function($http,config){    
    var services = {        
        get: function(id) {           
            return $http.get(`${config.serviceUrl}/SurveyApp/Get?typeId=${id}`);
        },
        login: function(model){
            return $http.post(`${config.serviceUrl}/Login/Index`, model);
        },
        save:function(model) {
            return $http.post(`${config.serviceUrl}/SurveyApp/Save`, model);
        },
        getSureveyType: function() {           
            return $http.get(`${config.serviceUrl}/SurveyApp/GetSurveyTypes`);
        }
    }
    return services;  
});