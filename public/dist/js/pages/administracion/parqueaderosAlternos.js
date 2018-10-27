// instancia de firebase que apunta al nodo usuarios

var db = firebase.database().ref('usuarios/');
var dbAlternos = firebase.database().ref('alternos/');


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

// Permite editar o eliminar un usuario cargado en la ventana modal
var btnModalPopup = function () {

    var valor = $('#btnModal').text()

    if (valor === 'Editar') {

        var usuarioID = $('#UID_dato').val();

        db.child(usuarioID).update({
            nombre: $("#nombre_usuario").val(),
            apellido: $("#apellido_usuario").val(),
            correo: $("#correo_usuario").val()
        }, function () {
            $('#exampleModalCenter').modal('hide')
            firebase.database().goOffline();
            firebase.database().goOnline();
        })

    } else {
        var usuarioID = $('#UID_dato').val();
        db.child(usuarioID).remove();
        $('#exampleModalCenter').modal('hide');
        deleteUser(usuarioID);

        firebase.database().goOffline();
        firebase.database().goOnline();

    }

}

// Inspecciona todos los cambios en la tabla y la actualiza
dbAlternos.on('value', function (snapshot) {

    var alternos = snapshot.val();

    $(".limpiarTabla").empty();

    var row = "";
    var numero = 0;

    for (alterno in alternos) {

        numero = numero + 1;    

        row +=  '<div class="col-lg-6 ">'+
        '<section class="col-lg-12 connectedSortable">' +
          
          '<div class="box box-primary">' +
                
            '<div class="box-header">'+
                      
              '<h3 class="text-center"><b>' + alternos[alterno].nombre  + '</b></h3>'+
       
            '</div>'+
          
            '<div class="box-body">'+
                          
                '<div id="row" >'+
                    '<div class="col-lg-12 text-center">'+
                      ''+ alternos[alterno].ubicacion +''+                        
                    '</div>'+
                '</div>'+
                                         
            '</div>'+

            '<div class="box-footer ">'+
                        
              '<div class="box box-solid">'+
                '<div class="box-header with-border">'+
                  '<i class="fa fa-text-width"></i>'+
    
                  '<h3 class="box-title">Información</h3>'+
                '</div>'+
                
                '<div class="box-body">'+
                  '<dl class="dl-horizontal">'+
                    '<dt id="' + alterno + '" hidden>' + alterno + '</dt>' +
                    '<dt>Codigo</dt>' +                    
                    '<dd>'+ alterno + '</dd>' +
                    '<dt>Coordenadas</dt>' +                    
                    '<dd>'+ alternos[alterno].coordenadasX + ' , ' + alternos[alterno].coordenadasY + '</dd>' +
                    '<dt>Dirección</dt>' +
                    '<dd>' + alternos[alterno].direccion + '</dd>' +
                    '<dt>Precio</dt>' +
                    '<dd> $ ' + alternos[alterno].precio + ' / 3 Horas</dd>' +
                    '<dt>Horarios</dt>' +
                    '<dd>' + alternos[alterno].horario + '</dd>' +                        
                    '<dt>Novedades</dt>' +
                    '<dd>' + alternos[alterno].novedades + ' </dd>' +
                  '</dl>'+
                '</div>'+
                
              '</div>'+
        
            '</div>'+

        '</section>'+
    '</div>';
                                        
    }
    $(".parqueaderos").append(row);
    
    row = "";    
    numero = 0;

    // permite cargar la informacion para ser editada
    $('.btnEdit').click(function () {

        var placasID = $(this).closest('tr').attr('id');

        $("#diaPlaca").val(placasID);
        $("#digito1Placa").val($('#' + placasID).find(".digito1").text());
        $("#digito2Placa").val($('#' + placasID).find(".digito2").text());  
    });


    firebase.database().goOffline();
    firebase.database().goOnline();

}, function (error) {
    console.log(error);
});

var contador = 0;
// Permite guardar el parqueadero alterno
var btnGuardarParqueadero = function() {

    var _titulo = $('#txt_titulo').val()
    var  _coordenada_X = $('#txt_coordenadasX').val()
    var  _coordenada_Y = $('#txt_coordenadasY').val()
    var _direccion = $('#txt_direccion').val()
    var _horario = $('#txt_horario').val()
    var _novedades = $('#txt_novedades').val()
    var _precio = $('#txt_precio').val()
    var _disponible = $('#txt_disponible').val()
    var _ubicacion = $('#txt_ubicacion').val()
    var _contrasena = $('#txt_contrasena').val()

    dbAlternos.on('value', function (snapshot) {

        var alternos = snapshot.val();

        for(alterno in alternos){
            contador = contador + 1;            
        }   
       
    }, function (error) {
        console.log(error);
    });

    var parqueaderoAlterno = {
        consecutivo: contador + 1,
        coordenadasX: _coordenada_X,
        coordenadasY: _coordenada_Y,
        direccion: _direccion,
        disponibilidad: _disponible,
        horario: _horario,
        nombre: _titulo,
        novedades: _novedades,
        precio: _precio,
        ubicacion: _ubicacion,
        password: _contrasena,
    }

dbAlternos.child('alterno_' + (contador + 1)).set(parqueaderoAlterno);
contador = 0;

$('#txt_titulo').val("")
$('#txt_coordenadasX').val("0")
$('#txt_coordenadasY').val("0")
$('#txt_direccion').val("")
$('#txt_horario').val("")
$('#txt_novedades').val("")
$('#txt_precio').val("0")
$('#txt_disponible').val("0")
$('#txt_ubicacion').val("")
$('#txt_contrasena').val("")

$('#exampleModalCenter2').modal('hide');

}


getUser();