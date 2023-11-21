//const express = require('express');
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const livros = [
    {id: 1, titulo: "Aprendendo JavaScript", autor: "John Doe"},
    {id: 2, titulo: "Aprendendo Python", autor: "Maria Doe"}
]

app.get('/livros', (req: Request, res: Response) => {
    res.send(livros); 
});

app.get('/livros/:id', (req: Request, res: Response) =>{
    const livro = livros.find((l) => l.id === parseInt(req.params.id));

    if(!livro){
        return res.status(404).json({messagem: "Livro nao encontrado"});
    }
    res.send(livro);
});

app.get('/teste', (req: Request, res: Response) => {
    res.send(`teste`);
})

const porta: number = 3000

app.listen(porta, () => {
    console.log(`Servidor porta: http://localhost:${porta}`)
})