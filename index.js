let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let fileupload = require('express-fileupload')
let fs = require('./fs')
let PORT = 3000
let IP = "192.168.0.12"

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload())
app.use('/',express.static(__dirname+'/public'))

app.post('/upload',async (req,res)=>{
    let files = req.files.file
    let {dir} = req.body

    if (dir) {fs.mkdir(dir)} else return res.status(422).send({message : "missing directory parameter"})
    
    if(files.name){
        files.mv(`./upload/${dir}/${files.name}`,err => {
            if(err) return res.status(500).send({ message : err })
            else return res.status(200).send({message : 'file upload'})
        })
    }else{
        for (const file of files) {
            file.mv(`./upload/${dir}/${file.name}`,err => {
                if(err) return res.status(500).send({ message : err })
            }) 
        }
        res.status(200).send({message : 'files upload'})
    }
})
app.use((req,res)=>{res.status(404).send({message : "Page not found"})})

app.listen(PORT,IP,()=>{console.log('Server Running on port: '+PORT)})