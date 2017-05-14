'use strict'
const electron = require('electron')
// Module to control application life.
const {app,Menu} = electron
const windows = require('./windows')
const menu = require('./menu')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  Menu.setApplicationMenu(menu);
  windows.create('index');
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function (e, hasVisibleWindows) {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (mainWindow === null) {
  //   createWindow()
  // }
  if (!hasVisibleWindows) {
    windows.create();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
