//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 500;
var bands = 50;
var xOrig = 4, yOrig = 4;
var arrowLen = 2.5, arrowWid = 1;
var randomSize = 5;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createGroups(data) {
    return function(sel) {
        return sel
            .append("g")
            .selectAll("*")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d) {
                return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
            });
    };
}

d3.selection.prototype.callReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////
// PART 1
var colorScale = d3.scaleLinear().domain([0, 2]).range(["white", "red"]);
var magColor = d3.select("#plot1-color")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

// WRITE THIS PART
magColor.append("rect").attr("width","10px").attr("height","10px")
.attr("fill",function(d) { return colorScale(    Math.sqrt(Math.pow(d.vx,2) + Math.pow(d.vy,2))   );});


//////////////////////////////////////////////////////////////////////////////
// PART 2

var hedgehog = d3.select("#plot1-hedgehog")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

// WRITE THIS PART
hedgehog.append("line").attr("width","10px").attr("height","10px")
.attr("x1",function(d) { return (xOrig*d.vx)*-1; }).attr("y1",function(d) { return (yOrig*d.vy)*-1; })
.attr("x2",function(d) { return xOrig*d.vx;} ).attr("y2",function(d) { return yOrig*d.vy; })
.attr("stroke","black").attr("fill","none");



//////////////////////////////////////////////////////////////////////////////
// PART 3

var unifGlyph = d3.select("#plot1-uniform")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

unifGlyph.append("g")
    .attr("transform", function(d) {
        return "translate(" + 0+ "," + 0 + ")"+" rotate("+getDegrees(d)+")";
    }).append("path")
    .attr("d", function(d) { return getLine(d);})
    .attr("stroke","black").attr("fill","none"); // WRITE THIS PART



//////////////////////////////////////////////////////////////////////////////
// PART 4

var randomGlyph = d3.select("#plot1-random")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

randomGlyph.append("g")
    .attr("transform", function(d) {
        var xTrans=(Math.random()*randomSize);
        var yTrans=(Math.random()*randomSize);
        return "translate(" + xTrans + "," + yTrans + ")"+" rotate("+getDegrees(d)+")";
    }).append("path")
    .attr("d", function(d) { return getLine(d);})
    .attr("stroke","black").attr("fill","none"); // WRITE THIS PART

//////////////////////////////////////////////////////////////////////////////
// helper functions
function getDegrees(d) {
    var radians= Math.atan2( (yOrig*d.vy) - ((yOrig*d.vy)*-1),(xOrig*d.vx)-(xOrig*d.vx)*-1);
    return radians * 180/Math.PI;
}


function getLine(d) {
    var l1 = Math.abs(d.vx);
    var l2 = Math.abs(d.vy);

    if (l1 > l2) {
        if (d.vx > 0)
            return "M "+(xOrig*d.vx)*-1+",0"+" L "+xOrig*d.vx+",0"+" L "+((xOrig*d.vx)-arrowLen)+","+(arrowWid)+" L "+((xOrig*d.vx)-arrowLen)+","+((arrowWid)*-1)+" L "+xOrig*d.vx+",0";
        else
            return "M "+(xOrig*d.vx)+",0"+" L "+xOrig*d.vx*-1+",0"+" L "+((xOrig*d.vx*-1)-arrowLen)+","+(arrowWid)+" L "+((xOrig*d.vx*-1)-arrowLen)+","+((arrowWid)*-1)+" L "+xOrig*d.vx*-1+",0";
    } else {
        if (d.vy > 0)
            return "M "+(yOrig*d.vy)*-1+",0"+" L "+yOrig*d.vy+",0"+" L "+yOrig*d.vy+",0"+" L "+((yOrig*d.vy)-arrowLen)+","+(arrowWid)+" L "+((yOrig*d.vy)-arrowLen)+","+((arrowWid)*-1)+" L "+yOrig*d.vy+",0";
        else 
            return "M "+(yOrig*d.vy)*-1+",0"+" L "+yOrig*d.vy+",0"+" L "+yOrig*d.vy*-1+",0"+" L "+((yOrig*d.vy*-1)-arrowLen)+","+(arrowWid)+" L "+((yOrig*d.vy*-1)-arrowLen)+","+((arrowWid)*-1)+" L "+yOrig*d.vy*-1+",0";
    }

}

