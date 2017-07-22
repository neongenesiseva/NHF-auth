app
  .controller('registerCtrl',function($scope,authService){
  console.log("registerCtrl");
    $scope.errMessage=""
  $scope.registerSubmit=function(){
      
        authService.register($scope.regemail,$scope.regpassword)
            .then(
                function(res){
                    console.log(res);
                    alert('registered');
                    window.location="/";
                    },
                function(err){
                    $scope.errMessage=err.message;
                    $scope.$digest();
                }
            )
  };
});
//window.location forcely change location,
//I tried $location.path and $window.location.href both didnt work.