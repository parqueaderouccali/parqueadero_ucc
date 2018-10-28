// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var dbEstadisticas = firebase.database().ref('estadisticas/logCarros/');

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
   
  var graficaEstadisticaCarros = function (contIngresoEnero, contSalidaEnero, contDisponibleEnero, contInhabilitadoEnero,
    contIngresoFebrero, contSalidaFebrero, contDisponibleFebrero, contInhabilitadoFebrero,
    contIngresoMarzo, contSalidaMarzo, contDisponibleMarzo, contInhabilitadoMarzo,
    contIngresoAbril, contSalidaAbril, contDisponibleAbril, contInhabilitadoAbril,
    contIngresoMayo, contSalidaMayo, contDisponibleMayo, contInhabilitadoMayo,
    contIngresoJunio, contSalidaJunio, contDisponibleJunio, contInhabilitadoJunio,
    contIngresoJulio, contSalidaJulio, contDisponibleJulio, contInhabilitadoJulio,
    contIngresoAgosto, contSalidaAgosto, contDisponibleAgosto, contInhabilitadoAgosto,
    contIngresoSeptiembre, contSalidaSeptiembre, contDisponibleSeptiembre, contInhabilitadoSeptiembre,
    contIngresoOctubre, contSalidaOctubre, contDisponibleOctubre, contInhabilitadoOctubre,
    contIngresoNoviembre, contSalidaNoviembre, contDisponibleNoviembre, contInhabilitadoNoviembre,
    contIngresoDiciembre, contSalidaDiciembre, contDisponibleDiciembre, contInhabilitadoDiciembre
) {
    
    var areaChartData = {
        labels  : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [
          {
            label               : 'Inhabilitados',
            fillColor           : 'rgba(210, 214, 222, 1)',
            strokeColor         : 'rgba(210, 214, 222, 1)',
            pointColor          : 'prueba',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(210, 214, 222, 1)',
            data                : [contInhabilitadoEnero, contInhabilitadoFebrero, contInhabilitadoMarzo, contInhabilitadoAbril, contInhabilitadoMayo, contInhabilitadoJunio, contInhabilitadoJulio, contInhabilitadoAgosto, contInhabilitadoSeptiembre, contInhabilitadoOctubre, contInhabilitadoNoviembre, contInhabilitadoDiciembre]
          },
          {
            label               : 'Habilitados',
            fillColor           : 'rgb(0, 166, 90)',
            strokeColor         : 'rgb(0, 166, 90)',
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgb(0, 166, 90)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgb(0, 166, 90)',
            data                : [contDisponibleEnero, contDisponibleFebrero, contDisponibleMarzo, contDisponibleAbril, contDisponibleMayo, contDisponibleJunio, contDisponibleJulio, contDisponibleAgosto, contDisponibleSeptiembre, contDisponibleOctubre, contDisponibleNoviembre, contDisponibleDiciembre]
          },
          {
            label               : 'Salidas',
            fillColor           : 'rgba(209,29,29,0.9)',
            strokeColor         : 'rgba(209,29,29,0.8)',
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(209,29,29,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(209,29,29,1)',
            data                : [contSalidaEnero, contSalidaFebrero, contSalidaMarzo, contSalidaAbril, contSalidaMayo, contSalidaJunio, contSalidaJulio, contSalidaAgosto, contSalidaSeptiembre, contSalidaOctubre, contSalidaNoviembre, contSalidaDiciembre]
          },
          {
            label               : 'Ingresos',
            fillColor           : 'rgba(60,141,188,0.9)',
            strokeColor         : 'rgba(60,141,188,0.8)',
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [contIngresoEnero, contIngresoFebrero, contIngresoMarzo, contIngresoAbril, contIngresoMayo, contIngresoJunio, contIngresoJulio, contIngresoAgosto, contIngresoSeptiembre, contIngresoOctubre, contIngresoNoviembre, contIngresoDiciembre]
          }
        ]
      }


    var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
    var barChart                         = new Chart(barChartCanvas)
    var barChartData                     = areaChartData
    barChartData.datasets[1].fillColor   = '#00a65a'
    barChartData.datasets[1].strokeColor = '#00a65a'
    barChartData.datasets[1].pointColor  = '#00a65a'
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

  graficaEstadisticaCarros();



// carga la informacion de la cantidad de veces que se carque la infomracion

$(document).on('change', '#ano_fecha', function(event) {
   var valueSelectAno = $("#ano_fecha option:selected").text();
  
   dbEstadisticas.on('value', function (snapshot) {

    var contIngresoEnero = 0, contSalidaEnero = 0, contDisponibleEnero = 0, contInhabilitadoEnero = 0;
    var contIngresoFebrero = 0, contSalidaFebrero = 0, contDisponibleFebrero = 0, contInhabilitadoFebrero = 0;
    var contIngresoMarzo = 0, contSalidaMarzo = 0, contDisponibleMarzo = 0, contInhabilitadoMarzo = 0;
    var contIngresoAbril = 0, contSalidaAbril = 0, contDisponibleAbril = 0, contInhabilitadoAbril = 0;
    var contIngresoMayo = 0, contSalidaMayo = 0, contDisponibleMayo = 0, contInhabilitadoMayo = 0;
    var contIngresoJunio = 0, contSalidaJunio = 0, contDisponibleJunio = 0, contInhabilitadoJunio = 0;
    var contIngresoJulio = 0, contSalidaJulio = 0, contDisponibleJulio = 0, contInhabilitadoJulio = 0;
    var contIngresoAgosto = 0, contSalidaAgosto = 0, contDisponibleAgosto = 0, contInhabilitadoAgosto = 0;
    var contIngresoSeptiembre = 0, contSalidaSeptiembre = 0, contDisponibleSeptiembre = 0, contInhabilitadoSeptiembre = 0;
    var contIngresoOctubre = 0, contSalidaOctubre = 0, contDisponibleOctubre = 0, contInhabilitadoOctubre = 0;
    var contIngresoNoviembre = 0, contSalidaNoviembre = 0, contDisponibleNoviembre = 0, contInhabilitadoNoviembre = 0;
    var contIngresoDiciembre = 0, contSalidaDiciembre = 0, contDisponibleDiciembre = 0, contInhabilitadoDiciembre = 0;

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
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleEnero = contDisponibleEnero + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoEnero = contInhabilitadoEnero + 1;
                    }
                    break;
                case 2:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoFebrero = contIngresoFebrero + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaFebrero = contSalidaFebrero + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleFebrero = contDisponibleFebrero + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoFebrero = contInhabilitadoFebrero + 1;
                    }
                    break;
                case 3:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoMarzo = contIngresoMarzo + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaMarzo = contSalidaMarzo + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleMarzo = contDisponibleMarzo + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoMarzo = contInhabilitadoMarzo + 1;
                    }
                    break;
                case 4:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoAbril = contIngresoAbril + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaAbril = contSalidaAbril + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleAbril = contDisponibleAbril + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoAbril = contInhabilitadoAbril + 1;
                    }
                    break;
                case 5:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoMayo = contIngresoMayo + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaMayo = contSalidaMayo + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleMayo = contDisponibleMayo + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoMayo = contInhabilitadoMayo + 1;
                    }
                    break;
                case 6:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoJunio = contIngresoJunio + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaJunio = contSalidaJunio + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleJunio = contDisponibleJunio + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoJunio = contInhabilitadoJunio + 1;
                    }
                    break;
                case 7:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoJulio = contIngresoJulio + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaJulio = contSalidaJulio + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleJulio = contDisponibleJulio + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoJulio = contInhabilitadoJulio + 1;
                    }
                    break;
                case 8:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoAgosto = contIngresoAgosto + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaAgosto = contSalidaAgosto + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleAgosto = contDisponibleAgosto + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoAgosto = contInhabilitadoAgosto + 1;
                    }
                    break;
                case 9:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoSeptiembre = contIngresoSeptiembre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaSeptiembre = contSalidaSeptiembre + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleSeptiembre = contDisponibleSeptiembre + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoSeptiembre = contInhabilitadoSeptiembre + 1;
                    }
                    break;
                case 10:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoOctubre = contIngresoOctubre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaOctubre = contSalidaOctubre + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleOctubre = contDisponibleOctubre + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoOctubre = contInhabilitadoOctubre + 1;
                    }
                    break;
                case 11:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoNoviembre = contIngresoNoviembre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaNoviembre = contSalidaNoviembre + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleNoviembre = contDisponibleNoviembre + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoNoviembre = contInhabilitadoNoviembre + 1;
                    }
                    break;
                case 12:
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoDiciembre = contIngresoDiciembre + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaDiciembre = contSalidaDiciembre + 1;
                    }
        
                    if(datos[dato].tipos == 'DISPONIBLE'){
                        contDisponibleDiciembre = contDisponibleDiciembre + 1;
                    }
        
                    if(datos[dato].tipos == 'INHABILITADO'){
                        contInhabilitadoDiciembre = contInhabilitadoDiciembre + 1;
                    }
                    break;
            }




            
        }

    }
        
    graficaEstadisticaCarros(contIngresoEnero, contSalidaEnero, contDisponibleEnero, contInhabilitadoEnero,
        contIngresoFebrero, contSalidaFebrero, contDisponibleFebrero, contInhabilitadoFebrero,
        contIngresoMarzo, contSalidaMarzo, contDisponibleMarzo, contInhabilitadoMarzo,
        contIngresoAbril, contSalidaAbril, contDisponibleAbril, contInhabilitadoAbril,
        contIngresoMayo, contSalidaMayo, contDisponibleMayo, contInhabilitadoMayo,
        contIngresoJunio, contSalidaJunio, contDisponibleJunio, contInhabilitadoJunio,
        contIngresoJulio, contSalidaJulio, contDisponibleJulio, contInhabilitadoJulio,
        contIngresoAgosto, contSalidaAgosto, contDisponibleAgosto, contInhabilitadoAgosto,
        contIngresoSeptiembre, contSalidaSeptiembre, contDisponibleSeptiembre, contInhabilitadoSeptiembre,
        contIngresoOctubre, contSalidaOctubre, contDisponibleOctubre, contInhabilitadoOctubre,
        contIngresoNoviembre, contSalidaNoviembre, contDisponibleNoviembre, contInhabilitadoNoviembre,
        contIngresoDiciembre, contSalidaDiciembre, contDisponibleDiciembre, contInhabilitadoDiciembre)
    
}, function (error) {
    console.log(error);
});

});



})

getUser();