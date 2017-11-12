
var app = angular.module('AUTOMETRICS',['ui.bootstrap','ngCookies','LocalStorageModule']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
   // Login Related route
    when('/', {templateUrl: 'template/login.html',controller: loginCtrl}).
    when('/login', {templateUrl: 'template/login.html', controller: loginCtrl}).
    when('/logout', {templateUrl: 'template/login.html', controller: logoutCtrl}).
    //All Orders related route
    when('/orders', {templateUrl: 'template/orders.html', controller: orderCtrl}).
    when('/createOrder', {templateUrl: 'template/createOrder.html', controller: addOrderCtrl}).
	when('/order/:id', {templateUrl: 'template/order-details.html', controller: orderDetailCtrl}).
	when('/supplierOpsNewOrder', {templateUrl: 'template/supplier_ops_new_order.html', controller: supplierOpsNewOrderCtrl}).
	when('/supplierOpsOrderPartQuoteEntry/:id', {templateUrl: 'template/supplier_ops_order_part_quote_entry.html', controller: supplierOpsOrderPartQuoteEntryCtrl}).
	when('/supplierOpsOrderPartQuoteEnteredAwaiting', {templateUrl: 'template/supplier_ops_order_part_quote_entered_awaiting.html', controller: supplierOpsOrderPartQuoteEnteredAwaiting}).
	when('/orderQuoteConfirmation', {templateUrl: 'template/order_quote_confirmation.html', controller: orderQuoteConfirmation}).
	when('/supplierOpsOrderPurchase', {templateUrl: 'template/supplier_ops_order_purchase.html', controller: supplierOpsOrderPurchase}).
	when('/supplierOpsOrderSelectDeliveryOperator', {templateUrl: 'template/supplier_ops_order_select_delivery_operator.html', controller: supplierOpsOrderSelectDeliveryOperator}).
	when('/deliveryOpsDeliveryRequests', {templateUrl: 'template/delivery_ops_delivery_requests.html', controller: deliveryOpsDeliveryRequests}).
	when('/deliveryOpsPickupItems', {templateUrl: 'template/delivery_ops_pickup_items.html', controller: deliveryOpsPickupItems}).
	when('/supplierOpsOrderConfirmPartsHandover', {templateUrl: 'template/supplier_ops_order_confirm_parts_handover.html', controller: supplierOpsOrderConfirmPartsHandover}).
	when('/deliveryOpsReachedGarage', {templateUrl: 'template/delivery_ops_reached_garage.html', controller: deliveryOpsReachedGarage}).
	when('/deliveryOpsGenerateDeliveryReciept', {templateUrl: 'template/delivery_ops_generate_delivery_reciept.html', controller: deliveryOpsGenerateDeliveryReciept}).
	when('/deliveryOpsDeliveryRecieptSubmission', {templateUrl: 'template/delivery_ops_delivery_reciept_submission.html', controller: deliveryOpsDeliveryRecieptSubmission}).
	when('/adminOrderDetail/:id', {templateUrl: 'template/admin_order_detail.html', controller: adminOrderDetail}).
	when('/finalReciept/:id/:delivered_id', {templateUrl: 'template/delivery_ops_delivery_reciept_submission.html', controller: finalReciept}).
	//when('/deliveryOpsGenerateDeliveryReciept1', {templateUrl: 'template/delivery_ops_generate_delivery_reciept1.html', controller: deliveryOpsGenerateDeliveryReciept1}).
  //All garages related route
   // when('/', {templateUrl: 'template/garages.html', controller: garageCtrl}).
    when('/garages', {templateUrl: 'template/garages.html', controller: garageCtrl}).
    when('/addGarage', {templateUrl: 'template/addGarage.html', controller: addGarageCtrl}).
    when('/garage/:id', {templateUrl: 'template/garageDetail.html', controller: garageDetailCtrl}).
    when('/editGarage/:id',{templateUrl:'template/editGarageDetail.html',controller:editGarageDetailCtrl}).

    //All Suppliers related route
    when('/suppliers', {templateUrl: 'template/suppliers.html', controller: supplierCtrl}).
    when('/addSuppliers', {templateUrl: 'template/addSuppliers.html', controller: addSupplierCtrl}).
    when('/supplier/:id', {templateUrl: 'template/supplierDetail.html', controller: supplierDetailCtrl}).
    when('/editSupplier/:id',{templateUrl:'template/editSupplierDetails.html',controller:editSupplierDetailCtrl}).
    
    //All Operators related route
    when('/operators', {templateUrl: 'template/operators.html', controller: operatorCtrl}).
    when('/addOperator', {templateUrl: 'template/addOperator.html', controller: addOperatorCtrl}).
     when('/operator/:id', {templateUrl: 'template/operatorDetail.html', controller: operatorDetailCtrl}).
     when('/editOperator/:id',{templateUrl:'template/editOperatorDetails.html',controller:editOperatorDetailCtrl}).
   
   // All garage Owner related routes
     when('/GarageOwner',{templateUrl:'template/garageOwner.html',controller:garageOwnerCtrl}).
     when('/addGarageOwner',{templateUrl:'template/addGarageOwner.html',controller:addGarageOwnerCtrl});
   
   
   
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
     /*$cookies.remove('jwt'); 
           $cookies.remove('diagnostic_center_id');
           $cookies.remove('role');
           $cookies.remove('url1');*/
           
     if (!$cookies.jwt) 
     {
        
      $cookies.jwt=undefined;
      $cookies.role=undefined;
      $cookies.email=undefined;
      $scope.activePath = $location.path('/login');
     }
     else
     {
      // // console.log("wdewff");
     }
     
 }
  
 // Login starts Here 
  function loginCtrl($scope, $http,$location,$cookies){
      
       $scope.login = (function (LoginData,loginForm) {
               // // console.log($scope.LoginData);
                //// console.log(LoginData);
	          $http.post('http://localhost/autometrics/autometrics/user/login/',LoginData,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                success(function(data)
                        {
                              
                         // // console.log(data);
                          $scope.userdata = data[0];
                        //  // console.log($scope.userdata);
                           //    $scope.activePath = $location.path('/orders'); 
                         
                         $cookies.jwt=$scope.userdata.jwt;
                         $cookies.role=$scope.userdata.role;
                         $cookies.email=$scope.userdata.email;
                         $cookies.userid=$scope.userdata.user_id;
                    //     // console.log($cookies.email);
                         if($cookies.role =="ADMIN"){
                          $scope.activePath = $location.path('/orders'); 
                              
                         }
                         else if($cookies.role =="SUPPLYOPS"){
                              $scope.activePath = $location.path('/supplierOpsNewOrder');
                              
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
// GARAGE STARTS
function garageCtrl($scope, $http,$cookies,$location) 
{
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
         $http.get('http://localhost/autometrics/autometrics/list/garages/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
            success(function(data){
              $scope.garageNames = data;
           //   // console.log($scope.garageNames);
           //   // console.log($scope.garageNames[0].garage_name);
           //   // console.log($scope.garageNames.length);
              for(var i=0;i<$scope.garageNames.length;i++){
                
           //     // console.log($scope.garageNames[i].garage_name);
                
              }
            });
  }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }

}

function addGarageCtrl($scope, $http,$cookies,$location)
	{
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
      }else if($cookies.role == "ADMIN"){       
            
        $scope.garage = {};        
        $scope.addGarage = function(garage,AddNewGarageForm) 
          {
            
            $http.post('http://localhost/autometrics/autometrics/add/garage/', garage,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
              { 
            //		// console.log("success");
              //window.location.reload();
              $scope.activePath = $location.path('/garages');
              });
          
    
          };
          
      }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}


function garageDetailCtrl($scope,$http,$routeParams,$cookies,$location){
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }else if($cookies.role == "ADMIN"){
           var request_Id = $routeParams.id;
         //  // console.log(request_Id);
           $http.get('http://localhost/autometrics/autometrics/edit/garage/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
            success(function(data){
              $scope.garageDetails = data[0];
         //     // console.log($scope.garageDetails);
             // // console.log($scope.garageNames[0].garage_name);
             // // console.log($scope.garageNames.length);
             
            });
  } else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
}
function editGarageDetailCtrl($scope,$http,$routeParams,$cookies,$location){
  var garage_request_id = $routeParams.id;
   console.log(garage_request_id);
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
    else if($cookies.role == "ADMIN"){      
           $http.get('http://localhost/autometrics/autometrics/edit/garage/'+garage_request_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
            success(function(data){
              $scope.garageDetails = data[0];
              console.log($scope.garageDetails);
             // console.log($scope.garageNames[0].garage_name);
             // console.log($scope.garageNames.length);
             
            });
         $scope.updateGarage = (function(garageUpdData,garageID){
          console.log("updateed data");
          console.log(garageUpdData);
          console.log(garageID);
          var garage_id = garageID;
          $scope.garageUpdData = garageUpdData;
          //change this url acording to api
          $http.post('http://localhost/autometrics/autometrics//update/garage/'+garage_id,garageUpdData,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
          success(function(data){
          // console.log(data);
          $scope.activePath = $location.path('/garages');
            });
          
          });
    }else if($cookies.role == "SUPPLYOPS"){
       // do nothing
       
     }
     else if($cookies.role == "DELIVERYBOY"){
       //do nothing
       
     }
         
         
}






//GARAGE ENDS

//operator Controller starts here  

function operatorCtrl($scope, $http,$cookies,$location) 
{
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
   else if($cookies.role == "ADMIN"){
		$http.get('http://localhost/autometrics/autometrics/list/operator/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
					success(function(data){
					//    // console.log(data[0].fname);
					  $scope.operatorNames = data;
				//	  // console.log($scope.operatorNames);
				//	  // console.log($scope.operatorNames[0].f_name);
				//	  // console.log($scope.operatorNames.length);
					  for(var i=0;i<$scope.operatorNames.length;i++){
						
				//		// console.log($scope.operatorNames[i].fname);
						
					  }
					});
           }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
}

function addOperatorCtrl($scope, $http,$cookies,$location)
	{
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }         
    else if($cookies.role=="ADMIN"){     
		$scope.operator = {};        
		$scope.addOperator = function(operator,AddNewOperatorForm) 
			{
         
				$http.post('http://localhost/autometrics/autometrics/add/operator/', operator,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
				//		// console.log("success");
       // 	window.location.reload();
					$scope.activePath = $location.path('/operators');
          });
      

			};
       }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}


function operatorDetailCtrl($scope, $http,$routeParams,$cookies,$location){

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
   else if($cookies.role == "ADMIN"){
    var operator_request_id = $routeParams.id;
                  $http.get('http://localhost/autometrics/autometrics/edit/operator/'+operator_request_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data){
                  $scope.operatorDetails = data[0];
          //        // console.log($scope.operatorDetails);
          //        // console.log($scope.operatorDetails.operator_name);
                 
                  });
                   }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
         
}

function editOperatorDetailCtrl($scope, $http,$routeParams,$cookies,$location){
  var operator_request_id = $routeParams.id;
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
                  $http.get('http://localhost/autometrics/autometrics/edit/operator/'+operator_request_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data){
                  $scope.operatorDetails = data[0];
                  console.log($scope.operatorDetails);
                  console.log($scope.operatorDetails.operator_name);
                 
                  });
      $scope.updateOperator = (function(operatorUpdData,operatorID){
          console.log("updated data");
          console.log(operatorUpdData);
          console.log(operatorID);
          var operator_id = operatorID;
          $scope.operatorUpdData = operatorUpdData;
          //change this url acording to api
          $http.post('http://localhost/autometrics/autometrics/update/operator/'+operator_id,operatorUpdData,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
          success(function(data){
           console.log(data);
          $scope.activePath = $location.path('/operators');
            });             
        });
  }   else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
                  
                  
                  
}







//Operator controller ends here

// Supplier controller starts here
function supplierCtrl($scope, $http,$cookies,$location) 
{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
   else if($cookies.role == "ADMIN"){
	$http.get('http://localhost/autometrics/autometrics/list/supplier/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.supplierNames = data;
        //     // console.log($scope.supplierNames);
        //     // console.log($scope.supplierNames[0].supplier_name);
        //     // console.log($scope.supplierNames.length);
             for(var i=0;i<$scope.supplierNames.length;i++){
               
          //     // console.log($scope.supplierNames[i].garage_name);
               
             }
			 });
            }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
}


function addSupplierCtrl($scope, $http,$cookies,$location)
	{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }         
   else if($cookies.role == "ADMIN"){      
		$scope.supplier = {};        
		$scope.addSupplier = function(supplier,AddNewSupplierForm) 
			{
        
				$http.post('http://localhost/autometrics/autometrics/add/supplier/', supplier,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
				//		// console.log("success");
      //  	window.location.reload();
				$scope.activePath = $location.path('/suppliers');
        	});
      

			};
       }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}



function supplierDetailCtrl($scope, $http,$routeParams,$cookies,$location) 
{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
          var supplier_request_id = $routeParams.id;
	$http.get('http://localhost/autometrics/autometrics/edit/supplier/'+supplier_request_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.supplierDetails = data[0];
             // console.log($scope.supplierDetails);
             // console.log($scope.supplierDetails.supplier_name);
           
           });
            }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
}


function editSupplierDetailCtrl($scope, $http,$routeParams,$cookies,$location){
           var supplier_request_id = $routeParams.id;
    if(!$cookies.jwt)
      {
        $scope.activePath = $location.path('/login');
      }
  else if($cookies.role =="ADMIN"){
        
  
        	$http.get('http://localhost/autometrics/autometrics/edit/supplier/'+supplier_request_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.supplierDetails = data[0];
             console.log($scope.supplierDetails);
             console.log($scope.supplierDetails.supplier_name);
           
           });


            $scope.updateSupplier = (function(supplierUpdData,supplier_id){
           console.log("supllier Update data");
           console.log(supplierUpdData);            
           console.log(supplier_id);
           var update_supplier_id = supplier_id;
           
           $http.post('http://localhost/autometrics/autometrics/update/supplier/'+update_supplier_id,supplierUpdData,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
            // $scope.supplierDetails = data[0];
             console.log(data);
//             console.log($scope.supplierDetails.supplier_name);
               $scope.activePath = $location.path('/suppliers');
           });
           
           
            });
  }
          else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
}


// supplier controller ends here
	
//Order Contoller starts here

function orderCtrl($scope, $http,$cookies,$location) 
{
           
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
         $http.get('http://localhost/autometrics/autometrics/list/order/order-item',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
            success(function(data){
              $scope.orderNames = data;
              console.log($scope.orderNames);
              console.log($scope.orderNames[0].id);
              console.log($scope.orderNames.length);
              
              for(var i=0;i<$scope.orderNames.length;i++){
                
                console.log($scope.orderNames[i].garage_name);
                //console.log($scope.orderNames[i].order_item.length);
				//$scope.itemNames = $scope.orderNames[i].order_item.length;
              }
            });
  } else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
      

}
  
  


function addOrderCtrl($scope, $http,$cookies,$location)
	{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
      else if($cookies.role == "ADMIN"){
       // get all supplier list for select
                $http.get('http://localhost/autometrics/autometrics/list/garages/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                 success(function(data){
                 $scope.garageNames = data;
                 // console.log($scope.garageNames);
                 // console.log($scope.garageNames[0].garage_name);
                 // console.log($scope.garageNames.length);
                 for(var i=0;i<$scope.garageNames.length;i++){
                   
                   // console.log($scope.garageNames[i].garage_name);
                   
                 }
               });
       
       
       $scope.EmpModel = {  
                   garage_id:0,
           Id: 0,   
                   item: '',  
                   manufacturer: '',  
                   model: '',  
                   year: 0,  
                   varient: '',  
                   fuel_type: '',  
                   sub_category: '',  
                   category: '',  
                   quantity: 'Qtty',  
               };  
     
               $scope.EmpList = [];  
               $scope.AddData = (function () { 
           if($scope.EmpModel.item)
           {
                   var _emp = {
                       garage_id:$scope.EmpModel.garage_id,					
                       Id: $scope.EmpList.length + 1,  
                       item: $scope.EmpModel.item,  
                       manufacturer: $scope.EmpModel.manufacturer,  
                       model: $scope.EmpModel.model,  
                       year: $scope.EmpModel.year,  
                       varient: $scope.EmpModel.varient,  
                       fuel_type: $scope.EmpModel.fuel_type,  
                       sub_category: $scope.EmpModel.sub_category, 
                       category: $scope.EmpModel.category,  
                       quantity: $scope.EmpModel.quantity  
                   }; 
           }
                   $scope.EmpList.push(_emp);  
                   ClearModel();  
               });  
     
               $scope.DeleteData = (function (emp) {  
                   var _index = $scope.EmpList.indexOf(emp);  
                   $scope.EmpList.splice(_index, 1);  
               });
     
               $scope.BindSelectedData = (function (emp) {  
           document.getElementById("add").style.display = "none";
           document.getElementById("update").style.display = "block";
                   $scope.EmpModel.Id = emp.Id;  
                   $scope.EmpModel.item = emp.item;  
                   $scope.EmpModel.manufacturer = emp.manufacturer;  
                   $scope.EmpModel.model = emp.model;  
                   $scope.EmpModel.year = emp.year;  
                   $scope.EmpModel.varient = emp.varient;  
                   $scope.EmpModel.fuel_type = emp.fuel_type;  
                   $scope.EmpModel.sub_category = emp.sub_category;  
                   $scope.EmpModel.category = emp.category;  
                   $scope.EmpModel.quantity = emp.quantity;  
           
               });  
     
               $scope.UpdateData = (function () {  
                   $.grep($scope.EmpList, function (e) {  
                       if (e.Id == $scope.EmpModel.Id) {  
                           e.item = $scope.EmpModel.item;  
                           e.manufacturer = $scope.EmpModel.manufacturer;  
                           e.model = $scope.EmpModel.model;  
                           e.year = $scope.EmpModel.year;  
                           e.varient = $scope.EmpModel.varient;  
                           e.fuel_type = $scope.EmpModel.fuel_type;  
                           e.sub_category = $scope.EmpModel.sub_category;  
                           e.category = $scope.EmpModel.category;  
                           e.quantity = $scope.EmpModel.quantity;  
                       }  
                   });  
                   ClearModel();
           document.getElementById("update").style.display = "none";
           document.getElementById("add").style.display = "block";
               });  
     
               function ClearModel() {  
                   $scope.EmpModel.Id = 0;  
                   $scope.EmpModel.item = '';  
                   $scope.EmpModel.manufacturer = '';  
                   $scope.EmpModel.model = '';  
                   $scope.EmpModel.year = 0;  
                   $scope.EmpModel.varient = '';  
                   $scope.EmpModel.fuel_type = '';  
                   $scope.EmpModel.sub_category = '';  
                   $scope.EmpModel.category = '';  
                   $scope.EmpModel.quantity = 0;  
               }  
         
         $scope.display = (function () {  
                   // console.log($scope.EmpList);  
           //// console.log(EmpModel);
                   $http.post('http://localhost/autometrics/autometrics/add/order/', $scope.EmpList,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
             { 
               // console.log(data);
                 //window.location.reload();
                 $scope.activePath = $location.path('/orders');
             });
               });
         
          }else if($cookies.role == "SUPPLYOPS"){
               // do nothing
               
             }
             else if($cookies.role == "DELIVERYBOY"){
               //do nothing
               
             }
	}
	

function orderDetailCtrl($scope,$http,$routeParams,$cookies,$location,localStorageService){
	$scope1 = [];
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
   else if($cookies.role == "ADMIN"){

          var request_Id = $routeParams.id;
		           // console.log(request_Id);
		  $scope.EmpModel = {  
                item: '',  
                manufacturer: '',  
                model: '',  
                year: 0,  
                varient: '',  
                fuel_type: '',  
                sub_category: '',  
                category: '',  
                quantity: 'Qtty',  
            };  
		  $scope.EmpList = [];  
		  
		  
          $http.get('http://localhost/autometrics/autometrics/edit/order/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.orderDetails = data;
             // console.log($scope.orderDetails);
            // // console.log($scope.garageNames[0].garage_name);
             // // console.log("length");
             // // console.log($scope.orderDetails.length);
			 
           });
		   
		   
		   $http.get('http://localhost/autometrics/autometrics/operatorname/order/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
		  success(function(data)
					{ 
					// console.log("imp data");
						// console.log(data);
					$scope.operator_Name = data;	
						
						 
					});
		   
		   
		   $http.get('http://localhost/autometrics/autometrics/list/supply_operator/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
					success(function(data){
					//    // console.log(data[0].fname);
					  $scope.operatorNames = data;
					  // // console.log($scope.operatorNames);
					  // // console.log($scope.operatorNames[0].f_name);
					  // // console.log($scope.operatorNames.length);
					  for(var i=0;i<$scope.operatorNames.length;i++){
						
						// // console.log($scope.operatorNames[i].f_name);
						
					  }
					});
					
		
			$scope.updateOperator = function(operator,$location) 
			{
         
				$http.post('http://localhost/autometrics/autometrics/update/operator/order/'+request_Id,operator,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						// console.log(data);
						$scope.operator_name = data;
						
						// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
			$scope.AddData = (function () { 
				if($scope.EmpModel.item)
				{
                var _emp = {
                    garage_id:$scope.EmpModel.garage_id,					
                    Id: $scope.EmpList.length + 1,  
                    item: $scope.EmpModel.item,  
                    manufacturer: $scope.EmpModel.manufacturer,  
                    model: $scope.EmpModel.model,  
                    year: $scope.EmpModel.year,  
                    varient: $scope.EmpModel.varient,  
                    fuel_type: $scope.EmpModel.fuel_type,  
                    sub_category: $scope.EmpModel.sub_category, 
                    category: $scope.EmpModel.category,  
                    quantity: $scope.EmpModel.quantity  
                }; 
				}
                $scope.EmpList.push(_emp);  
                
            });  
			
			$scope.BindSelectedData = (function (emp) {  
				
				// console.log("emp");
				// console.log(emp);
                $scope.EmpModel.item = emp.item;  
                $scope.EmpModel.manufacturer = emp.manufacturer;  
                $scope.EmpModel.model = emp.model;  
                $scope.EmpModel.year = emp.year;  
                $scope.EmpModel.varient = emp.varient;  
                $scope.EmpModel.fuel_type = emp.fuel_type;  
                $scope.EmpModel.sub_category = emp.sub_category;  
                $scope.EmpModel.category = emp.category;  
                $scope.EmpModel.quantity = emp.quantity;  
                $scope.EmpModel.item_id = emp.item_id;  
				document.getElementById("editItemDiv").style.display = "block";
            }); 

			$scope.UpdateData = (function (updata) {  
                
                     // console.log("updata");
                     // console.log(updata);
                     // console.log("item_id");
                     // console.log(updata.item_id);
                     
                          
                     $http.post('http://localhost/autometrics/autometrics/update/order-parameters/'+updata.item_id,updata,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						// console.log(data);
						
						window.location.reload();
					});
               document.getElementById("editItemDiv").style.display = "none";
				 });
				 
				 $scope.ClearModel = (function (EmpModel) { 
                
                $scope.EmpModel.item = '';  
                $scope.EmpModel.manufacturer = '';  
                $scope.EmpModel.model = '';  
                $scope.EmpModel.year = 0;  
                $scope.EmpModel.varient = '';  
                $scope.EmpModel.fuel_type = '';  
                $scope.EmpModel.sub_category = '';  
                $scope.EmpModel.category = '';  
                $scope.EmpModel.quantity = 0;  
                $scope.EmpModel.item_id = ''; 
				document.getElementById("editItemDiv").style.display = "none";
            });  
			
			$scope.display = (function () {  
                // console.log($scope.EmpList);  
				
                $http.post('http://localhost/autometrics/autometrics/add/order/', $scope.EmpList,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						// console.log(data);
					});
            });
			
			 }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
			
			
     
}

//newly added starts
//newly added starts
function supplierOpsNewOrderCtrl($scope, $http,$cookies,$location)
	{
       var operator_id = $cookies.userid;
       console.log("this is operator id");
       console.log(operator_id);
      if(!$cookies.jwt)
        {
          $scope.activePath = $location.path('/login');
        }
        else if($cookies.role == "ADMIN"){
          
        }
        else if($cookies.role == "SUPPLYOPS"){
              
                $http.get('http://localhost/autometrics/autometrics/list/order/order-item/operatorId/'+operator_id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                success(function(data){
                    console.log("this is operator related data");
                    console.log(data);
                    $scope.operatorOrder = data;
                    for(var i=0;i<$scope.operatorOrder.length;i++){
						
				             		 console.log($scope.operatorOrder[i].order_id);
						
					           }

                
					}); 
            
            
            
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }    
	}
	
	
	
	function supplierOpsOrderPartQuoteEntryCtrl($scope, $http,$cookies,$location,$routeParams)
	{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
		var request_Id = $routeParams.id;
        $http.get('http://localhost/autometrics/autometrics/list/order/order-item/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.orderData = data;
              console.log($scope.orderData);
            // // console.log($scope.garageNames[0].garage_name);
             // // console.log("length");
             // // console.log($scope.orderDetails.length);
			 
           });
		   
		   
		$http.get('http://localhost/autometrics/autometrics/list/supplier/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.supplierNames = data;
             // console.log($scope.supplierNames);
             // console.log($scope.supplierNames[0].supplier_name);
             // console.log($scope.supplierNames.length);
             for(var i=0;i<$scope.supplierNames.length;i++){
               
               // console.log($scope.supplierNames[i].garage_name);
               
             }
			 });
			 
			 
		
		
			$scope.updateOrderItem = function(quote,id) 
			{
					var orderid = id;
					//// console.log("Quote object");
					//// console.log(quote);
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/order-item/'+orderid,quote,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						//window.location.reload();
						
						 
					});
      

			};
       }else if($cookies.role == "SUPPLYOPS"){
            var request_Id1 = $routeParams.id;
            
            console.log(request_Id1);
               
        		$http.get('http://localhost/autometrics/autometrics/list/order/order-item/'+request_Id1,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
              $scope.quotepending =0;
             $scope.orderData = data;
           
              console.log($scope.orderData);
             // console.log($scope.supplierNames[0].supplier_name);
             // console.log($scope.supplierNames.length);
             for(var i=0;i<$scope.orderData.length;i++){
                  // console.log("pls"+$scope.orderData[i].item_status);
                     if($scope.orderData[i].item_status == "QUOTE_PENDING"){
                       $scope.quotepending =$scope.quotepending + 1;
                    console.log($scope.quotepending);
                     }
                     else{
                      // do nothing
                      
                     }
               // console.log($scope.supplierNames[i].garage_name);
               
             }
			 });
           
       	$http.get('http://localhost/autometrics/autometrics/list/supplier/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.supplierNames = data;
             // console.log($scope.supplierNames);
             // console.log($scope.supplierNames[0].supplier_name);
             // console.log($scope.supplierNames.length);
             for(var i=0;i<$scope.supplierNames.length;i++){
               
               // console.log($scope.supplierNames[i].garage_name);
               
             }
			 });    
           
            	$scope.updateOrderItemSupplyops = function(quote,id) 
                {
                    var orderid = id;
                     console.log("Quote object");
                     console.log(quote);
                     console.log(id);
                  $http.post('http://localhost/autometrics/autometrics/update/order-item/'+orderid,quote,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
                  success(function(data)
                    { 
                       console.log(data);
                      //$scope.operator_name = data;
                      
                      //// console.log("storage");
                      
                      window.location.reload();
                      
                       
                    });
                
          
                };
            	
			$scope.finalOrderItemSupplyops = function(finale,id) 
			{
					var orderid = id;
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/confirm/order-item/'+orderid,finale,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
      	
			$http.get('http://localhost/autometrics/autometrics/list/delivery_operator/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.deliveryNames = data;
             // console.log($scope.deliveryNames);
             // console.log($scope.deliveryNames[0].supplier_name);
             // console.log($scope.deliveryNames.length);
             for(var i=0;i<$scope.deliveryNames.length;i++){
               
               // console.log($scope.deliveryNames[i].garage_name);
               
             }
			 });
      
      
      
            	$scope.assignDeliveryBoySupplyops = function(delivery,id) 
			{
					var orderid = id;
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/deliveryboy_assigned/order-item/'+orderid,delivery,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}
	
	
	function supplierOpsOrderPartQuoteEnteredAwaiting($scope, $http,$cookies,$location)
	{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
   else if($cookies.role == "ADMIN"){
    
    
          }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }

	}
	
	function orderQuoteConfirmation($scope, $http, $modal,$cookies,$location)
	{

if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
	$scope.CancelReq = function(order_id) 
      {
         

         var modalInstance= $modal.open({
            templateUrl: '/autom/template/cancelPopup.html',
            controller: 'cancelCtrl',
            windowClass : 'show',
            size: 'sm',
			backdrop : false,
            scope: $scope,
            resolve: {
                        order_id: function () {
                        return order_id;
                        }
                      }
          });
          return false;
      };
	   }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	  
	  
	  
	  
	}
	
	
	function cancelCtrl($scope, $modalInstance, $http, $modal,$cookies,$location)
	{
		
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
		$scope.cancel = function () 
      {
        $modalInstance.dismiss('cancel');
      };
		 }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}
	
	
	function supplierOpsOrderPurchase($scope, $http,$cookies,$location)
	{
  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }else if($cookies.role == "ADMIN"){
    
           }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }		
		
	}
	
	function supplierOpsOrderSelectDeliveryOperator($scope, $http,$cookies,$location)
	{
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }else if($cookies.role == "ADMIN"){
    
    
           }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }		
		
	}
	
	function deliveryOpsDeliveryRequests($scope, $http,$cookies,$location)
	{
		
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
    
           }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            console.log($cookies.userid);
            var deluserid = $cookies.userid;
            	$http.get('http://localhost/autometrics/autometrics//list/order/deliveryid/'+deluserid,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.orderDetail = data;
              console.log($scope.orderDetail);
             // console.log($scope.deliveryNames[0].supplier_name);
             // console.log($scope.deliveryNames.length);
             for(var i=0;i<$scope.orderDetail.length;i++){
               
                console.log($scope.orderDetail[i].order_id);
               
             }
			 });
            
          }
	}
	
	function deliveryOpsPickupItems($scope, $http,$cookies,$location)
	{
		
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
    
          }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}
	
	function supplierOpsOrderConfirmPartsHandover($scope, $http,$cookies,$location)
	{
		
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }else if($cookies.role == "ADMIN"){
    
          }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }		
	}
	
	function deliveryOpsReachedGarage($scope, $http,$cookies,$location)
	{
		
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }else if($cookies.role == "ADMIN"){
    
    
          }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }		
	}
	
	function deliveryOpsGenerateDeliveryReciept($scope, $http,$cookies,$location)
	{
		
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
    
          }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
	}
	
	function deliveryOpsDeliveryRecieptSubmission($scope, $http,$cookies,$location)
	{
if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
  else if($cookies.role == "ADMIN"){
    
          }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
		
	}
//newly added ends

//Order Contoller ENDS here


function adminOrderDetail($scope, $http,$location,$cookies, $routeParams,$timeout){
      $scope.reciept="";
	  if(!$cookies.jwt)
      {
        $scope.activePath = $location.path('/login');
      }
      else if($cookies.role == "ADMIN"){
      
 var request_Id = $routeParams.id;
        $http.get('http://localhost/autometrics/autometrics/list/order/order-item/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.orderData = data;
			 // console.log("orderData");
			  console.log($scope.orderData);
             //// console.log($scope.orderData[0]['operator_detail'][0]['f_name']);
			 
			 //             // console.log($scope.orderData.operator_detail.f_name);
            // // console.log($scope.garageNames[0].garage_name);
             // // console.log("length");
             // // console.log($scope.orderDetails.length);
			 
           });
		   
		   
		$http.get('http://localhost/autometrics/autometrics/list/supplier/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.supplierNames = data;
             // console.log($scope.supplierNames);
             // console.log($scope.supplierNames[0].supplier_name);
             // console.log($scope.supplierNames.length);
             for(var i=0;i<$scope.supplierNames.length;i++){
               
               // console.log($scope.supplierNames[i].garage_name);
               
             }
			 });
			 
			 
		
		
			$scope.updateOrderItem = function(quote1,id) 
			{
					var orderid = id;
					
					// // console.log("Quote object");
					// // console.log(quote1);
					// // console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/order-item/'+orderid,quote1,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
			
			
			$scope.confirmOrderItem = function(conf,id) 
			{
					var orderid = id;
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/confirmation/order-item/'+orderid,conf,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
			
			$scope.updateSupplierOpsOrderItem = function(change,id) 
			{
					var orderid = id;
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/supplier-ops/order-item/'+orderid,change,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
			
			$scope.assignDeliveryBoy = function(delivery,id) 
			{
					var orderid = id;
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/deliveryboy_assigned/order-item/'+orderid,delivery,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
			
			$scope.finalOrderItem = function(finale,id) 
			{
					var orderid = id;
					//// console.log(id);
				$http.post('http://localhost/autometrics/autometrics/update/confirm/order-item/'+orderid,finale,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						//// console.log("storage");
						
						window.location.reload();
						
						 
					});
      

			};
			$scope.generateOrderItem = (function(a,b){
             		var id = a;
					var did =b;	
			
				
                 // console.log("this is recipt"+a);				 
                 // console.log("this is recipt"+b);				 
				 var c={order_id:id,
						delivered_id:did
						};
						// console.log("this is recipt"+c.order_id);	
						$http.post('http://localhost/autometrics/autometrics/reciept/'+id,c,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					 { 
						 // console.log("generate");
						 // console.log(data);
						
						//$scope.operator_name = data;
						// $('#gendelrecipt').hide();
						// $('#reciptgen').show();
						
						// // console.log("storage");
						
						// window.location.reload();
						
						 
					 });
			 });
			
			
			
			
			
			$http.get('http://localhost/autometrics/autometrics/list/delivery_operator/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.deliveryNames = data;
             // console.log($scope.deliveryNames);
             // console.log($scope.deliveryNames[0].supplier_name);
             // console.log($scope.deliveryNames.length);
             for(var i=0;i<$scope.deliveryNames.length;i++){
               
               // console.log($scope.deliveryNames[i].garage_name);
               
             }
			 });
			 
			 
			 $http.get('http://localhost/autometrics/autometrics/list/supply_operator/',{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
					success(function(data){
					//    // console.log(data[0].fname);
					  $scope.operatorNames = data;
					  // // console.log($scope.operatorNames);
					  // // console.log($scope.operatorNames[0].f_name);
					  // // console.log($scope.operatorNames.length);
					  for(var i=0;i<$scope.operatorNames.length;i++){
						
						// // console.log($scope.operatorNames[i].f_name);
						
					  }
					});
					
					
		$http.get('http://localhost/autometrics/autometrics/deliveryboyassigned/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
			   
			   // console.log("deliveryboyassigned1");
			   console.log(data);
			   $scope.billed_items = data;
			   //$scope.billed_itemsu = data[0];
			   //// console.log("this is updated dataa");
			   //// console.log($scope.billed_itemsu);
			   // console.log("deliveryboyassigned2");
			    // console.log($scope.billed_items);
				// console.log($scope.billed_items[0][0].garage_details[0].garage_name);
             
			 });
			 
			 
			 $http.get('http://localhost/autometrics/autometrics/recieptgenerated/'+request_Id,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
			   
			   // console.log("reciept_generated_items");
			   // console.log(data);
			   $scope.reciept_generated_items = data;
			   //$scope.billed_itemsu = data[0];
			   //// console.log("this is updated dataa");
			   //// console.log($scope.billed_itemsu);
			   // console.log("reciept_generated_items2");
			    // console.log($scope.reciept_generated_items);
				// console.log($scope.reciept_generated_items[0][0].garage_details[0].garage_name);
             
			 });
         }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }   
           
 }
 
 
 
 function finalReciept($scope, $http,$location,$cookies, $routeParams,$timeout){
      
	  if(!$cookies.jwt)
  {
    $scope.activePath = $location.path('/login');
  }
    else if($cookies.role == "ADMIN"){
     var orderId = $routeParams.id;
      var delivered_id = $routeParams.delivered_id;
	  //var deldata = {order_id:orderId,delivered_id:delivered_id};
	  var c={order_id:orderId,delivered_id:delivered_id};
	 // console.log("this is delevered_id---->>");
	 // console.log("this is recipt"+orderId);				 
     // console.log("this is recipt"+delivered_id);	
	 //// console.log(orderId + delivered_id);
	 
	 $http.post('http://localhost/autometrics/autometrics/bill/'+orderId,c,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
			   
			   // console.log("recieptview");
			   // console.log(data);
			   $scope.billed_items = data;
			   // console.log("billed_items");
			    // console.log($scope.billed_items);
             
			 });
			 
			
				
			
			 
	$http.get('http://localhost/autometrics/autometrics/list/order/order-item/'+orderId,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).
           success(function(data){
             $scope.orderData = data;
             // console.log($scope.orderData);
            // // console.log($scope.garageNames[0].garage_name);
             // // console.log("length");
             // // console.log($scope.orderDetails.length);
			 
           });
		   $scope.eeee = function()
		   {
			   // console.log("eeee");
			   $timeout(function () {
           $scope.$apply(function () {
               $scope.slip.city=$('#sign').val();
           });
       }, 0);
		   };
		   
		$scope.makereciept = function(slip) 
			{
					//var orderid = id;
					//// console.log(id);
					
				$http.post('http://localhost/autometrics/autometrics/make_reciept/',$scope.slip,{ headers: {'Authorization': 'Bearer '+$cookies.jwt} }).success(function(data)
					{ 
						//// console.log("update");
						//// console.log(data);
						//$scope.operator_name = data;
						
						// console.log("makereciept");
						// console.log(data);
						//window.location.reload();
						
						 
					});
      

			};
       }else if($cookies.role == "SUPPLYOPS"){
            // do nothing
            
          }
          else if($cookies.role == "DELIVERYBOY"){
            //do nothing
            
          }
 }
// All garageOwner Related Controllers

function garageOwnerCtrl($scope, $http,$location,$cookies, $routeParams){
  	  if(!$cookies.jwt)
      {
        $scope.activePath = $location.path('/login');
      }
        else if($cookies.role == "ADMIN"){
          
          
        }
      else if($cookies.role == "SUPPLYOPS"){
          
        }
       else if($cookies.role == "DELIVERYBOY"){
          
        }  
}

function addGarageOwnerCtrl($scope, $http,$location,$cookies, $routeParams){
       if(!$cookies.jwt)
      {
        $scope.activePath = $location.path('/login');
      }
        else if($cookies.role == "ADMIN"){
          
          
        }
      else if($cookies.role == "SUPPLYOPS"){
          
        }
       else if($cookies.role == "DELIVERYBOY"){
          
        }
}