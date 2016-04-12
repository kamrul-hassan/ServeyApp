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
                $state.go('tab.setting');
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

    .controller('SettingCtrl', function($scope, $state, Questions) {
        $scope.downloadSurvey = function() {
            Questions.get().then(res => {
                localStorage.setItem('Questions', JSON.stringify(res.data))
                //$rootScope.serveyQuestions = res.data;
                
                $state.go('tab.home');
            });
        };
    });
