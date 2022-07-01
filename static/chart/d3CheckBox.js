function d3CheckBox () {

    var size = 20,
        x = 0,
        y = 0,
        rx = 0,
        ry = 0,
		id ='',
        markStrokeWidth = 3,
        boxStrokeWidth = 3,
        checked = false,
        clickEvent;

    function checkBox (selection) {

        var g = selection.append("g"),
            box = g.append("rect")
            .attr("width", size)
            .attr("height", size)
            .attr("x", x)
            .attr("y", y)
            .attr("rx", rx)
            .attr("ry", ry)
            .attr("fill",'#98E0D4')
            .attr("fill-opacity", 1)
            .attr("stroke-width", boxStrokeWidth)
             .attr("stroke", "#379081")
           

        //Data to represent the check mark
        var coordinates = [
            {x: x + (size / 8), y: y + (size / 3)},
            {x: x + (size / 2.2), y: (y + size) - (size / 4)},
            {x: (x + size) - (size / 8), y: (y + (size / 10))}
        ];

        var line = d3.line()
                .x(d=>d.x)
                .y(d=>d.y)
                //.interpolate("basic");

        var mark = g.append("path")
            .attr("d", line(coordinates))
            .attr("stroke-width" , markStrokeWidth)
            .attr("stroke" , "#379081")
            .attr( "fill" , "none")
             .attr("opacity", (checked)? 1 : 0)


        g.on("click", function (event) {
            checked = !checked;
            mark.attr("opacity", (checked)? 1 : 0);

            if(clickEvent)
                clickEvent();

            event.stopPropagation();
        });

    }

    checkBox.size = function (val) {
        size = val;
        return checkBox;
    }

    checkBox.x = function (val) {
        x = val;
        return checkBox;
    }
	
	checkBox.id = function (val) {
        id = val;
        return checkBox;
    }
	
    checkBox.y = function (val) {
        y = val;
        return checkBox;
    }

    checkBox.rx = function (val) {
        rx = val;
        return checkBox;
    }

    checkBox.ry = function (val) {
        ry = val;
        return checkBox;
    }

    checkBox.markStrokeWidth = function (val) {
        markStrokeWidth = val;
        return checkBox;
    }

    checkBox.boxStrokeWidth = function (val) {
        boxStrokeWidth = val;
        return checkBox;
    }

    checkBox.checked = function (val) {

        if(val === undefined) {
            return checked;
        } else {
            checked = val;
            return checkBox;
        }
    }

    checkBox.clickEvent = function (val) {
        clickEvent = val;
        return checkBox;
    }

    return checkBox;
}