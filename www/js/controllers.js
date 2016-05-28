angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, $ionicPopup, Login) {
        var currentUser = localStorage.getItem("CurrentUser");
        if (currentUser) {
            $state.go('tab.home');
        }
        $scope.login = function(user) {
            Login.login(user).then(res => {
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

    .controller('HomeCtrl', function($scope, $state, $ionicPopup, Questions) {
        //console.log($cordovaNetwork.isOnline());
        
        var retrievedData = localStorage.getItem('Questions');
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
            $scope.decreaseIndex = function() {
                $scope.index = $scope.index - 1;
            }
            $scope.isLastIndex = function() {
                if ($scope.serveyQuestions.length - 1 == $scope.index) return true;
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
                Questions.save($scope.serveyQuestions).then(res => {
                    console.log(res.data);
                })
            }
        }

    })
    
    .controller('LsitCtrl', function($scope, $state, $ionicPopup, SurveyList) {
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
    .controller('DownloadCtrl', function ($scope, $state, $ionicPopup, Questions) {
        $scope.items = ['Anurag', 'Kamrul', 'Arnab'];
        $scope.addToPlaylist = function (data) {
            $ionicPopup.confirm({
                title: 'Do You Want to Download' + data,
                template: 'Please check your credentials!',
                okText: "Download"
            }).then(function (res) {
                if (res) {
                    Questions.get().then(res => {
                        localStorage.setItem('Questions', JSON.stringify(res.data))
                        //$rootScope.serveyQuestions = res.data;
                    
                        $state.go('tab.home');
                    });
                }

            });
        };

    })

    .controller('SyncCtrl', function ($scope, $state) {

    });
