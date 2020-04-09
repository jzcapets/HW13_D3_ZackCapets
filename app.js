/*
d3.csv("data.csv").then(function(povertyData) {	
	
	//Populate lists of variables
	var keys = d3.keys(povertyData[0])
	var xList = d3.select(".pickXaxis")
	var yList = d3.select(".pickYaxis")
	xList.html("")
	yList.html("")
	
	//populate the dropdown options...starting at index of 2 to skip over the non-numerical columns
	xList.append("option").text("")
	yList.append("option").text("")
	for (var i=2; i<keys.length; i++){
		xList.append("option").text(keys[i]);
		yList.append("option").text(keys[i]);
	};
	
	//Event handling for axis data selector dropdowns
	var x_sel = d3.select(".pickXaxis")

	//do this when the dropdown changes
	function GetxData() {
		val1 = x_sel.node().value
		//log selection
		console.log(`Selected X: ${val1}`); 
		
		//wipe the array, populate with new data
		xArr = [];
		for (var j = 0; j<povertyData.length; j++){
			xArr.push(povertyData[j][val1]); 
		};
		
		//log data
		console.log(`xArr: ${xArr}`);
	};
	
	//Event handling for Yaxis dropdown
	var y_sel = d3.select(".pickYaxis")
	
	//Exact same function structure as Xaxis
	function GetyData() {
		val2 = y_sel.node().value
		console.log(`Selected Y: ${val2}`);
		yArr = [];
		for (var j = 0; j<povertyData.length; j++){
			yArr.push(povertyData[j][val2]);
		};
		console.log(`yArr: ${yArr}`);
		
	};
	
	//on dropdown change, get new data
	x_sel.on("change",GetxData);
	
	//on change get new data
	y_sel.on("change",GetyData);
	
//error handling
}).catch(function(error) {
  console.log(error);
});
*/

