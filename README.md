# Image Resizer API

Image Resizer is a custom API to resize image and retrieve resized images. It runs on an Express server.
It is set to run on port 3001.

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
1. [Express](https://expressjs.com/)
2. [Sharp](https://www.npmjs.com/package/sharp)
3. [FileSystem](https://www.npmjs.com/package/fs)

## Development Commands
* Run tests: ```npm run test ```
* Compile code: ```npm run build```
