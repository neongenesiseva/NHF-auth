angular.module('app')
    .controller('mainPageCtrl',function($scope,$location){
    console.log("mainPageCtrl");
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            console.log(user)
        } else {
            console.log('no')
        }
    });
    $scope.userEmail = firebase.auth().currentUser.email;
    
    console.log($scope.userEmail);
    
    $scope.signOut = function(){
        firebase.auth().signOut().then(function(){
        console.log('logged out');
    }
    );
        window.location="/";
    }
})