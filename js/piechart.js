function piechart(data) {
var m = 20,
    r = 100;

var color = d3.scale.ordinal()
            .range(["rgba(214,230,244,0.8)","rgba(141,190,218,0.8)","rgba(53,126,186,0.8)","rgba(11,61,138,0.8)"]);


// Define a pie layout: the pie angle encodes the number of flights. Since our
// data is stored in CSV, the numbers are strings which we coerce to numbers.
var pie = d3.layout.pie()
    .value(function(d) { return d.number; })
    .sort(null);

// Define an arc generator. Note the radius is specified here, not the layout.
var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(r);

var labelArc = d3.svg.arc()
    .outerRadius(r+10)
    .innerRadius(r+10);



  // Insert an svg element (with margin) for each airport in our dataset. A
  // child g element translates the origin to the pie center.
  var svg = d3.select("#pie")
      .append("svg")
      .attr("width", (r + m) * 2.5)
      .attr("height", (r + m) * 2.5)
      .append("g")
      .attr("transform", "translate(" + (r + m) + "," + (r + m) + ")");


var tooltip5 = d3.select("body").append("div").attr("class", "mytooltip5");
  // Pass the nested per-state values to the pie layout. The layout computes
  // the angles for each arc. Another g element will hold the arc and its label.
var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class","arc");


         // Add a colored arc path, with a mouseover showing the number.
         g.append("path")
             .attr("d", arc)
             .style("fill", function(d) { return color(d.data.degree); });
            //  .on("mouseover", mouseover1)
            //  .on("mousemove", mousemove1)
            //  .on("mouseout", mouseout1);
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("font-size",20)
        .text(function(d) { return d.data.number+"%"; });

var degreeType = ["No More than High school","PHD","M.A.","B.A."];

var degreeType_reversed = degreeType.slice().reverse();

var legend = d3.select("#pie").append("svg")
               .attr("class", "pieLegend")
               .attr("width", r*5)
               .attr("height", r+35 )
               .selectAll("g")
               .data(degreeType_reversed)
               .enter().append("g")
               .attr("transform", function(d,i) {
               xOff = (i % 2) * 100
               yOff = Math.floor(i  / 2) * 41
               return "translate(" + xOff + "," + yOff + ")"});

legend.append("rect")
     .attr("width", 18)
     .attr("height", 18)
     .style("fill", color);

legend.append("text")
     .attr("x", 24)
     .attr("y", 9)
     .attr("dy", ".35em")
     .attr("font-size","15px")
     .text(function(d) { return d; });




  //
  // function mouseover1(d) {
  //
  // d3.select(this)
  //   .transition()
  //   .style("stroke", "white")
  //   .style("stroke-width", "1");
  //
  //
  //     tooltip5
  //       .style("display", null) // this removes the display none setting from it
  //       .html("<p>State: " +d.data.degree+
  //             "<br>Number of people: " + d.data.number+"</p>");
  //     }
  //
  // function mousemove1(d) {
  //     tooltip5
  //       .style("top", (d3.event.pdegreeY - 10) + "px" )
  //       .style("left", (d3.event.pdegreeX + 10) + "px");
  //     }
  //
  // function mouseout1(d) {
  //     d3.select(this)
  //       .transition()
  //       .duration(200)
  //       .style("stroke", null);
  //
  //       tooltip5.style("display", "none");
  //     }  // this sets it to invisible!

}
