const adminTabs = $('.admin-tab');
const leftTab = $('.admin-left-bar')

leftTab.on('click', function(e) {
  const currentTab = e.target;

  if (currentTab.matches('a')) {
    adminTabs.removeClass('active');
    currentTab.classList.add('active');
  }
});


var app = angular.module("admin-app", ["ngRoute"]);

app.run(['$location', function($location) {
	$location.path('/');
}]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "/admin/dashboard.html",
			controller: "dashboard-ctrl"
		})
    .when("/order", {
			templateUrl: "/admin/order.html",
			controller: "order-ctrl"
		})
		.when("/customer", {
			templateUrl: "/admin/customer.html",
			controller: "customer-ctrl"
		})
		.when("/authority", {
			templateUrl: "/admin/authority.html",
			controller: "authority-ctrl"
		})
		.when("/product", {
			templateUrl: "/admin/product.html",
			controller: "product-ctrl"
		})
		.when("/category", {
			templateUrl: "/admin/category.html",
			controller: "category-ctrl"
		})
		.otherwise({
			redirectTo: "/"
		});
});
