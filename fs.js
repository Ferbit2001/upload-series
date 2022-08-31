const path = require("path");
const fss = require('fs');
const { constants } = require("fs");
const dir = __dirname+'/upload'
const fs  = {}

fs.access = (d) => {
    d = d || ""
    if (fss.existsSync(path.join(dir,d))) return true
    else return false
}

fs.mkdir = (d) => {
    if (!d) {console.error('no se añadió nombre al directorio');return}
    if(!fs.access(d)) {
        fss.mkdir(path.join(dir,d), {recursive: true }, (err) =>{
            if (err) return err
        })
    }
}
module.exports = fs