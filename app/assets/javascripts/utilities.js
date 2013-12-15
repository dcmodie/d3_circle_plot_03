
function x_scale_fcn (dataset){
    //get the max x value
    var max_x_val = d3.max(dataset, function (d){
        return d[0]
    })
    //return the scale
    var ret_val = d3.scale.linear()
        .domain([0, max_x_val])
        .range([padding, w - padding]);

    return ret_val
}

function y_scale_fcn (dataset){
    var max_y_val = d3.max(dataset, function (d){
        return d[1]
    })
    var min_y_val = d3.min(dataset, function (d){
        return d[1]
    })
    var yScale = d3.scale.linear()
        .domain([0, max_y_val])
        .range([h-padding, padding]);
    return yScale;
}

function size_scale_fcn  (dataset){
    var max_y_val = d3.max(dataset, function (d){
        return d[1]
    })
    var min_y_val = d3.min(dataset, function (d){
        return d[1]
    })
    var size_scale =  d3.scale.linear()
        .domain([Math.sqrt(min_y_val/3.14), Math.sqrt(max_y_val/3.14) ])
        .range([10, 75]);
    return size_scale;
}

function set_x_axis (x_scale, h, padding, svg){
    var old_axis = $('#xAxisId')
    if (old_axis.length != 0 ){
        console.log("removing ")
        old_axis.remove()
    }
    x_axis.scale(x_scale);
    svg
        .append("g")
        .attr("class","xAxis")
        .attr("id", "xAxisId")
        .call(x_axis)
        .attr("transform", "translate(0," + (h - padding) + ")")
}

function set_y_axis (y_scale, h, padding, svg){
    var old_axis = $('#yAxisId')
    if (old_axis.length != 0 ){
        console.log("removing ")
        old_axis.remove()
    }
    //Define Y axis
    y_axis.scale(y_scale)
        .orient("left")
        .ticks(5);
    //Create Y axis
    svg.append("g")
        .attr("class", "yAxis")
        .attr("id", "yAxisId")
        .attr("transform", "translate(" + padding + ",0)")
        .call(y_axis);
}