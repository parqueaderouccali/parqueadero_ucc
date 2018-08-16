// inspecciona si un usuario esta logeado o no
var getUser = function () {

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            // $(location).attr('href','../mod_placas/form-placas.html');           
            // $('.correo').html(user.email)
        }else{
            // $(location).attr('href','../index.html');
        }
    })
}

// permite validar un usuario para logearse a la aplicación
var login = function () {

    var email = $('#_email').val();
    var password = $('#_contrasena').val(); 

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (data){  
        console.log(data)                                 
        $(location).attr('href','../../pages/login/principal.html')         
    })
    .catch(function (error) {        
        alertify.error(traductor(error.message));
    })
}

// envia un correo para cambiar la contraseña
var recordarPassword = function () {

    var auth = firebase.auth();
    var email = $('#_emailRecuperacion').val();

    auth.sendPasswordResetEmail(email)
        .then(function(){
            $('#exampleModalCenter').modal('hide');
            alertify.success("El correo de confirmación fue enviado con éxito");
        },function(error){            
            alertify.error(traductor(error.message));
        })
}

// retorna en idioma español algunos error presentados por el sistema
var traductor = function (texto){
    
    var texto_traducido;

    if(texto === "The email address is badly formatted."){
        texto_traducido = "La dirección de correo electrónico no es válida";
    }else if(texto === "The password is invalid or the user does not have a password."){
        texto_traducido = "La contraseña no es válida.";
    }else if(texto === "There is no user record corresponding to this identifier. The user may have been deleted."){
        texto_traducido = "El Usuario no es existe.";
    }

    return texto_traducido;
}