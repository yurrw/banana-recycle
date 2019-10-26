COPPE Vale Front-end Application
================================

How to install this repository
------------------------------

Install [NodeJS](https://nodejs.org/en/) in case you don't have it.

First clone the repository using your username, then switch to the folder and install NPM dependencies.

```shell
$ git clone https://<YOUR_USER_NAME>@bitbucket.org/coppepesc/geodocs-frontend.git
$ cd coppe-vale-frontend
$ npm install
```

How to run
----------

Run in development mode:

```shell
$ npm run dev
```

Compile into production

```shell
$ npm run deploy
```

If the port 3000 is already taken, an error will be raised. Fix that by running:

```shell
$ PORT=*NEWPORT* npm run dev:no-debug
```

The following command runs tests once and generates coverage.

```shell
$ npm run test
```

The following command runs tests and watches them.

```shell
$ npm run test:dev
```

HOW TO ACCESS MAPSERVER
---
```shell
$ ssh -p 31722 jano@146.164.34.85
passwd: 123456
```
In order to add new maps to the gis, you need to do the following four steps:

1º:

copy *.map file to the following dir:
```
jano@146.164.34.85:/home/jano/mapserver/
```
2º

Copy shapefiles or TIFFs to the correct dirs:

shapefiles are added to:
```
jano@146.164.34.85:/home/jano/mapserver/shape/
```
TIFFs are added to:
```
jano@146.164.34.85:/media/jano/dados/mapfiles/
```
Warning: MAKE SURE your mapfiles are pointing to the correct dirs and filenames.

3º 

Inside the frontend project, you need to edit two or three files as following:


Add a new entry in the switch in **src/businessLogic/map.js/getMapServerParams()** following the pattern already in there.
getMapServerParams

Then, 

Add a new entry in the Tree defined in **src/constants/layers.js**.
This file defines what is showed in the GIS section.

4º 

This step is optional and only necessary if the mapfile defines any legend information.

In the file **src/components/Explorer/Legend.js** add the name of the mapfile added in the first step that should be the same of the layer in the **RenderImages().whitelist[]**


If anything goes **wrong**, check the contents of **jano@146.164.34.85:/home/jano/mapserver/ms_error.txt** for anything abnormal.

OBS
---

1. Use TAB as line identation!