
var svgWidth = 960;
var svgHeight = 660;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var val1 = "poverty";
var val2 = "income";

// function used for updating x-scale var upon click on axis label
function xScale(povertyData, val1) {
	// create scales
	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(povertyData, d => parseFloat(d[val1])) * 0.95, d3.max(povertyData, d => parseFloat(d[val1])) * 1.05])
		.range([0, width]);
	return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderXaxis(newXScale, xAxis) {
	var bottomAxis = d3.axisBottom(newXScale);

	xAxis.transition()
		.duration(1000)
		.call(bottomAxis);

  return xAxis;
}

function renderYaxis(newYScale, yAxis) {
	var bottomAxis = d3.axisLeft(newYScale);

	yAxis.transition()
		.duration(1000)
		.call(bottomAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, val1) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[val1]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(val1, circlesGroup) {

	var toolTip = d3.tip()
		.attr("class", "tooltip")
		.offset([80, -60])
		.html(function(d, i) {
			return (`State: ${d.abbr}<hr>${val1}: ${d[val1]}<hr>${val2}: ${d[val2]}`);
		});

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
		
		toolTip.show(data);
	})
    // onmouseout event
    .on("mouseout", function(data, index) {
		
		toolTip.hide(data);
    });

  return circlesGroup;
};

	var val1 = "income"
	var val2 = "obesity"
	
// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(povertyData, err) {
	if (err) throw err;
	
	
	
	// parse data
	povertyData.forEach(function(data) {
	data.xArr = +data[val1]; //ZCLookhere...these may need to match..examples were data.income = +data.income
	data.yArr = +data[val2];
	data.abbr = data.abbr;
	});

	// xLinearScale function above csv import
	var xLinearScale = xScale(povertyData, val1);

	// Create y scale function
	var yLinearScale = d3.scaleLinear()
	.domain([d3.min(povertyData, d => parseFloat(d[val2]))*0.95, d3.max(povertyData, d => parseFloat(d[val2]))*1.05])
	.range([height, 0]);

	// Create initial axis functions
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	// append x axis
	var xAxis = chartGroup.append("g")
	.classed("x-axis", true)
	.attr("transform", `translate(0, ${height})`)
	.call(bottomAxis);

	// append y axis
	chartGroup.append("g")
	.call(leftAxis);

	// append initial circles
	var circlesGroup = chartGroup.selectAll("circle")
		.data(povertyData)
		.enter()
		.append("circle")
		.attr("cx", d => xLinearScale(d[val1]))
		.attr("cy", d => yLinearScale(d[val2]))
		.attr("r", 20)
		.attr("fill", "green")
		.attr("opacity", ".5");
	
	//add state labels inside circles
	var circleText = chartGroup.selectAll("circle text")
		.data(povertyData)
		.enter()
		.append("text")
		.classed("stateText",true)
		.attr("x", d => xLinearScale(d[val1]))
		.attr("y", d => yLinearScale(d[val2]))
		.text(d=>(d.abbr));

	// Create group for two x-axis labels
	var labelsGroup = chartGroup.append("g")
		.attr("transform", `translate(${width / 2}, ${height + 20})`);

	var xLabel = labelsGroup.append("text")
		.attr("x", 0)
		.attr("y", 20)
		.classed("axis-text", true)
		.text(val1);

	// append y axis
	chartGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x", 0 - (height / 2))
		.attr("dy", "1em")
		.classed("axis-text", true)
		.text(val2);

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(val1, circlesGroup);

  /*
  //Data change event listener code block goes here
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== val1) {

        // replaces val1 with value
        val1 = value;

        // console.log(val1)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(povertyData, val1);
		yLinearScale = yScale(povertyData, val2);

        // updates x axis with transition
        xAxis = renderXaxis(xLinearScale, xAxis);
		yAxis = renderYaxis(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, val1);

        // updates tooltips with new info
        circlesGroup = updateToolTip(val1, circlesGroup);

        /*
		// changes classes to change bold text
        if (val1 === "num_albums") {
          albumsLabel
            .classed("active", true)
            .classed("inactive", false);
          hairLengthLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          albumsLabel
            .classed("active", false)
            .classed("inactive", true);
          hairLengthLabel
            .classed("active", true)
            .classed("inactive", false);
        }
		
      }
    });
	*/
	
}).catch(function(error) {
  console.log(error);
});
