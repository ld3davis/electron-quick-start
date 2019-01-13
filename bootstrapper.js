const {app, BrowserWindow} = require('electron')

//use globally here for the window or it will close
//automatically when the object is gc
let win

function createWindow (){
    //create browser window
    win = new BrowserWindow({width: 800, height: 600})
    //load the html
    win.loadFile('index.html')
    //open dev tools
    win.webContents.openDevTools()

    win.on('closed', ()=>{
        //the sample notes that usually the windows
        //would be stored in an array if supporting 
        //multiple windows and this is where they'd be
        //deleted
        win = null
    })
}

//ready
app.on('ready', createWindow)

//quit when all windows are closed
//except for mac (darwin) which
//doesn't roll like that
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

//this takes care of mac recreating a window
//when dock icon is clicked and no other
//windows are open
app.on('activate', () => {
    if(win === null){
        createWindow()
    }
})