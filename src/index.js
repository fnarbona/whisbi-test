import './index.scss';

window.onload = function () {
	// var fx1 = document.getElementById('fx-1');
	var fx2 = document.getElementById('fx-2');
	var calendar = document.getElementById('calendar');

	// document.getElementById('fx-1').addEventListener('change', (e) => {
	// 	fx1.value = e.target.value;
	// 	console.log(fx1.value);
	// });

	document.getElementById('fx-2').addEventListener('change', (e) => {
		fx2.value = e.target.value;
		console.log(fx2.value);
	});

	document.getElementById('btn-submit').addEventListener('click', (e) => {
		e.preventDefault();
		if (fx2.value === "EUR") {
			console.log('same value, show one currency');
			alert('Please select a currency to compare with!')
		} else if (calendar.value !== "") {
			console.log('compare historical currency values');
			renderHistoricalValuesChart();
		} else {
			console.log('compare current currency values');
			renderCurrentValuesChart();
		}
	});

	document.getElementById('btn-reset').addEventListener('click', (e) => {
		e.preventDefault();
		const dateValue = calendar.value
		console.log(dateValue)
		if (dateValue !== '') {
			console.log('date present');
			calendar.value = '';
		} else {
			console.log('date not present');
		}
	});

	document.getElementById('calendar').addEventListener('change', (e) => {
		e.preventDefault();
		calendar.value = e.target.value;
		console.log(calendar.value);
	});

	function renderCurrentValuesChart() {
        const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=826de43ac7591f4d15114069a01d5ecf&symbols=USD,GBP,JPY';
		getRequest(URL)
	}

	function renderHistoricalValuesChart(date) {
        const URL = `http://api.exchangeratesapi.io/v1/${date}?access_key=826de43ac7591f4d15114069a01d5ecf&symbols=USD,GBP,JPY`;
		getRequest(URL)
    }

    // function requestCurrentRate() {
	// 	const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=826de43ac7591f4d15114069a01d5ecf&symbols=USD,EUR,GBP,JPY';
	// 	getRequest(URL)
	// }

	// function requestHistoricalRate() {
	// 	const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=826de43ac7591f4d15114069a01d5ecf&symbols=USD,EUR,GBP,JPY';
	// 	getRequest(URL);
	// }

    function getRequest(URL) {
		let response = null;
        var xhttp = new XMLHttpRequest();
		xhttp.onload = function () {
			console.log("response ", xhttp)
			if (xhttp.status != 200) {
				// analyze HTTP status of the response
				alert(`Error ${xhttp.status}: ${xhttp.statusText}`); // e.g. 404: Not Found
			} else {
				// show the result
				console.log(`Done, got ${xhttp.response} bytes`); // response is the server response

				// parse as json
				const jsonObj = JSON.parse(xhttp.responseText)
				console.log(jsonObj.rates); // response is the server response

				const {rates, date, base} = jsonObj
				showChart(rates, date, base);
			}
		};
		
		xhttp.onerror = function () {
			alert('Request failed');
		};
		
		xhttp.open('GET', URL, true);
		xhttp.send();
		
		
    }

    function showChart(rates, date, base) {
		if (rates === null) return;
		const dataPoints = Object.keys(rates).map((rate) => {
			if (fx2.value === "ALL") {
				return {label: rate, y: rates[rate]}
			} else if (rate === fx2.value) {
				return {label: rate, y: rates[rate]}
			} else {
				return;
			}
		}).filter(value => value !== undefined)

		console.log(dataPoints)
		

        var chart = new CanvasJS.Chart('chartContainer', {
			title: {
				text: `Comparative ${base} rates for ${date}`
			},
			data: [
				{
					// Change type to "doughnut", "line", "splineArea", etc.
					type: 'column',
					dataPoints: dataPoints
				}
			]
		});
		chart.render();
    }
};
