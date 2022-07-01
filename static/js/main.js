//-------------------------------------------------------------- SPIN -----------------
let opts = {
    lines: 13,
    length: 10,
    width: 10,
    radius: 20,
    scale: 1,
    corners: 1,
    color: '#fb8072',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    className: 'spinner',
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute',
   },
target = document.getElementById('spinner'),
spinner = new Spinner(opts).spin(target);
spinner.stop();
//-------------------------------------------------------------- SPIN -----------------
function main(){
    let NumberContrafactuals = document.getElementById("NContrafactuals").value;
    let selectedModel = document.getElementById("modelS").value;
    //if(FileName != ""){
        spinner.spin(target);
        $.ajax({
            url: '/Iniciar',
            data:{'dataset':document.getElementById("file-selector").files[0].name,'numberc':NumberContrafactuals,'model':selectedModel},
            //data: $('form').serialize(),
            type: 'POST',
            success: function(response){
                let a = JSON.parse(response);
                DropoutStudents = JSON.parse(a['students']);
                Columns =a['Columns'].split(',');
                Numerical =a['Numericos'].split(',');
                Categorical = a['Categoricos'].split(',');
                //Preprocesamiento de las columnas
                ProcesarColumnas(Columns);
                

                drawBarchars('IntvsProb');
                DrawTable(DropoutStudents);

                spinner.stop();
                //AddColumnsNames('IntvsProb3');
            },
            error: function(error){
                console.log(error);
            }
        });
    //}
}


function ProcesarColumnas(Columns){
    ColumnsDicArray=[];
    Columns.forEach(function(d){
        if(d !='Dropout'){
            let type = 'Numerical';
            //ColumnsDicArray.push({'name':d})
            if(Categorical.indexOf(d)>=0){
                let categories = new Set();
                DropoutStudents.forEach(function(a){categories.add(a[d]);});
                type = 'Categorical';
                ColumnsDicArray.push({'name':d,'type':'Categorical','Categories': Array.from(categories)})
            }else{
                let extent = d3.extent(DropoutStudents, g => g[d])
                ColumnsDicArray.push({'name':d,'type':'Numerical','extent': extent})
            }
        }  
    });
}


$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
});

function SearchButton(){
    var param = document.getElementById('search_param').value;
	var term = document.getElementById('search_term').value;

    left.selectAll("circle").attr("r", 5);
    right.selectAll("circle").attr("r", 5);
    BuscarSegunTerminoParametro(param,term);
    
}

function intersect(a, b) {
    var setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
}
  
function BuscarSegunTerminoParametro(param,term){
    let SelectedLeft = [];
    DropoutStudents.forEach(function(d){if(d[param]==term){SelectedLeft.push(d[Id_Student])}});

    let selectedRight = [];
    Contrafactuales.forEach(function(d){
        if(d[param]==term){
            selectedRight.push(d.index)
        };
    });

    //let getIntersection = intersect(selectedRight,selectedDots);

    //vamos a cambiar tamaño de los afectados
    SelectedLeft.forEach(element => {
        //right.selectAll("#ID"+element).attr('r',7);
        left.select('[id="'+element+'"]').attr('r',8).attr("rx", 0).attr("ry", 0);
    });

    selectedRight.forEach(element => {
        //left.selectAll("#ID"+element).attr('r',7);
        right.select('[id="'+element+'"]').attr('r',8).attr("rx", 0).attr("ry", 0);
    });


}

