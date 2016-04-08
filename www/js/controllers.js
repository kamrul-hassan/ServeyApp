angular.module('starter.controllers', [])

    .controller('LoginCtrl', function($scope, $state, $ionicPopup, Questions) {
        var currentUser = localStorage.getItem("CurrentUser");
        if (currentUser) {
            $state.go('tab.home');
        }
        $scope.login = function(user) {
            Questions.login(user).then(res => {
                if (res.data) {
                    localStorage.setItem("CurrentUser", JSON.stringify(res.data));
                    $state.go('tab.home');
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                }
            })
        };
    })

    .controller('HomeCtrl', function($scope, $rootScope, $state, $ionicPopup, Questions) {
        //console.log($cordovaNetwork.isOnline());
        if (!$rootScope.serveyQuestions) {
            var myPopup = $ionicPopup.alert({
                title: 'Survey Download',
                template: 'Please download your servey!'
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
                $state.go('tab.setting');
            });
            return;
        }
        $scope.index = 0;
        $scope.increaseIndex = function() {
            $scope.index = $scope.index + 1;

        }
        $scope.decreaseIndex = function() {
            $scope.index = $scope.index - 1;
        }
        $scope.isLastIndex = function() {
            if ($rootScope.serveyQuestions.length - 1 == $scope.index) return true;
            return false;
        }
        $scope.hasNext = function() {
            if ($rootScope.serveyQuestions.length - 1 == $scope.index) return false;
            return $scope.serveyQuestions.length > $scope.index;
        }
        $scope.hasPrevious = function() {
            if ($scope.index == 0) return false;
            return true;
        }
        $scope.save = function() {
            /*var model = [];
            for(var i=0; i < $scope.serveyQuestions.length; i++)
            {
                var id = $scope.serveyQuestions[i].QuestionId;
                
            }*/
            Questions.save($rootScope.serveyQuestions).then(res => {
                console.log(res.data);
            })
        }
    })

    .controller('SettingCtrl', function($scope, $rootScope, $state, Questions) {
        console.log($rootScope.serveyQuestions);
        $scope.downloadSurvey = function() {
            Questions.get().then(res => {
                $rootScope.serveyQuestions = res.data;
                $state.go('tab.home');
            });
        };
    });
