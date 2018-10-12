// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var dbCambioJornada = firebase.database().ref('cambio_jornada/');
var dbCambioJornadaDiurna = firebase.database().ref('cambio_jornada/diurna/');
var dbCambioJornadaNocturno = firebase.database().ref('cambio_jornada/nocturna/');

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

// escucha cualquier cambio en el cambio de jornada diurna
dbCambioJornadaDiurna.on('value', function(snapshot){

    var jornada = snapshot.val();    
    
    if(jornada == 0){
        $('#toggle-trigger-diurno').bootstrapToggle('off')  
    }else{
        $('#toggle-trigger-diurno').bootstrapToggle('on')
    }
    
},function(err){
      console.log(err);
});

// escucha cualquier cambio en el cambio de jornada nocturna
dbCambioJornadaNocturno.on('value', function(snapshot){

    var jornada = snapshot.val();    
    
    if(jornada == 0){
        $('#toggle-trigger-nocturno').bootstrapToggle('off')  
    }else{
        $('#toggle-trigger-nocturno').bootstrapToggle('on')
    }

},function(err){
    console.log(err);
});

// Permite actualizar el estado  en firebase para el cambio de jornada diurno
$('#toggle-trigger-diurno').change(function(){

    var value=$('#toggle-trigger-diurno').bootstrapToggle().prop('checked');

    if(value === true){
        var diurno = {diurna : 1}
    }else{
        var diurno = {diurna : 0}        
    }

    dbCambioJornada.update(diurno);
});

// Permite actualizar el estado  en firebase para el cambio de jornada nocturno
$('#toggle-trigger-nocturno').change(function(){

    var value=$('#toggle-trigger-nocturno').bootstrapToggle().prop('checked');

    if(value === true){
        var nocturno = {nocturna : 1}
    }else{
        var nocturno = {nocturna : 0}        
    }

    dbCambioJornada.update(nocturno);
});

getUser();