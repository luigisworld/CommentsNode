function commentsCtrl($scope, $http){  
	$http({  
		   url: '/allComments',  
		   method: "GET", 
		   data: $scope.comment, 
		}).success(function (data, status, headers, config) {
		   $scope.comments = data;
		   $scope.comment = ''; //reset form  
		   
		}).error(function (data, status, headers, config) {  
		   alert(status);  
		});
             
    //that is the way for bindding 'submit' event to a AngularJS function   
    $scope.addComment = function(){  
    
		if($scope.comment.length != 0){
			//Asynchronous request  
			$http({  
			   url: '/addComment',  
			   method: "POST", 
			   data: $scope.comment, 
			   headers: {'Content-Type': 'application/json'}  
			}).success(function (data, status, headers, config) {  
			   //data contains the model which is provided by Spring
			   //$scope.comments.push is the way to add new comments into $scope
			   $scope.comments.push(data);
			   $scope.comment = ''; //reset form  
																								 
			}).error(function (data, status, headers, config) {  
			   alert(status);  
			});   
		}else
			alert("You must write a nickname or comment");          
    }  
}
