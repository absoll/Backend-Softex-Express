const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`Meu primeiro servidor javascript - `);
})

const porta = 3000
const porta2 = 4000

app.listen(porta, () => {
    console.log(`Servidor porta: http://localhost:${porta}`)
})
