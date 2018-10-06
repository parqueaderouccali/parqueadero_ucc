// instancia de firebase que apunta al nodo usuarios

var db = firebase.database().ref('usuarios/');
var dbCambioJornada = firebase.database().ref('pico_placa/');

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

function toggleOn() {
    $('#toggle-trigger').bootstrapToggle('on')
  }
  function toggleOff() {
    $('#toggle-trigger').bootstrapToggle('off')  
  }
  //if you want get value
  function getValue()
  {
   var value=$('#toggle-trigger').bootstrapToggle().prop('checked');
   console.log(value);
  }

getUser();