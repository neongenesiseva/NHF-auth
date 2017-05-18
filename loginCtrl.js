app.controller('loginCtrl',function($scope,authService,$window){
  console.log("loginCtrl");
    $scope.errMessage="";
    $scope.resetEmail='';
    $scope.resetPassword=false;
    $scope.loginSubmit=function(){
      firebase.auth().signInWithEmailAndPassword($scope.login.email,$scope.login.password)
            .then(function(res){
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
            })
    };
    
    $scope.resetShow=function(){
        $scope.resetPassword=!$scope.resetPassword;
    };
    
    $scope.reset=function() {
        console.log($scope.resetEmail);
        console.log(typeof($scope.resetEmail));
        firebase.auth().sendPasswordResetEmail($scope.resetEmail).then(function(){alert('message sent')},function(err){alert(err)});
    };
});
