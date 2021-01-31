// const path = require('path');
const fs      = require('fs');

const mail    = 'https://github.com/DWTechs/CtrlTab.js';
const CRLF    = '\r\n';
const rel     = './';
const src     = `${rel}build/`;
const dest    = `${rel}dist/`; 
const files   = [
  {
    src:  `${rel}src/ctrltab.d.ts`,
    dest: `${dest}ctrltab.d.ts`
  },
  {
    src:  `${src}ctrltab.iife.js`,
    dest: `${dest}ctrltab.iife.js`
  },
  {
    src:  `${src}ctrltab.iife.min.js`,
    dest: `${dest}ctrltab.iife.min.js`
  },
  {
    src:  `${src}ctrltab.js`,
    dest: `${dest}ctrltab.js`
  }
];

fs.mkdir(dest, { recursive: false },(err) => {
  if (err) throw err;
  fs.readFile(`${rel}LICENSE`, (err, license) => {
    if (err) throw err;
    for (let file of files) {
      fs.readFile(file.src, (err, fileContent) => {
        if (err) throw err;
        fs.writeFile(file.dest, `/*${CRLF}${license}${CRLF}${mail}${CRLF}*/${CRLF}${CRLF}${fileContent}`, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});