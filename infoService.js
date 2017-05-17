angular.module('app')
    .factory('infoService',function($scope,$http){
    
    var info={
        email:email,
        password:password
    };
    
    function getInfo(){
        return info
    }
    
    function setInfo(email,password){
        info.email = email;
        info.password = password
    }
    
    return {
        getInfo:getInfo,
        setInfo:setInfo
    }
    
})