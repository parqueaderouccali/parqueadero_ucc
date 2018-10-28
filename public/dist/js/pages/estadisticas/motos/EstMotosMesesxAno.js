// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var dbEstadisticas = firebase.database().ref('estadisticas/logMotos/');

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
            $(location).attr('href', '../../../index.html');
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
   
  var graficaEstadisticaMotos = function ( 
    contIngresoEnero, contIngresoFebrero, contIngresoMarzo, contIngresoAbril, contIngresoMayo, contIngresoJunio, contIngresoJulio, contIngresoAgosto, contIngresoSeptiembre, contIngresoOctubre, contIngresoNoviembre, contIngresoDiciembre,
    contSalidaEnero, contSalidaFebrero, contSalidaMarzo, contSalidaAbril, contSalidaMayo, contSalidaJunio, contSalidaJulio, contSalidaAgosto, contSalidaSeptiembre, contSalidaOctubre, contSalidaNoviembre, contSalidaDiciembre
) {
    
    var areaChartData = {
        labels  : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [          
            {
                label               : 'Ingresos',
                fillColor           : '#00A65A',
                strokeColor         : '#00A65A',
                pointColor          : '#00A65A',
                pointStrokeColor    : '#00A65A',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: '#00A65A',
                data                : [contIngresoEnero, contIngresoFebrero, contIngresoMarzo, contIngresoAbril, contIngresoMayo, contIngresoJunio, contIngresoJulio, contIngresoAgosto, contIngresoSeptiembre, contIngresoOctubre, contIngresoNoviembre, contIngresoDiciembre]
            },
            {
                label               : 'Salidas',
                fillColor           : '#00A65A',
                strokeColor         : '#00A65A',
                pointColor          : '#00A65A',
                pointStrokeColor    : '#00A65A',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: '#00A65A',
                data                : [contSalidaEnero, contSalidaFebrero, contSalidaMarzo, contSalidaAbril, contSalidaMayo, contSalidaJunio, contSalidaJulio, contSalidaAgosto, contSalidaSeptiembre, contSalidaOctubre, contSalidaNoviembre, contSalidaDiciembre]
          }
          
        ]
      }


    var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
    var barChart                         = new Chart(barChartCanvas)
    var barChartData                     = areaChartData
    barChartData.datasets[1].fillColor   = '#D11D1D'
    barChartData.datasets[1].strokeColor = '#D11D1D'
    barChartData.datasets[1].pointColor  = '#D11D1D'
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

  graficaEstadisticaMotos();



// carga la informacion de la cantidad de veces que se carque la infomracion

$(document).on('change', '#ano_fecha', function(event) {
   var valueSelectAno = $("#ano_fecha option:selected").text();
  
   dbEstadisticas.on('value', function (snapshot) {

    
    var contIngresoEnero = 0, contIngresoFebrero = 0, contIngresoMarzo = 0, contIngresoAbril = 0, contIngresoMayo = 0, contIngresoJunio = 0, contIngresoJulio = 0, contIngresoAgosto = 0, contIngresoSeptiembre = 0, contIngresoOctubre = 0, contIngresoNoviembre = 0, contIngresoDiciembre = 0;
    var contSalidaEnero = 0, contSalidaFebrero = 0, contSalidaMarzo = 0, contSalidaAbril = 0, contSalidaMayo = 0, contSalidaJunio = 0, contSalidaJulio = 0, contSalidaAgosto = 0, contSalidaSeptiembre = 0, contSalidaOctubre = 0, contSalidaNoviembre = 0, contSalidaDiciembre = 0;
    
    var datos = snapshot.val();    
    
    for(dato in datos){
        
        if(datos[dato].fecha_ano == valueSelectAno){ 
            
            switch (datos[dato].fecha_mes) {
                case 1:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoEnero = contIngresoEnero + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaEnero = contSalidaEnero + 1;
                    }
                           
                    break;
                case 2:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoFebrero = contIngresoFebrero + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaFebrero = contSalidaFebrero + 1;
                    }
                            
                    break;
                case 3:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoMarzo = contIngresoMarzo + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaMarzo = contSalidaMarzo + 1;
                    }

                    break;
                case 4:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoAbril = contIngresoAbril + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaAbril = contSalidaAbril + 1;
                    }
        
                    break;
                case 5:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoMayo = contIngresoMayo + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaMayo = contSalidaMayo + 1;
                    }
  
                    break;
                case 6:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoJunio = contIngresoJunio + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaJunio = contSalidaJunio + 1;
                    }
        
                    break;
                case 7:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoJulio = contIngresoJulio + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaJulio = contSalidaJulio + 1;
                    }

                    break;
                case 8:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoAgosto = contIngresoAgosto + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaAgosto = contSalidaAgosto + 1;
                    }

                    break;
                case 9:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoSeptiembre = contIngresoSeptiembre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaSeptiembre = contSalidaSeptiembre + 1;
                    }

                    break;
                case 10:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoOctubre = contIngresoOctubre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaOctubre = contSalidaOctubre + 1;
                    }

                    break;
                case 11:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoNoviembre = contIngresoNoviembre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaNoviembre = contSalidaNoviembre + 1;
                    }
        
                    break;
                case 12:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoDiciembre = contIngresoDiciembre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaDiciembre = contSalidaDiciembre + 1;
                    }
        
                    break;
            }            
        }

    }
        
    graficaEstadisticaMotos(contIngresoEnero, contIngresoFebrero, contIngresoMarzo, contIngresoAbril, contIngresoMayo, contIngresoJunio, contIngresoJulio, contIngresoAgosto, contIngresoSeptiembre, contIngresoOctubre, contIngresoNoviembre, contIngresoDiciembre,
        contSalidaEnero, contSalidaFebrero, contSalidaMarzo, contSalidaAbril, contSalidaMayo, contSalidaJunio, contSalidaJulio, contSalidaAgosto, contSalidaSeptiembre, contSalidaOctubre, contSalidaNoviembre, contSalidaDiciembre)
    
}, function (error) {
    console.log(error);
});

});



})

getUser();