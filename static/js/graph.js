function drawGraph(idDIV,columnas,pesos){
    d3.select("#"+idDIV).selectAll("svg").remove();
    Divheight = document.getElementById(idDIV).clientHeight;
    Divwidth  = document.getElementById(idDIV).clientWidth;
    
    margin = {top: 10, right: 15, bottom: 25, left: 10}

    width = Divwidth - margin.left - margin.right;
    height = Divheight - margin.top - margin.bottom;

    const MainGraphsvg = d3.select("#"+idDIV)
    .append("svg")
        .attr("width", Divwidth )
        .attr("height", Divheight)
        .call(d3.zoom().on("zoom", function (event) {
            svg.attr("transform", event.transform)
        }))
    svg = MainGraphsvg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    MainGraphsvg.append("rect")
        .attr("x",margin.left)
        .attr("y",margin.top)
        //.attr("rx", 4)
        //    .attr("ry", 4)
        .attr("width", width)
        .attr("height",height)
        .attr("fill",'none' )
        .attr("stroke-width",2)
        .attr("stroke", "#98E0D4")//379081
        .attr("stroke-opacity", 0.6); 

    MainGraphsvg.append("path")
        //.attr("d", "m 0   0 h 100.8 l 7.2 7.2 V 14.4 H 0 Z" )
        .attr("d", "m "+(margin.left-1)+" "+(margin.top-10)+" h 100.8 l 7.2 7.2 V "+15+" H "+(margin.left-1)+" Z")
        .attr("fill",'#98E0D4' )
        .attr("stroke", "none")
        .attr("stroke-opacity", 0.3); 

    MainGraphsvg.append("text")
        .attr("x", margin.left +10)
        .attr("y", margin.top+3)
        .attr("font-family","Calibri")
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', '#379081')
        .text("Graph View"); 
    
    
    var graph =ConstruirGrafo(columnas,pesos);/*
         {
            "nodes": [
                { "id": 1 }, 
                { "id": 2 }, 
                { "id": 3 }, 
                { "id": 4 }, 
                { "id": 5 }
            ],
            "links": [
                { "source": 1, "target": 2,'weight':1 },
                { "source": 2, "target": 3 ,'weight':1},
                { "source": 3, "target": 4 ,'weight':1},
                { "source": 4, "target": 5 ,'weight':1},
                { "source": 5, "target": 1 ,'weight':10}
            ]
        }*/
        /*
        svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill",'white' )
        .attr("stroke", "gray")
        .attr("stroke-opacity", 0.3); */

        var ScaleNodes = d3.scaleLinear().domain([graph['MinNodes'],graph['MaxNodes']]).range([5,10]);
        var ScaleLinks =  d3.scaleLinear().domain([graph['MinLinks'],graph['MaxLinks']]).range([1,4]);
        

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(100))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
        
        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke-width", d=>ScaleLinks(d.weight))
            .attr("stroke", "steelblue")
        
        var node = svg.selectAll(".nodes")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r",function(d){ return ScaleNodes(d.size);})
            .attr('fill','#FFA500')
            .attr('fill-opacity',0.7)
            //.on("click", addNode)
            .call(d3.drag()
                        .on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded)
                    )
        text = svg.append("g")
                    .style("font-size", "6px")
                    .attr("class", "text")
                    .selectAll("text")
                    .data(graph.nodes)
                  .enter().append("text")
                    .text(d => d.id)
        
            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);
        
            simulation
                .force("link")
                .links(graph.links)
        
        
        function ticked() {
        
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
        
            node
                .attr("transform", function (d) { return "translate(" + d.x + ", " + d.y + ")"; });
            
                text.attr("x", d => d.x - 5) //position of the lower left point of the text
                .attr("y", d => d.y + 5); //position of the lower left point of the text
         
        }
        
        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged (event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        
        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = undefined;
            d.fy = undefined;
        }
        /*
        function addNode(d) {
            var newID = graph.nodes.length + 1
            
            graph.nodes.push({"id": newID})
        
            node = svg.selectAll("circle")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .attr("r", 20)
                .merge(node)
        
            simulation.nodes(graph.nodes);
            simulation.force("link").links(graph.links);
            
            //reheat the simulation
            simulation.alpha(0.3).restart()
        }*/
}
//drawGraph('Grafo');

function ConstruirGrafo(columnas,matrix){
    matrix = JSON.parse(matrix);
    nodos =[];
    columnas.forEach(function(d,i){
        nodos.push({'id': d,'size':matrix[i][i]});
    });
    links =[];
    for (let i = 0; i < columnas.length; i++) {
        for (let j = i; j < columnas.length; j++) {
            links.push({ "source": columnas[i], "target": columnas[j],'weight':matrix[i][j] });
        }    
    }

    return {
        "nodes": nodos,
        "links": links,
        'MinNodes':d3.min(nodos,d=>d.size),
        'MaxNodes':d3.max(nodos,d=>d.size),
        'MinLinks':d3.min(links,d=>d.weight),
        'MaxLinks':d3.max(links,d=>d.weight)
    };
}

function ExtractingGraph(){
    spinner.spin(target);
        $.ajax({
            url: '/readyContrafactuals',
            data:{'numberc':2},
            //data: $('form').serialize(),
            type: 'POST',
            success: function(response){
                response = JSON.parse(response);
                drawGraph('Grafo',response['columns'].split(','),response['pesos']);

                //drawBarchars('IntvsProb');
                spinner.stop();
            },
            error: function(error){
                console.log(error);
            }
        });
}

function GraphExtracting(){
    d3.json("https://raw.githubusercontent.com/germaingarcia/iStar_Code/master/grafo.json")
    .then((response) => {
        console.log(response);
        drawGraph('IntvsProb3',response['columns'].split(','),response['pesos']);
    })
    .catch((error) => {
        console.error(error);
    });
}
//GraphExtracting();

function DrawingFeasibilityANDFactivility(NamesTemporals,DatosGrafos,variableNames){
    drawGraphColumns('IntvsProb3',NamesTemporals,DatosGrafos,variableNames);
}
//DrawingFeasibilityANDFactivility(NamesTemporals);

function drawGraphColumns(idDIV,columnas,DatosGrafos,variableNames){
    d3.select("#"+idDIV).selectAll("svg").remove();
    Divheight = document.getElementById(idDIV).clientHeight;
    Divwidth  = document.getElementById(idDIV).clientWidth;
    
    margin = {top: 10, right: 15, bottom: 25, left: 10}

    width = Divwidth - margin.left - margin.right;
    height = Divheight - margin.top - margin.bottom;

    square = Math.min(width,height)*0.8;

    const MainGraphsvg = d3.select("#"+idDIV)
    .append("svg")
        .attr("width", Divwidth )
        .attr("height", Divheight)
        .call(d3.zoom().on("zoom", function (event) {
            svgGraph.attr("transform", event.transform)
        }))
    svgGraph = MainGraphsvg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    MainGraphsvg.append("rect")
        .attr("x",margin.left)
        .attr("y",margin.top)
        //.attr("rx", 4)
        //    .attr("ry", 4)
        .attr("width", width)
        .attr("height",height)
        .attr("fill",'none' )
        .attr("stroke-width",2)
        .attr("stroke", "#80b1d3")//379081
        .attr("stroke-opacity", 0.6); 

    MainGraphsvg.append("path")
        //.attr("d", "m 0   0 h 100.8 l 7.2 7.2 V 14.4 H 0 Z" )
        .attr("d", "m "+(margin.left-1)+" "+(margin.top-10)+" h 100.8 l 7.2 7.2 V "+15+" H "+(margin.left-1)+" Z")
        .attr("fill",'#80b1d3' )
        .attr("stroke", "none")
        .attr("stroke-opacity", 0.3); 

    MainGraphsvg.append("text")
        .attr("x", margin.left +10)
        .attr("y", margin.top+3)
        .attr("font-family","Calibri")
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', '#162e3e')
        .text("Graph View"); 

    /*=============== BUTTON PROJECTION =================== */
    
    MainGraphsvg.append("rect")
      .attr("x",width-115 )
      .attr("y",0)
      .attr('width',60)
      .attr("height",17)
      .attr("fill",'#fb8072' )
      .attr("fill-opacity",1 )
      .attr("stroke-width",1)
      .attr("stroke", "darkred")
      .attr("stroke-opacity", 0.6)
      .attr("rx", 4)
      .attr("ry", 4)
      .on("click",FeasibilityClick);
    
    MainGraphsvg.append("text")
        .attr("x", width-85)
        .attr("y", margin.top/2+6)
        .attr("font-family","Calibri")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', 'darkred')
        .text("Feasibility")
        .on("click",FeasibilityClick);

    MainGraphsvg.append("rect")
      .attr("x",width-50 )
      .attr("y",0)
      .attr('width',60)
      .attr("height",17)
      .attr("fill",'#fb8072' )
      .attr("fill-opacity",1 )
      .attr("stroke-width",1)
      .attr("stroke", "darkred")
      .attr("stroke-opacity", 0.6)
      .attr("rx", 4)
      .attr("ry", 4)
      .on("click",FactibilityClick);
    
    MainGraphsvg.append("text")
        .attr("x", width-20)
        .attr("y", margin.top/2+6)
        .attr("font-family","Calibri")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', 'darkred')
        .text("Factibility")
        .on("click",FactibilityClick);
                          
    /*=============== BUTTON PROJECTION =================== */

    function radialLocation (center, angle, radius,clase){
        x = (center.x + radius * Math.cos(angle * Math.PI / 180));
        y = (center.y + radius * Math.sin(angle * Math.PI / 180));
        return {"x":x,"y":y,"clase":clase}
    }

    function place(key,clase){
        value = radialLocation(center, current, radius,clase)
        values[key]=value;
        current += increment
    }

    
    function getGraphVector(vectorNombres,datosCompletos){
        let links =[];
        let valoresLinks = {};
        let maximo =0;
        vectorNombres.forEach(function(d,i){
            Original = datosCompletos[d][0];
            for (var j = 1; j < datosCompletos[d].length; j++) {
                let valor = 0;
                variableNames.forEach(function(e){
                    if(Original[e] != datosCompletos[d][j][e]){
                        if (isNaN(Number(datosCompletos[d][j][e]))){
                            valor+=1;
                        }else{
                          if(Math.abs(Number(Original[e])-Number(datosCompletos[d][j][e])) >=0.001 ){
                            valor+= 1;//round(Number(datosCompletos[d][j][e]))
                            }
                        }
                    }
                    //temporal.push({'name':e,'number':i,'value':valor});
                });
                maximo = Math.max(maximo,valor);
                id = d+"_"+j;
                valoresLinks[id]=valor;
                links.push({"source":d,"target":id});
            }
            
        });
        return [links,valoresLinks,maximo];
    }

    function getGraphVectorFactibility(vectorNombres,datosCompletos){
        let links =[];
        let valoresLinks = {};
        let maximo =0;
        vectorNombres.forEach(function(d,i){
            Original = datosCompletos[d][0];
            for (var j = 1; j < datosCompletos[d].length; j++) {
                let valor = 0;
                variableNames.forEach(function(e){
                    if(Original[e] != datosCompletos[d][j][e]){
                        if (isNaN(Number(datosCompletos[d][j][e]))){
                            valor+=1;
                        }else{
                          if(Math.abs(Number(Original[e])-Number(datosCompletos[d][j][e])) >=0.001 ){
                                valor+= Math.abs(Number(Original[e])-Number(datosCompletos[d][j][e]))
                            }
                        }
                    }
                    //temporal.push({'name':e,'number':i,'value':valor});
                });
                maximo = Math.max(maximo,valor);
                id = d+"_"+j;
                valoresLinks[id]=valor;
                links.push({"source":d,"target":id});
            }
            
        });
        return [links,valoresLinks,maximo];
    }

    var increment =30,
    radius =square/2,
    center = {"x":width/2, "y":height/2},
    start = -120,
    current = start;

    values ={};
    columnas.forEach(function(d){values[d]={};});

    var firstCircleCount = 360 / increment;
    if (columnas.length < firstCircleCount){ increment = 360 / columnas.length;}
    firstCircleKeys = columnas.slice(0,firstCircleCount)
    firstCircleKeys.forEach( function(k){place(k,'Org')});

    secondCircleKeys = columnas.slice(firstCircleCount)

    radius = radius*0.6
    increment = 360 / secondCircleKeys.length  

    secondCircleKeys.forEach(function(k) {
        place(k,'Org');
    });

   
    
    var temp = getGraphVector(columnas,DatosGrafos);
    var links = temp[0];
    var valoresLinks = temp[1];
    var maximo = temp[2]
    var secodRadio = 35;
    var radioScale =d3.scaleLinear().domain([0,maximo]).range([3,secodRadio]);

    columnas.forEach(function(r){
        current = -120;
        increment = 360 / DatosGrafos[r].length;
        for (var j = 1; j < DatosGrafos[r].length; j++) {
            radius = radioScale(valoresLinks[r+"_"+j]);
            value = radialLocation(values[r], current, radius,'Ctr');
            values[r+"_"+j]=value;
            current += increment;
        }
    });

    function FeasibilityClick(){
        var temp = getGraphVector(columnas,DatosGrafos);
        var links = temp[0];
        var valoresLinks = temp[1];
        var maximo = temp[2]
        var secodRadio = 35;
        var radioScale =d3.scaleLinear().domain([0,maximo]).range([3,secodRadio]);

        columnas.forEach(function(r){
            current = -120;
            increment = 360 / DatosGrafos[r].length;
            for (var j = 1; j < DatosGrafos[r].length; j++) {
                radius = radioScale(valoresLinks[r+"_"+j]);
                value = radialLocation(values[r], current, radius,'Ctr');
                values[r+"_"+j]=value;
                current += increment;
            }
        });
        update();
    }

    function FactibilityClick(){
        var temp = getGraphVectorFactibility(columnas,DatosGrafos);
        var links = temp[0];
        var valoresLinks = temp[1];
        var maximo = temp[2]
        var secodRadio = 35;
        var radioScale =d3.scaleLinear().domain([0,maximo]).range([3,secodRadio]);

        columnas.forEach(function(r){
            current = -120;
            increment = 360 / DatosGrafos[r].length;
            for (var j = 1; j < DatosGrafos[r].length; j++) {
                radius = radioScale(valoresLinks[r+"_"+j]);
                value = radialLocation(values[r], current, radius,'Ctr');
                values[r+"_"+j]=value;
                current += increment;
            }
        });
        update();
    }

    function update(){

        var temporal = [];
        for (var key in values){
            temporal.push(values[key]);
        }
        var link = svgGraph.selectAll("line")
                .data(links)
                .join("line")
                .transition()           // apply a transition
                .duration(400)
                .attr("stroke-width", 2)
                .attr("stroke", "darkred")
                .attr("x1", function (d) { return values[d.source].x; })
                .attr("y1", function (d) { return values[d.source].y; })
                .attr("x2", function (d) { return values[d.target].x; })
                .attr("y2", function (d) { return values[d.target].y; });

        var node = svgGraph.selectAll("circle")
                .data(temporal)
                .join("circle")
                .transition()           // apply a transition
                .duration(400)
                .attr("r",function(f){if(f.clase=='Org'){return 8}else{return 5}})
                .attr('fill',function(f){if(f.clase=='Org'){return '#8dd3c7'}else{return "#fb8072"}})//'#FFA500')
                .attr('fill-opacity',0.9)
                .attr("stroke",function(f){if(f.clase=='Org'){return '#379081'}else{return "darkred"}})
                .attr("cx",d=>d.x)
                .attr("cy",d=>d.y);

    } 
        update();

}