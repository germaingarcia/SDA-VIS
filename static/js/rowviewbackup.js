function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function drawRowView(contrafactuales_INDEX){
  let DIVid ="IntvsProb2";
	d3.select('#'+DIVid).selectAll('div').remove();
  Divwidth  = document.getElementById(DIVid).clientWidth;
	var variable_Size =37;
	var variable_height =15;
	var visualizationWrapper = d3.select('#'+DIVid);

	/////////////////// SI NO ESTÁ habilitado///////////////////////
  let valores =[]
  for (const [key, value] of Object.entries(CheckBoxs)) {
    if(!value.checked()){
      valores.push(key);
    }
  }

	//////////////////////////////////////////
	var variableNames = Object.keys(DropoutStudents[0]);//Object.keys(data[0]);
	index = variableNames.indexOf('COD_PERSONA');
  variableNames.splice(index, 1);
  index = variableNames.indexOf('Dropout');
  variableNames.splice(index, 1);
  valores.forEach(function(d){let index = variableNames.indexOf(d); variableNames.splice(index, 1);});
    
    
  //////////////////////////////////////////
	var COD_PERSONAS=[]; 
	contrafactuales_INDEX.forEach(function(d){COD_PERSONAS.push(ProbabilidadesContrafactuales[parseInt(d)].COD_PERSONA)});
	uniqueCOD_PERSONA = Array.from(new Set(COD_PERSONAS));
  /***********************Aqui podemos ordenar las variables*********************/
  var diccionario_variableNames={};
  variableNames.forEach(function(f){diccionario_variableNames[f]=0;})
  uniqueCOD_PERSONA.forEach(function(d,index){
    let Original = DropoutStudents.filter(e => e.COD_PERSONA.toString() ==d.toString())[0];
    let sinteticos =[];
    COD_PERSONAS.forEach(function(e,i){
			if(d==e){
				sinteticos.push(Contrafactuales[contrafactuales_INDEX[i]]);
			}
		})
    
    sinteticos.forEach(function(d,i){
          variableNames.forEach(function(e){
            let valor = '';
            if(Original[e] != d[e]){
                if (isNaN(Number(d[e]))){
                   //diccionario_variableNames[e]+=1;  
                  return 1;
                }else{
                    //valor = Math.abs(Number(Original[e])-Number(d[e]))
                    //valor = round(valor);  
                    if(Math.abs(Number(Original[e])-Number(d[e])) >=0.0001 ){
                      valor = round(Number(d[e]))
                      diccionario_variableNames[e]+=1;
                    }
                }
            }//else{
              //temporal.push({'name':e,'number':i,'value':valor});
              //diccionario_variableNames[e]+=1;
            //}
          });
    });
  });
  let lista = Object.entries(diccionario_variableNames);
  lista = lista.sort(function(a,b){return b[1] - a[1]})
  variableNames=lista.map(d=>d[0]);
  /******************************************************************************/  
  var myVariables = variableNames;// d3.map(data, d =>d.group)
 var margin = {top: 70, right: 20, bottom: 5, left: 30};
 variable_Size = (Divwidth-margin.left - margin.right)/variableNames.length;
    
    var width  = (variableNames.length*variable_Size);// - margin.left - margin.right,

    var x = d3.scaleBand().range([ 0, width ]).domain(myVariables).padding(0.05);
    //--------------------------------- Adding div------------------------
    wrapper = visualizationWrapper
        		.append('div')
        		.attr("id",function(f){return f; })
        		.style("width", width + 'px')
          		.style("height", 70 + 'px')
          		//.style('background-color',function(){console.log(i%2); if((i%2)==0){return 'red'}else{return 'green'}})
     
     var svgTitle = wrapper
              .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height)
              .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

      svgTitle.append("g")
                      .style("font-size", 4)
                      //.attr("transform", "translate(0," + margin.top + ")")
                      .call(d3.axisTop(x).tickSize(0))
                      .selectAll("text")	
                  .style("text-anchor", "start")
                  .attr("dx", "-.2em")
                  .attr("dy", "-.15em")
                  .attr("transform", function(d) {
                      return "rotate(-25)" 
                      })
                      .select(".domain").remove()      
      
      /*=============== BUTTON PROJECTION =================== */
    
      svgTitle.append("rect")
    .attr("x",-margin.left)
    .attr("y",-margin.top+4)
    .attr('width',60)
    .attr("height",17)
    .attr("fill",'#162e3e' )
    .attr("fill-opacity",1 )
    .attr("stroke-width",1)
    .attr("stroke", "white")
    .attr("stroke-opacity", 0.6)
    .attr("rx", 4)
    .attr("ry", 4)

  
    svgTitle.append("text")
      .attr("x",-margin.left + 30)
      .attr("y", -margin.top+17)
      .attr("font-family","Calibri")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight","bold")
      .style('fill', 'white')
      .text("Feasibility")


    svgTitle.append("rect")
    .attr("x",-margin.left + 64)
    .attr("y",-margin.top+4)
    .attr('width',60)
    .attr("height",17)
    .attr("fill",'#162e3e' )
    .attr("fill-opacity",1 )
    .attr("stroke-width",1)
    .attr("stroke", "white")
    .attr("stroke-opacity", 0.6)
    .attr("rx", 4)
    .attr("ry", 4)

  
    svgTitle.append("text")
      .attr("x", -margin.left + 94)
      .attr("y", -margin.top+17)
      .attr("font-family","Calibri")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight","bold")
      .style('fill', 'white')
      .text("Factibility")

      // Third button ----------- Seleccion
    
      svgTitle.append("rect")
      .attr("x",width- 44)
      .attr("y",-margin.top+4)
      .attr('width',60)
      .attr("height",17)
      .attr("fill",'#162e3e' )
      .attr("fill-opacity",1 )
      .attr("stroke-width",1)
      .attr("stroke", "white")
      .attr("stroke-opacity", 0.6)
      .attr("rx", 4)
      .attr("ry", 4)
  
    
      svgTitle.append("text")
        .attr("x", width -15)
        .attr("y", -margin.top+17)
        .attr("font-family","Calibri")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', 'white')
        .text("Select")
                        
  /*=============== BUTTON PROJECTION =================== */

  var DatosGrafos={};
	uniqueCOD_PERSONA.forEach(function(d,index){
		let Original = DropoutStudents.filter(e => e.COD_PERSONA ==d);
		COD_PERSONAS.forEach(function(e,i){
			if(d==e){
				Original.push(Contrafactuales[contrafactuales_INDEX[i]]);
			}
		})
		let height = (variable_height*Original.length) ;
		 var margin = {top: 5, right: 10, bottom: 15, left: 30};
		var wrapper = visualizationWrapper
        			  .append('div')
        			  .attr("id",function(f){return f; })
        			  .style("width", (width + margin.left + margin.right) + 'px')
          			  .style("height", (height + margin.top + margin.bottom) + 'px')
          			  .style("border-radius" ,5+'px')
          			  .style('background-color',function(){if(index%2==0){return '#d9d9d9'}else{return 'white'}})

    createContrafactualBar(wrapper,Original,width,variable_height,variableNames,x,margin);
    DatosGrafos[d] = Original;
	});

  DrawingFeasibilityANDFactivility(uniqueCOD_PERSONA,DatosGrafos,variableNames);


	/*let temporal = [0,1,2,3,4,5,6,7,8,7,9]
	temporal.forEach(function(d,i){
		var wrapper = visualizationWrapper
        			  .append('div')
        			  .attr("id",function(f){return f; })
        			  .style("width", 700 + 'px')
          			  .style("height", 100 + 'px')
          			  .style('background-color',function(){console.log(i%2); if((i%2)==0){return 'red'}else{return 'green'}})
	}); */
}

function GetContrafactuals(contrafactuales_INDEX){ //PONEMOS LOS INDEX A CADA CONTRAFACTUAL, SACAMOS LOS INDICES.... Y LOS COD_PERSONA
	
	var COD_PERSONAS=[]; 
	contrafactuales_INDEX.forEach(function(d){COD_PERSONAS.push(ProbabilidadesContrafactuales[parseInt(d)].COD_PERSONA)});
	uniqueCOD_PERSONA = Array.from(new Set(COD_PERSONAS));
	
	uniqueCOD_PERSONA.forEach(function(d){
		let Original = DropoutStudents.filter(e => e.COD_PERSONA ==d);
		COD_PERSONAS.forEach(function(e,i){
			if(d==e){
				Original.push(Contrafactuales[contrafactuales_INDEX[i]]);
			}
		})

	});
}

function createContrafactualBar(wrapper,data,width,variable_height,variableNames,x,margin){

	let height = variable_height*data.length;
	let svg = wrapper.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    var myContras = d3.map(data, (d,i) => i)

    var y = d3.scaleBand()
                      .range([ 0,height ])
                      .domain(myContras)
                      .padding(0.05);
                    svg.append("g")
                      .style("font-size", 10)
                      .call(d3.axisLeft(y).tickSize(0))
                      .select(".domain").remove();

    var temporal = [];
    var Original = data[0];
    var OriginalTemporal =[];
    
    variableNames.forEach(function(d){
        let valor = Original[d];
        if (!isNaN(Number(Original[d]))){valor = round(valor)}
        OriginalTemporal.push({'name':d,'number':0,'value':valor});
    });

    svg.append("text")
                .attr("x",-25)
                .attr("y", height+margin.bottom/2)
                .attr("font-family","Calibri")
                .attr("text-anchor", "start")
                .style("font-size", "12px")
                .style("font-weight","bold")
                .style('fill', '#379081')
                .text(Original['COD_PERSONA'])
                
                      

    data.forEach(function(d,i){
        if(d.class !='org'){
            variableNames.forEach(function(e){
	            let valor = '';
	            if(Original[e] != d[e]){
	                if (isNaN(Number(d[e]))){
	                    return 1;
	                }else{
	                    //valor = Math.abs(Number(Original[e])-Number(d[e]))
	                    //valor = round(valor);  
	                    //valor = round(Number(d[e]))
                      if(Math.abs(Number(Original[e])-Number(d[e])) >=0.001 ){
                        valor = round(Number(d[e]))
                        }
	                }
	            }
	            temporal.push({'name':e,'number':i,'value':valor});
            });
        }
    });

    svg.selectAll()
          .data(temporal)
          .enter()
          .append("rect")
            .attr("x", function(d) { return x(d.name) })
            .attr("y", function(d,i) { return y(d.number) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth()-2 )
            .style("fill", '#fb8072')
            .style("fill-opacity",0.8)
            .style("stroke-width", 1)
            .style("stroke", "darkred")
            .style("opacity", function(d){if(d.value>0){return 0.8}else{return 0}})
      
    svg.selectAll()
          .data(OriginalTemporal)
          .enter()
          .append("rect")
            .attr("x", function(d) { return x(d.name) })
            .attr("y", function(d,i) { return y(d.number) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width",  x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", '#8dd3c7' )
            .style("fill-opacity",0.8)
            .style("stroke-width", 1)
            .style("stroke", "#379081")
            .style("opacity", 0.8)
    
   
      
    svg.selectAll()
          .data(temporal).enter()
              .append("text")
                .attr("x", function(d) { return  x(d.name) + (x.bandwidth() / 2);         })
                .attr("y", function(d) { return  y(d.number) + (y.bandwidth() /2 + 3);    })
                .style("text-anchor", "middle")
                .text(function(d) { return d.value; })
               
   /*svg.selectAll(".text")
                .data(temporal)
                .join("text")
                .attr("x", 0)
                .attr("y", function(d,i) { return y(d.number) })
                .text("hola")
                .join("input")
                .attr("type", "checkbox")
                .attr("font-weight", 500)
                .style("font-size", "9px")
                .style('font-family','Baumans, sans-serif')
                  .attr("class",'textColumn')*/
      
                  update = function(d){
                    //console.log(d);
                  };

        myContras.forEach(function(d,i){
             if(i>0){
                    CheckBoxs[d] = new d3CheckBox();
                    CheckBoxs[d].size(10).x(-margin.left+5).y(y(i)).rx(1).ry(1).markStrokeWidth(1).boxStrokeWidth(1).checked(false).id(Original['COD_PERSONA']+"_"+i).clickEvent(update(d));
                    svg.call(CheckBoxs[d]);
             }
              
        }); 

                svg.selectAll()
          .data(OriginalTemporal).enter()
              .append("text")
                //.attr("x", function(d) { return  x(d.name) + (x.bandwidth() / 2);         })
                //.attr("y", function(d) { return  y(d.number) + (y.bandwidth() /2 + 5);    })
                .style("text-anchor", "middle")
                .text(function(d) { return d.value; })
                .attr("transform",function(d){ return "translate("+( x(d.name) + (x.bandwidth() / 2))+ ","+(y(d.number) + (y.bandwidth()/2 +5))+") rotate(0)"})
               // .attr("transform", "rotate(-90)");


}


d3.json('https://raw.githubusercontent.com/germaingarcia/Datasets/main/rowData.json')
.then((response) => {
  //drawRowView('vis',response);
  //drawRowView(response);
  contrafactuales_INDEX = response.contrafactuales_INDEX;
  DropoutStudents = response.DropoutStudents;
  ProbabilidadesContrafactuales = response.ProbabilidadesContrafactuales;
  Contrafactuales  = response.Contrafactuales;
  drawRowView(contrafactuales_INDEX);
  });


//drawRowView();

function FiltrarDatosDEALUMNOS(){
  let AlumnosFiltrados = DropoutStudents.filter(function(d){selectedDots.indexOf(d.COD_PERSONA.toString())>=0;})
  console.log(AlumnosFiltrados);
}