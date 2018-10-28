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
   
  var graficaEstadisticaCarros = function (
    contIngresoLunes, contIngresoMartes, contIngresoMiercoles, contIngresoJueves, contIngresoViernes, contIngresoSabado, contIngresoDomingo,
    contSalidaLunes, contSalidaMartes, contSalidaMiercoles, contSalidaJueves, contSalidaViernes, contSalidaSabado, contSalidaDomingo
) {
    
    var areaChartData = {
        labels  : ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        datasets: [                   
            {
                label               : 'Ingresos',
                fillColor           : 'rgba(60,141,188,0.9)',
                strokeColor         : 'rgba(60,141,188,0.8)',
                pointColor          : '#3b8bba',
                pointStrokeColor    : 'rgba(60,141,188,1)',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data                : [contIngresoLunes,contIngresoMartes,contIngresoMiercoles,contIngresoJueves,contIngresoViernes, contIngresoSabado,contIngresoDomingo]
            },
            {
                label               : 'Salidas',
                fillColor           : 'rgba(209,29,29,0.9)',
                strokeColor         : 'rgba(209,29,29,0.8)',
                pointColor          : '#3b8bba',
                pointStrokeColor    : 'rgba(209,29,29,1)',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: 'rgba(209,29,29,1)',
                data                : [contSalidaLunes,contSalidaMartes,contSalidaMiercoles,contSalidaJueves,contSalidaViernes,contSalidaSabado,contSalidaDomingo]
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

$(document).on('change', '#mes_fecha', function(event) {
   var valueSelectMes = $("#mes_fecha option:selected").val();
  
   dbEstadisticas.on('value', function (snapshot) {

    var contIngresoLunes = 0,contIngresoMartes = 0,contIngresoMiercoles = 0,contIngresoJueves = 0,contIngresoViernes = 0, contIngresoSabado = 0,contIngresoDomingo = 0;
    var contSalidaLunes = 0,contSalidaMartes = 0,contSalidaMiercoles = 0,contSalidaJueves = 0,contSalidaViernes = 0,contSalidaSabado = 0,contSalidaDomingo = 0;

    var datos = snapshot.val();    
    
    for(dato in datos){
        console.log(datos[dato].fecha_mes + ' ' + valueSelectMes)
        if(datos[dato].fecha_mes == valueSelectMes){ 
            
            switch (datos[dato].fecha_semana) {
                case 'Lunes':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoLunes = contIngresoLunes + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaLunes = contSalidaLunes + 1;
                    }
        
                    break;
                case 'Martes':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoMartes = contIngresoMartes + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaMartes = contSalidaMartes + 1;
                    }
        
                   
                    break;
                case 'Miercoles':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoMiercoles = contIngresoMiercoles + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaMiercoles = contSalidaMiercoles + 1;
                    }
            
                    break;
                case 'Jueves':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoJueves = contIngresoJueves + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaJueves = contSalidaJueves + 1;
                    }
                        
                    break;
                case 'Viernes':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoViernes = contIngresoViernes + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaViernes = contSalidaViernes + 1;
                    }
        
                   
                    break;
                case 'Sabado':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoSabado = contIngresoSabado + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaSabado = contSalidaSabado + 1;
                    }
                      
                    break;
                case 'Domingo':
                    if(datos[dato].tipos == 'INGRESO'){
                        contIngresoDomingo = contIngresoDomingo + 1;
                    }
        
                    if(datos[dato].tipos == 'SALIDA'){
                        contSalidaDomingo = contSalidaDomingo + 1;
                    }
                            
                    break;               
            }            
        }

    }
        
    graficaEstadisticaCarros(contIngresoLunes,contIngresoMartes,contIngresoMiercoles,contIngresoJueves,contIngresoViernes, contIngresoSabado,contIngresoDomingo,
        contSalidaLunes,contSalidaMartes,contSalidaMiercoles,contSalidaJueves,contSalidaViernes,contSalidaSabado,contSalidaDomingo)
    
}, function (error) {
    console.log(error);
});

});



})

getUser();