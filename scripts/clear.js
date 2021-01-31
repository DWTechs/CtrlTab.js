// const path = require('path');
const fs = require('fs');
const options = {   recursive: true, 
                    force: true
                };
fs.rmSync('./build/', options);
fs.rmSync('./dist/', options);
  
  