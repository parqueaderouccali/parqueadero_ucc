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
            $(location).attr('href', '../../index.html');
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
                          
                '<div id="map_canvas" style="width: 100%; height: 350px;">'+

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

    var coordX = alternos[alterno].coordenadasX;
    var coordY = alternos[alterno].coordenadasY;
    var nombreDiv = alterno;

    console.log(coordX + ' ' + coordY + ' ' + nombreDiv)

                                        
    }

    $(".parqueaderos").append(row);
    mapa(coordX , coordY , nombreDiv);
    row = "";    
    numero = 0;

    // permite cargar la informacion para ser editada
    $('.btnEdit').click(function () {

        var placasID = $(this).closest('tr').attr('id');
        console.log(placasID)
        $("#diaPlaca").val(placasID);
        $("#digito1Placa").val($('#' + placasID).find(".digito1").text());
        $("#digito2Placa").val($('#' + placasID).find(".digito2").text());  
    });


    firebase.database().goOffline();
    firebase.database().goOnline();

}, function (error) {
    console.log(error);
});

var mapa = function (coordenadaX, coordenadaY, nombre){

    console.log("#" + nombre)

    var map = new google.maps.Map(document.getElementById("#" + nombre), {
        scaleControl: true});
        map.setCenter(new google.maps.LatLng(coordenadaX, coordenadaY));
        map.setZoom(16);
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        
        var marker = new google.maps.Marker({map: map, position:
        map.getCenter()});
        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent('<div class="box-body">' +
                                '<dl class="dl-horizontal">' +
                                '<dt>Dirección</dt>' + 
                                '<dd>Cra 1 # 12 - 23</dd>' +
                                '<dt>Precio</dt>' +
                                '<dd>$ 1.000 / 3 Horas</dd>' +
                                '<dt>Horarios</dt>' +
                                '<dd>Lunes a Viernes (07:00 a.m a 10:30 p.m) y Sabados (07:00 a.m a 06:00 p.m)</dd>' +
                                '<dd>Sabados (07:00 a.m a 06:00 p.m)</dd>' +                                
                                '</dl>' +
                              '</div>');
        google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
        });

}


getUser();