app.controller('loginCtrl',function($scope,authService,$window){
  console.log("loginCtrl");
    $scope.errMessage="";
    $scope.resetEmail='';
    $scope.resetPassword=false;
    
    $scope.loginSubmit=function(){
      firebase.auth().signInWithEmailAndPassword($scope.login.email,$scope.login.password)
            .then
                (function(res){
                    console.log('enter');
                    $window.location.href = '#/mainPage';
                      //I dont know why I should use this;
                      //use $location.path wouldn't work;
                    console.log('location');
                },
                function(err){
                $scope.errMessage=err.message;
                $scope.$apply();
                console.log(err.message);
                }
                )
    };
    
    $scope.signInWithGoogle=function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    $window.location.href = '#/mainPage';
        }).
        catch(function(error) {
      console.log(error);
    });
    }
    
    $scope.resetShow=function(){
        $scope.resetPassword=!$scope.resetPassword;
    };
    
    $scope.reset=function() {
        console.log($scope.resetEmail);
        firebase.auth().sendPasswordResetEmail($scope.resetEmail).then
        (function(){alert('message sent')},
         function(err){alert(err)});
    };

});
