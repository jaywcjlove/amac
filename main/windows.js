const {app, BrowserWindow} = require('electron');
const EventEmitter = require('events');
const url = require('url')
const path = require('path')

class WindowManager extends EventEmitter {
  constructor() {
    super();
    // this.windows = new Set();
  }
  create(type, arg) {
    if (!type) {type = 'main'; } 

    const option = {}

    switch(type){
      case "main":
        option.width=800;
        option.height=600;
        // option.frame=false;
        option.title="sdfdsfsdfdfs";
        // option.fullscreen = true;
        option.titleBarStyle = 'hidden-inset';
        option.show = true;
        break;
      default:
        option.width=800;
        option.height=600;
        // option.frame=false;
        option.title="sdfdsfsdfdfs";
        // option.fullscreen = true;
        option.titleBarStyle = 'hidden-inset';
        option.show = true;
        break;
    }

    // Create the browser window.
    const win = new BrowserWindow(option)
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, `${type}.html`),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      // win = null
    })

    return win;
  }
}

module.exports = new WindowManager();