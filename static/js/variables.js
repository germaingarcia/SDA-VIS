  //
  var groupCounter=1;
  var SelectedGroups ={};
  var rows_selected = [];

  var TemporalTEST = [];
  //Identificadores
  const Id_Student = 'ID';
  const Id_Counterfactual ='idc'
  const Id_Target = 'Enrolled'

  const PageHeight = window.innerHeight - 55;
  const pageWidth = window.innerWidth -152;//window.innerWidth - 140;
  const containerHeigh = PageHeight-8;
  var Columns =[];
  var ColumnsDicArray =[];
  var Numerical =[];
  var Categorical = [];
  
  var XVariableLinearScale ={};
  var AuxVariableLinearScale ={};
  //variables que almacenaran todos los dtoa
  var DropoutStudents = [],
      ProbabilidadesMain = [],
      Contrafactuales = [],
      ProbabilidadesContrafactuales =[],
      selectedDots=[],
      selectedContrafactuales = [];

  var CheckBoxs = {};

  var SyntheticCheckBoxs ={};

  const laterales = 250;
  const MedioTodos = (pageWidth - 2*laterales)/2.0;
  const ElMedio = pageWidth/2+17;

  const OtroLateral = pageWidth - (laterales+ElMedio);
  
  document.getElementById("First_ScatterPlot").style.width = (ElMedio)+"px"

  document.getElementById("IntvsProb").style.width = (laterales)+"px";
  document.getElementById("GrafoContainer").style.height = (containerHeigh/2)+"px";
  document.getElementById("GrafoContainer").style.width = (ElMedio+15)+"px";


  document.getElementById("GrafoContainer").style.marginLeft   = (laterales+3)+"px";
  document.getElementById("intproContainer2").style.marginLeft = (laterales+3)+"px";
  document.getElementById("intproContainer3").style.marginLeft = (ElMedio+laterales+21)+"px";
  document.getElementById("intproContainer3").style.marginTop  = -(containerHeigh/2)+"px";

  document.getElementById("intproContainer2").style.height = (containerHeigh/2 - 5)+"px";
  document.getElementById("intproContainer2").style.width = (ElMedio+15)+"px";


  document.getElementById("intproContainer3").style.width = (pageWidth-(ElMedio+15+laterales)-8)+"px";
  document.getElementById("intproContainer3").style.height =  (containerHeigh-2) + "px";

  document.getElementById("tableDiv").style.height = (containerHeigh/2)-10+"px";
  document.getElementById("bottomID").style.height = (containerHeigh/2)+"px";
  document.getElementById("selectorDiv").style.height = (containerHeigh/2)+"px";

  document.getElementById("divContainer").style.height = (containerHeigh/2 -100)+"px";

  var FileName = "";
  var openFile = function() {
      FileName = document.getElementById("file-selector").value;
  };