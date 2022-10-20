document.addEventListener('joplin-noteDidUpdate', plotFunctions );

if (/WebKit/i.test(navigator.userAgent)) { // sniff
	var _timer_fplot = setInterval(function() {
		if (/loaded|complete/.test(document.readyState)) {
			plotFunctions()
		}
	}, 10);
}

function plotFunctions() {
	if (_timer_fplot) clearInterval(_timer_fplot);

	const plots = document.getElementsByClassName('function-plot-view');
	for (var i=0; i<plots.length; i++){
		var plot = plots[i];
		console.log("Pika: " + plot.textContent)
		try {
			var options = JSON.parse(plot.textContent);
			setTimeout(makeFunctionPlot(plot, options),60);
		} catch (e) {
			plot.innerHTML = "Parsing Error";
			console.log("Error: " + e);
		}
	}
}


function makeFunctionPlot(plot, options) {
  plot.innerHTML = ''; // Clear element content
  plot.id = options["target"].substring(1)
  functionPlot(options)

}