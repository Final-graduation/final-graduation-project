app.controller("product-ctrl", function ($scope, $http) {
	const productButton = $('.product-button');
	const productTab = $('.tab-content');
	const cancelBtn = $('.cancel-delete-btn');
	const modalConfirm = $('#confirm');
	const deleteBtn = $('.btn-delete-product');

	deleteBtn.on('click', function () {
		modalConfirm.css('display', 'block');
	})

	cancelBtn.on('click', function () {
		modalConfirm.css('display', 'none');
	})

	productButton.on('click', function (e) {
		const btnTarget = e.target;
		if (btnTarget.matches('button')) {
			$(this).children().removeClass('active')
			$(btnTarget).addClass('active')
		}

		productTab.removeClass('active-tab');
		$(`#${btnTarget.id}-tab`).addClass('active-tab');
	})

	const listBtn = $('#admin-list-product');
	const createBtn = $('#admin-create-product');
	const listTab = $('#admin-list-product-tab');
	const createTab = $('#admin-create-product-tab');

	$scope.items = [];
	$scope.cates = [];
	$scope.form = {};

	$scope.initialize = function () {
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

	$scope.reset = function () {
		$scope.form = {
			createDate: new Date(),
			image: "upload.png",
			available: true
		}
	}
	//dísplay to the form
	$scope.edit = function (item) {
		$scope.form = angular.copy(item);

		listBtn.removeClass('active');
		createBtn.addClass('active');
		listTab.removeClass('active-tab');
		createTab.addClass('active-tab');
	}
	//add new item

	$scope.create = function () {
		var item = angular.copy($scope.form);
		$http.post(`/rest/products`, item).then(resp => {
			resp.data.createDate = new Date(resp.data.createDate)
			$scope.items.push(resp.data);
			$scope.reset();
			$scope.changeDefaultTab();
			alert("Create successfully!")
		}).catch(error => {
			alert("Error! Please try again");
			console.log("Error :", error);
		})
	}

	$scope.changeDefaultTab = function () {
		listBtn.addClass('active');
		createBtn.removeClass('active');
		listTab.addClass('active-tab');
		createTab.removeClass('active-tab');
	}

	//update the item
	$scope.update = function () {
		var item = angular.copy($scope.form);
		$http.put(`/rest/products/${item.id}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items[index] = item;
			$scope.changeDefaultTab();
			alert("Update successfully!");
		}).catch(error => {
			alert("Error");
			console.log("Error :", error);
		})
	}

	//delete the item
	$scope.delete = function (item) {
		var item = angular.copy($scope.form);
		$http.delete(`/rest/products/${item.id}`).then(resp => {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items.splice(index, 1);
			$scope.reset();
			$scope.changeDefaultTab();
			alert("Delete successfully!");
		}).catch(error => {
			alert("Error");
			console.log("Error :", error);
		})
	}

	//delete the item
	$scope.delete2 = function (item) {
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
	$scope.imageChanged = function (files) {
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


	// js trang sản phẩm

	function toggleVisibility(boxId) {
		var box = document.getElementById(boxId);
		var arrowIcon = box.querySelector('.bx.bxs-down-arrow');
		box.classList.toggle("collapsed");
		arrowIcon.classList.toggle("rotated");
	}

	function showSecondImage(img) {
		img.nextElementSibling.style.display = "block";
	}

	function hideSecondImage(img) {
		img.nextElementSibling.style.display = "none";
	}
});
