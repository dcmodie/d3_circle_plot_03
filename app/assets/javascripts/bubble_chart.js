
padding=80;
var h = 400;
var w = 700;
var svg;
var dataset_index = 0;
var x_axis = d3.svg.axis();
var y_axis = d3.svg.axis();
var circles;

var dataset = [

    [
        [500, 2], [108, 900], [25, 500], [10, 33], [330, 95],
        [410, 12], [47, 44], [250, 670], [85, 210], [220, 88], [60,150]
    ],

    [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600,150]
    ],
    [
        [50, 2], [108, 600], [25, 500], [10, 33], [330, 95],
        [410, 12], [47, 44], [250, 670], [85, 210], [220, 88], [60,150]
    ],
    [
        [500, 20], [18, 1500], [25, 50], [10, 33], [30, 95],
        [410, 12], [47, 44], [250, 670], [850, 210], [220, 880], [600,150]
    ]

]

function init(dataset_0){
    console.log("init")
    d3.select("#new")
        .on("click", function() {
            //svg.selectAll("*").remove()
            dataset_index++;
            if (dataset_index>3){dataset_index=0};
            redraw(dataset[dataset_index])
        });
        create_svg()
        draw_init(dataset_0)
}

function create_svg(){
    svg = d3.select("body")
        .append("svg")
        .attr("width", w  )
        .attr("height", h  );
}

function redraw(dataset){
    console.log("redraw")
   // alert("redrawring")

    $( "#dataset_display" ).text( dataset_index )
    // set the x scale between the width of the svg minus padding
    var x_scale = x_scale_fcn(dataset);
    // now y
    var y_scale = y_scale_fcn(dataset);

    //set the size of the area of the circles to a scale between 10 and 75
    var size_scale = size_scale_fcn(dataset);

    circles = svg.selectAll("circle")
        .data(dataset)
        .transition()
        .duration(1000)
        .attr({
            "cx":function(d) {
                return x_scale(d[0]);  //Returns scaled value
            },
            "cy":function(d) {
                return y_scale(d[1]);  //Returns scaled value
            },
            "r":function (d){
                area = Math.sqrt(d[1]/3.14)
                return size_scale(area);
            }
        })

    //create the circles to get larger for y value, and place them along x axis based on x value,
    // and along y axis based on y value
    // create some text and label the circles with the value from the dataset
    var text_boxes=	svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1000)
        .attr({

            "x":function(d) {
                return x_scale(d[0]);  //Returns scaled value
            },
            "y":function(d) {
                return y_scale(d[1]);  //Returns scaled value
            }
        })
        .text(function (d,i){
            return (d[0] + "," + d[1])
        });

    var x = d3.select(".xAxis")
        .transition()
        .duration(10000)
        .call(x_axis)
        .attr("transform", "translate(0," + (h/2) + ")");
     set_x_axis(x_scale, h, padding, svg);
     set_y_axis(y_scale, h, padding, svg);
}


function draw_init(dataset){
    $( "#dataset_display" ).text( dataset_index )
    //append one circle for each sub-array
    circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle");

    // set the x scale between the width of the svg minus padding
    var x_scale = x_scale_fcn(dataset);
    // now y
    var y_scale = y_scale_fcn(dataset);

    //set the size of the area of the circles to a scale between 10 and 75
    var size_scale = size_scale_fcn(dataset);

    //create the circles to get larger for y value, and place them along x axis based on x value,
    // and along y axis based on y value
    circles
        .attr({
        "r":
            function (d){
                area = Math.sqrt(d[1]/3.14)
                return size_scale(area);
            },
        "fill":"rgba(20,128,117,.5)",
        "cx":function(d) {
            return x_scale(d[0]);  //Returns scaled value
        },
        "cy":function(d) {
            return y_scale(d[1]);  //Returns scaled value
        },
    })

    // create some text and label the circles with the value from the dataset
    var text_boxes=	svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d,i){
            return (d[0] + "," + d[1])
        });

    text_boxes
        .attr({

        "x":function(d) {
            return x_scale(d[0]);  //Returns scaled value
        },
        "y":function(d) {
            return y_scale(d[1]);  //Returns scaled value
        },
        "text-anchor":"middle"
    });
    set_x_axis(x_scale, h, padding, svg);
    set_y_axis(y_scale, h, padding, svg);
}



