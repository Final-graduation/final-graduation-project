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
		.when("/authority", {
			templateUrl: "/admin/authority.html",
			controller: "authority-ctrl"
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
	$scope.cates = [];
	$scope.form = {};

	$scope.initialize = function() {
		//
		$scope.form = {
			createDate: new Date(),
			image: "upload.png",
			available: true
		}
		//load prodcuts
		$http.get("/rest/products").then(resp => {
			$scope.items = resp.data;
			$scope.items.forEach(item => {
				item.createDate = new Date(item.createDate)
			})
		})
		//load categories
		$http.get("/rest/categories").then(resp => {
			$scope.cates = resp.data;
		})
	}
	//initialize
	$scope.initialize();

	//delete form

	$scope.reset = function() {
		$scope.form = {
			createDate: new Date(),
			image: "upload.png",
			available: true
		}
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
		var item = angular.copy($scope.form);
		$http.post(`/rest/products`, item).then(resp => {
			resp.data.createDate = new Date(resp.data.createDate)
			$scope.items.push(resp.data);
			$scope.reset();
			alert("Create successfully!")
		}).catch(error => {
			alert("Error! Please try again");
			console.log("Error :", error);
		})
	}

	//update the item
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/products/${item.id}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items[index] = item;
			alert("Update successfully!");
		}).catch(error => {
			alert("Error");
			console.log("Error :", error);
		})
	}

	//delete the item
	$scope.delete = function(item) {
		var item = angular.copy($scope.form);
		$http.delete(`/rest/products/${item.id}`).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items.splice(index, 1);
			$scope.reset();
			alert("Delete successfully!");
		}).catch(error => {
			alert("Error");
			console.log("Error :", error);
		})
	}

	//delete the item
	$scope.delete2 = function(item) {
		$http.delete(`/rest/products/${item.id}`).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items.splice(index, 1);
			alert("Delete successfully!");
		}).catch(error => {
			alert("Error");
			console.log("Error :", error);
		})
	}

	//dislay image when selected
	$scope.imageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		console.log(data.get('file'));
		$http.post('/rest/upload/images', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.form.image = resp.data.name;
			console.log(resp.data.name);
		}).catch(error => {
			alert("Error");
			console.log("Error :", error);
		})
	}

	$scope.pager = {
		page: 0,
		size: 5,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}
});

app.controller("authority-ctrl", function($scope, $http, $location) {

	$scope.roles = [];
	$scope.admins = [];
	$scope.authorities = [];

	$scope.initialize = function() {
		//load all roles

		$http.get("/rest/roles").then(resp => {
			$scope.roles = resp.data;
			
		})
		//load staffs and directors
		$http.get("/rest/accounts?admin = true").then(resp => {
			$scope.admins = resp.data;
		})

		//load authorities of staffs and directors
		$http.get("/rest/authority?admin = true").then(resp => {
			$scope.authorities = resp.data;
		}).catch(error => {
			$location.path("/unauthorized");
		})
	}
	$scope.initialize();

	$scope.authority_of = function(acc, role) {
		if ($scope.authorities) {
			return $scope.authorities.find(ur => ur.account.username == acc.username && ur.role.id == role.id);
		}
	}

	$scope.authority_changed = function(acc, role) {
		let authority = $scope.authority_of(acc, role);
		if (authority) {
			$scope.revoke_authority(authority);
		} else {
			authority = { account: acc, role: role };
			$scope.grant_authority(authority);
		}
	}
	
	//add authority
	$scope.grant_authority = function(authority){
		$http.post(`/rest/authority`,authority).then(resp =>{
			$scope.authorities.push(resp.data);
			alert("add authority successfully");
		}).catch(error =>{
			alert("Error");
			console.log("Error,",error);
		})
	}
	//delete authority
	$scope.revoke_authority = function(authority){
		$http.delete(`/rest/authority/${authority.id}`).then(resp =>{
			let index = $scope.authorities.findIndex( a => a.id == authority.id);
			$scope.authorities.splice(index,1);
			alert("Revoke_Authority successfully");
		}).catch(error =>{
			alert("Error");
			console.log("Error,",error);
		})
	}



})
