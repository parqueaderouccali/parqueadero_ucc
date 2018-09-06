// instancia de firebase que apunta al nodo usuarios
var db = firebase.database().ref('usuarios/');
var contador = 0;

// inspecciona si un usuario esta logeado o no
var getUser = function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {        
                       
            
            db.on('value',function(snapshot){                
                var nombreUsuario = snapshot.val();                
                
                 for(nombre in nombreUsuario) {
                    
                    if(user.uid === nombreUsuario[nombre].uid){                      
                        $('.nombresApellidos').html(' ' + nombreUsuario[nombre].nombre + ' ' + nombreUsuario[nombre].apellido)
                    }
                                        
                 }
        
            },function (error) {
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

// permite crear un nuevo parqueadero en firebase
var agregarParking = function() {

    contador = contador + 1;

    var db = firebase.database().ref('parqueaderos/parqueadero_'+ contador)

    var parqueadero = {
        disponibilidad: 0,
        estado: 0,
        num_parqueadero: contador    
    }

    db.set(parqueadero);

}

var dataRealTime = function (){

    var db = firebase.database().ref('parqueaderos/');
    
    var contadorHabilitados = 0;
    var contadorOcupados = 0;
    var contadorBloqueados = 0;

    db.on('value', function(snapshot){        
       
        var parqueaderos = snapshot.val();  
        
            for(parqueo in parqueaderos){    
                
                if(parqueaderos[parqueo].estado == 1){
                    
                    contadorBloqueados = contadorBloqueados + 1;
                }else{

                    if(parqueaderos[parqueo].disponibilidad == 1){                                                                  
                        
                        contadorOcupados = contadorOcupados + 1;                                              

                    }else{                 
                        
                        contadorHabilitados = contadorHabilitados + 1;  
                       
                    }
                }

                $('#cantidadPuestos').html(contadorHabilitados);
                $('#cantidadOcupada').html(contadorOcupados);
                $('#cantidadInhabilitados').html(contadorBloqueados);

            }
            contadorHabilitados = 0;  
            contadorOcupados = 0; 
            contadorBloqueados = 0; 

    },function(error){
        console.log(error);
    })

}

dataRealTime();
getUser();