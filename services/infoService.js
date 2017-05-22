app.factory('infoService',function(){
    var infoService={
        db:db
    };
    
    function db(){
        return firebase.database();
    }
    
    return infoService;
})