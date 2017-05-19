angular.module('app')
    .controller('mainPageCtrl',function($scope,$location){
    console.log("mainPageCtrl");
//    firebase.auth().onAuthStateChanged(function(user){
//        if (user){
//            console.log(user)
//        } else {
//            alert('please log in')
//            setTimeout(window.location="/",2000);
//        }
//    });
    
    if(firebase.auth().currentUser!=null){
        console.log('logged in')
    } else {
        alert('please log in');
        setTimeout(window.location="/",2000);
    }
    
    var database = firebase.database();
    
    $scope.displayName = firebase.auth().currentUser.displayName;
    $scope.userId = firebase.auth().currentUser.uid;
    console.log($scope.userId);
    console.log(firebase.auth().currentUser);
    
//Show Data prepared
    var rawData;
    $scope.postKeys=[];
    $scope.modifiedData=[];
    

   database.ref('/posts/'+$scope.userId).on('value',function(snapshot){
       
       rawData=snapshot.val();  
       console.log("rawData check"+rawData);
       if(angular.equals(rawData,null)){
           $scope.postKeys=[];
           $scope.modifiedData=[];
           console.log('empty');
       } else {
       console.log(rawData);
       
       $scope.postKeys=Object.keys(rawData);
       console.log($scope.postKeys);
       
       var temp = [];
       
       for(var prop in rawData){
            temp.push(rawData[prop]);
       }
       
       $scope.modifiedData=temp.slice(0);
       
       $scope.$apply();
       
       console.log($scope.modifiedData);
       };
   });
    
    
    $scope.editProfile=false;
    $scope.editPro = function(){
        $scope.editProfile=!$scope.editProfile;
    }
    
    $scope.signOut = function(){
        window.location="/";
        firebase.auth().signOut().then(function(){
        console.log('logged out');
    },function(err){
            console.log(err);
        }
    );
    };
        
    $scope.setProfile=function(){
        database.ref('users/'+$scope.userId).set({
            username:$scope.set.name,
            gender:$scope.set.gender,
            age:$scope.set.age
        }).then(function(res){
            alert('success');
            angular.element('#setForm').trigger('reset');
            //use trigger('reset') jQuery method to clearall
            },
            function(err){
                alert(err);
            }
            )
    };
    
    $scope.posts = function(){
        
        var postData={
            name:$scope.post.name,
            gender:$scope.post.gender,
            age:$scope.post.age
        }
        
        var newPostKey = firebase.database().ref().child('posts').push().key;
        console.log(newPostKey);
        
        var updates = {};
        
        updates['/posts/'+$scope.userId+"/"+newPostKey]=postData;
        
        //firebase.database().ref().updates({'ref':'value','ref':'value'})
        
        firebase.database().ref().update(updates).then
            (function(res){
                angular.element("#postForm").trigger("reset");
            //use trigger('reset') jQuery method to clearall
            },
             function(err){
            console.log(err);
        });
    };
    
    $scope.remove = function(index){
        var i = $scope.postKeys[index];
        database.ref('/posts/'+$scope.userId+"/"+i).remove();
        //$scope.$apply();
    }
    
})