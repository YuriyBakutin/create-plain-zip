# create-plain-zip v1.0.0

This module help to create a simple archive, for example, when the user wants to download the selected files in one archive.

## Installation
```bash
$ npm i --save create-plain-zip
```

## Usage
```js
"use strict";

const createPlaneZip = require('create-plain-zip');

// Solve the problem of forward and reverse slash
// in different operating systems using path.join.
const path = require('path');

const archivePath = path.join('path', 'to', 'archive.zip');

const filesPaths = [
    path.join('path', 'to', 'file1'),
    path.join('path', 'to', 'file2')
];

const anyFunction = async (archivePath, filesPaths) => {
    await createPlaneZip(archivePath, filesPaths);

    //Do something like return a URL of the archive
    // to client, etc.
}

anyFunction(archivePath, filesPaths);

```
