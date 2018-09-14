// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('pico_placa/');

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
var dbUser = firebase.database().ref();
var query = dbUser.child('pico_placa').orderByChild('orden');
console.log(query);

query.on('value', function (snapshot) {

    var picos_placas = snapshot.val();

    $(".limpiarTabla").empty();

    var row = "";
    var numero = 0;

    for (pico in picos_placas) {
        numero = numero + 1;

        row += '<tr class="UID size" id="' + pico + '">' +
            '<td class="contador" style="font-size:17px">' + numero + '</td>' +
            '<td class="nombres" style="font-size:17px">' + pico + '</td>' +
            '<td class="apellidos" style="font-size:17px">' + picos_placas[pico].digito2 + '</td>' +
            '<td class="correos" style="font-size:17px">' + picos_placas[pico].digito2 + '</td>' +
            '<td class="derecha" > <button type="button" class="btnEdit btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-edit form-control-feedback"></i> Editar</td>' +            
            '</tr>';
    }

    $("tbody").append(row);
    row = "";
    $(".paginas").html('Registros generados en total : ' + numero);
    numero = 0;

    // permite cargar la informacion para ser editada
    $('.btnEdit').click(function () {

        var usuarioID = $(this).closest('tr').attr('id');

        $("#UID_dato").val(usuarioID);
        $("#nombre_usuario").val($('#' + usuarioID).find(".nombres").text());
        $("#apellido_usuario").val($('#' + usuarioID).find(".apellidos").text());
        $("#correo_usuario").val($('#' + usuarioID).find(".correos").text());

        $("#nombre_usuario").removeAttr("disabled");
        $("#apellido_usuario").removeAttr("disabled");
        $("#correo_usuario").removeAttr("disabled");

        $(".cambioEstado").text("Editar").removeClass("btn-warning").addClass("btn-danger");

        $(".titulo").text("Actualizar Usuario");
    })

    // permite cargar la informacion para ser eliminada
    $('.btnDelete').click(function () {

        var usuarioID = $(this).closest('tr').attr('id');

        $("#UID_dato").val(usuarioID);
        $("#nombre_usuario").val($('#' + usuarioID).find(".nombres").text());
        $("#apellido_usuario").val($('#' + usuarioID).find(".apellidos").text());
        $("#correo_usuario").val($('#' + usuarioID).find(".correos").text());

        $("#nombre_usuario").attr('disabled', 'disabled');
        $("#apellido_usuario").attr('disabled', 'disabled');
        $("#correo_usuario").attr('disabled', 'disabled');

        $(".cambioEstado").text("Eliminar").removeClass("btn-danger").addClass("btn-warning");

        $(".titulo").text("Eliminar Usuario");
            
    })

    firebase.database().goOffline();
    firebase.database().goOnline();

}, function (error) {
    console.log(error);
});


$('#GenerarPlacas').click(function(){


    
});


getUser();