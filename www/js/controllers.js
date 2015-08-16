angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth, $rootScope, $state, API) {
    var fbAuth = $firebaseAuth(fb);
    $rootScope.api = {};

    $rootScope.api.login = function(username, password) {
      console.error("Logging:");
      fbAuth.$authWithPassword({
        email: username,
        password: password
      }).then(function(authData) {
        $state.go("app.single");
      }).catch(function(error) {
        console.error("ERROR: " + error);
      });
    };

    $rootScope.api.register = function(username, password) {
      fbAuth.$createUser({email: username, password: password}).then(function(userData) {
        return fbAuth.$authWithPassword({
          email: username,
          password: password
        });
      }).then(function(authData) {
        $state.go("app.single");
      }).catch(function(error) {
        console.error("ERROR: " + error);
      });
    };

    $rootScope.api.upload = API.camera.upload;

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, API) {

    $scope.startCamera = API.camera.startCamera;
    $scope.getPhoto = function() {
      API.camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function(err) {
        console.err(err);
      }, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      });
    };

  $scope.playlists = [
    { title: 'Life', id: 1 },
    { title: 'Amazing!', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams, $ionicHistory, $firebaseArray, $cordovaCamera, $rootScope, API) {
    $ionicHistory.clearHistory();

    $rootScope.api.images = [];
    console.error('fb', fb);
    var fbAuth = fb.getAuth();
    if(fbAuth) {
      var userReference = fb.child("users/" + fbAuth.uid);
      var syncArray = $firebaseArray(userReference.child("images"));
      $rootScope.api.images = syncArray;
    } else {
      $state.go("app.playlists");
    }

    $rootScope.api.upload = API.camera.upload;
});
