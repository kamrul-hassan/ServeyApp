angular.module('starter.services', [])

.factory('Login', function($http,config){  
    return {
        login: function(model) {           
            return $http.post('https://162.44.202.135/surveyservice/api/Login/Index', model);
        }
    }
})
.factory('SurveyList', function($http,config){  
    return {
        get: function(model) {
            return $http.get('https://162.44.202.135/surveyservice/api/SurveyApp/GetSurveyList');
        }
    }
})
.factory('Questions', function($http,config){    
    var services = {        
        get: function(id) {           
            return $http.get('https://162.44.202.135/surveyservice/api/SurveyApp/Get?typeId='+id);
        },
        login: function(model){
            return $http.post('https://162.44.202.135/surveyservice/api/Login/Index', model);
        },
        save:function(model) {
            return $http.post('https://162.44.202.135/surveyservice/api/SurveyApp/Save', model);
        },
        getSureveyType: function() {           
            return $http.get('https://162.44.202.135/surveyservice/api/SurveyApp/GetSurveyTypes');
        }
    }
    return services;  
});