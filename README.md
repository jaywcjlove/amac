
<p align="center"><a href='https://github.com/jaywcjlove/amac'><img alt="reactide" height="134" src="./icns/logo.png"></a></p>

[Awesome Mac](https://github.com/jaywcjlove/awesome-mac)  is the data repository for this application, which generates the data that APP intended. APP get the data, will find what recently updated content. There are more convenient filters to find applications.This is a cool plan.

<p align="center"><a href='https://github.com/jaywcjlove/amac'><img alt="reactide" src="./icns/app.png"></a></p>

## Development

To develop, run the self-reloading build, Get the code:

```bash
$ git clone https://github.com/jaywcjlove/amac.git
$ cd amac
$ npm install # or  yarn install
```

To develop, run the self-reloading build:

```bash
# Run the app
$ npm run app

# Restart the app automatically every time code changes. 
# Useful during development.
$ npm run dev
$ npm run app:dev
```

`npm run dev` will live-reload the frontend so you don't need to refresh. If you change main.js however, you'll have to restart electron to reload your changes.

## Package the app

Builds app binaries for Mac.

```bash
$ npm run package
```

## License

Licensed under the [MIT](./LICENSE) License.
