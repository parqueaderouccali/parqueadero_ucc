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

// metodo para asignar un carro al sitio de parqueo indicado
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

            }

        }

    }, function (error) {
        console.log(error);
    })



}

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

            }

        }

    }, function (error) {
        console.log(error);
    })

}

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

            }

        }

    }, function (error) {
        console.log(error);
    })

}

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

            }

        }

    }, function (error) {
        console.log(error);
    })

}

var numeroParqueo = function (){
    $("#numero_parqueadero").val($("#num_parqueadero1").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
    
    $("#numero_parqueadero").val($("#num_parqueadero2").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}


numeroParqueo();
getUser();