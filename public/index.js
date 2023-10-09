window.addEventListener('load', () => {
    const socket = io(); //tenta conectar no servidor de websocket na mesma URL atual
    console.log('Conectado no servidor de websocket');

    document.getElementById('form').addEventListener('submit', (evt) => {
        const msg = document.getElementById('msg').value
        if(socket.login)
            socket.emit('chat msg', msg)
        else {
            socket.emit('login', msg)
            socket.login = msg

            document.getElementById('msg').addEventListener('keydown', () => {
                socket.emit('status', `${socket.login} está digitando...`)
            })

            document.getElementById('msg').addEventListener('keyup', () => socket.emit('status', ''))                    
        }
        console.log('Enviando mensagem ' + msg);
        evt.preventDefault();
    })

    socket.on('chat msg', msg => {
        document.getElementById('mensagens').innerHTML += `<li>${msg}</li>`
    })

    socket.on('status', msg => document.getElementById('status').innerHTML = msg)


    
})
