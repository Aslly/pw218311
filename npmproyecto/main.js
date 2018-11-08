//Cargamos la aplicacion de electron
const app=require('electron').app;

//Para crear ventanas del sistema operativo
const BrowserWindow=require('electron').BrowserWindow;

//Ruta de los archivos del sistema operativo
const path=require('path');

//Cargar como una pagina web
const url=require('url');

//Declarar la variable de la ventana
let PantallaPrincipal; //let es para constantes

function muestraPantallaPrincipal(){
	//Creamos una pantalla vacia
	PantallaPrincipal=new BrowserWindow({width:380, height:420});
	//Le damos contenido a esa pantalla
	PantallaPrincipal.loadURL(url.format({
		pathname:path.join(__dirname,'calculadora.html'),
		protocol:'file',
		slashes:true


	}));
	//Mostrar la pantalla
	PantallaPrincipal.show();
}

app.on('ready', muestraPantallaPrincipal);