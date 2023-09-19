//import java.util.Scanner;

const express = require('express')
const http = require('http').createServer()

const PORT = 8080
http.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT))
