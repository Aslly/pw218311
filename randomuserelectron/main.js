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


//Constantes para imprimir PDF
const electron=require('electron');

//Sistemade archivos
const fs=require('fs');

//Sistema operativo
const os=require('os');

//Aplicar una constante para llamado interno/remoto
//IPC = llamada a un procedimiento interno
const ipc=electron.ipcMain;

//Acceso a la terminal o linea de comandos
const shell=electron.shell;

function muestraPantallaPrincipal(){
	//Creamos una pantalla vacia
	PantallaPrincipal=new BrowserWindow({width:1024, height:450});
	//Le damos contenido a esa pantalla
	PantallaPrincipal.loadURL(url.format({
		pathname:path.join(__dirname,'index.html'),
		protocol:'file',
		slashes:true


	}));
	//Mostrar la pantalla
	PantallaPrincipal.show();
}

//Evento para PDF (declaracion)
ipc.on('print-to-pdf',function(event){
	const pdfPath=path.join(os.tmpdir(),'print.pdf')
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({},function(error,data){
		if(error) throw error
		fs.writeFile(pdfPath,data,function(error){
			if(error){
				throw error
			}
			shell.openExternal('file://'+pdfPath)
		})
	})
})


app.on('ready', muestraPantallaPrincipal);