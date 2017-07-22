app.controller('loginCtrl',function($scope,authService,$window){
  console.log("loginCtrl");
    $scope.errMessage="";
    $scope.resetEmail='';
    $scope.resetPassword=false;
    
    //sign in with 
    $scope.loginSubmit=function(){
      authService.signIn($scope.login.email,$scope.login.password)
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
    
    //signin with google
    $scope.signInWithGoogle=function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        authService.popup(provider).then(function(result) {
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
    
    //reset password
    $scope.resetShow=function(){
        $scope.resetPassword=!$scope.resetPassword;
    };
    
    $scope.reset=function() {
        authService.reset($scope.resetEmail).then
        (function(){alert('message sent');
                   $scope.resetEmail=""},
         function(err){alert(err)});
    };

});
