angular.module('app')
    .controller('mainPageCtrl',function($scope,$location,authService,infoService){
    console.log("mainPageCtrl");
    
    //check login status
    if(authService.root().currentUser!=null){
        console.log('logged in')
    } else {
        alert('please log in');
        setTimeout(window.location="/",2000);
    }
    
    var database = infoService.db();
    
    $scope.displayName = authService.root().currentUser.displayName;
    $scope.userId = authService.root().currentUser.uid;
    console.log($scope.userId);
    console.log(authService.root().currentUser);
    
//Show Data prepared
    var rawData;
    $scope.postKeys=[];
    $scope.modifiedData=[];
    
    //retrive data from database
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
        
        temp.forEach(function(cur,ind){
            cur.datakey=$scope.postKeys[ind];
        })
        //insert datakey into the array returned
       
       $scope.modifiedData=temp.slice(0);
       
        
//       $scope.$digest();
       
       console.log($scope.modifiedData);
       };
   });
    
    //profile settlement
    $scope.editProfile=false;
    $scope.editPro = function(){
        $scope.editProfile=!$scope.editProfile;
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
    
    //signout
    $scope.signOut = function(){
        window.location="/";
        firebase.auth().signOut().then(function(){
        console.log('logged out');
    },function(err){
            console.log(err);
        }
    );
    };
        
    
    
    //add a data
    $scope.posts = function(){
        
        var postData={
            name:$scope.post.name,
            gender:$scope.post.gender,
            age:$scope.post.age
        }
        
        var newPostKey = database.ref().child('posts').push().key;
        console.log(newPostKey);
        
        var updates = {};
        
        updates['/posts/'+$scope.userId+"/"+newPostKey]=postData;
        
        //firebase.database().ref().updates({'ref':'value','ref':'value'})
        
        database.ref().update(updates).then
            (function(res){
                angular.element("#postForm").trigger("reset");
            //use trigger('reset') jQuery method to clearall
            },
             function(err){
            console.log(err);
        });
    };
    
    //remove a data
    $scope.remove = function(index){
        console.log(index);
        database.ref('/posts/'+$scope.userId+"/"+index).remove();
        //$scope.$apply();
    }
    
    
})