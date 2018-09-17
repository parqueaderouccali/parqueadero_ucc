// crea un usuario en autenticacion
var createuser = function () {

    var nombre = $('#txt_nombres').val();
    var apellido = $('#txt_apellidos').val(); 
    var email = $('#txt_email').val();
    var password = $('#txt_contrasena').val();
    var password_2 = $('#txt_confirmacion_contraseña').val();

    if(nombre === ""){        
        alertify.error(("Ingrese su Nombre"));
    }else if(apellido === ""){
        alertify.error(("Ingrese su Apellido"));
    }else if(email === ""){
        alertify.error(("Ingrese su Email"));
    }else if(password === ""){        
        alertify.error(("Ingrese la contraseña"));
    }else if(password_2 === ""){        
        alertify.error(("Ingrese la confirmación de la contraseña"));
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {             
            console.log(data)                                   
            alertify.success("Usuario " + nombre.toUpperCase() + ' ' + apellido.toUpperCase() + " Registrado");            
            guardarUsuariofirebase(nombre,apellido,email); 
            limpiarCampos();
            sendEmail();      
        })
        .catch(function (error) {
            console.log(error)
            alertify.error(traductor(error.message));
        })
    getUser();
    return false;
    }


}

// envia un mensaje para confirmar la creacion del usuario
var sendEmail = function () {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification()
        .then(function () {
            alertify.success("El correo de confirmación fue enviado con éxito");
        }, function (error) {
            alertify.error(error.message);
        })

}

// inspecciona si un usuario esta logeado o no
var getUser = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user)
    })
}

// crea un usuario en base de datos
var guardarUsuariofirebase = function (name, surnames, email) {
    var db = firebase.database().ref('usuarios/');
    var user = firebase.auth().currentUser;
        
        var usuarios = {
            uid: user.uid,
            nombre: name.toLowerCase(),
            apellido: surnames.toLowerCase(),
            correo: email
        }

        db.push().set(usuarios);
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
    }else if(texto === "The email address is already in use by another account."){
        texto_traducido = "Este Correo ya se encuentra registrado";
    }else if(texto === "Password should be at least 6 characters"){
        texto_traducido = "El pasword debe tener minimo 6 caracteres"
    }

    return texto_traducido;
}

// permite limpiar los campos cuando se registra un usuario
var limpiarCampos = function () {

    $('#txt_nombres').val('');
    $('#txt_apellidos').val('');
    $('#txt_email').val('');
    $('#txt_contrasena').val('');
    $('#txt_confirmacion_contraseña').val('');
}