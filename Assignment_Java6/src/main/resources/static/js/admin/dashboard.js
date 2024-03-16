app.controller("dashboard-ctrl", function($scope, $http) {

	$http.get("/rest/orders/totalAmountCurrentDay").then(resp => {
		$scope.sale = resp.data;
	})

	$http.get("/rest/accounts/signupCurrentDay").then(resp => {
		$scope.signupCurrentDay = resp.data;
	})

	$http.get("/rest/orders/totalProductSold").then(resp => {
		$scope.totalProductSold = resp.data;
	})

	const top3chart = document.getElementById('top3product');
	const revenueAWeekChart = document.getElementById('revenue');

  $.ajax({
    url: '/rest/orders/top5ProductAWeek',
    type: 'GET',
    success: function(data) {
			const limit_data = data.slice(0,3);
      const labels = limit_data.map((item) => item[0]);
      const data_labels = limit_data.map((item) => item[1]);
      const data_chart = {
        labels: labels,
        datasets: [{
          label: 'Quantity',
          data: data_labels,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
      const config = {
        type: 'doughnut',
        data: data_chart,
      };

      new Chart(top3chart, config);
    },
    error: function(xhr, status, error) {
      console.error(xhr.responseText);
    }
  });

	$.ajax({
    url: '/rest/orders/revenueAWeek',
    type: 'GET',
    success: function(data) {
      const labels = data.map((item) => item[0]);
      const data_labels = data.map((item) => item[1]);
      const data_chart = {
        labels: labels,
				datasets: [{
					label: 'Revenue in the past week',
					data: data_labels,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1
				}]
      };
      const config = {
        type: 'line',
        data: data_chart,
				options: {
					scales: {
							y: {
									beginAtZero: true
							}
					}
			}
      };

      new Chart(revenueAWeekChart, config);
    },
    error: function(xhr, status, error) {
      console.error(xhr.responseText);
    }
  });

})
