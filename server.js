const express = require('express')

//cria uma aplicacao express
const app = express()

const http = require('http').createServer(app)

// diz a minha aplicação express para usar a pasta public
// como sendo pública
app.use(express.static('public'))

const PORT = 8080
app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'))

http.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))


