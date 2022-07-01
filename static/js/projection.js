var Scalas = {}
var DivId = 'First_ScatterPlot';
var divHeight = document.getElementById(DivId).clientHeight,
divWidth  = document.getElementById(DivId).clientWidth;

var marginMain = {top: 10, right: 10, bottom: 35, left: 5},
Projection_width  = divWidth  - marginMain.right  - marginMain.left,
Projection_height = divHeight - marginMain.bottom - marginMain.top;

var halfWidth = Projection_width/2;

var general_SVG1 = d3.select("#"+DivId)
                  .append('div')
                  .style("width", (divWidth-marginMain.left)/2 + 'px')
                  .style("height", divHeight + 'px')
                  .style("position", "relative")
                  .style("border-radius" ,5+'px')
                  .style("display" ,"inline-block")
                  .style("padding", 0+"px");

var general_SVG2 = d3.select("#"+DivId)
                  .append('div')
                  .style("width", (divWidth-marginMain.left)/2+ 'px')
                  .style("height", divHeight + 'px')
                  .style("position", "relative")
                  .style("border-radius" ,5+'px')
                  .style("display" ,"inline-block")
                  .style("padding", 0+"px");

var left_Svg = general_SVG1.append("svg")
                  .attr("width", (divWidth-marginMain.left)/2 )
                  .attr("height", divHeight);

var right_Svg = general_SVG2.append("svg")
                  .attr("width", (divWidth-marginMain.left)/2 )
                  .attr("height", divHeight);

var left = left_Svg.append('g')
                      .attr("width", halfWidth)
                      .attr("height", Projection_height)
                      .attr("transform","translate(" + marginMain.left + "," + marginMain.top + ")");

left.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width", halfWidth)
        .attr("height",Projection_height)
        .attr("rx", 6)
    	.attr("ry", 6)
        .attr("fill","white")
        .attr("stroke-width",2)
        .attr("stroke", "none") 
        .attr("stroke-opacity", 0.6)
        .attr("opacity",0.3);

left.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", halfWidth)
        .attr("height",Projection_height)
        .attr("fill",'none' )
        .attr("stroke-width",2)
        .attr("stroke", "#80b1d3")
        .attr("stroke-opacity", 0.6); 

left.append("path")
        .attr("d", "m "+(-1)+" "+(marginMain.top-18)+" h 100.8 l 7.2 7.2 V 12.4 H "+(-1)+" Z")
        .attr("fill",'#80b1d3' )
        .attr("stroke", "none")
        .attr("stroke-opacity", 0.3); 

left.append("text")
        .attr("x", 10)
        .attr("y", 5)
        .attr("font-family","Calibri")
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', '#162e3e')
        .text("Dropout View"); 

var right = right_Svg
            .append("g")
            .attr("width", halfWidth)
            .attr("height", Projection_height)
            .attr("transform","translate(" + (0)+ "," + marginMain.top + ")");

right.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width", halfWidth)
        .attr("height",Projection_height)
        .attr("rx", 6)
    .attr("ry", 6)
        .attr("fill","white") 
        .attr("stroke-width",2)
        .attr("stroke", "None") 
        .attr("stroke-opacity", 0.6)
        .attr("opacity",0.3);

right.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", halfWidth)
        .attr("height",Projection_height)
        .attr("fill",'none' )
        .attr("stroke-width",2)
        .attr("stroke", "#80b1d3")
        .attr("stroke-opacity", 0.6); 

right.append("path")
        .attr("d", "M "+(halfWidth+1)+",-8 H "+(halfWidth-100)+" L "+(halfWidth-110)+",-0.8 v 13.2 h "+(110+1)+" z")
        .attr("fill",'#80b1d3' )
        .attr("stroke", "none")
        .attr("stroke-opacity", 0.3); 

right.append("text")
        .attr("x", halfWidth-105)
        .attr("y", 5)
        .attr("font-family","Calibri")
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("font-weight","bold")
        .style('fill', '#162e3e')
        .text("Counterfactual View"); 


function DrawPoints(svgName,data, MyxScale,MyyScale,xname,yname){
    //---------------------------   JUST PLAYING With Variables
    let atribute ="GPA";//"IDH_PROCEDENCIA"; //NUM_COD_ALUMNO
    var ScaleNotas = d3.scaleLinear().range([1,8]).domain(d3.extent(DropoutStudents,d=>d[atribute]))
    //---------------------------   END JUST PLAYING with variables
    d3.select('#textYaxis').remove();
    d3.select('#textXaxis').remove();
    //....... remove elements.........

    //................................
    //svgName.selectAll("circle").remove();
    svgName.selectAll(".xAxis").remove();
	var circles = svgName.selectAll("circle")
        .data(data)
        .join("circle")
            .attr("id",d => d[Id_Student])
            .attr("fill", '#8dd3c7')
            .attr('stroke',function(d){if(selectedDots.indexOf(d[Id_Student].toString())>=0){return '#fb8072';}else{return "#379081"}})
            .attr("fill-opacity",0.9)
            .attr("r",  4)//d=>ScaleNotas(GetValue(d[Id_Student], atribute))) //PONDERADO
            .on("mouseover", function (event, d) {		
                if(selectedDots.length>0){
                    right.selectAll("circle").attr("fill-opacity",0.2).attr("r",3);
                    let temporal = Contrafactuales.filter(function(e){return selectedDots.indexOf(e[Id_Student].toString())>=0});
                    let seleccionados = temporal.filter(function(f){return d[Id_Student] == f[Id_Student].toString()});
                    seleccionados.forEach(function(f){ right.select('[id="'+f[Id_Counterfactual]+'"]').attr("fill-opacity",0.9).attr("r",8);; });
                }
            })				
            .on("mouseout", function(event, d) {		
                right.selectAll("circle").attr("fill-opacity",0.7).attr("r",4);
            })
           
    TemporalTEST = data.map(d=>d[Id_Student].toString());
    A = DropoutStudents.filter(d => d.GPA>=13);
    TemporalTEST = A.map(d=>d.ID.toString());


    circles.transition()
	    .duration(1000)
        .attr("cx", d => MyxScale(d[xname]))
        .attr("cy", d => MyyScale(d[yname].toString()));
    /*********************** LASSO SELECT ************************************/
    // Lasso functions
    var lasso_start = function() {

        lasso.items()
            .classed("not_possible",true)
            .classed("selected",false);
    };
    
    var lasso_draw = function() {     
        lasso.possibleItems()
            .classed("not_possible",false)
            .classed("possible",true);
        lasso.notPossibleItems()
            .classed("not_possible",true)
            .classed("possible",false);

    };
    
    function lasso_end() {
    	 // Reset the color of all dots
        lasso.items()
            .classed("not_possible",false)
            .classed("possible",false);

        // Style the selected dots
        lasso.selectedItems()
            .classed("selected",true)
            .attr("stroke",'#fb8072');

        // Reset the style of the not selected dots
        lasso.notSelectedItems()
            .attr("stroke",'#379081');

        selectedDots  = lasso.selectedItems()._groups[0].map(d=>d.id);
        GetArrayAndDraw(); 
    };

    

    lasso = d3.lasso()
            .closePathSelect(true)
            .closePathDistance(100)
            .items(circles)
            .targetArea(svgName)
            .on("start",lasso_start)
            .on("draw",lasso_draw)
            .on("end",lasso_end);

    svgName.call(lasso);

    var x_axis = d3.axisBottom().scale(MyxScale);

    //Append group and insert axis
    svgName.append("g")
        .attr('class', 'axis xAxis')
        .attr("transform", "translate("+0+", "+(Projection_height+1)+")")
        .call(x_axis)
        .selectAll("text")
            .style("font-size",'8px')
            .style("fill", "#162e3e")
        .selectAll("line").style("stroke","#162e3e");

    svgName.append("text")  
        .attr('id','textXaxis')    
        .style("font-size",'8px')       
        .attr("x", halfWidth/2 )
        .attr("y",  (Projection_height+25) )
        .style("text-anchor", "middle")
        .text("Probability");

    let texto = document.getElementById('yAxisCombo').value;
    svgName.append("text")
        .attr('id','textYaxis')
        .style("font-size",'10px')
        .attr("transform", "rotate(-90)")
        .attr("y",0)
        .attr("x",-(Projection_height/2))
        .style("text-anchor", "middle")
        .text(texto); 

	
}


function DrawRigthPoints(svgName,data, MyxScale,MyyScale,xname,yname){
    svgName.selectAll(".xAxis").remove();
	if(selectedDots.length > 0){
		var circles_Right = svgName.selectAll("circle")
	        .data(data)
	        .join("circle")
	            .attr("id",d => d[Id_Counterfactual])
	            .attr("fill", '#fb8072')
				.attr('stroke',function(d){	if(selectedContrafactuales.indexOf(d[Id_Counterfactual].toString())>=0){return '#fb8072';}else{return "darkred"	}})
	            .attr("fill-opacity",0.9)
	            .attr("r",  4);
        
        circles_Right.transition()
                .duration(1000)
                .attr("cx", d => MyxScale(d[xname])  )
                .attr("cy", d =>  MyyScale(d[yname].toString()))

	    //*********************** LASSO SELECT ************************************
		// Lasso functions
		var lasso_start_Right = function() {
		    lasso_Right.items()
		        .classed("not_possible",true)
		        .classed("selected",false);
		};
		
		var lasso_draw_Right = function() {     
		    lasso_Right.possibleItems()
		        .classed("not_possible",false)
		        .classed("possible",true);
		    lasso_Right.notPossibleItems()
		        .classed("not_possible",true)
		        .classed("possible",false);
		};
		
		function lasso_end_Right() {
			// Reset the color of all dots
		    lasso_Right.items()
		        .classed("not_possible",false)
		        .classed("possible",false);

		    // Style the selected dots
		    lasso_Right.selectedItems()
		        .classed("selected",true)
		        .attr("stroke",'#fb8072');

		    // Reset the style of the not selected dots
		    lasso_Right.notSelectedItems()
		        .attr("stroke",'darkred');

		    selectedContrafactuales = lasso_Right.selectedItems()._groups[0].map(d=>d.id);
		    drawRowView(selectedContrafactuales);
		};

		lasso_Right = d3.lasso()
		        .closePathSelect(true)
		        .closePathDistance(100)
		        .items(circles_Right)
		        .targetArea(svgName)
		        .on("start",lasso_start_Right)
		        .on("draw",lasso_draw_Right)
		        .on("end",lasso_end_Right);

		svgName.call(lasso_Right); 

        var x_axis = d3.axisBottom()
                   .scale(MyxScale);

        //if(document.getElementById('left-ProbabilidadFeasibility').checked || document.getElementById('left-ProbabilidadFactibility').checked){
        svgName.append("g")
        .attr('class', 'axis xAxis')
           .attr("transform", "translate("+(0)+", "+(Projection_height+1)+")")
           .call(x_axis)
            .selectAll("text")
                .style("font-size",'10px')  
                .style("fill","#162e3e")
            .selectAll("line").style("stroke","#162e3e");
       //}
       svgName.append("text")  
        .attr('id','textXaxis')    
        .style("font-size",'8px')       
        .attr("x", halfWidth/2 )
        .attr("y",  (Projection_height+25) )
        .style("text-anchor", "middle")
        .text("Probability");   
			    	
    }else{
    	svgName.selectAll("circle").remove();
    }
}

function DrawProjection(){
	var circles = svgCircle.selectAll("circle")
        .data(dataset)
        .join("circle")
            .attr("id",d => d[Id_Student])
            .attr("fill", 'green')
            .attr('stroke','white')
            .attr("fill-opacity",0.7)
            .transition()
    .delay(function(d,i){return(i*3)})
    .duration(1000)
            .attr("cx", d => xScale(d.x)  )
            .attr("cy", d => yScale(d.y) )
            .attr("r",  d => 5);

}


function start(){
    
     $.ajax({
            url: '/Iniciar',
            data:{},
            //data: $('form').serialize(),
            type: 'POST',
            success: function(response){
                console.log(response)
            },
            error: function(error){
                console.log(error);
            }
        });
}

/*
function Modificacion(){
	cambios ={'CREDITOS':2,'Q3_Electivo_S':10};
	 $.ajax({
            url: '/EjecutarCambios',
            data:{'cambios':JSON.stringify(cambios)},
            //data: $('form').serialize(),
            type: 'POST',
            success: function(response){
            	response =JSON.parse(response);


            	DropoutStudents = response.DropoutStudents;
				ProbabilidadesMain = response.ProbabilidadesMain;
				Contrafactuales = response.Contrafactuales;
				ProbabilidadesContrafactuales = response.ProbabilidadesContrafactuales;

                miradio=3;

				Scalas= {'leftProbFeasi':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.prob_1)),
									     'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.Feasibility))
									 },
                         'leftProbFacti':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.prob_1)),
                                     'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.Factibility))
                         },
						 'leftUMAP':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.x)),
						 			 'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.y))
						 			},
						 'rightProbFeasi':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.prob_1)),
						 			  'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.Feasibility))
						 			 },
                         'rightProbFacti':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.prob_1)),
                                           'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.Factibility))
                          },            
						 'rightUMAP':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.x)),
						 			  'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.y))
						 			}
                         
						};		

				ProbabilidadesContrafactuales.forEach(function(d,i){
					//d['index'] = i;
					//Contrafactuales[i]['index'] = i;
                    d[Id_Student] = d[Id_Student].toString();
                    Contrafactuales[i][Id_Student] = Contrafactuales[i][Id_Student].toString();
				});
				DrawPoints(left,ProbabilidadesMain,Scalas.leftProbFeasi.xScale,Scalas.leftProbFeasi.yScale,'prob_1','Feasibility');
            },
            error: function(error){
                console.log(error);
            }
        });
} */


function Modificacion(){
	cambios ={'CREDITOS':2,'Q3_Electivo_S':10};
	$.ajax({
        url: '/EjecutarCambios',
        data:{'cambios':JSON.stringify(cambios)},
        //data: $('form').serialize(),
        type: 'POST',
        success: function(response){
        	response =JSON.parse(response);


        	DropoutStudents = response.DropoutStudents;
			ProbabilidadesMain = response.ProbabilidadesMain;
			Contrafactuales = response.Contrafactuales;
			ProbabilidadesContrafactuales = response.ProbabilidadesContrafactuales;

            miradio=3;

			let TemporalProbabilidadMain = ProbabilidadesMain.slice().sort((a, b) => d3.descending(a.prob_1, b.prob_1)).map(d=>d[Id_Student].toString());
            let TemporalFeasibilityMain = ProbabilidadesMain.slice().sort((a, b) => d3.descending(a.Feasibility, b.Feasibility)).map(d=>d[Id_Student].toString());
            let TemporalFactibilityMain = ProbabilidadesMain.slice().sort((a, b) => d3.descending(a.Factibility, b.Factibility)).map(d=>d[Id_Student].toString());

            let xScaleTemporalMain = d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.prob_1));
            let xScaleTemporalSynthetic = d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.prob_1));
	
            Scalas= {'leftProb':{'xScale': xScaleTemporalMain,
                                'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalProbabilidadMain)
                                },
                    'leftFeasi':{'xScale': xScaleTemporalMain,
                                'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFeasibilityMain)
                                },
                    'leftFacti':{'xScale': xScaleTemporalMain,
                                'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFactibilityMain)
                                },
                    'leftUMAP':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.x)),
                                'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.y))
                                },

                    
                    'rightProb':{'xScale': xScaleTemporalSynthetic,
                                'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalProbabilidadMain)
                                },
                    'rightFeasi':{'xScale': xScaleTemporalSynthetic,
                                    'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFeasibilityMain)
                    }, 
                    'rightFacti':{'xScale': xScaleTemporalSynthetic,
                                    'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFactibilityMain)
                    },             
                    'rightUMAP':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.x)),
                                'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.y))
                            
                                }
                    
            };		

        ProbabilidadesContrafactuales.forEach(function(d,i){
            d[Id_Student] = d[Id_Student].toString();
            Contrafactuales[i][Id_Student] = Contrafactuales[i][Id_Student].toString();
        });
	
        DrawPoints(left,ProbabilidadesMain,Scalas.leftProb.xScale,Scalas.leftProb.yScale,'prob_1',Id_Student);
    },
    error: function(error){
        console.log(error);
    }
    });
}

/*
d3.json("https://raw.githubusercontent.com/germaingarcia/Datasets/main/projectionNew.json")
.then((response) => {
    DropoutStudents = response.DropoutStudents;
	ProbabilidadesMain = response.ProbabilidadesMain;
	Contrafactuales = response.Contrafactuales;
	ProbabilidadesContrafactuales = response.ProbabilidadesContrafactuales;

	miradio=5;

    let TemporalProbabilidadMain = ProbabilidadesMain.slice().sort((a, b) => d3.descending(a.prob_1, b.prob_1)).map(d=>d[Id_Student].toString());
    let TemporalFeasibilityMain = ProbabilidadesMain.slice().sort((a, b) => d3.descending(a.Feasibility, b.Feasibility)).map(d=>d[Id_Student].toString());
    let TemporalFactibilityMain = ProbabilidadesMain.slice().sort((a, b) => d3.descending(a.Factibility, b.Factibility)).map(d=>d[Id_Student].toString());

    let xScaleTemporalMain = d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.prob_1));
    let xScaleTemporalSynthetic = d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.prob_1));
	
    Scalas= {'leftProb':{'xScale': xScaleTemporalMain,
                         'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalProbabilidadMain)
						 },
             'leftFeasi':{'xScale': xScaleTemporalMain,
                         'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFeasibilityMain)
                         },
             'leftFacti':{'xScale': xScaleTemporalMain,
                         'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFactibilityMain)
                         },
			 'leftUMAP':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesMain,d=>d.x)),
                          'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.y))
			 			},

            
			 'rightProb':{'xScale': xScaleTemporalSynthetic,
                           'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalProbabilidadMain)
			 			 },
             'rightFeasi':{'xScale': xScaleTemporalSynthetic,
                            'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFeasibilityMain)
              }, 
              'rightFacti':{'xScale': xScaleTemporalSynthetic,
                              'yScale': d3.scaleBand().range([ miradio,Projection_height-miradio]).domain(TemporalFactibilityMain)
              },             
			 'rightUMAP':{'xScale': d3.scaleLinear().range([ miradio, halfWidth-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.x)),
			 			  'yScale': d3.scaleLinear().range([ miradio, Projection_height-miradio]).domain(d3.extent(ProbabilidadesContrafactuales,d=>d.y))
                      
			 			}
             
			};		

	ProbabilidadesContrafactuales.forEach(function(d,i){
					//d['index'] = i;
					//Contrafactuales[i]['index'] = i;
                    d[Id_Student] = d[Id_Student].toString();
                    Contrafactuales[i][Id_Student] = Contrafactuales[i][Id_Student].toString();
				});
	DrawPoints(left,ProbabilidadesMain,Scalas.leftProb.xScale,Scalas.leftProb.yScale,'prob_1',Id_Student);
});
*/

function handleClickLeftCombo(combo){
    if(ProbabilidadesMain.length >0){
        if(combo.value=='probability'){
            DrawPoints(left,ProbabilidadesMain,Scalas.leftProb.xScale,Scalas.leftProb.yScale,'prob_1',Id_Student);
        }else{
            if(combo.value =='feasebility'){
                DrawPoints(left,ProbabilidadesMain,Scalas.leftFeasi.xScale,Scalas.leftFeasi.yScale,'prob_1',Id_Student);
            }else{
                DrawPoints(left,ProbabilidadesMain,Scalas.leftFacti.xScale,Scalas.leftFacti.yScale,'prob_1',Id_Student);
            }
        }
        GetArrayAndDraw();  
    }
}

function handleClickLeft(myRadio) {
    if(ProbabilidadesMain.length >0){
        if(myRadio.value =='ProbabilidadFeasibility'){
            //DrawPoints(left,ProbabilidadesMain,Scalas.leftProb.xScale,Scalas.leftProb.yScale,'prob_1','y');
            DrawPoints(left,ProbabilidadesMain,Scalas.leftProbFeasi.xScale,Scalas.leftProbFeasi.yScale,'prob_1','Feasibility');
        }else{
            if(myRadio.value =='ProbabilidadFactibility' ){
                DrawPoints(left,ProbabilidadesMain,Scalas.leftProbFacti.xScale,Scalas.leftProbFacti.yScale,'Feasibility','Factibility');
            }else{
                DrawPoints(left,ProbabilidadesMain,Scalas.leftUMAP.xScale,Scalas.leftUMAP.yScale,'Factibility','y');
            }
        }
        GetArrayAndDraw();
    }
}

function GetArrayAndDraw(){
    d3.select('#right-ProbabilidadFactibility').selectAll("circle").remove();

	var Filtrados = ProbabilidadesContrafactuales.filter(function(d){return selectedDots.indexOf(d[Id_Student].toString())>=0; });
	//DrawContrafactuales();
    let valueCombo=document.getElementById('yAxisCombo').value;
	if (valueCombo =='probability'){
		DrawRigthPoints(right,Filtrados,Scalas.rightProb.xScale,Scalas.rightProb.yScale,'prob_1',Id_Student);
	}else{
        if(valueCombo =='feasebility'){
		    DrawRigthPoints(right,Filtrados,Scalas.rightFeasi.xScale,Scalas.rightFeasi.yScale,'prob_1',Id_Student);
        }else{
            //DrawRigthPoints(right,Filtrados,Scalas.rightUMAP.xScale,Scalas.rightUMAP.yScale,'prob_1',Id_Student);
            DrawRigthPoints(right,Filtrados,Scalas.rightFacti.xScale,Scalas.rightFacti.yScale,'prob_1',Id_Student);
        }
	}
}

function handleClickRight(myRadio){
	GetArrayAndDraw();
}

function GetValue(COD_PERSONA,atributo){
    let Alumno = DropoutStudents.filter(function(d){return d[Id_Student] ==COD_PERSONA});
    return Alumno[0][atributo];
}


function GetTEST(){
    selectedDots = TemporalTEST;
    GetArrayAndDraw(); 
}