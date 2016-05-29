angular.module('starter.controllers', [])
    .run(function($rootScope, $ionicPopup, $state) {
        $rootScope.logOut = function(){
            $ionicPopup.confirm({
                title: 'Do You Want to Kill',
                template: '',
                okText: "Kill"
            }).then(function (res) {
                if (res) {
                   localStorage.removeItem('CurrentUser');
                   $state.go('login');
                }

            });
        }
    })
    .controller('LoginCtrl', function($scope, $state, $ionicPopup, Login) {
        var currentUser = localStorage.getItem("CurrentUser");
        if (currentUser) {
            $state.go('tab.home');
        }
        $scope.login = function(userID) {
            Login.login(userID).then(res => {
                if (res.data) {
                    localStorage.setItem("CurrentUser", JSON.stringify(res.data));
                    $state.go('tab.home');
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

      var user=JSON.parse(currentUser);
      var typeId = localStorage.getItem('SurveyTypeId');

      if(!typeId){
        $state.go('tab.download');
      }
      DAL.getQuestion(typeId, user.Id).then(function(res){

          $scope.showSaveButton = false;
        //var retrievedData = localStorage.getItem('Questions');
        var retrievedData = res;
        $scope.serveyQuestions = JSON.parse(retrievedData);
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
            $scope.increaseIndex = function() {
                $scope.index = $scope.index + 1;
            }
            $scope.completeIndex = function() {
                $scope.index = $scope.index + 1;
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
            var serveyId=$scope.serveyQuestions[$scope.index].SurveyId;

            if(!serveyId){
              serveyId=0;
            }

            DAL.deleteServey(serveyId)
              .then(function(res){
                DAL.saveServey(typeId, user.Id, $scope.serveyQuestions).then(function(res){
                  $scope.serveyQuestions[$scope.index].SurveyId=res;
                })
              });
          }
        }
      });
    })

    .controller('ListCtrl', function($scope, $state, $ionicPopup, SurveyList) {
        var currentUser = localStorage.getItem("CurrentUser");
        if(currentUser == null) {
            $state.go('login')
        }
        $scope.isServer = { checked: false };
        $scope.isServerChange = function() {
            if($scope.isServer.checked)
            {
                SurveyList.get().then(res => {
                    $scope.surveyList = res.data;
                });
            }
            else{
                $scope.surveyList = [];
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
        Questions.getSureveyType().then(res => {
            $scope.items = res.data;
            localStorage.setItem('SureveyType', JSON.stringify(res.data))
        });
        $scope.addToPlaylist = function (data) {
          localStorage.setItem('SurveyTypeId', data.Id);
          var user=JSON.parse(currentUser);

          DAL.getQuestion(data.Id, user.Id).then(function(result){
            if(!result){
              Questions.get(data.Id).then(res => {
                //localStorage.setItem('Questions', JSON.stringify(res.data));
                DAL.saveQuestion(data.Id, user.Id, res);

            });
            }
            $state.go('tab.home');
          });

        };

    })

    .controller('SyncCtrl', function ($scope, $state, $ionicPopup) {

    });
