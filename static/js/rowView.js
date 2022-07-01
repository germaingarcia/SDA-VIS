function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function drawRowView(contrafactuales_INDEX){
    var CheckBoxs_RowView={};
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
    index = variableNames.indexOf(Id_Student);
    variableNames.splice(index, 1);
    index = variableNames.indexOf(Id_Target);
    variableNames.splice(index, 1);
    valores.forEach(function(d){let index = variableNames.indexOf(d); variableNames.splice(index, 1);});
    
    
  //////////////////////////////////////////
	var COD_PERSONAS=[]; 
	//contrafactuales_INDEX.forEach(function(d){COD_PERSONAS.push(ProbabilidadesContrafactuales[parseInt(d)][Id_Student])});
  contrafactuales_INDEX.forEach(function(d){COD_PERSONAS.push(d.split("_")[0])});
	uniqueCOD_PERSONA = Array.from(new Set(COD_PERSONAS));
  /***********************Aqui podemos ordenar las variables*********************/
  var diccionario_variableNames={};
  variableNames.forEach(function(f){diccionario_variableNames[f]=0;})
  uniqueCOD_PERSONA.forEach(function(d,index){
    let Original = DropoutStudents.filter(e => e[Id_Student].toString() ==d.toString())[0];
    let sinteticos =[];

    let temporales=[];
    contrafactuales_INDEX.forEach(function(e){if(e.split('_')[0]==d){temporales.push(e)}});
    sinteticos = Contrafactuales.filter(e=>temporales.indexOf(e[Id_Counterfactual])>-1)
    /*COD_PERSONAS.forEach(function(e,i){
			if(d==e){
				sinteticos.push(Contrafactuales[contrafactuales_INDEX[i]]);
			}
		})*/
    
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
    XVariableLinearScale =x;
    AddColumnsNames('IntvsProb3');

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
            .attr("height", 75)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    svgTitle.append("g")
        .style("font-size", 4)
        .call(d3.axisTop(x).tickSize(0))
          .selectAll("text")	
          .style("text-anchor", "start")
          .attr("dx", "-.2em")
          .attr("dy", "-.15em")
          .attr("transform", function(d) {return "rotate(-25)"  })
          .select(".domain").remove()      
    
      /*=============== BUTTONS =================== */
    
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
      .on("click",resortDiv_Feasibility);

  
    svgTitle.append("text")
      .attr("x",-margin.left + 30)
      .attr("y", -margin.top+17)
      .attr("font-family","Calibri")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight","bold")
      .style('fill', 'white')
      .text("Feasibility")
      .on("click",resortDiv_Feasibility);


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
      .on("click",resortDiv_Factibility);
  
    svgTitle.append("text")
      .attr("x", -margin.left + 94)
      .attr("y", -margin.top+17)
      .attr("font-family","Calibri")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight","bold")
      .style('fill', 'white')
      .text("Factibility")
      .on("click",resortDiv_Factibility);

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
      .on("click",AppendDivImpact);
  
    
    svgTitle.append("text")
      .attr("x", width -15)
      .attr("y", -margin.top+17)
      .attr("font-family","Calibri")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight","bold")
      .style('fill', 'white')
      .text("Select")
      .on("click",AppendDivImpact);
                        
  /*=============== BUTTON PROJECTION =================== */

  var DatosGrafos={};
  var Margen=3;
  var MyDivs =[];
  var MyCFsGroups =[];

	uniqueCOD_PERSONA.forEach(function(d,index){
      let Original = DropoutStudents.filter(e => e[Id_Student] ==d);
      let temporales=[];
      contrafactuales_INDEX.forEach(function(e){if(e.split('_')[0]==d){temporales.push(e)}});
      sinteticos = Contrafactuales.filter(e=>temporales.indexOf(e[Id_Counterfactual])>-1)
      Original=Original.concat(sinteticos);

      let height = (variable_height*Original.length) ;
      var margin = {top: 5, right: 10, bottom: 15, left: 30};
     
      var wrapper = visualizationWrapper
                  .append('div')
                  .attr("id","div_"+d)
                  .style("width", (width + margin.left + margin.right) + 'px')
                    .style("height", (height + margin.top + margin.bottom) + 'px')
                    .style("position", "absolute")
                    .style("border-radius" ,5+'px')
                    .style('background-color',function(){if(index%2==0){return '#d9d9d9'}else{return 'white'}})
                    .style("margin-top", Margen+"px");
       Margen += height + margin.top + margin.bottom;

       let metricastemporales = ProbabilidadesMain.filter(e=>e[Id_Student] == Original[0][Id_Student]);

      MyDivs.push({"div":wrapper, "id":"div_"+d, "height": height + margin.top + margin.bottom,"Feasibility":metricastemporales[0].Feasibility,"Factibility":metricastemporales[0].Factibility});
      createContrafactualBar(wrapper,Original,width,variable_height,variableNames,x,margin,MyCFsGroups,"div_"+d);
      DatosGrafos[d] = Original;
	});
  
  function resortDiv_Feasibility(){   resortDiv("Feasibility"); ResordGroups("Feasibility");  }
  function resortDiv_Factibility(){   resortDiv("Factibility"); ResordGroups("Factibility"); }
  
  function resortDiv(atributopeso){
      Margen=3;
      MyDivs.sort((a, b) => d3.ascending(a[atributopeso], b[atributopeso])).forEach(function(g,index){
          
          d3.select("#"+g.id).transition().duration(500)
            .style("margin-top", Margen+"px" )
            .style('background-color',function(){if(index%2==0){return '#d9d9d9'}else{return 'white'}});
            Margen+=g.height;
      });
  }

  function ResordGroups(atributopeso){
    MyCFsGroups.forEach(function(f){
      Temp_xScale = f.xScale;
      Temp_yScale = f.yScale;
      if(f["CFs"].length>1){
        f["CFs"].sort((a, b) => d3.ascending(a[atributopeso], b[atributopeso])).forEach(function(g,inde){
          d3.select('#'+f.idDiv)
          .select("#"+g.id).transition().duration(500)
          .attr("transform",function(){ 
            return "translate("+ 0 + ","+(Temp_yScale(inde+1))+")"
          });
        });
      }
    });
  }

  function AppendDivImpact(){
    AddImpactCounterfactuals();
  }
}

function GetContrafactuals(contrafactuales_INDEX){ //PONEMOS LOS INDEX A CADA CONTRAFACTUAL, SACAMOS LOS INDICES.... Y LOS COD_PERSONA
	
	var COD_PERSONAS=[]; 
	contrafactuales_INDEX.forEach(function(d){COD_PERSONAS.push(ProbabilidadesContrafactuales[parseInt(d)][Id_Student])});
	uniqueCOD_PERSONA = Array.from(new Set(COD_PERSONAS));
	
	uniqueCOD_PERSONA.forEach(function(d){
		let Original = DropoutStudents.filter(e => e[Id_Student] ==d);
		COD_PERSONAS.forEach(function(e,i){
			if(d==e){
				Original.push(Contrafactuales[contrafactuales_INDEX[i]]);
			}
		})

	});
}

function createContrafactualBar(wrapper,data,width,variable_height,variableNames,x,margin,MyCFsGroups,idDiv){

	let height = variable_height*data.length;
	let svg = wrapper.append("svg")
                .attr('id','SVG_'+idDiv)
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

    // Solo ponemos el id de la persona, esto no cambia
    svg.append("text")
                .attr("x",-25)
                .attr("y", height+margin.bottom/2)
                .attr("font-family","Calibri")
                .attr("text-anchor", "start")
                .style("font-size", "12px")
                .style("font-weight","bold")
                .style('fill', '#379081')
                .text(Original[Id_Student])
                
    
                update = function(d){
                  //console.log(d);
                };
    
                ListaTemporal=[]
    data.forEach(function(d,i){
        
        if(i>0){//(d.class !='org'){
            let temp = [];
            let Dic_Temp ={};
            variableNames.forEach(function(e){
	            let valor = '';
	            if(Original[e] != d[e]){
	                if (isNaN(Number(d[e]))){ return 1; Dic_Temp[e] = d[e];}
                  else{
                       if(Math.abs(Number(Original[e])-Number(d[e])) >=0.001 ){
                            valor = round(Number(d[e]));
                            Dic_Temp[e] = valor;
                        }
	                }
	            }
	            temporal.push({'name':e,'number':i,'value':valor});
              temp.push({'name':e,'number':i,'value':valor});
              
            });
            g_Aux = svg.append('g')
                    .attr("id",d.id)
                    .attr("transform",function(d){ return "translate("+ 0 + ","+(y(i))+") rotate(0)"})
            
            g_Aux.selectAll()
                    .data(temp)
                    .enter()
                    .append("rect")
                      .attr("x", function(d) { return x(d.name) })
                      .attr("y", function(d,i) { return y(0) })
                      .attr("rx", 4)
                      .attr("ry", 4)
                      .attr("width", x.bandwidth() )
                      .attr("height", y.bandwidth()-2 )
                      .style("fill", '#fb8072')
                      .style("fill-opacity",0.8)
                      .style("stroke-width", 1)
                      .style("stroke", "darkred")
                      .style("opacity", function(d){if(d.value>0){return 0.8}else{return 0}})
            
            g_Aux.selectAll()
                      .data(temp).enter()
                          .append("text")
                            .attr("x", function(d) { return  x(d.name) + (x.bandwidth() / 2);         })
                            .attr("y", function(d) { return  y(0) + (y.bandwidth() /2 +3 );    })
                            .style("text-anchor", "middle")
                            .text(function(d) { return d.value; })

            //if(i>0){
              SyntheticCheckBoxs[d[Id_Counterfactual]] = new d3CheckBox();
              SyntheticCheckBoxs[d[Id_Counterfactual]].size(10).x(-margin.left+5).y(0).rx(1).ry(1).markStrokeWidth(1).boxStrokeWidth(1).checked(false).id(d[Id_Counterfactual]).clickEvent(update(d));
              SyntheticCheckBoxs[d[Id_Counterfactual]].valores = Dic_Temp;
                g_Aux.call(SyntheticCheckBoxs[d[Id_Counterfactual]]);
                let My_temporal = ProbabilidadesContrafactuales.filter(a=>a.idc == d.idc)[0];
                ListaTemporal.push({"Feasibility":My_temporal.Feasibility,"Factibility":My_temporal.Factibility,'id':d[Id_Counterfactual]}); 
            //}
            }
           
    });
    MyCFsGroups.push({"idDiv":'SVG_'+idDiv,"ID":Original[Id_Student],'xScale':x,'yScale':y,"CFs":ListaTemporal});


    
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
          .data(OriginalTemporal).enter()
              .append("text")
                //.attr("x", function(d) { return  x(d.name) + (x.bandwidth() / 2);         })
                //.attr("y", function(d) { return  y(d.number) + (y.bandwidth() /2 + 5);    })
                .style("text-anchor", "middle")
                .text(function(d) { return d.value; })
                .attr("transform",function(d){ return "translate("+( x(d.name) + (x.bandwidth() / 2))+ ","+(y(d.number) + (y.bandwidth()/2 +5))+") rotate(0)"})
               // .attr("transform", "rotate(-90)");


}

/*
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

*/
//drawRowView();

function FiltrarDatosDEALUMNOS(){
  let AlumnosFiltrados = DropoutStudents.filter(function(d){selectedDots.indexOf(d[Id_Student].toString())>=0;})
  console.log(AlumnosFiltrados);
}


function AddImpactCounterfactuals(){
   //filtramos los contrafactuales
  var valoresDiccionario =[]
  for (const [key, value] of Object.entries(SyntheticCheckBoxs)) {
      if(value.checked()){
        valoresDiccionario.push(SyntheticCheckBoxs[key].valores);
      }
  }
  if(valoresDiccionario.length>0){
      //limpiar los checkbox
      var DiccionarioResultado ={};
      if(valoresDiccionario.length>1){
        DiccionarioResultado = vouting(valoresDiccionario);
      }else{
        DiccionarioResultado= valoresDiccionario[0]
      }
      //calculamos el immpacto

      //dibujamos los divs
      ImpactVisualization("IntvsProb3",DiccionarioResultado);
  }
}