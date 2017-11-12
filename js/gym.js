
var app = angular.module('GYMSYSTEM',['ui.bootstrap','ngCookies','LocalStorageModule']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
   // Login Related route
    when('/', {templateUrl: 'template/login.html',controller: loginCtrl}).
    when('/logout', {templateUrl: 'template/login.html',controller: logoutCtrl}).
    when('/user', {templateUrl: 'template/superAdmin/user.html',controller: userCtrl}).
    when('/addGymOwner', {templateUrl: 'template/superAdmin/addGymOwner.html',controller: addGymOwnerCtrl}).
    when('/superAdmin', {templateUrl: 'template/superAdmin/superAdmin.html',controller: SuperAdminCtrl}).
   
//    gymowner locaion   
    when('/gymowner', {templateUrl: 'template/gymowner/gymowner.html',controller: gymOwnerCtrl}).
    when('/gym', {templateUrl: 'template/gymowner/gym.html',controller: gymCtrl}).
    when('/allUser', {templateUrl: 'template/gymowner/allUser.html',controller: allUserCtrl}).
    when('/addGym/', {templateUrl: 'template/gymowner/addgym.html',controller: addgymCtrl}).
    when('/gymDetails/:gymid', {templateUrl: 'template/gymowner/gymDetails.html',controller: gymDetailsCtrl}).
    when('/viewTrainer/:gymid', {templateUrl: 'template/gymowner/viewTrainer.html',controller: viewTrainerCtrl}).
    when('/addTrainer/:gymid', {templateUrl: 'template/gymowner/addTrainer.html',controller: addTrainerCtrl}).
    when('/viewCustomer/:gymid', {templateUrl: 'template/gymowner/viewCustomer.html',controller: viewCustomerCtrl}).
    when('/addCustomer/:gymid', {templateUrl: 'template/gymowner/addCustomer.html',controller: addCustomerCtrl}).
    when('/viewPackage/:gymid', {templateUrl: 'template/gymowner/viewPackage.html',controller: viewPackageCtrl}).
    when('/addPackage/:gymid', {templateUrl: 'template/gymowner/addPackage.html',controller: addPackageCtrl}).
    when('/gymTrainerDetails/:trainerId', {templateUrl: 'template/gymowner/viewTrainerProfile.html',controller: viewTrainerDetailsProfileCtrl}).
    when('/gymCustomerDetails/:customerId', {templateUrl: 'template/gymowner/viewCustomerProfile.html',controller: viewCustomerDetailsProfileCtrl}).
    when('/gymPackageDetails/:packageId', {templateUrl: 'template/gymowner/gymPackageDetails.html',controller: packageDataDetailsCtrl});
   //otherwise({redirectTo: '/login'});
  }]);
  
  function HeaderCtrl($scope, $cookies, $location) {
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
    $scope.header = {name: "header.html", url: "template/header.html"};
}

function logoutCtrl($scope, $http,$location,$cookies){
     
                         $cookies.jwt=undefined;
                         $cookies.role=undefined;
                         $cookies.email=undefined;
                         $cookies.userid=undefined;
                         $scope.activePath = $location.path('/');
    //   $cookies.jwt=undefined;
    //   $cookies.role=undefined;
    //   $cookies.email=undefined;
     /*$cookies.remove('jwt'); 
           $cookies.remove('diagnostic_center_id');
           $cookies.remove('role');
           $cookies.remove('url1');*/
           
    //  if (!$cookies.jwt) 
    //  {
        
    //   $cookies.jwt=undefined;
    //   $cookies.role=undefined;
    //   $cookies.email=undefined;
    //   $scope.activePath = $location.path('/login');
    //  }
    //  else
    //  {
    //   // // console.log("wdewff");
    //  }
     
 }
  
 // Login starts Here 
  function loginCtrl($scope, $http,$location,$cookies){
      
       $scope.login = (function (LoginData,loginForm) {
               // // console.log($scope.LoginData);
                //// console.log(LoginData);
	          $http.post('http://localhost/gymSystem/public/user/login/',LoginData,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                success(function(data)
                        {
                              
                          console.log(data);
                          $scope.userdata = data[0];
                          console.log($scope.userdata);
                           //    $scope.activePath = $location.path('/orders'); 
                         
                         $cookies.jwt=$scope.userdata.user_jwt;
                         $cookies.role=$scope.userdata.user_role;
                         $cookies.email=$scope.userdata.user_email;
                         $cookies.userid=$scope.userdata.user_id;
                         console.log($cookies.userid);
                         console.log($cookies.user_email);
                         if($cookies.role =="SUPERADMIN"){
                          $scope.activePath = $location.path('/superAdmin'); 
                              
                         }
                         else if($cookies.role =="GYMOWNER"){
                              $scope.activePath = $location.path('/gymowner');
                              
                         }
                         else if($cookies.role =="DELIVERYBOY"){
                              $scope.activePath = $location.path('/deliveryOpsDeliveryRequests');
                              
                         }
                         else if($cookies.role =="GARAGEOWNER"){
                              $scope.activePath = $location.path('/deliveryOpsDeliveryRequests');
                              
                         }
                         
                         else{
                               $scope.activePath = $location.path('/login'); 
                              
                         }
                        });  
                   
 });
 }
   // Login Ends here 

  function SuperAdminCtrl($scope, $http,$location,$cookies){
       	          $http.get('http://localhost/gymSystem/public/user/gymowner/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log(data);
                            $scope.gymowner = data; 

                        });

    
  }

  

function addGymOwnerCtrl($scope,$http,$location,$cookies){

  $scope.addUser = (function(user){
  //  alert("abc");
    console.log(user);
    $http.post('http://localhost/gymSystem/public/add/user/', user,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
    success(function(data)
              { 
             console.log("this is return data");
             console.log(data);
              //window.location.reload();
              $scope.activePath = $location.path('/user');
              });

  });

}

function userCtrl($scope,$http,$location,$cookies){
  $http.get('http://localhost/gymSystem/public/user/gymowner/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log(data);
                            $scope.gymowners = data; 

                        });

}
// GYMOWNER CONTRLER

function gymOwnerCtrl($scope,$http,$location,$cookies){
var user_id =  $cookies.userid;    
console.log($cookies.userid);
$http.get('http://localhost/gymSystem/public/gymCountAll/'+user_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total gym registered")
                            console.log(data.length);
                            $scope.gymsCount = data.length; 

                        });
$http.get('http://localhost/gymSystem/public/packageCountAll/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total package registered")
                            console.log(data.length);
                            $scope.packageCount = data.length; 

                        }); 
$http.get('http://localhost/gymSystem/public/trainerRegisteredAll/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total tariner  registered")
                            console.log(data.length);
                            $scope.totalTrainerCount = data.length; 

                        });         
 $http.get('http://localhost/gymSystem/public/customerCountAll/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total customer registered")
                            console.log(data.length);
                            $scope.totalcustomerCount = data.length; 

                        });
$http.get('http://localhost/gymSystem/public/customerMale/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total customer registered Male")
                            console.log(data.length);
                            $scope.totalcustomerCountMale = data.length; 

                        }); 
$http.get('http://localhost/gymSystem/public/customerFeMale/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total customer registered FeMale")
                            console.log(data.length);
                            $scope.totalcustomerCountFeMale = data.length; 

                        });                                                                                                                     
                        

}

function gymCtrl($scope,$http,$location,$cookies){
// var request_Id = $routeParams.id;
var user_id = $cookies.userid;
$http.get('http://localhost/gymSystem/public/gymowner/gym/'+user_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log(data);
                            $scope.gyms = data; 

                        });

}
function allUserCtrl($scope,$http,$location,$cookies){

    var user_id = $cookies.userid;
    $http.get('http://localhost/gymSystem/public/gymowner/allCustomer/'+user_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log(data);
                            $scope.allCustomer = data; 

                        });

}



function addgymCtrl($scope,$http,$location,$cookies,$routeParams){
    // var request_Id = $routeParams.id;
    var user_id = $cookies.userid;
    console.log("loged in user id ="+user_id);
   // $scope = {};
    $scope.addGymData = function(gymdata){
    console.log(gymdata);
    $http.post('http://localhost/gymSystem/public/add/gym/'+user_id,gymdata,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT");
                            console.log(data);
                        });
 

    }


}

function gymDetailsCtrl($scope,$http,$location,$cookies,$routeParams){
//$scope = {};
var gym_id = $routeParams.gymid;
var user_id = $cookies.userid;
console.log(gym_id);
       $http.get('http://localhost/gymSystem/public/gym/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT1");
                            console.log(data);
                            $scope.gymDetails = data[0];
                            console.log("this is magic");
                            console.log($scope.gymDetails);
                        });
       // Gym trainer Counts

        $http.get('http://localhost/gymSystem/public/trainerRegistered/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total trainer registered by gym");
                            console.log(data.length);
                            $scope.TrainerCount = data.length; 

                        });
       // gym Customer Details

         $http.get('http://localhost/gymSystem/public/customerCountGym/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total trainer registered by gym");
                            console.log(data.length);
                            $scope.gymCustomerCount = data.length; 

                        });
                        
          $http.get('http://localhost/gymSystem/public/packageCountGym/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total trainer registered by gym");
                            console.log(data.length);
                            $scope.gymPackagesCount = data.length; 

                        });

}
function viewTrainerCtrl($scope,$http,$location,$cookies,$routeParams){
var gym_id = $routeParams.gymid;
console.log("gym_trainer_view"+gym_id);
console.log(gym_id);
$scope.gym_id = gym_id;
       $http.get('http://localhost/gymSystem/public/gymTrainer/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT1");
                            console.log(data);
                            $scope.gymTrainers = data;
                            console.log("this is magic");
                            console.log($scope.gymTrainers);
                        });



}
function addTrainerCtrl($scope,$http,$location,$cookies,$routeParams){
var gym_id = $routeParams.gymid;
//console.log(gym_id);
//$scope.gym_id = gym_id;
var trainer_image;
var trainer_data;

//alert("addCustomerCtrl");
$scope.TrainercaptureImage = function(image){
   console.log(image);
  
   trainer_image = image;
}
$scope.addTrainer = function(trainerData){
       console.log("trainer Data");
       console.log(trainerData);
         var temp = [];
         temp = angular.fromJson(trainerData); 
         
          temp['trainer_image'] = trainer_image ;
console.log("this is trainer data to store");          
console.log(temp);
       $http.post('http://localhost/gymSystem/public/addTrainer/'+gym_id,temp,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT trainer data");
                            console.log(data);
  //                          $scope.gymTrainers = data;
    //                        console.log("this is magic");
      //                      console.log($scope.gymTrainers);
                        });


}
}


function viewCustomerCtrl($scope,$http,$location,$cookies,$routeParams){
var gym_id = $routeParams.gymid;
$scope.gym_id = gym_id;
 $http.get('http://localhost/gymSystem/public/gymCustomer/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT1");
                            console.log(data);
                            $scope.gymCustomers = data;
                            console.log("this is Customer listing");
                            console.log($scope.gymCustomers);
                        });


}

function addCustomerCtrl($scope,$http,$location,$cookies,$routeParams){
var gym_id = $routeParams.gymid;
var customer_image;
var customer_data;
//alert("addCustomerCtrl");

                $http.get('http://localhost/gymSystem/public/trainerRegistered/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total package registered")
                            console.log(data.length);
                            $scope.trainerData = data.length;
                            $scope.trainerData = data;
                            console.log(data); 

                        }); 



$http.get('http://localhost/gymSystem/public/packageCountGym/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("total package registered")
                            console.log(data.length);
                            $scope.packageCount = data.length;
                            $scope.packages = data;
                            console.log(data); 

                        }); 
$scope.captureImage = function(image){
  // console.log(image);
  
   customer_image = image;
}
$scope.addCustomer = function(addCustomerData){
    //   $scope.customer_data = addCustomerData;
      
         console.log("this is csutomer data");
       //  console.log($scope.addCustomerData);
         var temp = [];
         temp = angular.fromJson($scope.addCustomerData); 
       //  console.log(temp);
          temp['customer_image'] = customer_image ;
          console.log(temp);
        $http.post('http://localhost/gymSystem/public/addCustomer/'+gym_id,temp,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT customer data");
                            console.log(data);
 
                        });




}

}
function viewPackageCtrl($scope,$cookies,$http,$routeParams,$location){
var gym_id = $routeParams.gymid;
$scope.gym_id = gym_id;
$http.get('http://localhost/gymSystem/public/gymPackage/'+gym_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT1");
                            console.log(data);
                            $scope.gymPackages = data;
                            console.log("this is packages listing");
                            console.log($scope.gymPackages);
                        });


}

function addPackageCtrl($scope,$cookies,$http,$routeParams,$location){
var gym_id = $routeParams.gymid;
$scope.gym_id = gym_id;
$scope.package = [
        {duration : "1 MONTH"},
        {duration : "3 MONTH"},
        {duration : "6 MONTH"},
        {duration : "12 MONTH"},
    ];
$scope.addPackage = function(packageData){
    console.log("packageData");
    console.log(packageData);
     $http.post('http://localhost/gymSystem/public/addPackage/'+gym_id,packageData,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("success INPUT package data");
                            console.log(data);
  //                          $scope.gymTrainers = data;
    //                        console.log("this is magic");
      //                      console.log($scope.gymTrainers);
                        });


}


}

function viewTrainerDetailsProfileCtrl($scope,$cookies,$http,$routeParams,$location){
  var trainerID = $routeParams.trainerId;
  console.log(trainerID);
  $http.get('http://localhost/gymSystem/public/trainerDetails/'+trainerID,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("Trainer data");
                            console.log(data);
                            $scope.trainerProfiledata = data[0];
                            console.log("this is packages listing");
                            console.log($scope.trainerProfiledata);
                        });
}

function viewCustomerDetailsProfileCtrl($scope,$cookies,$http,$routeParams,$location){
  var customerId = $routeParams.customerId;
  $scope.customerId = $routeParams.customerId;
  console.log(customerId);
  $http.get('http://localhost/gymSystem/public/customerDetails/'+customerId,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("customer data");
                            console.log(data);
                            $scope.customerProfiledata = data[0];
                            console.log("this is customer data");
                            console.log($scope.customerProfiledata);
                            console.log($scope.customerProfiledata['customer_plan']);
                            var package_id = $scope.customerProfiledata['customer_plan'];
                             $http.get('http://localhost/gymSystem/public/packageDetails/'+package_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                                    success(function(data)
                                        {   
                                          console.log("this is package data");
                                          console.log(data);
                                          $scope.package_data = data[0];
                                          
                                          });
                              $http.get('http://localhost/gymSystem/public/customerPackageDetails/'+customerId,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                                    success(function(data)
                                        {   
                                          console.log("this is package data");
                                          console.log(data);
                                          $scope.customer_package_data = data[0];
                                          
                                          });

                        });


}



function packageDataDetailsCtrl($scope,$cookies,$http,$routeParams,$location){
  var package_Id = $routeParams.packageId;
  //console.log(customerId);
  $http.get('http://localhost/gymSystem/public/packageDetails/'+package_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                        {
                            console.log("package data");
                            console.log(data);
                            $scope.packageDataDetails = data[0];
                            console.log("this is customer data");
                            console.log($scope.packageDataDetails);
                        });


}
