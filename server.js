const express = require('express')

//cria uma aplicacao express
const app = express()

const http = require('http').createServer(app)

const socketIO = require('socket.io') //retorna uma função
const serverSocket = socketIO(http) //chamando a função socketIO que cria um servidor de WebSocket


// diz a minha aplicação express para usar a pasta public
// como sendo pública
app.use(express.static('public'))

// esse caminho à esquerda não precisa existir
// se vc faz res.sendFile(caminhoArquivo) o arquivo em caminhoArquivo precisa existir
app.get('/paginas/ola.html', (req, res) => res.send("Olá Mundo"))

const PORT = 8080



serverSocket.on('connect', socket => {
    console.log('Cliente conectado: ' + socket.id);

    socket.on('status', msg => socket.broadcast.emit('status', msg))

    socket.on('login', msg => {
        socket.login = msg
        serverSocket.emit('chat msg', `${socket.login} conectou`)
    })

    // ao chegar uma msg do tipo 'chat msg' do cliente representado pelo objeto socket
    socket.on('chat msg', msg => {
        console.log(`Mensagem recebida do cliente ${socket.id}: ${msg}`);
        serverSocket.emit('chat msg', `${socket.login}: ${msg}`)
    })
})

http.listen(PORT, () => console.log('Servidor iniciado na porta: ' + PORT))


