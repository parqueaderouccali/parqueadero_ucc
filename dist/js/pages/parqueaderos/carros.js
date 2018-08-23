// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');

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

// metodo para asignar un vehiculo en un espacio disponible
var btnAsignar = function () {

    var numero_parqueadero = $("#numero_parqueadero").val();

    var db = firebase.database().ref('parqueaderos/');

    db.once('value', function (snapshot) {

        var parqueaderos = snapshot.val();

        for (numero in parqueaderos) {

            console.log(parqueaderos[numero].num_parqueadero)
            console.log(numero_parqueadero)

            if (numero_parqueadero == parqueaderos[numero].num_parqueadero) {
                console.log(numero)

                var db = firebase.database().ref('parqueaderos/' + numero + '/');

                var parqueadero = {
                    disponibilidad: 1
                }

                db.update(parqueadero);                
                $('#exampleModalCenter').modal('hide')
            }

        }

    }, function (error) {
        console.log(error);
    })



}

// metodo para desocupar un espacio ocupado por un vehiculo
var btnDesocupar = function () {

    var numero_parqueadero = $("#numero_parqueadero").val();

    var db = firebase.database().ref('parqueaderos/');

    db.once('value', function (snapshot) {

        var parqueaderos = snapshot.val();

        // console.log(parqueaderos);

        for (numero in parqueaderos) {

            console.log(parqueaderos[numero].num_parqueadero)
            console.log(numero_parqueadero)

            if (numero_parqueadero == parqueaderos[numero].num_parqueadero) {
                console.log(numero)

                var db = firebase.database().ref('parqueaderos/' + numero + '/');

                var parqueadero = {
                    disponibilidad: 0
                }

                db.update(parqueadero);                           
                $('#exampleModalCenter').modal('hide')
            }

        }

    }, function (error) {
        console.log(error);
    })

}

// metodo para inhabilitar un espacio en el parqueadero
var btnInhabilitar = function () {

    var numero_parqueadero = $("#numero_parqueadero").val();

    var db = firebase.database().ref('parqueaderos/');

    db.once('value', function (snapshot) {

        var parqueaderos = snapshot.val();

        // console.log(parqueaderos);

        for (numero in parqueaderos) {

            console.log(parqueaderos[numero].num_parqueadero)
            console.log(numero_parqueadero)

            if (numero_parqueadero == parqueaderos[numero].num_parqueadero) {
                console.log(numero)

                var db = firebase.database().ref('parqueaderos/' + numero + '/');

                var parqueadero = {
                    estado: 0
                }

                db.update(parqueadero);
                $('#exampleModalCenter').modal('hide')
            }

        }

    }, function (error) {
        console.log(error);
    })

}

// metodo para habilitar un espacio en el parqueadero
var btnHabilitar = function () {

    var numero_parqueadero = $("#numero_parqueadero").val();

    var db = firebase.database().ref('parqueaderos/');

    db.once('value', function (snapshot) {

        var parqueaderos = snapshot.val();

        // console.log(parqueaderos);

        for (numero in parqueaderos) {

            console.log(parqueaderos[numero].num_parqueadero)
            console.log(numero_parqueadero)

            if (numero_parqueadero == parqueaderos[numero].num_parqueadero) {
                console.log(numero)

                var db = firebase.database().ref('parqueaderos/' + numero + '/');

                var parqueadero = {
                    estado: 1
                }

                db.update(parqueadero);
                $('#exampleModalCenter').modal('hide')
            }

        }

    }, function (error) {
        console.log(error);
    })

}

var numeroParqueo = function (){
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero1").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo2 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero2").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var cargarCarros = function () {

    var db = firebase.database().ref('parqueaderos/');

    db.on('value', function(snapshot){        
       
        var parqueaderos = snapshot.val();  
        
            for(parqueo in parqueaderos){
                
                console.log(parqueaderos[parqueo].disponibilidad)
                console.log(parqueaderos[parqueo].num_parqueadero)
    
                if(parqueaderos[parqueo].disponibilidad == 0){
                    $('#imagenCarro'+parqueaderos[parqueo].num_parqueadero).hide();
                }else{
                    $('#imagenCarro'+parqueaderos[parqueo].num_parqueadero).show();
                }

                if(parqueaderos[parqueo].estado == 0){
                    $('#imagenInhabilitado'+parqueaderos[parqueo].num_parqueadero).show();
                }else{
                    $('#imagenInhabilitado'+parqueaderos[parqueo].num_parqueadero).hide();
                }

            }  

    },function(error){
        
    })

}

var acordeon = function () {
    
    var numero;
    
    numero++;

    console.log(numero)

    //if(numero % 2 == 0){        
    //    alert('cerrado' + numero)
    //}else{    
    //    alert('abierto' + numero)
    //}

}

cargarCarros();



getUser();