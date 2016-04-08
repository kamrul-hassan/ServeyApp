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

    .controller('HomeCtrl', function($scope, $rootScope,$cordovaNetwork, $cordovaSQLite, Questions) {
        //console.log($cordovaNetwork.isOnline());
        $scope.index = 0; $rootScope.serveyQuestions = [];
        Questions.get().then(res => {
            $rootScope.serveyQuestions = res.data;
            /*var db = $cordovaSQLite.openDB({ name: "servey.db" });
            var db = $cordovaSQLite.openDB({ name: "servey.db", bgType: 1 });
            for (var i = 0; i < $scope.serveyQuestions.length; i++) {
                var id = $scope.serveyQuestions[i].QuestionId;
                var type = $scope.serveyQuestions[i].Type;
                var question = $scope.serveyQuestions[i].Question;                
                var query = `INSERT INTO questions (question_id, question_type, question) VALUES (${id},${type},${question})`;
                $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
                    console.log("insertId: " + res.insertId);
                }, function(err) {
                    console.error(err);
                });
            }*/

        });
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

    .controller('SettingCtrl', function($scope, $rootScope) {
        console.log($rootScope.serveyQuestions);
        $scope.settings = {
            enableFriends: true
        };
    });
