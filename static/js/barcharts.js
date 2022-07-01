function isColumnNumerical(name){
    if(Numerical.indexOf(name)>=0){
        return true;
    }else{ return false;}
}
function createColumn(column,width,columnMargin){
    const chartWidth = width - (columnMargin.left + columnMargin.right)-5;
    if (isColumnNumerical(column['name']))
      return {...column,
        xScale:  d3.scaleLinear().range([0, chartWidth]).domain(column.extent)
      };
     return  {...column,    
       xScale:  d3.scaleBand().range([0, chartWidth]).domain(column.Categories).padding(0.5)
    };
}

buttonMouseOver = function(){ 
  d3.select(this).transition()
      .duration('50')
      .attr('opacity', 0.5);
}

buttonMouseout = function(){
    d3.select(this).transition()
    .duration('50')
    .attr('opacity', 1);
}

buttonMouseClick = function(){
    //GetProjectionInicial();
    Modificacion();
}
  
function drawBarchars(DivID){
    divWidth  = document.getElementById(DivID).clientWidth;
    var StyleProps ={histogramWidth: 250,
    histogramHeight: 100};    

    let cids = ColumnsDicArray.map(function(f){return f.name});

    const margin = { bottom: 15, top: 15, left: 5, right: 10 }
    ColumnsDicArray.forEach(function(d,i){
      ColumnsDicArray[i]=createColumn(ColumnsDicArray[i],divWidth,margin); 
    });
    var xScales = ColumnsDicArray.map(d =>d.xScale);
    var yScale = d3.scaleLinear()
            .domain([0, ColumnsDicArray.length])
            .range([StyleProps.histogramHeight - margin.bottom, ColumnsDicArray.length * StyleProps.histogramHeight + StyleProps.histogramHeight - margin.bottom])
    
    var scalaBand = d3.scaleBand()
            .rangeRound([margin.top, ColumnsDicArray.length * StyleProps.histogramHeight + StyleProps.histogramHeight - margin.bottom])
            .domain(cids);
    
    const Mainsvg = d3.select("#"+DivID).append("svg")
                    .attr("width", divWidth)
                    .attr("height", (StyleProps.histogramHeight)*cids.length +StyleProps.histogramHeight+20);

    svg = Mainsvg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
    
    Mainsvg.append("rect")
                .attr("x",margin.left)
                .attr("y",margin.top)
                .attr("width",divWidth-margin.right)
                .attr("height",(StyleProps.histogramHeight)*cids.length + StyleProps.histogramHeight)
                .attr("fill",'none' )
                .attr("stroke-width",2)
                .attr("stroke", "#80b1d3")//
                .attr("stroke-opacity", 0.6); 
        
            Mainsvg.append("path")
                //.attr("d", "m 0   0 h 100.8 l 7.2 7.2 V 14.4 H 0 Z" )
                .attr("d", "m "+(margin.left-1)+" "+(margin.top-10)+" h 100.8 l 7.2 7.2 V 24.4 H "+(margin.left-1)+" Z")
                .attr("fill",'#80b1d3' )
                .attr("stroke", "#80b1d3")
                .attr("stroke-opacity", 0.3); 
        
            Mainsvg.append("text")
                .attr("x", margin.left +10)
                .attr("y", margin.top+3)
                .attr("font-family","Calibri")
                .attr("text-anchor", "start")
                .style("font-size", "12px")
                .style("font-weight","bold")
                .style('fill', '#162e3e')
                .text("Row View"); 
            
            /*=============== BUTTON PROJECTION =================== */
            

            Mainsvg.append("rect")
              .attr("x",divWidth-70 )
              .attr("y",margin.top+5)
              .attr('width',60)
              .attr("height",17)
              .attr("fill",'#162e3e' )
              .attr("fill-opacity",1 )
              .attr("stroke-width",1)
              .attr("stroke", "white")
              .attr("stroke-opacity", 0.6)
              .attr("rx", 4)
                .attr("ry", 4)
              .on('mouseover',buttonMouseOver)
              .on('mouseout',buttonMouseout)
              .on("click",buttonMouseClick);
            
            Mainsvg.append("text")
                .attr("x", divWidth-39)
                .attr("y", margin.top+26/2+4)
                .attr("font-family","Calibri")
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight","bold")
                .style('fill', 'white')
                .text("Projection")
                .on('mouseover',buttonMouseOver)
              .on('mouseout',buttonMouseout)
              .on("click",buttonMouseClick);
                          
            /*=============== BUTTON PROJECTION =================== */

    
                svg.selectAll("text")
                .data(cids)
                .join("text")
                .attr("x", margin.left+12)
                .attr("y", function(d){return scalaBand(d)+margin.bottom})
                .text(function(d){return d;})
                .join("input")
                .attr("type", "checkbox")
                .attr("font-weight", 500)
                .style("font-size", "9px")
                .style('font-family','Baumans, sans-serif')
                  .attr("class",'textColumn')

                  update = function(d){
                    //console.log(d);
                  };

                cids.forEach(function(d,i){
                  CheckBoxs[d] = new d3CheckBox();
                  CheckBoxs[d].size(10).x(margin.left).y(scalaBand(d)+margin.bottom/2).rx(1).ry(1).markStrokeWidth(1).boxStrokeWidth(1).checked(true).id(i).clickEvent(update(d));
                  svg.call(CheckBoxs[d]);
                });
                 // svg.append('span')
                 // .text(rcd.id);
                
      var GridHeight = StyleProps.histogramHeight-margin.top-margin.bottom;
      ColumnsDicArray.forEach(function(d,i){
        ColumnsDicArray[i] = CreateHistograms(DropoutStudents,ColumnsDicArray[i],GridHeight,margin);
      }); 

      ColumnsDicArray.forEach(function(column){
          let g = svg.append('g').attr("transform", function() { return "translate(0, " + scalaBand(column.name) + ")"; });

          g.selectAll("rect")
          .data(column.bin)
          .enter()
          .append("rect")
            .attr("x", function(){return margin.left})
            .attr("transform", function(d) {
                return "translate(" + column.xScale(d.x0) + "," + column.yScale(d.length) + ")"; })
            .attr("width", function(d) {   
                return column.bandwidth(d)})//x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) {  
                return GridHeight - column.yScale(d.length); })
                .attr("rx", 2)
                .attr("ry", 2)
            .attr("class",'histogram');
            //.style("fill", "#69b3a2");
  
            // add the x Axis
            g.append("g")
                .attr("transform", "translate("+margin.left+"," + GridHeight+")")
                .call(d3.axisBottom(column.xScale))
                .selectAll("text")
                .style("font-size",'8px')
                .style("fill", "#aaa")
                .selectAll("line").attr("stroke", "#aaa").attr("stroke-dasharray", "2,2");
          });
 
}

function CreateHistograms(data,column,histogramHeight,margin){
  if (isColumnNumerical(column['name'])){
      var histogram = d3.bin()
          .value(d => d[column['name']])   // I need to give the vector of value
          .domain(column.xScale.domain())  // then the domain of the graphic
          .thresholds(column.xScale.ticks(10));
      var bins = histogram(data);
      bandwidth = function(d){return column.xScale(d.x1) - column.xScale(d.x0) -1 ;}

      var y = d3.scaleLinear()
        .range([histogramHeight, margin.top]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);

      return {...column,'bin':bins,'bandwidth':bandwidth,'yScale':y};
  //.thresholds(x.ticks(20))
  }else{
      var mybins = d3.groups(data, d => d[column['name']])
      var bins =[];
      mybins.forEach(function(d,i){
        bins.push(d[1]);
        bins[i]['x0'] = d[0];
        bins[i]['x1'] = column.xScale.bandwidth()*(i+1);
      });

      bandwidth = function(d){return column.xScale.bandwidth();}
      
      var y = d3.scaleLinear()
      .range([histogramHeight, margin.top]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);
      return {...column,'bin':bins,'bandwidth':bandwidth,'yScale':y};
  }
}






/////////////////////////////////////LINKING

function GetProjectionInicial(){
  let valores =[]
  for (const [key, value] of Object.entries(CheckBoxs)) {
      if(value.checked()){
          valores.push(key);
      }
  }
  spinner.spin(target);
  $.ajax({
      url: '/GetNormalProjection',
      data:{'ListColumns':valores.toString()},
      //data: $('form').serialize(),
      type: 'POST',
      success: function(response){
          response = JSON.parse(response).projectionInicial;
          DrawInitialProjection('Grafo',response);
          spinner.stop();

          projection();
      },
      error: function(error){
          console.log(error);
      }
  });
}
