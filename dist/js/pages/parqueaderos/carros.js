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
                $('#exampleModalCenter').modal('hide');
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
                    estado: 1
                }

                db.update(parqueadero);
                btnDesocupar();
                $('#exampleModalCenter').modal('hide')
            }

        }

    }, function (error) {
        console.log(error);
    })

}


var numeroParqueo1 = function (){
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero1").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}


var numeroParqueo2 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero2").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo3 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero3").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo4 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero4").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo5 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero5").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo6 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero6").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo7 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero7").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo8 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero8").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo9 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero9").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo10 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero10").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo11 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero11").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo12 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero12").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo13 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero13").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo14 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero14").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo15 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero15").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo16 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero16").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo17 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero17").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo18 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero18").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo19 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero19").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo20 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero20").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo21 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero21").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo22 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero22").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo23 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero23").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo24 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero24").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo25 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero25").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo26 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero26").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo27 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero27").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo28 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero28").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo29 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero29").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo30 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero30").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo31 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero31").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo32 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero32").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo33 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero33").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo34 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero34").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo35 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero35").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo36 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero36").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo37 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero37").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo38 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero38").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo39 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero39").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo40 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero40").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo41 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero41").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo42 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero42").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo43 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero43").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo44 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero44").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo45 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero45").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo46 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero46").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo47 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero47").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var numeroParqueo48 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero48").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo49 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero49").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo50 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero50").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo51 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero51").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo52 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero52").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo53 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero53").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo54 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero54").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo55 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero55").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo56 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero56").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo57 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero57").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo58 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero58").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo59 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero59").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo60 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero60").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo61 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero61").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo62 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero62").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo63 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero63").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo64 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero64").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo65 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero65").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo66 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero66").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo67 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero67").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo68 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero68").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo69 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero69").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo70 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero70").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo71 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero71").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo72 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero72").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo73 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero73").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo74 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero74").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo75 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero75").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo76 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero76").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo77 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero77").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo78 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero78").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo79 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero79").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo80 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero80").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo81 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero81").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo82 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero82").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo83 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero83").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo84 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero84").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo85 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero85").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo86 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero86").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo87 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero87").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo88 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero88").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo89 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero89").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo90 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero90").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo91 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero91").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo92 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero92").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo93 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero93").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo94 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero94").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}
var numeroParqueo95 = function () {        
    $("#numero_parqueadero").empty();
    $("#numero_parqueadero").val($("#num_parqueadero95").text());
    $("#numero_parqueadero").css("font-weight", "bolder");
}

var cargarCarros = function () {

    var db = firebase.database().ref('parqueaderos/');

    db.on('value', function(snapshot){        
       
        var parqueaderos = snapshot.val();  
        
            for(parqueo in parqueaderos){
                
                console.log(parqueaderos[parqueo].disponibilidad)
                console.log(parqueaderos[parqueo].num_parqueadero)
    
                
                if(parqueaderos[parqueo].estado == 1){
                    // btnDesocupar();
                    $('#imagenCarro'+parqueaderos[parqueo].num_parqueadero).hide();
                    $('#imagenInhabilitado'+parqueaderos[parqueo].num_parqueadero).show();                    
                    console.log('estado 1');                               
                }else{
                    // btnDesocupar();                                                            
                    console.log('estado 0');

                    if(parqueaderos[parqueo].disponibilidad == 1){                 
                        console.log('disponibilidad 1');                         
                        $('#imagenInhabilitado'+parqueaderos[parqueo].num_parqueadero).hide();
                        $('#imagenCarro'+parqueaderos[parqueo].num_parqueadero).show();
                    }else{                   
                        console.log('disponibilidad 0');     
                        $('#imagenInhabilitado'+parqueaderos[parqueo].num_parqueadero).hide();
                        $('#imagenCarro'+parqueaderos[parqueo].num_parqueadero).hide();

                    }
                }

            }  

    },function(error){
        
    })

}

var contador = function (){
    var f=new Date();   
    if(f.getHours() >= 1 && (f.getMinutes() >= 27 && f.getMinutes() < 42)) {       
       $("#imagenParqueaderosCarro").attr("src","../../dist/img/parqueaderos/ucc_carros_diurno.png");
    }else if(f.getHours() >= 1 && (f.getMinutes() >= 42 && f.getMinutes() < 44)){
        $("#imagenParqueaderosCarro").attr("src","../../dist/img/parqueaderos/ucc_carros_nocturno.png");
    }else if(f.getHours() >= 1 && f.getMinutes() >= 44){
        $("#imagenParqueaderosCarro").attr("src","../../dist/img/parqueaderos/ucc_carros_diurno.png");

    }
}

// metodos que se cargan cuando la aplicacion load().
cargarCarros();
getUser();