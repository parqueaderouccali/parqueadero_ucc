
// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var dbIngresos = firebase.database().ref('parqueadero_motos/ocupados/valor')
var dbSaliente = firebase.database().ref('parqueadero_motos/desocupados/valor')
var dbOcupados = firebase.database().ref('parqueadero_motos/ocupados')
var dbDesocupados = firebase.database().ref('parqueadero_motos/desocupados')
var dbZonas = firebase.database().ref('parqueadero_motos/zonas/')
var dbEstadistica = firebase.database().ref('estadisticas/logMotos/')

// declaracion de variables para la toma de informacion de fecha actual.
var f=new Date();
var dias=["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
var semana = dias[f.getUTCDay()];
var dia = f.getDate();
var mes = f.getMonth() + 1;
var ano = f.getFullYear();
var hora = f.getHours();
var minutos = f.getMinutes();
var ampm = hora >= 12 ? 'pm' : 'am';    
var strTime = ampm;
var fechaAct = ano +'-'+ mes +'-'+ dia;
var horaAct = hora +':'+minutos +' '+ampm;


// inspecciona si un usuario esta logeado o no
var getUser = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {            
            
            db.on('value', function (snapshot) {

                var nombreUsuario = snapshot.val();

                for (nombre in nombreUsuario) {

                    if (user.uid === nombreUsuario[nombre].uid) {
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
            $(location).attr('href', '../../index.html');
        }, function (error) {
            console.log(error);
        })

}

// carga de figuras
$(function () {
   
    var aumentar = 0;
    var disminuir = 100;

  var graficaIngreso = function (aumentar, disminuir){
     
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
     var pieChart       = new Chart(pieChartCanvas)
     var PieData        = [
        {
          value    : aumentar,
          color    : '#F56954',
          highlight: '#F56954',
          label    : 'Ocupados'
        },
        {
          value    : disminuir,
          color    : '#00A65A',
          highlight: '#00A65A',         
          label    : 'Desocupados'
        }
      ]
      var pieOptions     = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke    : true,
        //String - The colour of each segment stroke
        segmentStrokeColor   : '#fff',
        //Number - The width of each segment stroke
        segmentStrokeWidth   : 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps       : 100,
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate        : false,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale         : false,
        //Boolean - whether to make the chart responsive to window resizing
        responsive           : true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio  : true,
        //String - A legend template
        legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
      }
      //Create pie or douhnut chart
      // You can switch between pie and douhnut using the method below.
      pieChart.Doughnut(PieData, pieOptions)

  }

    graficaIngreso();

var datosEntrada = 0;
var datosSalida = 0;

// carga la informacion de la cantidad de veces que se carque la infomracion
dbIngresos.on('value', function (snapshot) {

    var valorIngreso = snapshot.val();

    datosEntrada = parseInt(valorIngreso);
    
    $('#txt_ocupados').html(datosEntrada)

    dbSaliente.on('value', function (snapshot){
        
        var valorSalida = snapshot.val();   
        
        $('#txt_disponibilidad_total').html(valorSalida);

        datosSalida = valorSalida - parseInt(datosEntrada);

        $('#txt_desocupados').html(datosSalida)

        graficaIngreso(datosEntrada,datosSalida);

    }, function (error) {
    console.log(error);
    }) 
    
}, function (error) {
    console.log(error);
});

// carga la informacion de las zonas
dbZonas.on('value', function (snapshot) {

    var valorIngreso = snapshot.val();

    var zonaAdmin = valorIngreso.administrativa;
    $('#txt_zona_admin').html(zonaAdmin)
    var zonaPrincipal = valorIngreso.principal;
    $('#txt_zona_principal').html(zonaPrincipal)
    var zonaCafeteria = valorIngreso.cafeteria;            
    $('#txt_zona_Cafeteria').html(zonaCafeteria)
    
}, function (error) {
    console.log(error);
});

// boton para aumentar los cupos de las motos
$('#btn_aumentar').click(function(){
    
    var ocupados = $('#txt_ocupados').text();

    var total = parseInt(ocupados) + 1;

    var ocupar = {
        valor: total
    }

    dbOcupados.update(ocupar);
       
    var ingreso_motos = $('#txt_ocupados').text();
    var salida_motos = $('#txt_desocupados').text();
    var total_motos = $('#txt_disponibilidad_total').text();

    LogIngresosMotos(horaAct,fechaAct,hora,minutos,ampm,dia,mes,ano,semana,ingreso_motos,salida_motos,total_motos,'INGRESO');

    $('#alerta_acceso').html("Acceso Concedido");
    setTimeout(function(){ $("#alerta_acceso").html(""); }, 2000);

});

// boton para reiniciar contadores
$('#btn_reset').click(function(){

    var reset = {
        valor: 0
    }

    dbOcupados.update(reset);

});

// boton para disminuir los cupos de las motos
$('#btn_disminuir').click(function(){

    var desocupados = $('#txt_ocupados').text();

    var total = parseInt(desocupados) - 1;

    var desocupa = {
        valor: total
    }

    dbOcupados.update(desocupa);

    var ingreso_motos = $('#txt_ocupados').text();
    var salida_motos = $('#txt_desocupados').text();
    var total_motos = $('#txt_disponibilidad_total').text();

    LogIngresosMotos(horaAct,fechaAct,hora,minutos,ampm,dia,mes,ano,semana,ingreso_motos,salida_motos,total_motos,'SALIDA');

    $('#alerta_acceso').html("Acceso Concedido");
    setTimeout(function(){ $("#alerta_acceso").html(""); }, 2000);

});

// registra el log del ingreso y salida de motos
var LogIngresosMotos = function(horaAct,fechaAct,hora,minutos,ampm,dia,mes,ano,semana,ingreso_motos,salida_motos,total_motos,tipo) {

    var ingresos = {
        fechaActual: fechaAct,
        horaActual: horaAct,
        hora_hh: hora,
        hora_mm: minutos,
        hora_ampm: ampm,
        fecha_dia: dia,
        fecha_mes: mes,
        fecha_ano: ano,
        fecha_semana: semana,
        ingreso: ingreso_motos,
        salida: salida_motos,
        total: total_motos,
        trigger: 0,
        tipos: tipo,
    }
    
    dbEstadistica.push().set(ingresos);
    
}

})

getUser();