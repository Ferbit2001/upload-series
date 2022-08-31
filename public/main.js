let input = document.getElementById('file')
let button = document.getElementById('button')
let enviar = document.getElementById('enviar')
let dir = document.getElementById('dir')
let separador = document.getElementById('separador')
let index = document.getElementById('index')

button.addEventListener('click',()=>{
    input.click()
})

const rename = (name)=>{
    let nam = []
    index.value.split(" ").forEach(e => {
        nam.push(name.split(separador.value)[e])
    })
    let ext = name.split(separador.value).pop()
    return nam.join('-')+"."+ext
}

enviar.addEventListener('click',()=>{
    let files = input.files
    let formData = new FormData();
    formData.append("dir", dir.value)
    for (let i = 0; i < files.length; i++) {
        let file = new File([files[i]],rename(files[i].name))
        formData.append("file", file) 
    }
    let xhr = new XMLHttpRequest()
    xhr.open('POST','/upload',false)
    xhr.onload = () => {
        if(xhr.status === 200) console.log("Response from server = ", xhr.response); else console.log( xhr.status , ":", xhr.statusText );
    }
    xhr.send(formData)
})