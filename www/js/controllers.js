angular.module('starter.controllers', [])
    .controller('LoginCtrl', function($scope, $state, $ionicPopup, Login) {
        var currentUser = localStorage.getItem("CurrentUser");
        if (currentUser) {
            $state.go('tab.home');
        }
        $scope.login = function(user) {
            Login.login(user).then(function(res) {
                if (res.data) {
                    localStorage.setItem("CurrentUser", JSON.stringify(res.data));
                    $state.go('tab.download');
                }
                else {
                    $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                }
            })
        };
    })

    .controller('HomeCtrl', function($scope, $state, $ionicPopup, Questions, DAL) {
        var currentUser = localStorage.getItem("CurrentUser");
        if(currentUser == null) {
            $state.go('login');
        }

      var user = JSON.parse(currentUser);
      var SurveyType = localStorage.getItem('SelectedSurveyType');
      var type = {};
      if(SurveyType == null || !user.Id){
        $state.go('tab.download');
      }
      else{
          var type = JSON.parse(SurveyType);          
      }
      DAL.getQuestion(type.Id, user.Id).then(function(res){
        $scope.showSaveButton = false;
        $scope.serveyQuestions = JSON.parse(res);
        if (!$scope.serveyQuestions) {
            var myPopup = $ionicPopup.alert({
                title: 'Survey Download',
                template: 'Please download your servey!'
            });
            myPopup.then(function(res) {
                $state.go('tab.download');
            });
        }
        else {
            $scope.index = 0;
            $scope.surveyId = 0;
            $scope.increaseIndex = function() {
                $scope.index = $scope.index + 1;
            }
            $scope.completeIndex = function() {
                DAL.completeSurvey($scope.surveyId);                
                $state.go('tab.list');
            }
            $scope.decreaseIndex = function() {
                $scope.index = $scope.index - 1;
                 if( $scope.index <= 0) $scope.showSaveButton = false;
            }
            $scope.isLastIndex = function() {
                if ($scope.serveyQuestions.length - 1 == $scope.index){
                    return true;
                }
                return false;
            }
            $scope.hasNext = function() {
                if ($scope.serveyQuestions.length - 1 == $scope.index) return false;
                return $scope.serveyQuestions.length > $scope.index;
            }
            $scope.hasPrevious = function() {
                if ($scope.index == 0) return false;
                return true;
            }
          $scope.save = function() {  
            if($scope.surveyId > 0)
            {
                DAL.updateSurvey($scope.surveyId, type.Id, type.Name, user.Id, 0, $scope.serveyQuestions);
            }
            else{
                DAL.saveServey(type.Id, type.Name, user.Id, 0,$scope.serveyQuestions).then(function(res){
                   $scope.surveyId = res;
                 })
            }
                      
            // DAL.deleteServey(serveyId)
            //   .then(function(res){
            //     DAL.saveServey(typeId, user.Id, 0,$scope.serveyQuestions).then(function(res){
            //       $scope.surveyId = res;
            //     })
            //   });
          }
        }
      });
    })

    .controller('ListCtrl', function($scope, $state, $ionicPopup, SurveyList, DAL) {
        var currentUser = localStorage.getItem("CurrentUser");
        if (currentUser == null) {
            $state.go('login')
        }
        var user = JSON.parse(currentUser);
        var surveyType = localStorage.getItem('SelectedSurveyType');
        var type
        if (surveyType == null || !user.Id) {
            $state.go('tab.download');
        }
        else {
            type = JSON.parse(surveyType);
        }
        $scope.isServer = { checked: false };
        //$scope.surveyList = DAL.getSurveyIdTypeId(typeId, user.Id);
        DAL.getSurveyList(type.Id, user.Id).then(function (res) {
            $scope.surveyList = res;
        });
        $scope.isServerChange = function() {
            if($scope.isServer.checked)
            {
                SurveyList.get().then(function(res) {
                    $scope.surveyList = res.data;
                });
            }
            else{
               DAL.getSurveyList(type.Id, user.Id).then(function(res) {
                    $scope.surveyList = res;
                });
            }
        };
        $scope.editSurvey = function (id) {
            console.log(id);
        }
    })
    .controller('DownloadCtrl', function ($scope, $state, $ionicPopup, Questions, DAL) {
        var currentUser = localStorage.getItem("CurrentUser");
        if(currentUser == null) {
            $state.go('login')
        }
        Questions.getSureveyType().then(function(res) {
            $scope.items = res.data;
            localStorage.setItem('SureveyType', JSON.stringify(res.data))
        });
        $scope.addToPlaylist = function (data) {
          localStorage.setItem('SelectedSurveyType', JSON.stringify(data));
          var user=JSON.parse(currentUser);

          DAL.getQuestion(data.Id, user.Id).then(function (result) {
              if (!result) {
                  Questions.get(data.Id).then(
                      function (res) {
                          DAL.saveQuestion(data.Id, user.Id, res)
                            .then(
                              function(result){
                                $state.go('tab.home');
                            },
                              function(error){
                                alert('Error saving Questions to local!');
                            });
                      },
                      function(error) {
                        alert(error.statusText);
                    });
              }
              else{
                 $state.go('tab.home');
              }
          });

        };

    })

    .controller('SyncCtrl', function ($scope, $state, $ionicPopup) {

    });
