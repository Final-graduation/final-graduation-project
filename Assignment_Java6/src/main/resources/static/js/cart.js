const app = angular.module("cart", []);

app.controller("cart-ctrl", function ($scope, $http) {

	$(".cart-hover").each(function () {
		const itemId = $(this).attr("item-size-id");
		const url = "/rest/products/size/" + itemId;

		$.ajax({
			url: url,
			type: "GET",
			success: function (response) {
				response.forEach(data => {
					const li = $('<li></li>')
						.text(`Sizes ${data.size} (${data.quantity})`)
						.click(function () {
							if (data.quantity > 0) {
								$scope.cart.add(itemId, data.size, 1);
							} else {
								return false;
							}
						})
						.css('cursor', data.quantity === 0 ? 'not-allowed' : 'pointer');

					$(this).append(li);
				});
			}.bind(this),
			error: function (xhr, status, error) {
				console.log(error);
			}
		});
	})

	$scope.cart = {
		items: [],

		//add items to cart
		add(id, size, quantity) {
			let item = this.items.find(item => item.id == id && item.size == size);
			console.log(item + 'test');
			if (item) {
				alert("Thêm vào giỏ hàng thành công!")
				item.qty++;
				this.saveToLocalStorage();
			} else {
				$http.get(`/rest/products/${id}`).then(resp => {
					alert("Thêm vào giỏ hàng thành công!")
					resp.data.qty = quantity;
					resp.data.size = size;
					this.items.push(resp.data);
					console.log(this.items);
					this.saveToLocalStorage();
				})
			}
		},

		addAndPay(id, size, quantity)  {
			let item = this.items.find(item => item.id == id && item.size == size);
			if (item) {
				item.qty++;
				this.saveToLocalStorage();
				location.href = '/cart/view';
			} else {
				$http.get(`/rest/products/${id}`).then(resp => {
					resp.data.qty = quantity;
					resp.data.size = size;
					this.items.push(resp.data);
					console.log(this.items);
					this.saveToLocalStorage();
					location.href = '/cart/view';
				})
			}
		},

		getsize() {
			return $('#size-product').val();
		},

		getquantity() {
			return parseInt($('#quantity-product').val());
		},

		//remove item of cart
		remove(id) {
			let index = this.items.findIndex(item => item.id == id);
			this.items.splice(index, 1);
			this.saveToLocalStorage();
		},

		// clear all items in cart
		clear() {
			this.items = []
			this.saveToLocalStorage();
		},

		//return total of items
		get count() {
			return this.items.length
				// .map(item => item.qty)
				// .reduce((total, qty) => total += qty, 0);
		},

		//return total money of items

		get amount() {
			return this.items
				.map(item => item.qty * item.price)
				.reduce((total, qty) => total += qty, 0)
		},



		//save the cart at localStorage
		saveToLocalStorage() {
			let json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart", json);
		},

		//display data to table
		loadFromLocalStorage() {
			let json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];
		}

	}
	$scope.cart.loadFromLocalStorage();

	$scope.order = {
		createDate: new Date(),
		address: $('#user-address').val(),
		phoneNumber: $('#user-sdt').val(),
		account: {
			username: $("#username").val()
		},
		status: 'confirmed',
		totalAmount: $scope.cart.amount,
		get orderDetails() {
			return $scope.cart.items.map(item => {
				return {
					product: { id: item.id },
					size: item.size,
					quantity: item.qty
				}
			});
		},

		purchase() {
			let order = angular.copy(this);
			console.log(order);
			$http.post("/rest/orders", order).then(resp => {
				alert("Đặt hàng thành công!");
				$scope.cart.clear();
				location.href = "/order/detail/" + resp.data.id;
			}).catch(error => {
				alert("Có lỗi, vui lòng thử lại!")
				console.log(error)
			})
		}

	}
})