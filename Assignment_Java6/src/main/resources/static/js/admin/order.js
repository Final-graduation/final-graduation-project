app.controller("order-ctrl", function($scope, $http){
	$scope.items = [];
	$scope.form = {};
	$scope.detail = [];
	const orderSection = $('.order-detail-section');

	$http.get("/rest/orders/all").then(resp => {
		$scope.items = resp.data;
	})

	$scope.info = function(item) {
		$http.get(`/rest/orders/detail?id=${item.id}`).then(resp => {
			$scope.detail = resp.data;
			console.log($scope.detail);
		})
		orderSection.addClass('active');
	}

	$scope.closeDetail = function(){
		orderSection.removeClass('active');
	}

	$scope.pager = {
		page: 0,
		size: 10,
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
})
