// instancia de firebase que apunta al nodo usuarios

var db = firebase.database().ref('usuarios/');
var dbPico = firebase.database().ref('pico_placa/');

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

        row += '<tr class="ID" id="' + pico + '">' +
                    '<td class="contador" style="font-size:17px">' + numero + '</td>' +
                    '<td class="dia" style="font-size:17px">' + picos_placas[pico].dia + '</td>' +
                    '<td class="digito1" style="font-size:17px">' + picos_placas[pico].digito1 + '</td>' +
                    '<td class="digito2" style="font-size:17px">' + picos_placas[pico].digito2 + '</td>' +
                    '<td class="text-right"> <button type="button" class="btnEdit btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-edit form-control-feedback"></i> Editar</td>' +            
               '</tr>';
    }

    $("tbody").append(row);
    row = "";
    $(".paginas").html('Registros generados en total : ' + numero);
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

// Generador automatico de placa
$('#GenerarPlacas').click(function(){

    // Dia Lunes
    var dia1Lunes = $('#digito1Lunes').val();
    var dia2Lunes = $('#digito2Lunes').val();

    var suma1 = parseInt(dia1Lunes) + 1 ;
    var suma11 = parseInt(dia2Lunes) + 1 ;

    console.log(suma1);
    if(suma1 === 10){
        $('#digito1Lunes').val(0);
        suma1 = 0;
    }else{
        $('#digito1Lunes').val(suma1);
    }

    if(suma11 === 10){
        $('#digito2Lunes').val(0);
        suma11 = 0;
    }else{
        $('#digito2Lunes').val(suma11);
    }

    // Dia Martes
    var dia1Martes = $('#digito1Martes').val();
    var dia2Martes = $('#digito2Martes').val();

    var suma2 = parseInt(dia1Martes) + 1 ;
    var suma22 = parseInt(dia2Martes) + 1 ;

    if(suma2 === 10){
        $('#digito1Martes').val(0);
        suma2 = 0;
    }else{
        $('#digito1Martes').val(suma2);
    }

    if(suma22 === 10){
        $('#digito2Martes').val(0);
        suma22 = 0;
    }else{
        $('#digito2Martes').val(suma22);
    }

    // Dia Miercoles
    var dia1Miercoles = $('#digito1Miercoles').val();
    var dia2Miercoles = $('#digito2Miercoles').val();

    var suma3 = parseInt(dia1Miercoles) + 1 ;
    var suma33 = parseInt(dia2Miercoles) + 1;

    if(suma3 === 10){
        $('#digito1Miercoles').val(0);
        suma3 = 0;
    }else{
        $('#digito1Miercoles').val(suma3);
    }

    if(suma33 === 10){
        $('#digito2Miercoles').val(0);
        suma33 = 0;
    }else{
        $('#digito2Miercoles').val(suma33);
    }

    // Jueves
    var dia1Jueves = $('#digito1Jueves').val();
    var dia2Jueves = $('#digito2Jueves').val();

    var suma4 = parseInt(dia1Jueves) + 1 ;
    var suma44 = parseInt(dia2Jueves) + 1 ;

    if(suma4 === 10){
        $('#digito1Jueves').val(0);
        suma4 = 0;
    }else{
        $('#digito1Jueves').val(suma4);
    }

    if(suma44 === 10){
        $('#digito2Jueves').val(0);
        suma44 = 0;
    }else{
        $('#digito2Jueves').val(suma44);
    }

    // Dia Viernes
    var dia1Viernes = $('#digito1Viernes').val();
    var dia2Viernes = $('#digito2Viernes').val();

    var suma5 = parseInt(dia1Viernes) + 1 ;
    var suma55 = parseInt(dia2Viernes) + 1 ;

    if(suma5 === 10){
        $('#digito1Viernes').val(0);
        suma5 = 0;
    }else{
        $('#digito1Viernes').val(suma5);
    }

    if(suma55 === 10){
        $('#digito2Viernes').val(0);
        suma55 = 0;
    }else{
        $('#digito2Viernes').val(suma55);
    }

});

// carga las placas al popup
$('#cambioDigito').click(function(){
    
    $("#digito1Lunes").val($('#1Lunes').find(".digito1").text());
    $("#digito2Lunes").val($('#1Lunes').find(".digito2").text());
    
    $("#digito1Martes").val($('#2Martes').find(".digito1").text());
    $("#digito2Martes").val($('#2Martes').find(".digito2").text());

    $("#digito1Miercoles").val($('#3Miercoles').find(".digito1").text());
    $("#digito2Miercoles").val($('#3Miercoles').find(".digito2").text());

    $("#digito1Jueves").val($('#4Jueves').find(".digito1").text());
    $("#digito2Jueves").val($('#4Jueves').find(".digito2").text());

    $("#digito1Viernes").val($('#5Viernes').find(".digito1").text());
    $("#digito2Viernes").val($('#5Viernes').find(".digito2").text());

});

// edita las placas
$('#EditarPlacas').click(function(){

    var dbLunes = firebase.database().ref('pico_placa/1Lunes');
    var dbMartes = firebase.database().ref('pico_placa/2Martes');
    var dbMiercoles = firebase.database().ref('pico_placa/3Miercoles');
    var dbJueves = firebase.database().ref('pico_placa/4Jueves');
    var dbViernes = firebase.database().ref('pico_placa/5Viernes');
 
    var digito1Lunes = $("#digito1Lunes").val();
    var digito2Lunes = $("#digito2Lunes").val();

    var digito1Martes = $("#digito1Martes").val();
    var digito2Martes = $("#digito2Martes").val();

    var digito1Miercoles = $("#digito1Miercoles").val();
    var digito2Miercoles = $("#digito2Miercoles").val();

    var digito1Jueves = $("#digito1Jueves").val();
    var digito2Jueves = $("#digito2Jueves").val();

    var digito1Viernes = $("#digito1Viernes").val();
    var digito2Viernes = $("#digito2Viernes").val();


    dbLunes.update({
        digito1: digito1Lunes,
        digito2: digito2Lunes,        
    }, function () {
        $('#exampleModalCenter2').modal('hide')
        firebase.database().goOffline();
        firebase.database().goOnline();
    })

    dbMartes.update({
        digito1: digito1Martes,
        digito2: digito2Martes,        
    }, function () {
        $('#exampleModalCenter2').modal('hide')
        firebase.database().goOffline();
        firebase.database().goOnline();
    })

    dbMiercoles.update({
        digito1: digito1Miercoles,
        digito2: digito2Miercoles,        
    }, function () {
        $('#exampleModalCenter2').modal('hide')
        firebase.database().goOffline();
        firebase.database().goOnline();
    })

    dbJueves.update({
        digito1: digito1Jueves,
        digito2: digito2Jueves,        
    }, function () {
        $('#exampleModalCenter2').modal('hide')
        firebase.database().goOffline();
        firebase.database().goOnline();
    })

    dbViernes.update({
        digito1: digito1Viernes,
        digito2: digito2Viernes,        
    }, function () {
        $('#exampleModalCenter2').modal('hide')
        firebase.database().goOffline();
        firebase.database().goOnline();
    })

});

$('#EditarPicoPlaca').click(function(){

    var ID = $('#diaPlaca').val();

        dbPico.child(ID).update({
            digito1: $("#digito1Placa").val(),
            digito2: $("#digito2Placa").val()
        }, function () {
            $('#exampleModalCenter').modal('hide')
            firebase.database().goOffline();
            firebase.database().goOnline();
        })

});

getUser();