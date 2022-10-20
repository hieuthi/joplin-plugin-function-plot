document.addEventListener('joplin-noteDidUpdate', plotFunctions );

if (/WebKit/i.test(navigator.userAgent)) { // sniff
	var _timer_fplot = setInterval(function() {
		if (/loaded|complete/.test(document.readyState)) {
			plotFunctions()
		}
	}, 10);
}

function uuid(rid, counters){
	var uid = rid;
	if (rid in counters){
		counters[rid] = counters[rid] + 1;
		uid = rid + "-" + counters[rid];
	} else {
		counters[rid] = 1
	}

	return uid
}


function plotFunctions() {
	if (_timer_fplot) clearInterval(_timer_fplot);

	const plots = document.getElementsByClassName('function-plot-view');
	const counters = {};
	for (var i=0; i<plots.length; i++){
		var plot = plots[i];
		try {
			var options = JSON.parse(plot.textContent);
			var rid = options["target"] || "#fplotABC";
			var uid = uuid(rid, counters);
			options["target"] = uid;
			setTimeout(makeFunctionPlot(plot, options),60);
		} catch (e) {
			plot.innerHTML = "Parsing Error";
		}
	}
}


function makeFunctionPlot(plot, options) {
  plot.innerHTML = ''; // Clear element content
  plot.id = options["target"].substring(1)
  functionPlot(options)

}