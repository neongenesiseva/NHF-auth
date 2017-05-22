app.factory('authService',function(){
    //in service we cant use $scope
    var authService={
        root:root,
        popup:popup,
        signIn:signIn,
        register:register,
        reset:reset
    };
    
    function root(){
        return firebase.auth();
    }
    
    function popup(provider){
        return firebase.auth().signInWithPopup(provider);
    }
    
    function signIn(email,password){
        return firebase.auth().signInWithEmailAndPassword(email,password);
    };
    
    function register(email,password){
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    };
    
    function reset(email){
        return firebase.auth().sendPasswordResetEmail(email);
    }
    
    return authService;
    
})