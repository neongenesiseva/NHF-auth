app.factory('authService',function($http){
    //in service we cant use $scope
    var authService={
        signIn:signIn,
        register:register
    };
    
    function signIn(email,password){
        firebase.auth().signInWithEmailAndPassword(email,password);
    };
    
    function register(email,password){
        firebase.auth().createUserWithEmailAndPassword(email,password);
    };
    
    return authService;
    
})