var app = angular.module("admin-app", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "/admin/listItems.html",
			controller: "product-ctrl"
		})
		.when("/listCustomer", {
			templateUrl: "/admin/listCustomers.html",
			controller: "customer-ctrl"
		})
		.when("/listOrder", {
			templateUrl: "/admin/listOrders.html",
			controller: "order-ctrl"
		})
		.when("/addCategory", {
			templateUrl: "/admin/addCategory.html",
			controller: "category-ctrl"
		})
		.when("/summary", {
			templateUrl: "/admin/summary.html",
			controller: "summary-ctrl"
		})
		.otherwise({
			redirectTo: "/"
		});
});

app.controller("product-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.cates=[];
	$scope.form = {};

	$scope.initialize = function() {
		//load prodcuts
		$http.get("/rest/products").then(resp => {
			$scope.items = resp.data;
			$scope.items.forEach(item => {
				item.createDate = new Date(item.createDate)
			})
		})
		//load categories
		$http.get("/rest/categories").then(resp=>{
			$scope.cates = resp.data;
		})
	}
	//initialize
	$scope.initialize();

	//delete form

	$scope.reset = function() {

	}
	//dísplay to the form
	$scope.edit = function(item, cityName) {
		$scope.form = angular.copy(item);
		var i;
		var x = document.getElementsByClassName("city");
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		document.getElementById(cityName).style.display = "block";

	}
	//add new item

	$scope.create = function() {

	}

	//update the item
	$scope.update = function() {

	}

	//delete the item
	$scope.delete = function(item) {

	}

	//dislay image when selected
	$scope.imageChanged = function(files) {

	}
})
