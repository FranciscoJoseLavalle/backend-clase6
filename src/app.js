import express from 'express';
import productos from './productos.json' assert {type: 'json'};

const app = express();
const PORT = 8080;
const server = app.listen(PORT,() => {
    console.log(`Escuchando en puerto ${PORT}`)
})

app.get('/',(req,res) => {
    res.send('Visitar /productos o /productosRandom')
})
app.get('/productos',(req,res) => {
    res.send(productos);
})
app.get('/productosRandom',(req,res) => {
    res.send(productos[Math.round(Math.random() * productos.length)]);
})