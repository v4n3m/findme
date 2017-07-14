var provider = new firebase.auth.GoogleAuthProvider();
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid;
var refLugar;
var refUsuario;
var refUser;

var database = firebase.database();

$( document ).ready(function() {
	$("#welcome").hide();
	$("#listado").hide();
	$("#exit").hide();
	//$(".upload-group").hide();
	//document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});

function signIn() {
	if (localStorage.getItem('name')) {
		console.log(user);
		showWelcomeContainer();
	}
		else {
		firebase.auth().signInWithPopup(provider).then(function(result) {
			console.log("Test");
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  user = result.user;
			if (user != null) {
				name = user.displayName;
				email = user.email;
				photoUrl = user.photoURL;
				uid = user.uid; //unicamente para firebase.
				localStorage.setItem('name' , name);
			} // Ciera if
		  //window.location.href = "otraPagina.html"
		  console.log(name);
		  showWelcomeContainer();
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		}); //ciera catch error
												//if (user != null) {
													//name = user.displayName;
													//email = user.email;
													//photoUrl = user.photoURL;
													//uid = user.uid; //unicamente para firebase.
													//localStorage.setItem('name' , name);
												//}
	} // cierra else
} // cierra signIn

//if (user != null) {
//	name = user.displayName;
//	email = user.email;
//	photoUrl = user.photoURL;
//	uid = user.uid; //unicamente para firebase.
//	localStorage.setItem('name' , name);
//}

//localStorage.setItem('name' , name);

function showWelcomeContainer() {	
	$("#login").hide();
	$("#welcome").show();
	$("#listado").show();
	$("#welcomeText").html("Hola, " + localStorage.getItem('name'));
};

function enviarLugar(value){
	console.log("Test");
	enviar = document.getElementById("welcome");
	refUsuario = firebase.database().ref().child("usuarios").child(localStorage.getItem('name'));
	refLugar = refUsuario.child("lugar");
	//refUser = refUsuario.child("nombre")
	//refUser.set(user.displayName)
	refLugar.set(value)
	alert("Se ha guardado su ubicación");
	window.location.href = "otraPagina.html"

}

function mostrarLugar(){
	var remoto = [];
	var oficina = [];
	var reunion = [];
	var transito = [];
	var nodisponible = [];
	var nombre;
	var refUser = firebase.database().ref().child("usuarios");

	refUser.once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			var lugar = childData['lugar'];
			console.log(childData);
				if (lugar == 'Remoto') {
					remoto.push(childKey);
					console.log(childKey);
				}
				if (lugar == 'En Transito') {
					transito.push(childKey);
					console.log(childKey);
				}
				if (lugar == 'No Disponible') {
					nodisponible.push(childKey);
					console.log(childKey);
				}
				if (lugar == 'Reunión/Capacitacion') {
					reunion.push(childKey);
					console.log(childKey);
				}
				if (lugar == 'Oficina') {
					oficina.push(childKey);
					console.log(childKey);
				}
				$('#casa').empty();
				remoto.forEach(function(nombre) {
  				$('#casa').append("<li>" + nombre + "</li>");
				});
				$('#oficina').empty();
				oficina.forEach(function(nombre) {
					$('#oficina').append("<li>" + nombre + "</li>");
				});
				$('#reu').empty();
				reunion.forEach(function(nombre) {
					$('#reu').append("<li>" + nombre + "</li>");
				});
				$('#transito').empty();
				transito.forEach(function(nombre) {
					$('#transito').append("<li>" + nombre + "</li>");
				});
				$('#nodisponible').empty();
				nodisponible.forEach(function(nombre) {
					$('#nodisponible').append("<li>" + nombre + "</li>");
				});
		});
		//for(var key in datos){
		})
	}
//}

function salir() {
	$("#login").show();
	$("#welcome").hide();
	$("#listado").hide();
	};


mostrarLugar();

function signOut() {
	firebase.auth().signOut().then(function() {
		console.log("Exit");
		alert("Se ha cerrado sesión");
	  // Sign-out successful.
	}, function(error) {
		console.log("error")
	  // An error happened.
	});
	window.location.href = "index.html"
	salir();
}
