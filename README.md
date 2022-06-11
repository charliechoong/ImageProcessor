# Image Resizer API

Image Resizer is a custom API to resize image and retrieve resized images. 
It runs on an Express server.
It is set to run on port 3001 (feel free to change as you wish).

## Running the Express server

1. Git clone the repository or install as zipped file.
2. Install the node modules:

```bash
npm i 
```
3. Start up the server:

```bash
npm run start
```

## Usage

### To resize an image
1. Place image in /images folder. 
2. Type `http://localhost:3001/images?filename=<image filename>&height=<image height>&width=<image width>` onto any browser
#### Example:
```
http://localhost:3001/images?filename=icelandwaterfall.jpg&height=300&width=200
```
If width or height is not specified, if image already exists in target folder, it will be displayed instead.

### To view a resized image
1. Type `http://localhost:3001/images?filename=<image filename>` onto any browser
#### Examples:
```
http://localhost:3001/images?filename=icelandwaterfall.jpg
http://localhost:3001/images?filename=icelandwaterfall.jpg&height=300  (only height specified)
```


## Utilized Node Packages & Modules
* [Express](https://expressjs.com/)
* [Sharp](https://www.npmjs.com/package/sharp)
* [FileSystem](https://www.npmjs.com/package/fs)
* [Jasmine](https://www.npmjs.com/package/jasmine): Testing Purpose
* [Prettier](https://www.npmjs.com/package/prettier): Formatting Purpose
* [EsLint](https://www.npmjs.com/package/eslint): Formatting Purpose


## Development Commands
* Run server: ```npm run start```
* Run tests: ```npm run test ```
* Compile code: ```npm run build```

These commands can be configured in **package.json** file.