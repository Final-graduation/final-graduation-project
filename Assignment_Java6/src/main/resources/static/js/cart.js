const app= angular.module("cart",[]);

app.controller("cart-ctrl",function($scope,$http){
	$scope.cart={
		items:[],
		
		//add items to cart
		add(id){
			let item = this.items.find(item=> item.id ==id);
			if(item){
				item.qty ++;
				this.saveToLocalStorage();
			}else{
				$http.get(`/rest/products/${id}`).then(resp =>{
					resp.data.qty = 1;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				})
			}
		},
		
		//remove item of cart
		remove(id){
			let index = this.items.findIndex(item => item.id ==id);
			this.items.splice(index,1);
			this.saveToLocalStorage();
		},
		
		// clear all items in cart
		clear(){
			this.items =[]
			this.saveToLocalStorage();
		},
		
		//return total of items
		get count(){
			return this.items
			.map(item => item.qty)
			.reduce((total,qty)=> total += qty,0);
		},
		
		//return total money of items
		
		get amount(){
			return this.items
			.map(item => item.qty * item.price)
			.reduce((total,qty) => total +=qty,0)
		},
		
		
		
		//save the cart at localStorage
		saveToLocalStorage(){
			let json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart",json);
		},
		
		//display data to table
		loadFromLocalStorage(){
			let json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];
		}
		
	}
	$scope.cart.loadFromLocalStorage();
})