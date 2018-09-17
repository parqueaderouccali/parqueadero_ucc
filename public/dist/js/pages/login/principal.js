// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var dbNovedadesUCC = firebase.database().ref('novedades/UCC/');
var dbNovedadesEstudiantes = firebase.database().ref('novedades/Estudiantes/');
var dbPicoPlaca = firebase.database().ref('pico_placa/');
var contador = 0;

// inspecciona si un usuario esta logeado o no
var getUser = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {        
                       
            
            db.on('value',function(snapshot){                
                var nombreUsuario = snapshot.val();                
                
                 for(nombre in nombreUsuario) {
                    
                    if(user.uid === nombreUsuario[nombre].uid){                      
                        $('.nombresApellidos').html(' ' + nombreUsuario[nombre].nombre + ' ' + nombreUsuario[nombre].apellido)
                    }
                                        
                 }
        
            },function (error) {
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

// permite crear un nuevo parqueadero en firebase
var agregarParking = function() {

    contador = contador + 1;

    var db = firebase.database().ref('parqueaderos/parqueadero_'+ contador)

    var parqueadero = {
        disponibilidad: 0,
        estado: 0,
        num_parqueadero: contador    
    }

    db.set(parqueadero);

}

// permite crear una nueva novedad UCC en firebase
var NovedadUCC = function(novedad) {

    var fecha = new Date();

    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDay();
    var ano = fecha.getFullYear();

    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundo = fecha.getSeconds();

    var novedades = {
        nombre: 'UCC',
        descripcion: novedad,        
        fechas: '' + dia + '/' + mes + '/' + ano,
        horas: '' + hora + ':' + minutos + ':' + segundo
    }

    dbNovedadesUCC.push().set(novedades);

}

// permite obtener una nueva novedad de registrada por los estudiantes en firebase
var NovedadEstidiantes = function() {

    var fecha = new Date();

    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDay();
    var ano = fecha.getFullYear();

    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundo = fecha.getSeconds();

    var novedades = {
        nombre: "Christian Rodriguez",
        descripcion: "",        
        fechas: '' + dia + '/' + mes + '/' + ano,
        horas: '' + hora + ':' + minutos + ':' + segundo
    }

    dbNovedadesEstudiantes.push().set(novedades);

}

// permite agregar una novedad UCC.
var agregarNovedadUCC = function (){

    var novedad = $('#txtnovedadUCC').val();

    if(novedad === ''){
        alert('Ingrese una novedad');
    }else{
        NovedadUCC(novedad);
    }

}

// carga del dashboard en tiempo real.
var dataRealTime = function (){

    var db = firebase.database().ref('parqueaderos/');
    
    var contadorHabilitados = 0;
    var contadorOcupados = 0;
    var contadorBloqueados = 0;

    db.on('value', function(snapshot){        
       
        var parqueaderos = snapshot.val();  
        
            for(parqueo in parqueaderos){    
                
                if(parqueaderos[parqueo].estado == 1){
                    
                    contadorBloqueados = contadorBloqueados + 1;
                }else{

                    if(parqueaderos[parqueo].disponibilidad == 1){                                                                  
                        
                        contadorOcupados = contadorOcupados + 1;                                              

                    }else{                 
                        
                        contadorHabilitados = contadorHabilitados + 1;  
                       
                    }
                }

                $('#cantidadPuestos').html(contadorHabilitados);
                $('#cantidadOcupada').html(contadorOcupados);
                $('#cantidadInhabilitados').html(contadorBloqueados);

            }
            contadorHabilitados = 0;  
            contadorOcupados = 0; 
            contadorBloqueados = 0; 

    },function(error){
        console.log(error);
    })

}

// permite cargar crear los vehiculos que se encuentra en espera para el ingreso a la Universidad
$('#EsperaVehiculos').click(function(){
    
});


// Metodos para Novedades UCC donde se Inspecciona todos los cambios en la tabla y la actualiza 
dbNovedadesUCC.on('value', function (snapshot) {

    var novedades = snapshot.val();

    $(".limpiarTabla").empty();

    var row = "";
    var numero = 0;

    for (novedad in novedades) {

        row += '<div id='+ novedad + ' class="item">' +
                    '<img src="../../dist/img/iconos/logo-ucc-chat.png" alt="user image" class="online">' +
                    '<p class="message">' +
                         '<a href="#" class="name">' +                         
                         '<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> '+ novedades[novedad].fechas + ' ' + novedades[novedad].horas + '</small> ' +                
                            novedades[novedad].nombre +
                            '</a>'
                            + novedades[novedad].descripcion +
                    '</p>' +          
                '</div>';
    }

    $(".item-chats").append(row);
    row = "";
    $('#txtnovedadUCC').val("");
    
}, function (error) {
    console.log(error);
});

// Metodos para Novedades UCC donde se Inspecciona todos los cambios en la tabla y la actualiza 
dbNovedadesEstudiantes.on('value', function (snapshot) {

    var novedades = snapshot.val();
    var nombre = $(".nombresApellidos").val();

    $(".limpiarTabla-2").empty();

    var row = "";
    var numero = 0;

    for (novedad in novedades) {

        row += '<div id='+ novedad + ' class="item">' +
                    '<img src="../../dist/img/avatar5.png" alt="user image" class="online">' +
                    '<p class="message">' +
                         '<a href="#" class="name">' +                         
                            '<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> '+ novedades[novedad].fechas + ' ' + novedades[novedad].horas + '</small> ' +                
                                novedades[novedad].nombre +
                         '</a>'
                            + novedades[novedad].descripcion +
                    '</p>' +          
                '</div>';
    }

    $(".item-chats-2").append(row);
    row = "";
    
}, function (error) {
    console.log(error);
});

// obtiene el dia de la semana y los carga en la pagina (llamado desde Load en el body)
var semana = function (){

    var f=new Date();
    var dias=["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var semana = dias[f.getUTCDay()]; 

    if(semana === "Domingo"){             
        $('#conector').html('');
        $('#diaSemana').html('(No Aplica)');                   
    }else if(semana === 'Lunes'){
        getPicoPlaca(semana);
    }else if(semana === 'Martes'){
        getPicoPlaca(semana);
    }else if(semana === 'Miercoles'){
        getPicoPlaca(semana);
    }else if(semana === 'Jueves'){
        getPicoPlaca(semana);
    }else if(semana === 'Viernes'){
        getPicoPlaca(semana);
    }else if(semana === 'Sabado'){
        $('#diaSemana').html('(No Aplica Pico y Placa)');                      
        $('#digito1').html('');
        $('#digito2').html('');
        $('#picoPlaca').html('');
    }
            
}

// Obtiene los numeros de pico y placa aplicados.
var getPicoPlaca = function (dia) {

    dbPicoPlaca.on('value',function(snapshot){                
        
        var semana = snapshot.val();                
        
         for(diasem in semana) {
            
            if(dia === semana[diasem].dia){                                     
                $('#digito1').html(semana[diasem].digito1);
                $('#conector').html(' y ');
                $('#digito2').html(semana[diasem].digito2);
                $('#diaSemana').html('( ' + semana[diasem].dia + ' )'); 
            }
                                
         }

    },function (error) {
        console.log(error);
    })

}


// metodos que se inician una vez carga la aplicacion.
semana();
dataRealTime();
getUser();