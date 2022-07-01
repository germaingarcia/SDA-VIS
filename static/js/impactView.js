/*--------------------- INICIO ELIMINAR---------------------------------------------------------- */
/*
var columns = [
  "SEXO",
  "PROCEDENCIA",
  "RESIDENCIA",
  "ESTADO_CIVIL",
  "TIPO_COLEGIO",
  "JALADOS",
  "APROBADOS",
  "BECA_VIGENTE",
  "CANT_RESERVAS",
  "COD_CURSO",
  "COD_GRUPO",
  "COD_PLAN",
  "CREDITOS",
  "EFICIENCIA_SEMESTRES",
  "EXCESO_INASISTENCIA",
  "HRS_INASISTENCIA",
  "PROMEDIO_Obligatorio",
  "PROMEDIO_Electivo",
  "PONDERADO",
  "PRCTJE_INASISTENCIA_CURSO",
  "AVANCE_CREDITOS",
  "Dropout",
  "AGE"
];

var DIVid= "IntvsProb3";
var DiccionarioResultado = {
  "JALADOS": 9,
  "PRCTJE_INASISTENCIA_CURSO": 1.4
};
var SelectedGroups = {
  "Group_1": [
    37590,
    25964,
    35412,
    5299
  ],
  "AGE==30": [
    "{\"Row_Selected\": \"563",
    "708",
    "13306",
    "13681",
    "44047",
    "884\"}"
  ],
  "Group_3": [
    37590,
    25964,
    35412,
    5299,
    28950,
    2073
  ],
  "Group_4": [
    37590,
    25964,
    35412,
    5299,
    28950,
    2073,
    44114
  ]
};

var XVariableLinearScale = d3.scaleLinear().domain([ 0, 654 ]).range(columns);
ImpactVisualization(DIVid,DiccionarioResultado);*/
/*--------------------- FIN ELIMINAR---------------------------------------------------------- */

var List_of_options =[];
function ImpactVisualization(DIVid,DiccionarioResultado){
  // Primero tiene que haber una votacion
    //AddColumnsNames(DIVid);  //Para adicionar el nombre de las columnas
    var div = d3.select('#'+DIVid);
    divWidth  = document.getElementById(DIVid).clientWidth;
    var margin = {top:5,left:5,right:15,bottom:5},
    width = divWidth - margin.left - margin.right,
    height = 100;
    var variable_height =15;


    var wrapper = div
                    .append('div')
                    .style("width", (divWidth - margin.left - margin.right) + 'px')
                      .style("height", (height + margin.top + margin.bottom) + 'px')
                      .style("border-radius" ,5+'px')
                      .style('background-color',"#f9f9f9")
                      .style("margin-top", margin.top+"px");
    // drawing the counterfactual
    let svgHeight = variable_height+ margin.bottom;
    let g_Aux = wrapper.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", variable_height+ margin.bottom)
              .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + 0 + ")");
    
    g_Aux.selectAll()
                    .data(Columns)
                    .enter()
                    .append("rect")
                      .attr("x", function(d) { return AuxVariableLinearScale(d) })
                      .attr("y", 5)
                      .attr("rx", 4)
                      .attr("ry", 4)
                      .attr("width", AuxVariableLinearScale.bandwidth() )
                      .attr("height", variable_height )
                      .style("fill", '#fb8072')
                      .style("fill-opacity",0.8)
                      .style("stroke-width", 1)
                      .style("stroke", "darkred")
                      .style("opacity", 'red')
    
      g_Aux.selectAll()
                      .data(Object.entries(DiccionarioResultado)).enter()
                          .append("text")
                            .attr("x", function(d) { 
                              return  AuxVariableLinearScale(d[0]) + (AuxVariableLinearScale.bandwidth() / 2);         
                            })
                            .attr("y", function(d) { return  variable_height/2 +7     })
                            .style("text-anchor", "middle")
                            .text(function(d) { return d[1]; })
      
      /* ----------------------- DRAWING  */
      Mostrar = [];
      Mostrar = ActualizarParaMostrar(Mostrar,DiccionarioResultado);
      /*Object.entries(SelectedGroups).forEach(function(g){  
        Mostrar.push({'group':g[0],'Ndropout':Math.floor(Math.random() * 20),'Nodropout':Math.floor(Math.random() * 10)});
      })*/
      
      var wrapper2 = div
                    .append('div')
                      .style("border-radius" ,5+'px')
                      .style("margin-top","0px");
      
      DrawDotChart(wrapper,Mostrar,width,height,margin,svgHeight);

      wrapper2.html('<i class="fa fa-refresh "></i> update').on('click', function() {
        NMostrar = ActualizarParaMostrar(Mostrar,DiccionarioResultado);
        DrawDotChart(wrapper,NMostrar,width,height,margin,svgHeight);
    });

    //Adicionamos combo box
    // add the options to the button
    /*var Selection = wrapper.append("select")
                .attr("name", "name-list")
                .attr('id','id_option_'+List_of_options.length)

        Selection
      .selectAll('option')
     	.data(Object.entries(SelectedGroups))
      .enter()
    	.append('option')
      .text(function (d) { return d[0]; }) // text showed in the menu
      .attr("value", function (d) { return d[0]; })
    
    List_of_options.push('id_option_'+List_of_options.length); */

    
}

function DrawDotChart(wrapper,Mostrar,width,height,margin,svgHeight){
  var NewMargin = {top:18,left:45,right:5,bottom:5};

  wrapper.selectAll('#dotChart').remove();

  GDraw = wrapper.append("svg")
      .attr('id','dotChart')
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - svgHeight)
    .append("g")
      .attr("transform",
          "translate(" + NewMargin.top+ "," + 0 + ")");


  
  
  const New_xScale = d3.scaleLinear()
    .domain([0, d3.max(Mostrar.map(d => d3.max([d.Ndropout,d.Nodropout])))])
    .range([ NewMargin.left,  width - NewMargin.left - NewMargin.right]);
    GDraw.append("g")
    .attr("transform", `translate(0, ${NewMargin.top})`)
    .call(d3.axisTop(New_xScale))

  // Y axis
  const New_yScale = d3.scaleBand().range([ NewMargin.top, height - svgHeight - NewMargin.top ])
        .domain(Object.entries(SelectedGroups).map(d=>d[0]))
        .padding(1);
       
        GDraw.append("g")
        .attr("transform",
        "translate(" + NewMargin.left+ "," + 0 + ")")
        .call(d3.axisLeft(New_yScale))

        GDraw.append("defs").append("marker")
      .attr("id", "arrow2")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 12)
      .attr("markerHeight", 12)
      .attr("viewBox","0 0 12 12")
      .attr("refX",6)
      .attr("refY",6)
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
        .style("fill", "#6236FF");  
  // Lines
    GDraw.selectAll("myline")
    .data(Mostrar)
    .join("line")
      .attr("x1", function(d) { return New_xScale(d.Ndropout); })
      .attr("x2", function(d) { return New_xScale(d.Nodropout); })
      .attr("y1", function(d) { return New_yScale(d.group); })
      .attr("y2", function(d) { return New_yScale(d.group); })
      .attr("stroke", "red")
      .attr("stroke-width", "1px")
      .attr("marker-end","url(#arrow2)");  

  // Circles of variable 1
  GDraw.selectAll("mycircle")
    .data(Mostrar)
    .join("circle")
      .attr("cx", function(d) { return New_xScale(d.Ndropout); })
      .attr("cy", function(d) { return New_yScale(d.group); })
      .attr("r", 5)
      .style("fill", "gray")

  // Circles of variable 2
  /*GDraw.selectAll("mycircle")
    .data(Mostrar)
    .join("circle")
      .attr("cx", function(d) { return New_xScale(d.Nodropout); })
      .attr("cy", function(d) { return New_yScale(d.group); })
      .attr("r", 5)
      .style("fill", "gray")*/

}

function AddColumnsNames(DIVid){
  var margin = {top: 70, right: 10, bottom: 5, left: 10};
  var Divwidth  = document.getElementById(DIVid).clientWidth;
  
  var width = Divwidth - margin.left - margin.right;
  var x = d3.scaleBand().range([ 0, width ]).domain(XVariableLinearScale.domain()).padding(0.05);

  var visualizationWrapper = d3.select('#'+DIVid);
  wrapper = visualizationWrapper
  .append('div')
  .attr("id",function(f){return f; })
  .style("width", width + 'px')
  .style("height", margin.top + 'px')
    //.style('background-color',function(){console.log(i%2); if((i%2)==0){return 'red'}else{return 'green'}})

  var svgTitle = wrapper
    .append("svg")
    .attr("width", width )
    .attr("height", 75)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  svgTitle.append("g")
    .style("font-size", 2)
    .call(d3.axisTop(x).tickSize(0))
      .selectAll("text")	
      .style("font-size",'8px')  
      .style("text-anchor", "start")
      .attr("dx", "-.2em")
      .attr("dy", "-.15em")
      .attr("transform", function(d) {return "rotate(-25)"  })
      .select(".domain").remove()
  AuxVariableLinearScale = x;  
}


function vouting(ArrayDiccionariosValores){
  var resultado ={};
  return ArrayDiccionariosValores[0];
  /*$.ajax({
    url: '/voting',
    data:{'contrafactuales':JSON.stringify(ArrayDiccionariosValores)},
    //data: $('form').serialize(),
    type: 'POST',
    success: function(response){
        resultado= JSON.parse(response).newCounterfactuals
        return resultado;
    },
    error: function(error){
        console.log(error);
    }
  });*/
}

function AddOptionToCombo(textOption){
  List_of_options.forEach(d=>{
    var x = document.getElementById(d);
    var option = document.createElement("option");
    option.text = textOption;
    option.value = textOption;
    x.add(option);
  });
}

function RemoveOptionFromCombo(textOption){
  List_of_options.forEach(d=>{
    var selectobject = document.getElementById(d);
    for (var i=0; i<selectobject.length; i++) {
        if (selectobject.options[i].value == textOption)
            selectobject.remove(i);
    }
  });
}
/*
//Aumentar	  
var x = document.getElementById("id_option_0");
var option = document.createElement("option");
option.text = "Kiwi";
option.value = "Kiwi";
x.add(option);

//eliminar
var selectobject = document.getElementById('id_option_0');
for (var i=0; i<selectobject.length; i++) {
    if (selectobject.options[i].value == 'Group_1')
        selectobject.remove(i);
}
*/

function ActualizarParaMostrar(Mostrar,cambio){
  var SetA = new Set();
  Object.entries(SelectedGroups).forEach(function(g){SetA.add(g[0]);});
  Mostrar.forEach(function(g){SetA.add(g.group);})

  var NewMostrar =[];
  Mostrar.forEach(function(d){
    if(SetA.has(d.group)){
      NewMostrar.push(d);
      SetA.delete(d.group)
    }
  });

  diccionario = {};
  SetA.forEach(function(f){
    //NewMostrar.push({'group':f,'Ndropout':Math.floor(Math.random() * 20),'Nodropout':Math.floor(Math.random() * 10)});
    diccionario[f]=SelectedGroups[f];
  });

  /*
  @app.route("/MesureImpact",methods=["GET","POST"])
def MesureImpact():
  cambios = request.form['cambios']
  dict_ids = request.form['ids']
   */
  $.ajax({
    url: '/MeasureImpact', 
    data:{'cambios':JSON.stringify(cambio),'ids':JSON.stringify(diccionario)},
    //data: $('form').serialize(),
    async: false,  
    type: 'POST',
    success: function(response){
        var nuevo = JSON.parse(response);
        nuevo = nuevo.resultado;
        Object.entries(nuevo).forEach(function(f){
          NewMostrar.push({'group':f[0],'Ndropout':SelectedGroups[f[0]].length,'Nodropout':f[1]});
        });
        //AddColumnsNames('IntvsProb3');
        //return NewMostrar;
    },
    error: function(error){
        console.log(error);
    }
 });


  return NewMostrar;
}

