'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;


const ipc = require('electron').ipcMain;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let backgroundWindow;
let windows = [];


function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../app/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    if (!backgroundWindow) {
        createBackgroundWindow();
    }
}

function createBackgroundWindow() {

    //show false
    backgroundWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'Background Processes',
        show: true
    });

    backgroundWindow.loadURL(`file://${__dirname}/../app/background/index.html`);

    backgroundWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        backgroundWindow = null;
    });

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//handle events from the render process
ipc.on('openWindow', function(event, options) {
    console.log(options);

    //TODO - single open - then don't open if already open - bring to front

    let window = new BrowserWindow({
        width: options.width,
        height: options.height,
        title: options.title
    });

    // and load the index.html of the app.
    window.loadURL(`file://${__dirname}/../app/index.html#${options.url}`);

    // Emitted when the window is closed.
    window.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null;
    });
});

ipc.on('broadcastToAllWindows', function(event, key, value) {
    //Returns an array of all opened browser windows.
    BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send(key, value);
    });
});
