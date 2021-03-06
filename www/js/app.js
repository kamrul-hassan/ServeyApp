// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services', 'starter.DalServices'])

.run(function($rootScope,$ionicPlatform, $ionicPopup, $state, DAL) {
  $ionicPlatform.ready(function() {
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
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    DAL.prepareDB();
  });
})
.constant('config',{    
    serviceUrl : 'http://custemea3.imshealth.com/surveyservice/api/' //'http://localhost:29983/api'
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
        url: '/login',
        abstract: false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    cache: false,
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.list', {
    url: '/list',
    cache: false,
    views: {
      'tab-list': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('tab.download', {
    url: '/download',
    ache: false,
    views: {
      'tab-download': {
        templateUrl: 'templates/tab-download.html',
        controller: 'DownloadCtrl'
      }
    }

  })
  .state('tab.sync', {
    url: '/sync',
    views: {
      'tab-sync': {
        templateUrl: 'templates/tab-sync.html',
        controller: 'SyncCtrl'
      }
    }

  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
