// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');

// inspecciona si un usuario esta logeado o no
var getUser = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('').html(user.email)            
        } else {
           // $(location).attr('href', '../index.html');
        }
    })
}

// cierra la session de un usuario activo
var logout = function () {

    firebase.auth().signOut()
        .then(function () {
            console.log('Sesión Finalizada')
            // $(location).attr('href', '../index.html');
        }, function (error) {
            console.log(error);
        })

}

// Inspecciona todos los cambios en la tabla y la actualiza
db.on('value', function (snapshot) {

    var usuarios = snapshot.val();

    $(".limpiarTabla").empty();

    var row = "";
    var numero = 0;

    for (usuario in usuarios) {
        numero = numero + 1;

        row += '<tr class="UID" id="' + usuario + '">' +
            '<td class="contador">' + numero + '</td>' +
            '<td class="nombres">' + usuarios[usuario].nombre + '</td>' +
            '<td class="apellidos">' + usuarios[usuario].apellido + '</td>' +
            '<td class="correos">' + usuarios[usuario].correo + '</td>' +
            '<td class="derecha"> <button type="button" class="btnEdit btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-edit form-control-feedback"></i> Editar</td>' +
            '<td class="derecha"> <button type="button" class="btnDelete btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-times form-control-feedback"> </i> Eliminar</td>' +
            '</tr>';
    }

    $("tbody").append(row);
    row = "";
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
})

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
        $('#exampleModalCenter').modal('hide')

        firebase.database().goOffline();
        firebase.database().goOnline();

    }

}

getUser();