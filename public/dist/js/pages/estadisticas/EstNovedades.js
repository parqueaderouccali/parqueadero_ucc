// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var dbEstadisticas = firebase.database().ref('estadisticas/logNovedades/');

// inspecciona si un usuario esta logeado o no
var getUser = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            db.equalTo(user.uid).on('value', function (snapshot) {

                var nombreUsuario = snapshot.val();

                for (nombre in nombreUsuario) {
                    console.log(nombreUsuario[nombre].nombre)
                }


            }, function (error) {
                console.log(error);
            })


            db.on('value', function (snapshot) {

                var nombreUsuario = snapshot.val();
                console.log(user.uid)

                for (nombre in nombreUsuario) {

                    if (user.uid === nombreUsuario[nombre].uid) {
                        console.log(nombreUsuario[nombre].nombre + ' ' + nombreUsuario[nombre].apellido)
                        $('.nombresApellidos').html(' ' + nombreUsuario[nombre].nombre + ' ' + nombreUsuario[nombre].apellido)
                    }

                }

            }, function (error) {
                console.log(error);
            })


        } else {
            $(location).attr('href', '../../index.html');
        }
    })
}

// cierra la session de un usuario activo
var logout = function () {

    firebase.auth().signOut()
        .then(function () {
            console.log('Sesión Finalizada')
            $(location).attr('href', '../../../index.html');
        }, function (error) {
            console.log(error);
        })

}

// carga de figuras
$(function () {
   
  var graficaEstadisticaNovedades = function ( 
    contEnero, contFebrero, contMarzo, contAbril, contMayo, contJunio, contJulio, contAgosto, contSeptiembre, contOctubre, contNoviembre, contDiciembre
) {
    
    var areaChartData = {
        labels  : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [          
            {
                label               : 'Novedades',
                fillColor           : '#00A65A',
                strokeColor         : '#00A65A',
                pointColor          : '#00A65A',
                pointStrokeColor    : '#00A65A',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: '#00A65A',
                data                : [contEnero, contFebrero, contMarzo, contAbril, contMayo, contJunio, contJulio, contAgosto, contSeptiembre, contOctubre, contNoviembre, contDiciembre]
            }          
        ]
      }

    var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
    var barChart                         = new Chart(barChartCanvas)
    var barChartData                     = areaChartData
    var barChartOptions                  = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero        : true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines      : true,
      //String - Colour of the grid lines
      scaleGridLineColor      : 'rgba(0,0,0,.05)',
      //Number - Width of the grid lines
      scaleGridLineWidth      : 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines  : true,
      //Boolean - If there is a stroke on each bar
      barShowStroke           : true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth          : 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing         : 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing       : 1,
      //String - A legend template
      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      //Boolean - whether to make the chart responsive
      responsive              : true,
      maintainAspectRatio     : true
    }

    barChartOptions.datasetFill = false
    barChart.Bar(barChartData, barChartOptions)
    
  }

  graficaEstadisticaNovedades();



// carga la informacion de la cantidad de veces que se carque la infomracion

$(document).on('change', '#ano_fecha', function(event) {
   var valueSelectAno = $("#ano_fecha option:selected").text();
  console.log(valueSelectAno)
   dbEstadisticas.on('value', function (snapshot) {
    
    var contEnero = 0, contFebrero = 0, contMarzo = 0, contAbril = 0, contMayo = 0, contJunio = 0, contJulio = 0, contAgosto = 0, contSeptiembre = 0, contOctubre = 0, contNoviembre = 0, contDiciembre = 0;    
    
    var datos = snapshot.val();    
    
    for(dato in datos){
        
        if(datos[dato].fecha_ano == valueSelectAno){ 
            
            switch (datos[dato].fecha_mes) {
                case 1:
                        contEnero = contEnero + 1;                               
                    break;
                case 2:            
                        contFebrero = contFebrero + 1;                            
                    break;
                case 3:
                        contMarzo = contMarzo + 1;
                    break;
                case 4:
                        contAbril = contAbril + 1;
                    break;
                case 5:                    
                        contMayo = contMayo + 1; 
                    break;
                case 6:
                        contJunio = contJunio + 1;
                    break;
                case 7:                   
                        contJulio = contJulio + 1;
                    break;
                case 8:
                        contAgosto = contAgosto + 1;
                    break;
                case 9:
                        contSeptiembre = contSeptiembre + 1;
                    break;
                case 10:
                        contOctubre = contOctubre + 1;
                    break;
                case 11:
                        contNoviembre = contNoviembre + 1;
                    break;
                case 12:
                        contDiciembre = contDiciembre + 1;
                    break;
            }            
        }
        console.log(contOctubre)

    }
        
    graficaEstadisticaNovedades(contEnero, contFebrero, contMarzo, contAbril, contMayo, contJunio, contJulio, contAgosto, contSeptiembre, contOctubre, contNoviembre, contDiciembre)
    
}, function (error) {
    console.log(error);
});

});



})

getUser();