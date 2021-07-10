import './index.scss';

window.onload = function () {
	var fx1 = document.getElementById('fx-1').value;
	var fx2 = document.getElementById('fx-2').value;
	var calendar = document.getElementById('calendar').value;

	document.getElementById('fx-1').addEventListener('change', (e) => {
		fx1 = e.target.value;
		console.log(fx1);
	});

	document.getElementById('fx-2').addEventListener('change', (e) => {
		fx2 = e.target.value;
		console.log(fx2);
	});

	document.getElementById('btn-submit').addEventListener('click', (e) => {
		e.preventDefault();
		if (fx1 === fx2) {
			console.log('same value, show one currency');
			renderCurrentChart();
		} else {
			console.log('compare current currency values');
			renderComparisonChart();
		}
	});

	document.getElementById('btn-reset').addEventListener('click', (e) => {
		e.preventDefault();
		if (calendar !== '') {
			console.log('date present');
			calendar = '';
		} else {
			console.log('date not present');
		}
	});

	document.getElementById('calendar').addEventListener('change', (e) => {
		e.preventDefault();
		calendar = e.target.value;
		console.log(calendar);
	});

	function renderCurrentChart() {
        requestCurrentRate();
		showChart();
	}

	function renderComparisonChart() {
        requestHistoricalRate();
        showChart();
    }

    function requestCurrentRate() {
		const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=826de43ac7591f4d15114069a01d5ecf&symbols=USD,EUR,GBP,JPY';
		getRequest(URL)
	}

	function requestHistoricalRate() {
		const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=826de43ac7591f4d15114069a01d5ecf&symbols=USD,EUR,GBP,JPY';
		getRequest(URL);
	}

    function getRequest(URL) {
        var xhttp = new XMLHttpRequest();
		xhttp.open('GET', URL, true);
		xhttp.send();
		xhttp.onload = function () {
			if (xhttp.status != 200) {
				// analyze HTTP status of the response
				alert(`Error ${xhttp.status}: ${xhttp.statusText}`); // e.g. 404: Not Found
			} else {
				// show the result
				alert(`Done, got ${xhttp.response} bytes`); // response is the server response
			}
		};

		xhttp.onerror = function () {
			alert('Request failed');
		};
    }

    function showChart() {
        var chart = new CanvasJS.Chart('chartContainer', {
			title: {
				text: 'My First Chart in CanvasJS'
			},
			data: [
				{
					// Change type to "doughnut", "line", "splineArea", etc.
					type: 'column',
					dataPoints: [
						{ label: 'apple', y: 10 },
						{ label: 'orange', y: 15 },
						{ label: 'banana', y: 25 },
						{ label: 'mango', y: 30 },
						{ label: 'grape', y: 28 }
					]
				}
			]
		});
		chart.render();
    }
};
